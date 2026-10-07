import { yahooAuthorizeUrl, readYahooOAuthConfig } from '../../../utils/yahoo-oauth'

export default defineEventHandler(event => {
  const config = readYahooOAuthConfig(event)

  if (!config.clientId || !config.clientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing YAHOO_CLIENT_ID or YAHOO_CLIENT_SECRET',
    })
  }

  const state = Math.random().toString(36).slice(2)
  setCookie(event, 'yahoo_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.redirectUri.startsWith('https://'),
    path: '/',
    maxAge: 60 * 10,
  })

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: 'fspt-r',
    state,
  })

  return sendRedirect(event, `${yahooAuthorizeUrl}?${params.toString()}`)
})
