export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'keyonbeats_2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    '@/assets/styles/main.css',
    // SCSS file in the project
    '@/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/router-extras'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    'nuxt-user-agent',
    ['nuxt-fontawesome', {
          component: 'font-awesome-icon',
          imports: [
            {
              set: '@fortawesome/free-solid-svg-icons',
              icons: [
                'faShoppingCart', 
                'faCartPlus', 
                'faUser', 
                'faAngleDown', 
                'faAngleUp', 
                'faArrowRight',
                'faArrowLeft', 
                'faTimes', 
                'faPlay',
                'faPlayCircle',
                'faPauseCircle',
                'faPause', 
                'faHeart', 
                'faDownload', 
                'faPlus', 
                'faMinus', 
                'faEnvelope', 
                'faLock', 
                'faExclamationTriangle', 
                'faCheck', 
                'faInfinity', 
                'faInfoCircle', 
                'faTrashAlt', 
                'faStepBackward', 
                'faStepForward',
                'faCheckCircle',
                'faLongArrowAltDown',
                'faChartBar',
                'faCog',
                'faExternalLinkAlt',
                'faEdit',
                'faGlobe',
                'faSyncAlt',
                'faBoxOpen',
                'faHeadphones',
                'faAmbulance',
                'faKey'
              ]
            }
          ]
        }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  },
}
