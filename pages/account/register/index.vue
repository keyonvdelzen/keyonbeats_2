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
            <Register />
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
import Register from '~/components/account/Register.vue'
import PageLoader from '~/components/UI/loading/PageLoader.vue'

export default {
  components: {
    Register,
    PageLoader,
  },
  middleware({ store, redirect }) {
    if (store.state.account.isLoggedIn && store.state.account.isVerified) {
      return redirect('/account/dashboard?showNotification=alreadyLoggedIn')
    } else if (
      store.state.account.isLoggedIn &&
      !store.state.account.isVerified
    ) {
      return redirect('/account/verify?showNotification=alreadyLoggedIn')
    }
  },
  data() {
    return {
      heroHeight: -9999, // initialize at large negative value to prevent content shift
    }
  },
  head() {
    return {
      title: 'Create an Account',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Create a Keyon Beats account. Get instant access to free beats, easily manage your purchased beats and become part of the family!',
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
      if (this.$route.query.showNotification === 'passwordResetError') {
        this.$nuxt.$emit('show-notification', {
          cardColor: 'danger',
          text: `Email is unknown, your password could not be reset.\nIf you'd like to, you can create an account right here.`,
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
