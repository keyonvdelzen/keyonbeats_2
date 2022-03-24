export default {
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

  css: [
    'bulma',
    '@/assets/styles/main.css',
    '@/assets/styles/main.scss'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/router-extras'
  ],
  modules: [
    '@nuxtjs/axios',
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
  axios: {
    baseURL: '/',
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
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
