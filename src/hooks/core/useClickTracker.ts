import { ref, onMounted, onUnmounted } from 'vue'

interface ClickRecord {
  path: string
  tag: string
  classList: string[]
  id: string
  textContent: string
  timestamp: number
}

interface ClickStats {
  totalClicks: number
  pageViews: Record<string, number>
  elementClicks: Record<string, number>
  hourlyDistribution: number[]
  records: ClickRecord[]
}

const MAX_RECORDS = 200
const FLUSH_INTERVAL = 30000

let globalInstance: ReturnType<typeof createClickTracker> | null = null

function createClickTracker() {
  const stats = ref<ClickStats>({
    totalClicks: 0,
    pageViews: {},
    elementClicks: {},
    hourlyDistribution: Array(24).fill(0),
    records: []
  })

  let flushTimer: ReturnType<typeof setInterval> | null = null

  function safeText(el: Element, maxLen = 60): string {
    const text = el.textContent?.trim().slice(0, maxLen) || ''
    return text
  }

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!target) return

    const record: ClickRecord = {
      path: window.location.pathname,
      tag: target.tagName.toLowerCase(),
      classList: Array.from(target.classList).slice(0, 5),
      id: target.id || '',
      textContent: safeText(target),
      timestamp: Date.now()
    }

    stats.value.totalClicks++
    stats.value.pageViews[record.path] = (stats.value.pageViews[record.path] || 0) + 1

    const elKey = `${record.tag}${record.classList.join('.')}`
    stats.value.elementClicks[elKey] = (stats.value.elementClicks[elKey] || 0) + 1

    const hour = new Date().getHours()
    stats.value.hourlyDistribution[hour]++

    stats.value.records.push(record)
    if (stats.value.records.length > MAX_RECORDS) {
      stats.value.records = stats.value.records.slice(-MAX_RECORDS)
    }
  }

  function flush() {
    try {
      const payload = {
        totalClicks: stats.value.totalClicks,
        pageViews: stats.value.pageViews,
        hourlyDistribution: stats.value.hourlyDistribution,
        timestamp: Date.now()
      }
      localStorage.setItem('pe_click_stats', JSON.stringify(payload))
    } catch {
      /* storage full — silently ignore */
    }
  }

  function start() {
    document.addEventListener('click', handleClick, true)
    flushTimer = setInterval(flush, FLUSH_INTERVAL)
  }

  function stop() {
    document.removeEventListener('click', handleClick, true)
    if (flushTimer) {
      clearInterval(flushTimer)
      flushTimer = null
    }
    flush()
  }

  function reset() {
    stats.value = {
      totalClicks: 0,
      pageViews: {},
      elementClicks: {},
      hourlyDistribution: Array(24).fill(0),
      records: []
    }
  }

  return { stats, start, stop, reset, flush }
}

export function useClickTracker() {
  if (!globalInstance) {
    globalInstance = createClickTracker()
  }
  return globalInstance
}

export function useClickTrackerSetup() {
  const tracker = useClickTracker()

  onMounted(() => tracker.start())
  onUnmounted(() => tracker.stop())

  return tracker
}
