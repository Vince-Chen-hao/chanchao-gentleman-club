export type FundQuote = {
  symbol: '0050'
  name: string
  price: number | null
  quoteDate: string | null
  quoteTime: string | null
  kind: 'trade' | 'close' | 'unavailable'
  sourceUrl: string
  fetchedAt: string
  stale: boolean
}

// Actual 0050 position.
// User-provided order confirmations:
// - 2026-10-06: 207 shares at NT$115.95, estimated amount NT$24,001.65.
// - 2026-10-14: 36 shares at NT$113.45, cost NT$4,086 from two new members' contribution.
export const fundPlan = {
  plannedPrincipal: 28087.65,
  adminReserve: 0,
  baselineDate: '2026-10-06',
  baselinePrice: 115.95,
  purchasedAt: '2026-10-14',
  shares: 243,
  cost: 28087.65,
  baselineSource: 'user-provided-order-confirmations',
  purchases: [
    { date: '2026-10-06', shares: 207, price: 115.95, cost: 24001.65, note: '首筆買進' },
    { date: '2026-10-14', shares: 36, price: 113.45, cost: 4086, note: '兩位新成員加碼' },
  ],
} as const

const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

function numeric(value: unknown): number | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null
  const text = String(value).replace(/,/g, '').trim()
  if (!/^\d+(\.\d+)?$/.test(text)) return null
  const number = Number(text)
  return Number.isFinite(number) && number > 0 ? number : null
}

function dateString(value: unknown): string | null {
  const text = String(value ?? '').trim()
  let year: number, month: number, day: number
  if (/^\d{8}$/.test(text)) {
    year = Number(text.slice(0, 4)); month = Number(text.slice(4, 6)); day = Number(text.slice(6, 8))
  } else {
    const match = text.match(/^(\d{2,3})[\/-](\d{2})[\/-](\d{2})$/)
    if (!match) return null
    year = Number(match[1]) + 1911; month = Number(match[2]); day = Number(match[3])
  }
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function parseMisQuote(payload: unknown, fetchedAt: string, sourceUrl: string): FundQuote | null {
  const data = payload as { msgArray?: Array<Record<string, unknown>> }
  const item = Array.isArray(data?.msgArray) ? data.msgArray.find(row => row?.c === '0050' && row.ex === 'tse') : null
  if (!item) return null
  const trade = item.trade as Record<string, unknown> | undefined
  // Never substitute bids, asks or the prior close for an actual latest trade.
  const price = numeric(item.z) ?? numeric(trade?.z)
  const quoteDate = dateString(item.d)
  const rawTime = typeof trade?.t === 'string' ? trade.t : item.t
  const quoteTime = typeof rawTime === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(rawTime) ? rawTime : null
  if (!price || !quoteDate || !quoteTime) return null
  return { symbol: '0050', name: '元大台灣50', price, quoteDate, quoteTime,
    kind: quoteTime >= '13:30:00' ? 'close' : 'trade', sourceUrl, fetchedAt, stale: false }
}

export function parseDailyQuote(payload: unknown, fetchedAt: string, sourceUrl: string): FundQuote | null {
  const data = payload as { stat?: string; title?: string; fields?: string[]; data?: unknown[][] }
  if (data?.stat !== 'OK' || !data.title?.includes('0050') || !Array.isArray(data.data)) return null
  const dateColumn = data.fields?.indexOf('日期') ?? -1
  const closeColumn = data.fields?.indexOf('收盤價') ?? -1
  if (dateColumn < 0 || closeColumn < 0) return null
  const rows = data.data.flatMap(row => {
    if (!Array.isArray(row)) return []
    const quoteDate = dateString(row[dateColumn]), price = numeric(row[closeColumn])
    return quoteDate && price ? [{ quoteDate, price }] : []
  }).sort((a, b) => b.quoteDate.localeCompare(a.quoteDate))
  const latest = rows[0]
  if (!latest) return null
  return { symbol: '0050', name: '元大台灣50', ...latest, quoteTime: '13:30:00',
    kind: 'close', sourceUrl, fetchedAt, stale: false }
}

export function canReplaceQuote(quote: FundQuote, previous: FundQuote | null): boolean {
  if (!quote.quoteDate || quote.quoteDate < fundPlan.baselineDate || quote.price === null) return false
  if (!previous?.quoteDate || previous.price === null) return true
  const stamp = `${quote.quoteDate}T${quote.quoteTime ?? '00:00:00'}`
  const previousStamp = `${previous.quoteDate}T${previous.quoteTime ?? '00:00:00'}`
  return stamp >= previousStamp
}

export function calculateFund(quote: FundQuote) {
  const investmentBudget = money(fundPlan.plannedPrincipal - fundPlan.adminReserve)
  const shares = fundPlan.shares
  const cost = money(fundPlan.cost)
  const cashBalance = 0
  const averagePrice = money(cost / shares)
  const purchaseSummary = '2026-10-06 首筆買進 207 股 × NT$115.95；2026-10-14 兩位新成員加碼 36 股 × NT$113.45，買進成本 NT$4,086'
  const validPrice = typeof quote.price === 'number' && Number.isFinite(quote.price) && quote.price > 0
    && quote.quoteDate !== null && quote.quoteDate >= fundPlan.baselineDate
  const marketValue = validPrice ? money(shares * quote.price!) : null
  const totalValue = marketValue === null ? null : marketValue
  const unrealizedPnl = marketValue === null ? null : money(marketValue - cost)
  const returnPct = unrealizedPnl === null ? null : money(unrealizedPnl / cost * 100)
  return {
    quote,
    position: { ...fundPlan, investmentBudget, shares, cost, cashBalance, averagePrice, purchaseSummary, mode: 'actual' as const },
    metrics: { marketValue, totalValue, unrealizedPnl, returnPct },
    status: validPrice ? 'ready' as const : 'pending' as const,
  }
}
