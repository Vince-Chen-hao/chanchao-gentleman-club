type YahooTokenResponse = {
  access_token?: string
  token_type?: string
  expires_in?: number
  error?: string
  error_description?: string
}

type YahooPlayerRanking = {
  rank: number
  playerKey: string
  playerId: string
  name: string
  team: string
  positions: string[]
  percentOwned: number | null
}

const apiBase = 'https://fantasysports.yahooapis.com/fantasy/v2'
const tokenUrl = 'https://api.login.yahoo.com/oauth2/get_token'

const readYahooConfig = () => ({
  clientId: process.env.YAHOO_CLIENT_ID || '',
  clientSecret: process.env.YAHOO_CLIENT_SECRET || '',
  refreshToken: process.env.YAHOO_REFRESH_TOKEN || '',
  leagueKey: process.env.YAHOO_LEAGUE_KEY || '',
})

const getAccessToken = async () => {
  const config = readYahooConfig()
  if (!config.clientId || !config.clientSecret || !config.refreshToken) {
    return { token: '', reason: 'missing_oauth_config' as const }
  }

  const basic = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')
  const response = await $fetch<YahooTokenResponse>(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: config.refreshToken,
    }).toString(),
  })

  if (!response.access_token) {
    throw createError({
      statusCode: 502,
      statusMessage: response.error_description || response.error || 'Yahoo token refresh failed',
    })
  }

  return { token: response.access_token, reason: '' as const }
}

const asArray = <T>(value: T | T[] | undefined | null): T[] => Array.isArray(value) ? value : value == null ? [] : [value]

const readObjectValue = (value: unknown, key: string): unknown => {
  if (!Array.isArray(value)) return undefined
  for (const item of value) {
    if (item && typeof item === 'object' && key in item) return (item as Record<string, unknown>)[key]
  }
  return undefined
}

const playerName = (player: unknown) => {
  const name = readObjectValue(player, 'name')
  if (!Array.isArray(name)) return 'Unknown Player'
  const full = readObjectValue(name, 'full')
  return typeof full === 'string' ? full : 'Unknown Player'
}

const playerMeta = (player: unknown, key: string) => {
  const value = readObjectValue(player, key)
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

const playerPositions = (player: unknown) => {
  const eligible = readObjectValue(player, 'eligible_positions')
  const positions = readObjectValue(eligible, 'position')
  return asArray(positions).filter((position): position is string => typeof position === 'string')
}

const percentOwned = (player: unknown) => {
  const ownership = readObjectValue(player, 'percent_owned')
  const value = readObjectValue(ownership, 'value')
  const parsed = typeof value === 'string' || typeof value === 'number' ? Number(value) : NaN
  return Number.isFinite(parsed) ? parsed : null
}

const findLeagueKey = (value: unknown): string => {
  if (typeof value === 'string' && /^\d+\.l\.16495$/.test(value)) return value
  if (!value || typeof value !== 'object') return ''
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findLeagueKey(item)
      if (found) return found
    }
    return ''
  }
  for (const item of Object.values(value)) {
    const found = findLeagueKey(item)
    if (found) return found
  }
  return ''
}

const resolveLeagueKey = async (token: string, configuredLeagueKey: string) => {
  if (configuredLeagueKey) return configuredLeagueKey
  const response = await $fetch<Record<string, any>>(`${apiBase}/users;use_login=1/games;game_keys=nba/leagues?format=json`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return findLeagueKey(response) || 'nba.l.16495'
}

export const fetchYahooRankings = defineCachedFunction(async (count = 50) => {
  const config = readYahooConfig()
  const auth = await getAccessToken()
  if (!auth.token) {
    return {
      status: 'needs_config' as const,
      leagueKey: config.leagueKey || 'auto',
      updatedAt: new Date().toISOString(),
      rows: [] as YahooPlayerRanking[],
    }
  }

  const leagueKey = await resolveLeagueKey(auth.token, config.leagueKey)
  const gameKey = leagueKey.split('.')[0] || 'nba'
  const url = `${apiBase}/game/${gameKey}/players;sort=OR;start=0;count=${Math.min(Math.max(count, 1), 100)}?format=json`
  const response = await $fetch<Record<string, any>>(url, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
  const rawPlayers = response?.fantasy_content?.game?.[1]?.players || {}
  const rows = Object.keys(rawPlayers)
    .filter(key => key !== 'count')
    .map((key, index) => {
      const player = rawPlayers[key]?.player
      return {
        rank: index + 1,
        playerKey: playerMeta(player, 'player_key'),
        playerId: playerMeta(player, 'player_id'),
        name: playerName(player),
        team: playerMeta(player, 'editorial_team_abbr'),
        positions: playerPositions(player),
        percentOwned: percentOwned(player),
      }
    })
    .filter(player => player.playerKey && player.name !== 'Unknown Player')

  return {
    status: 'ready' as const,
    leagueKey,
    gameKey,
    updatedAt: new Date().toISOString(),
    rows,
  }
}, { maxAge: 60 * 5, name: 'yahoo-rankings-v3' })
