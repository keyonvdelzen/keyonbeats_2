<template>
  <div class="app">
    <client-only>
      <NotificationHub />
      <CheckoutModal
        :show-modal="showCheckoutModal"
        @close-modal="setCloseCheckoutModal"
      />
      <SelectLicenseModal
        :show-modal="showSelectLicenseModal"
        :selected-product-id="selectedProduct.id"
        @close-modal="setCloseSelectLicenseModal"
      />
      <FreeDownloadModal
        :show-modal="showFreeDownloadModal"
        :selected-product="selectedProduct"
        @close-modal="setCloseFreeDownloadModal()"
      />
      <AudioPlayer />
    </client-only>

    <SiteHeader />
    <transition name="fade-page" mode="out-in">
      <!-- v-show="false" if modal or menu is visible to prevent ugly overscrolling on mobile devices -->
      <Nuxt
        v-show="
          (!checkoutModalVisible &&
            !selectLicenseModalVisible &&
            !mobileMenuVisible &&
            !freeDownloadModalVisible &&
            screenWidth < 1024) ||
          screenWidth > 1023
        "
        keep-alive
        class="site-content-container"
        :class="{
          'push-view-up-for-audioplayer': audioPlayerVisible,
        }"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import SiteHeader from '~/components/UI/sitemenu/SiteHeader.vue'
import NotificationHub from '~/components/UI/notifications/NotificationHub.vue'
import CheckoutModal from '~/components/checkout/CheckoutModal.vue'
import SelectLicenseModal from '~/components/license/SelectLicenseModal.vue'
import FreeDownloadModal from '~/components/FreeDownloadModal.vue'
import AudioPlayer from '~/components/UI/AudioPlayer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    SiteHeader,
    NotificationHub,
    CheckoutModal,
    SelectLicenseModal,
    FreeDownloadModal,
    AudioPlayer,
  },
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  data() {
    return {
      currentScrollPosition: 0,
      previousScrollPosition: 0,
      showCheckoutModal: false,
      showSelectLicenseModal: false,
      showFreeDownloadModal: false,
      selectedProduct: {},
    }
  },
  // Set screen width for responsive SSR
  async fetch() {
    await this.setScreenWidthInStore()
  },
  head() {
    return {
      titleTemplate: '%s | Keyon Beats',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Beats by Keyon',
        },
        // TODO: Remove noindex when webshop goes live
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      audioPlayerVisible: 'userInterface/getAudioPlayerVisible',
      checkoutModalVisible: 'userInterface/getCheckoutModalVisible',
      selectLicenseModalVisible: 'userInterface/getSelectLicenseModalVisible',
      mobileMenuVisible: 'userInterface/getMobileMenuVisible',
      freeDownloadModalVisible: 'userInterface/getFreeDownloadModalVisible',
      products: 'product/getAllProducts',
    }),
  },

  mounted() {
    // Set screen dimensions in userInterface store
    this.setScreenWidthInStore()
    this.setScreenHeightInStore()

    // Update screen dimensions on screen resize
    window.addEventListener('resize', this.setScreenWidthInStore)
    window.addEventListener('resize', this.setScreenHeightInStore)

    // Add scroll listener, for scrolling back to original position on closing modals
    window.addEventListener('scroll', this.updateCurrentScroll)

    /*  */
    /* Layout-scoped nuxt emit listeners */
    /*  */

    this.$nuxt.$on('open-checkout-modal', () => {
      this.setShowCheckoutModal()
    })
    this.$nuxt.$once('open-checkout-modal-after-add-to-cart', () => {
      this.setShowCheckoutModal()
    })
    this.$nuxt.$on('open-checkout-modal-on-click-notification', () => {
      this.setShowCheckoutModal()
    })
    this.$nuxt.$on(
      'open-checkout-modal-if-shopping-cart-in-local-storage',
      () => {
        this.setShowCheckoutModal()
      }
    )
    this.$nuxt.$on('open-select-license-modal', (product) => {
      this.setShowSelectLicenseModal(product)
    })
    this.$nuxt.$on('show-free-download-modal', (product) => {
      this.setShowFreeDownloadModal(product)
    })
    this.$nuxt.$on('close-free-download-modal', () => {
      this.setCloseFreeDownloadModal()
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.setScreenWidthInStore)
    window.removeEventListener('resize', this.setScreenHeightInStore)
    window.removeEventListener('scroll', this.updateCurrentScroll)
  },
  methods: {
    setScreenWidthInStore() {
      // Responsive SSR using user agent sniffing
      if (process.server) {
        if (this.$ua.isFromPc() || this.$ua.isFromCrawler()) {
          this.$store.commit('userInterface/setScreenWidth', 1024)
        } else if (this.$ua.isFromTablet()) {
          this.$store.commit('userInterface/setScreenWidth', 1023)
        } else if (
          this.$ua.isFromSmartphone() ||
          this.$ua.isFromMobilephone()
        ) {
          this.$store.commit('userInterface/setScreenWidth', 768)
        }
      }
      // Switch to actual screen width on client render
      if (process.client) {
        this.$store.commit('userInterface/setScreenWidth', this.$vssWidth)
      }
    },
    setScreenHeightInStore() {
      const screenHeight = window.innerHeight
      this.$store.commit('userInterface/setScreenHeight', screenHeight)
    },
    setShowCheckoutModal() {
      this.setPreviousScroll()
      this.showCheckoutModal = true
      this.$store.commit('userInterface/setCheckoutModalVisibility', true)
    },
    setCloseCheckoutModal() {
      this.showCheckoutModal = false
      this.$store.commit('userInterface/setCheckoutModalVisibility', false)
      this.scrollBackToPreviousScrollPosition()
    },
    setShowSelectLicenseModal(product) {
      this.setPreviousScroll()
      this.showSelectLicenseModal = true
      this.selectedProduct = product
      this.$store.commit('userInterface/setSelectLicenseModalVisibility', true)
    },
    setCloseSelectLicenseModal() {
      this.showSelectLicenseModal = false
      this.$store.commit('userInterface/setSelectLicenseModalVisibility', false)
      this.scrollBackToPreviousScrollPosition()
    },
    setShowFreeDownloadModal(product) {
      this.setPreviousScroll()
      this.$store.commit('userInterface/setFreeDownloadModalVisibility', true)
      this.showFreeDownloadModal = true
      this.selectedProduct = product
    },
    setCloseFreeDownloadModal() {
      this.$store.commit('userInterface/setFreeDownloadModalVisibility', false)
      this.showFreeDownloadModal = false
      this.scrollBackToPreviousScrollPosition()
    },
    setPreviousScroll() {
      // remember scroll position (because <router-view> gets tagged with .css display:none; when modals are open to prevent ugly overscroll on touch devices)
      this.previousScrollPosition = this.currentScrollPosition
    },
    scrollBackToPreviousScrollPosition() {
      // Scroll back to previous scroll position (because <Nuxt> gets tagged with .css 'display:none;' when modals are open to prevent ugly overscroll on touch devices)
      // TODO: Might set some exceptions here later, like after a user has added a product to the shopping cart. Scroll back might be unnecessary, unwanted and/or distracting for the user in that case.
      setTimeout(() => {
        window.scrollTo({
          top: this.previousScrollPosition,
          left: 0,
        })
      }, 10)
    },
    updateCurrentScroll() {
      this.currentScrollPosition = window.scrollY
    },
  },
}
</script>

<style lang="scss" scoped>
.app {
  background-color: #f9f9f9;
}

// Site content container desktop and tablet
@media only screen and (min-width: 768px) {
  .site-content-container {
    margin-top: var(--site-header-height-desktop);
  }
}

// Site content container mobile
@media only screen and (max-width: 768px) {
  .site-content-container {
    margin-top: var(--site-header-height-mobile);
  }
}
</style>
