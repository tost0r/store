// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
      '@pinia/nuxt',
      '@nuxt/fonts'
  ],
  plugins: [
      '~/plugins/axios',
  ],
  srcDir: 'src/',
  css: ['~/assets/style/main.scss'],
})
