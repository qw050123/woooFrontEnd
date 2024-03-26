// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/woooIcon.png'
        }
      ]
    }
  },
  modules: ['@vueuse/nuxt', '@pinia/nuxt'],
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '@/assets/style/_style.scss'],
  build: {
    transpile: ['vuetify']
  }
});
