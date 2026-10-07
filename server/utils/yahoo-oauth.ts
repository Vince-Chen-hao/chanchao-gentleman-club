export type YahooOAuthConfig = {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export type YahooTokenResponse = {
  access_token?: string
  refresh_token?: string
  token_type?: string
  expires_in?: number
  error?: string
  error_description?: string
}

export const yahooTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token'
export const yahooAuthorizeUrl = 'https://api.login.yahoo.com/oauth2/request_auth'

export const readYahooOAuthConfig = (event?: any): YahooOAuthConfig => {
  const host = event ? getRequestURL(event).origin : 'https://chanchao-gentleman-club.netlify.app'
  return {
    clientId: process.env.YAHOO_CLIENT_ID || '',
    clientSecret: process.env.YAHOO_CLIENT_SECRET || '',
    redirectUri: process.env.YAHOO_REDIRECT_URI || `${host}/api/yahoo/oauth/callback`,
  }
}

export const yahooBasicAuth = (config: YahooOAuthConfig) => {
  return Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')
}
