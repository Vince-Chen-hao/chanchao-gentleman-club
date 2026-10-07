import { fetchYahooRankings } from '../utils/yahoo-rankings'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const count = Number(query.count || 50)
  return fetchYahooRankings(Number.isFinite(count) ? count : 50)
})
