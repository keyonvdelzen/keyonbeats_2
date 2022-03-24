<template>
  <div>
    <div v-if="!isLoggedIn">
      <section
        ref="hero"
        class="hero is-primary is-fullheight"
        :class="{
          'if-audio-player-visible': audioPlayerVisible,
        }"
      >
        <div
          class="hero-body"
          :class="{
            'extra-margin-bottom':
              (heroHeight > screenHeight - siteHeaderHeightMobile - 30 &&
                !audioPlayerVisible) ||
              (heroHeight >
                screenHeight -
                  siteHeaderHeightMobile -
                  audioPlayerHeight -
                  30 &&
                audioPlayerVisible),
          }"
        >
          <div class="container">
            <Login />
          </div>
        </div>
      </section>
    </div>
    <transition name="fade-slow" mode="out-in">
      <PageLoader v-if="isLoggedIn" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '~/components/account/Login.vue'
import PageLoader from '~/components/UI/loading/PageLoader.vue'

export default {
  components: {
    Login,
    PageLoader,
  },
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.account.isLoggedIn && store.state.account.isVerified) {
      return redirect('/account/dashboard')
    } else if (
      store.state.account.isLoggedIn &&
      !store.state.account.isVerified
    ) {
      return redirect('/account/verify')
    }
  },
  data() {
    return {
      heroHeight: -9999, // initialize at large negative value to prevent content shift
    }
  },
  head() {
    return {
      title: 'Log In',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Log in to your Keyon Beats account.',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      screenHeight: 'userInterface/getScreenHeight',
      siteHeaderHeightMobile: 'userInterface/getSiteHeaderHeightMobile',
      audioPlayerHeight: 'userInterface/getAudioPlayerHeight',
      audioPlayerVisible: 'userInterface/getAudioPlayerVisible',
      isLoggedIn: 'account/getIsLoggedIn',
    }),
  },

  mounted() {
    this.setHeroHeight()

    setTimeout(() => {
      // handle route queries
      if (this.$route.query.showNotification === 'notLoggedIn') {
        this.$nuxt.$emit('show-notification', {
          cardColor: 'danger',
          text: `Sorry, you have to be logged in to view that page.\n Please log in or create an account.`,
          onCardClick: 'closeNotificationManually',
          notificationTypeId: 0,
          duration: -1,
        })
      } else if (this.$route.query.showNotification === 'sessionExpired') {
        this.$nuxt.$emit('show-notification', {
          cardColor: 'danger',
          text: `Sorry, your session has expired.\n Please log back in.`,
          onCardClick: 'closeNotificationManually',
          notificationTypeId: 0,
          duration: -1,
        })
      } else if (this.$route.query.showNotification === 'verificationError') {
        this.$nuxt.$emit('show-notification', {
          cardColor: 'danger',
          text: `Something went wrong, your account could not be verified.\nPlease try sending another verification mail or contact support.`,
          onCardClick: 'closeNotificationManually',
          notificationTypeId: 0,
          duration: -1,
        })
      } else if (
        this.$route.query.showNotification === 'passwordResetSuccessfully'
      ) {
        this.$nuxt.$emit('show-notification', {
          cardColor: 'success',
          text: `Your password has been reset successfully!\nYou can now proceed to log in.`,
          onCardClick: 'closeNotificationManually',
          notificationTypeId: 0,
          duration: -1,
        })
      }
    }, 0)
  },
  activated() {
    window.addEventListener('resize', this.setHeroHeight)
  },
  deactivated() {
    window.removeEventListener('resize', this.setHeroHeight)
  },
  methods: {
    setHeroHeight() {
      this.heroHeight = this.$refs.hero.clientHeight
    },
  },
}
</script>

<style lang="scss" scoped>
/* Hero custom styling */
@media only screen and (min-width: 769px) {
  .hero {
    min-height: calc(100vh - var(--site-header-height-desktop));
    &.if-audio-player-visible {
      min-height: calc(
        100vh - var(--site-header-height-desktop) - var(--audio-player-height)
      );
    }
    .container {
      .box {
        max-width: 350px;
        margin: auto;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .hero {
    min-height: calc(100vh - var(--site-header-height-mobile) - 60px);
    background-color: white;

    &.if-audio-player-visible {
      min-height: calc(
        100vh - var(--site-header-height-mobile) - var(--audio-player-height) -
          60px
      );
    }
    .hero-body {
      padding: 24px;

      &.extra-margin-bottom {
        margin-bottom: 60px;
      }
      .container {
        .box {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
