/* eslint-disable valid-typeof */
<template>
  <div
    class="has-text-centered"
    :class="{
      'page-content-default': !isFullPage,
      'page-content-full': isFullPage,
    }"
  >
    <div class="columns is-vcentered is-mobile is-fullheight">
      <div class="column">
        <!-- Error Title/Message -->
        <div class="block">
          <h1 class="title is-size-2-desktop is-size-3-tablet is-size-5-mobile">
            {{ errorTitle }}
          </h1>
          <p
            class="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile mb-3"
          >
            {{ errorMessage }}
          </p>
        </div>
        <div class="buttons is-centered">
          <!-- Back Button -->
          <button
            v-if="showBackButton && previousRouteExists"
            class="button"
            :class="{
              'is-large': screenWidth > 1023,
              'is-small': screenWidth < 380,
            }"
            @click="goToPreviousPage"
          >
            <span class="icon">
              <font-awesome-icon icon="arrow-left" />
            </span>
            <span>Back</span>
          </button>
          <!-- Contact Support Button -->
          <button
            v-if="showContactSupportButton"
            class="button is-primary has-text-white has-icon-right"
            :class="{
              'is-large': screenWidth > 1023,
              'is-small': screenWidth < 380,
            }"
          >
            <span>Contact Support</span>
            <span class="icon">
              <!-- <font-awesome-icon icon="ambulance" /> -->
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    errorTitle: {
      type: String,
      default: 'Oops... 😭',
    },
    errorMessage: {
      type: String,
      default:
        'Something unexpected happened,<br>please try again or contact support if the issue persists.',
    },
    isFullPage: {
      type: Boolean,
      default: true,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    showContactSupportButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
    }),
    previousRouteExists() {
      let val

      if (
        typeof this.$nuxt.context.from === 'undefined' ||
        // eslint-disable-next-line valid-typeof
        typeof this.$nuxt.context.from === null
      ) {
        val = false
      } else {
        val = true
      }

      return val
    },
  },
  methods: {
    goToPreviousPage() {
      this.$router.push(this.$nuxt.context.from.path)
    },
  },
}
</script>
