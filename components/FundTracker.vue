<script setup lang="ts">
interface FundResponse {
  quote: {
    symbol: string
    name: string
    price: number | null
    quoteDate: string | null
    quoteTime: string | null
    kind: 'trade' | 'close' | 'unavailable'
    sourceUrl: string
    fetchedAt: string
    stale: boolean
  }
  position: {
    mode: 'simulation' | 'actual'
    plannedPrincipal: number
    adminReserve: number
    investmentBudget: number
    cost: number | null
    shares: number | null
    averagePrice?: number | null
    purchaseSummary?: string | null
    baselinePrice: number | null
    baselineDate: string
    purchasedAt?: string | null
    cashBalance: number | null
  }
  metrics: {
    marketValue: number | null
    totalValue: number | null
    unrealizedPnl: number | null
    returnPct: number | null
  }
  history: Array<{ date: string; price: number; shares: number; cost: number; marketValue: number; unrealizedPnl: number }>
  status: 'pending' | 'ready'
}
type FundPerformancePoint = FundResponse['history'][number]
type FundChartPoint = FundPerformancePoint & { x: number; y: number }

const section = ref<HTMLElement | null>(null)
const showPerformance = ref(false)
const performanceRange = ref<'daily' | 'weekly'>('daily')
const hoveredPerformancePoint = ref<FundChartPoint | null>(null)
const { data, error, status, refresh } = await useLazyFetch<FundResponse>('/api/fund-0050', { server: false })
// A failed refresh must not replace a previously successful quote or position.
const lastGood = shallowRef<FundResponse | null>(null)
watch(data, value => {
  if (!value) return
  if (value.quote.price === null && lastGood.value?.quote.price != null) {
    lastGood.value = { ...lastGood.value, quote: { ...lastGood.value.quote, stale: true } }
  } else lastGood.value = value
}, { immediate: true })
const fund = computed(() => lastGood.value)
const quote = computed(() => fund.value?.quote)
const pending = computed(() => status.value === 'pending')
const numberAmount = (value: number | null | undefined, digits = 0) =>
  value == null ? '—' : new Intl.NumberFormat('zh-TW', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
const amount = (value: number | null | undefined, digits = 0) =>
  value == null ? '—' : `NT$ ${numberAmount(value, digits)}`
const signedAmount = (value: number, digits = 0) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${numberAmount(Math.abs(value), digits)}`
const profit = computed(() => {
  const value = fund.value?.metrics.unrealizedPnl
  return value == null ? '—' : `${value > 0 ? '+' : value < 0 ? '−' : ''}${numberAmount(Math.abs(value), 2)}`
})
const profitTone = computed(() => {
  const value = fund.value?.metrics.unrealizedPnl
  return value == null || value === 0 ? '' : value > 0 ? 'is-positive' : 'is-negative'
})
const profitPercent = computed(() => {
  const value = fund.value?.metrics.returnPct
  if (value == null) return ''
  if (value === 0) return `目前持平 · ${value.toFixed(2)}%`
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
})
const quoteLabel = computed(() => quote.value?.kind === 'trade' ? '最新成交價' : quote.value?.kind === 'close' ? '最近收盤價' : '0050 參考價')
const quoteStamp = computed(() => [quote.value?.quoteDate, quote.value?.quoteTime].filter(Boolean).join(' '))
const quoteWarning = computed(() => error.value ? ' · 更新失敗，保留上次報價' : quote.value?.stale ? ' · 上次報價' : '')
const baselineNote = computed(() => {
  const date = fund.value?.position.purchasedAt || fund.value?.position.baselineDate || '2026-10-06'
  const price = fund.value?.position.baselinePrice
  const shares = fund.value?.position.shares
  const cost = fund.value?.position.cost
  const averagePrice = fund.value?.position.averagePrice
  const purchaseSummary = fund.value?.position.purchaseSummary
  if (fund.value?.position.mode === 'actual' && price != null && shares != null && cost != null) {
    return `${purchaseSummary || `${date} 已用聯盟積分池買進 0050`}；目前總持股 ${numberAmount(shares)} 股，總成本 ${amount(cost, 2)}，平均成本 ${amount(averagePrice ?? cost / shares, 2)}；未含交易費用及配息。菜還沒加，先學會吃土。`
  }
  return price != null
    ? `${date} 收盤 ${amount(price, 2)} 為試算起點；僅供私人聯盟內部紀錄，季末以實際結算為準`
    : `等待 ${date} 收盤價建立起點，季末揭曉加菜成果`
})
const holdingNote = computed(() => {
  const position = fund.value?.position
  if (position?.mode === 'actual' && position.shares != null) return `持有 ${numberAmount(position.shares)} 股`
  return position?.shares != null && position.cashBalance != null
    ? `${numberAmount(position.shares)} 股 + 現金 ${amount(position.cashBalance, 2)}`
    : '收盤後試算股數與餘額'
})
const dailyPerformance = computed(() => fund.value?.history || [])
const performanceHistory = computed(() => {
  if (performanceRange.value === 'daily') return dailyPerformance.value
  const weeks = new Map<string, FundPerformancePoint>()
  dailyPerformance.value.forEach(point => {
    const date = new Date(`${point.date}T00:00:00Z`)
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7))
    weeks.set(date.toISOString().slice(0, 10), point)
  })
  return [...weeks.values()]
})
const performanceChart = computed(() => {
  const values = performanceHistory.value.map(point => point.unrealizedPnl)
  if (!values.length) return { points: [] as FundChartPoint[], line: '' }
  const min = Math.min(0, ...values)
  const max = Math.max(0, ...values)
  const range = Math.max(max - min, 500, 1)
  const points = performanceHistory.value.map((point, index) => {
    const x = performanceHistory.value.length < 2 ? 210 : 44 + index * (332 / (performanceHistory.value.length - 1))
    const y = 164 - ((point.unrealizedPnl - min) / range) * 112
    return { ...point, x, y }
  })
  return { points, line: points.map(point => `${point.x},${point.y}`).join(' ') }
})
const performanceLoss = computed(() => {
  const value = fund.value?.metrics.unrealizedPnl
  const pct = fund.value?.metrics.returnPct
  if (value == null || pct == null) return '等待最新報價建立損益'
  return `目前 ${value < 0 ? '賠' : '賺'} ${amount(Math.abs(value), 2)} · ${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`
})
const performanceEntries = computed(() => performanceHistory.value.slice(-5).reverse())
const tooltipX = (x: number) => Math.min(Math.max(x - 56, 8), 300)

let observer: IntersectionObserver | undefined
let timer: ReturnType<typeof setInterval> | undefined
let inView = false
const refreshQuote = async () => {
  if (pending.value) return
  await refresh()
}
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { inView = Boolean(entry?.isIntersecting) }, { threshold: 0.08 })
  if (section.value) observer.observe(section.value)
  timer = setInterval(() => {
    if (inView && document.visibilityState === 'visible') void refreshQuote()
  }, 5 * 60 * 1000)
})
onUnmounted(() => { observer?.disconnect(); if (timer) clearInterval(timer) })
</script>

<template>
  <aside ref="section" class="fund-tracker" aria-labelledby="fund-title" :aria-busy="pending">
    <div class="fund-heading">
      <div>
        <p class="fund-kicker"><span aria-hidden="true">↗</span> 0050 積分加菜計畫 · 鍋底先賠進去了</p>
        <h3 id="fund-title"><span>聯盟長期投資計畫，</span><span>長期是多久不知道</span></h3>
      </div>
      <button class="fund-refresh" type="button" :disabled="pending" @click="refreshQuote">
        <span aria-hidden="true" :class="{ 'is-refreshing': pending }">↻</span>
        {{ pending ? '更新中' : '更新報價' }}
      </button>
      <button class="fund-history-trigger" type="button" @click="showPerformance = true">
        <span aria-hidden="true">↗</span> 資金走勢
      </button>
    </div>

    <dl class="fund-metrics">
      <div>
        <dt>{{ quoteLabel }} <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(quote?.price, 2) }}</dd>
        <small>{{ quote?.name || '元大台灣50 ETF' }}</small>
      </div>
      <div>
        <dt>買進成本 <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(fund?.position.cost ?? 28087.65, 2) }}</dd>
        <small>{{ fund?.position.purchasedAt || '2026-10-14' }} · {{ numberAmount(fund?.position.shares ?? 243) }} 股 · 平均 NT$ {{ numberAmount(fund?.position.averagePrice ?? 115.59, 2) }}</small>
      </div>
      <div>
        <dt>持股市值 <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(fund?.metrics.totalValue, 2) }}</dd>
        <small>{{ holdingNote }}</small>
      </div>
      <div :class="profitTone">
        <dt>帳面損益 <span class="fund-unit">NT$</span></dt>
        <dd>{{ profit }}</dd>
        <small>{{ profitPercent || (fund?.position.baselinePrice != null ? '等待最新報價' : '等待買進資料建立起點') }} · 加菜還沒上桌，帳先結了</small>
      </div>
    </dl>

    <div class="fund-bottom">
      <p class="fund-note">{{ baselineNote }}</p>
      <p class="fund-source" role="status" aria-live="polite">
        <template v-if="quote?.price != null">{{ quoteStamp || '報價時間未提供' }}{{ quoteWarning }}</template>
        <template v-else>{{ error ? '報價暫時無法取得' : pending ? '正在取得報價' : '報價暫未提供' }}</template>
        <span aria-hidden="true"> · </span>
        約每 5 分鐘更新 ·
        <a :href="quote?.sourceUrl || 'https://www.twse.com.tw/zh/trading/exchange/MI_INDEX.html'" target="_blank" rel="noopener noreferrer">證交所來源 ↗</a>
      </p>
    </div>

    <Teleport to="body">
      <div v-if="showPerformance" class="fund-modal-backdrop" role="presentation" @click.self="showPerformance = false">
        <section class="fund-modal" role="dialog" aria-modal="true" aria-labelledby="fund-performance-title">
          <button class="fund-modal-close" type="button" aria-label="關閉資金走勢" @click="showPerformance = false">×</button>
          <header class="fund-modal-heading">
            <p class="fund-kicker">0050 · CAPITAL TIMELINE</p>
            <h3 id="fund-performance-title">積分池資金走勢</h3>
            <p>每天看帳面損益；日線看波動，週線看趨勢。</p>
          </header>
          <div class="fund-performance-summary">
            <span>累計投入 <b>NT$ 28,087.65</b></span>
            <strong :class="profitTone">{{ performanceLoss }}</strong>
          </div>
          <div class="fund-range-tabs" role="tablist" aria-label="資金走勢區間">
            <button :class="{ active: performanceRange === 'daily' }" type="button" role="tab" :aria-selected="performanceRange === 'daily'" @click="performanceRange = 'daily'">每日損益</button>
            <button :class="{ active: performanceRange === 'weekly' }" type="button" role="tab" :aria-selected="performanceRange === 'weekly'" @click="performanceRange = 'weekly'">每週收盤</button>
          </div>
          <div class="fund-investments"><span><b>10/06</b> 首次投入 24,001.65</span><span><b>10/14</b> 加碼至 28,087.65</span></div>
          <div class="fund-chart-shell">
            <svg class="fund-chart" viewBox="0 0 420 220" role="img" aria-label="0050 積分池每日帳面損益走勢">
              <defs><linearGradient id="fund-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efbd55" stop-opacity=".42"/><stop offset="1" stop-color="#efbd55" stop-opacity="0"/></linearGradient></defs>
              <line v-for="guide in [52, 108, 164]" :key="guide" x1="32" x2="388" :y1="guide" :y2="guide" class="fund-chart-guide" />
              <polygon :points="`48,180 ${performanceChart.line} 372,180`" class="fund-chart-area" />
              <polyline :points="performanceChart.line" class="fund-chart-line" />
              <g v-for="point in performanceChart.points" :key="point.date" class="fund-chart-point" tabindex="0" @mouseenter="hoveredPerformancePoint = point" @mouseleave="hoveredPerformancePoint = null" @focus="hoveredPerformancePoint = point" @blur="hoveredPerformancePoint = null">
                <circle :cx="point.x" :cy="point.y" r="7" class="fund-chart-halo" />
                <circle :cx="point.x" :cy="point.y" r="3.5" class="fund-chart-dot" />
                <text v-if="point === performanceChart.points[0] || point === performanceChart.points[performanceChart.points.length - 1]" :x="point.x" :y="point.y - 14" text-anchor="middle" class="fund-chart-value">{{ signedAmount(point.unrealizedPnl) }}</text>
                <text v-if="point === performanceChart.points[0] || point === performanceChart.points[performanceChart.points.length - 1]" :x="point.x" y="204" text-anchor="middle" class="fund-chart-date">{{ point.date }}</text>
              </g>
              <g v-if="hoveredPerformancePoint" class="fund-chart-tooltip" pointer-events="none">
                <rect :x="tooltipX(hoveredPerformancePoint.x)" :y="Math.max(hoveredPerformancePoint.y - 63, 10)" width="112" height="47" rx="7" />
                <text :x="tooltipX(hoveredPerformancePoint.x) + 8" :y="Math.max(hoveredPerformancePoint.y - 45, 28)">{{ hoveredPerformancePoint.date }}</text>
                <text :x="tooltipX(hoveredPerformancePoint.x) + 8" :y="Math.max(hoveredPerformancePoint.y - 27, 46)" :class="hoveredPerformancePoint.unrealizedPnl < 0 ? 'is-loss' : 'is-gain'">帳面 {{ signedAmount(hoveredPerformancePoint.unrealizedPnl, 0) }}</text>
              </g>
            </svg>
          </div>
          <ol class="fund-history-list">
            <li v-for="point in performanceEntries" :key="point.date"><time>{{ point.date }}</time><div><strong>收盤 NT$ {{ numberAmount(point.price, 2) }}</strong><span>{{ numberAmount(point.shares) }} 股 · 累計成本 NT$ {{ numberAmount(point.cost, 2) }}</span></div><b :class="point.unrealizedPnl < 0 ? 'is-loss' : 'is-gain'">{{ signedAmount(point.unrealizedPnl, 2) }}</b></li>
          </ol>
        </section>
      </div>
    </Teleport>
  </aside>
</template>

<style scoped>
.fund-tracker{position:relative;isolation:isolate;overflow:hidden;margin-top:22px;padding:22px 26px;background:linear-gradient(145deg,rgba(13,20,31,.96),rgba(17,27,42,.92) 52%,rgba(8,17,31,.98));color:#f6f3e9;border:0;border-radius:14px;box-shadow:0 22px 70px rgba(0,0,0,.28),0 6px 22px rgba(16,29,49,.2),inset 0 1px 0 rgba(255,255,255,.13),inset 0 0 0 1px rgba(255,255,255,.06)}
.fund-tracker::before{content:'';position:absolute;inset:auto -8% -42% -8%;z-index:-2;height:58%;background:radial-gradient(circle at 10% 62%,rgba(239,184,73,.78),transparent 32%),radial-gradient(circle at 36% 82%,rgba(255,91,126,.5),transparent 34%),radial-gradient(circle at 62% 70%,rgba(163,124,255,.52),transparent 36%),radial-gradient(circle at 86% 64%,rgba(49,216,165,.62),transparent 33%);filter:blur(24px);opacity:.78;animation:fund-aurora 9s ease-in-out infinite alternate}
.fund-tracker::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(255,255,255,.06),transparent 42%),radial-gradient(circle at 82% 12%,rgba(150,190,255,.14),transparent 26%);pointer-events:none}
.fund-heading{display:flex;align-items:center;justify-content:flex-start;gap:10px;position:relative;z-index:1}
.fund-heading>div{margin-right:auto}
.fund-kicker{margin:0 0 7px;color:#7ed7b8;font-size:12px;line-height:1.3;font-weight:700;letter-spacing:.13em}
.fund-kicker span{display:inline-block;margin-right:6px;font-size:17px;line-height:12px}
.fund-heading h3{margin:0;color:#fff6df;font-size:22px;font-weight:750;line-height:1.35;letter-spacing:.01em}
.fund-refresh{flex-shrink:0;display:flex;align-items:center;gap:6px;min-height:35px;padding:7px 11px;border:1px solid rgba(186,211,255,.32);border-radius:999px;background:rgba(255,255,255,.04);color:#bfe9d8;font:inherit;font-size:12px;cursor:pointer;backdrop-filter:blur(8px)}
.fund-refresh:hover:not(:disabled){border-color:#f3bd45;color:#f3bd45}
.fund-refresh:focus-visible{outline:2px solid #f3bd45;outline-offset:3px}
.fund-refresh:disabled{opacity:.6;cursor:wait}
.fund-refresh span{font-size:18px;line-height:1}
.fund-history-trigger{display:flex;align-items:center;gap:6px;min-height:35px;padding:7px 11px;border:1px solid rgba(239,193,91,.46);border-radius:999px;background:rgba(239,193,91,.09);color:#f4cf76;font:inherit;font-size:12px;cursor:pointer;backdrop-filter:blur(8px)}
.fund-history-trigger:hover{background:rgba(239,193,91,.17);border-color:#f3c15b;color:#fff2cd}.fund-history-trigger:focus-visible{outline:2px solid #f3c15b;outline-offset:3px}
.is-refreshing{animation:fund-spin 1.2s linear infinite}
.fund-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:20px 0 17px;position:relative;z-index:1}
.fund-metrics>div{min-width:0;padding:0 22px;border-left:1px solid rgba(230,235,227,.15)}
.fund-metrics>div:first-child{padding-left:0;border-left:0}
.fund-metrics dt{margin-bottom:7px;color:#b8c2c8;font-size:12px;line-height:1.4}
.fund-unit{margin-left:4px;color:#8697a3;font-size:10px}
.fund-metrics dd{margin:0;color:#f3c15b;font-family:inherit;font-size:25px;line-height:1.2;font-weight:750;letter-spacing:-.02em;font-variant-numeric:tabular-nums;white-space:nowrap}
.fund-metrics small{display:block;margin-top:6px;color:#9fadb7;font-size:11px;line-height:1.3}
.fund-metrics .is-positive dd,.fund-metrics .is-positive small{color:#89e0ba}
.fund-metrics .is-negative dd,.fund-metrics .is-negative small{color:#f3a5a0}
.fund-bottom{display:flex;justify-content:space-between;align-items:flex-start;gap:8px 22px;padding-top:12px;border-top:1px solid rgba(230,235,227,.12);position:relative;z-index:1}
.fund-note,.fund-source{margin:0;font-size:11px;line-height:1.65;color:#aebbc2}
.fund-source{text-align:right;flex-shrink:0}
.fund-source a{color:#c9d4d7;text-decoration:underline;text-underline-offset:3px}
.fund-source a:hover{color:#f3c15b}
.fund-modal-backdrop{position:fixed;z-index:80;inset:0;display:grid;place-items:center;padding:22px;background:rgba(6,12,22,.74);backdrop-filter:blur(12px);animation:fund-modal-in .22s ease-out}
.fund-modal{position:relative;width:min(980px,100%);max-height:min(760px,calc(100vh - 44px));overflow:auto;padding:34px 38px;border:1px solid rgba(239,193,91,.38);border-radius:22px;background:radial-gradient(circle at 88% 0,rgba(40,157,131,.22),transparent 30%),linear-gradient(145deg,#0e192a,#101c30 58%,#0b1628);box-shadow:0 32px 100px rgba(0,0,0,.58),inset 0 1px 0 rgba(255,255,255,.1);color:#f7f3e9;animation:fund-modal-rise .3s cubic-bezier(.2,.8,.2,1)}
.fund-modal-close{position:absolute;top:18px;right:18px;width:35px;height:35px;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:rgba(255,255,255,.05);color:#fff;font-size:27px;line-height:28px;cursor:pointer}.fund-modal-close:hover{border-color:#f3c15b;color:#f3c15b}.fund-modal-heading h3{margin:4px 0 8px;font-size:29px;letter-spacing:.01em}.fund-modal-heading>p:last-child{margin:0;color:#aebbc6;font-size:14px}
.fund-performance-summary{display:flex;justify-content:space-between;gap:18px;align-items:center;margin:25px 0 14px;padding:14px 16px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.035);color:#acb8c3;font-size:13px}.fund-performance-summary b{display:block;margin-top:4px;color:#f8e1a0;font-size:19px}.fund-performance-summary>strong{font-size:18px}.fund-performance-summary>.is-negative{color:#ffaca9}.fund-performance-summary>.is-positive{color:#8ce5bd}
.fund-range-tabs{display:flex;gap:6px;margin:0 0 11px}.fund-range-tabs button{border:1px solid rgba(255,255,255,.16);border-radius:8px;background:transparent;color:#9eafbe;padding:7px 11px;font:700 11px/1 inherit;letter-spacing:.04em;cursor:pointer}.fund-range-tabs button.active{border-color:#efbd55;background:rgba(239,189,85,.13);color:#f8dfa0}.fund-investments{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:13px}.fund-investments span{padding:5px 8px;border-radius:6px;background:rgba(129,214,188,.09);color:#a9b9c4;font-size:11px}.fund-investments b{margin-right:5px;color:#83d8bb;font-family:ui-monospace,monospace}
.fund-chart-shell{padding:16px 6px 2px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(0,0,0,.13)}.fund-chart{display:block;width:100%;height:auto}.fund-chart-guide{stroke:rgba(222,231,241,.13);stroke-dasharray:3 5}.fund-chart-area{fill:url(#fund-chart-fill)}.fund-chart-line{fill:none;stroke:#efbd55;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 4px 6px rgba(239,189,85,.25))}.fund-chart-halo{fill:rgba(239,189,85,.2)}.fund-chart-dot{fill:#fff6df;stroke:#efbd55;stroke-width:3}.fund-chart-point{cursor:crosshair;outline:none}.fund-chart-point:focus .fund-chart-halo,.fund-chart-point:hover .fund-chart-halo{fill:rgba(239,189,85,.44)}.fund-chart-value{fill:#f8dfa0;font-size:13px;font-weight:750}.fund-chart-date{fill:#aab8c5;font-size:10px;letter-spacing:.04em}.fund-chart-tooltip rect{fill:#f8f1df;stroke:#efbd55;stroke-width:1;filter:drop-shadow(0 5px 8px rgba(0,0,0,.32))}.fund-chart-tooltip text{fill:#50555b;font-size:9px;font-weight:700}.fund-chart-tooltip .is-loss{fill:#b8474b}.fund-chart-tooltip .is-gain{fill:#288766}
.fund-history-list{display:grid;gap:0;margin:18px 0 0;padding:0;list-style:none;border:1px solid rgba(255,255,255,.09);border-radius:13px;overflow:hidden}.fund-history-list li{display:grid;grid-template-columns:90px 1fr auto;gap:14px;align-items:center;padding:13px 15px;border-top:1px solid rgba(255,255,255,.08)}.fund-history-list li:first-child{border-top:0}.fund-history-list time{color:#83d8bb;font:700 11px/1.2 ui-monospace,monospace;letter-spacing:.04em}.fund-history-list strong,.fund-history-list span{display:block}.fund-history-list strong{font-size:14px}.fund-history-list span{margin-top:3px;color:#9eafbe;font-size:12px}.fund-history-list b{font-size:14px;font-variant-numeric:tabular-nums}.fund-history-list .is-loss{color:#ffaaa6}.fund-history-list .is-gain{color:#8ce5bd}
@keyframes fund-modal-in{from{opacity:0}to{opacity:1}}@keyframes fund-modal-rise{from{transform:translateY(16px) scale(.98);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
@keyframes fund-spin{to{transform:rotate(360deg)}}
@keyframes fund-aurora{0%{transform:translate3d(-2%,6%,0) scale(1.02);opacity:.62}50%{transform:translate3d(2%,-2%,0) scale(1.08);opacity:.9}100%{transform:translate3d(4%,4%,0) scale(1.03);opacity:.72}}
@media(max-width:1000px){.fund-metrics dd{font-size:22px}.fund-metrics>div{padding:0 15px}.fund-bottom{flex-wrap:wrap}.fund-source{text-align:left}}
@media(max-width:650px){.fund-tracker{padding:20px;margin-top:18px}.fund-heading{gap:8px;align-items:flex-start;flex-wrap:wrap}.fund-heading>div{flex-basis:100%}.fund-heading h3{font-size:19px;max-width:240px}.fund-refresh,.fund-history-trigger{font-size:11px;padding:7px 8px}.fund-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:19px 0;margin-top:21px}.fund-metrics>div{padding:0 0 0 15px}.fund-metrics>div:nth-child(odd){padding-left:0;border-left:0}.fund-metrics dd{font-size:24px}.fund-note,.fund-source{font-size:11px}.fund-bottom{gap:6px}.fund-source{flex-shrink:1}.fund-modal{padding:25px 18px 18px;border-radius:17px}.fund-modal-heading h3{font-size:25px}.fund-performance-summary{align-items:flex-start;flex-direction:column}.fund-history-list li{grid-template-columns:1fr auto;gap:7px 12px}.fund-history-list time{grid-column:1/-1}.fund-history-list b{align-self:center}}
@media(max-width:650px){.fund-heading h3 span{display:block}.fund-metrics dd{white-space:normal;overflow-wrap:anywhere}}
@media(max-width:400px){.fund-metrics dd{font-size:21px}.fund-metrics>div{padding-left:12px}}
@media(prefers-reduced-motion:reduce){.is-refreshing,.fund-tracker::before{animation:none}}
</style>
