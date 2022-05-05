export default {
  components: true,
  head: {
    titleTemplate: 'Mastering Nuxt: %s',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: ['body-styles']
    },
    meta: [
      { charset: 'utf-8' }
    ]
  },
  router: {
    prefetchLinks: false
  },
  plugins: ['~/plugins/maps.client']
}