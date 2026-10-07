import { readYahooOAuthConfig, yahooBasicAuth, yahooTokenUrl, type YahooTokenResponse } from '../../../utils/yahoo-oauth'

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const code = typeof query.code === 'string' ? query.code : ''
  const state = typeof query.state === 'string' ? query.state : ''
  const savedState = getCookie(event, 'yahoo_oauth_state') || ''

  if (!code || !state || !savedState || state !== savedState) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Yahoo OAuth callback state',
    })
  }

  const config = readYahooOAuthConfig(event)
  const token = await $fetch<YahooTokenResponse>(yahooTokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${yahooBasicAuth(config)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUri,
      code,
    }).toString(),
  })

  if (!token.refresh_token) {
    throw createError({
      statusCode: 502,
      statusMessage: token.error_description || token.error || 'Yahoo did not return a refresh token',
    })
  }

  deleteCookie(event, 'yahoo_oauth_state', { path: '/' })
  setHeader(event, 'Content-Type', 'text/html; charset=utf-8')

  const refreshToken = escapeHtml(token.refresh_token)
  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Yahoo OAuth Refresh Token</title>
    <style>
      body{margin:0;background:#0b1422;color:#f7f1df;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Noto Sans TC",sans-serif}
      main{max-width:860px;margin:0 auto;padding:54px 22px}
      h1{margin:0 0 14px;font-size:clamp(2rem,5vw,3.3rem)}
      p{line-height:1.75;color:#cbd6e6}
      pre{overflow:auto;padding:18px;border:1px solid rgba(240,184,73,.35);background:#101d31;color:#ffd36d;border-radius:12px}
      code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}
    </style>
  </head>
  <body>
    <main>
      <h1>Yahoo 授權成功</h1>
      <p>請把下面這行加入 Netlify Environment Variables，key 是 <code>YAHOO_REFRESH_TOKEN</code>。這是私密憑證，不要貼到 GitHub。</p>
      <pre><code>YAHOO_REFRESH_TOKEN=${refreshToken}</code></pre>
    </main>
  </body>
</html>`
})
