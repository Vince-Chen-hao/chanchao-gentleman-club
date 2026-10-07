export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css', '~/assets/css/recap.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      title: 'Chanchao Gentleman Club',
      meta: [{ name: 'description', content: 'Chanchao Gentleman Club Fantasy NBA League' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/cgc-logo.svg?v=20261007-2' }],
    },
  },
  nitro: { preset: 'netlify' },
})
