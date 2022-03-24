<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box">
          <h1 class="title is-5">Log in to your account</h1>
          <form action="" @submit.prevent="login">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  :value="email"
                  placeholder="Email address"
                  class="input"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope" />
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  :value="password"
                  type="password"
                  placeholder="***********"
                  class="input"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="lock" />
                </span>
              </div>
            </div>
            <div class="field">
              <input
                id="remembermeeee"
                v-model="rememberMe"
                class="is-checkradio is-primary"
                :class="{ 'has-background-color': rememberMe }"
                type="checkbox"
              />
              <label for="remembermeeee">Remember me</label>
            </div>
            <div class="field mt-4">
              <button
                v-if="screenWidth > 768"
                class="button desktop is-primary has-text-white mb-3"
                :class="{
                  'is-loading': isSaving,
                  'is-enabled': !loginButtonDisabled,
                }"
                :disabled="loginButtonDisabled"
                @click="login()"
              >
                <font-awesome-icon
                  v-if="loginButtonDisabled"
                  class="mr-2"
                  icon="lock"
                />
                <span>Log In</span>
                <font-awesome-icon
                  v-if="!loginButtonDisabled"
                  class="ml-2"
                  icon="arrow-right"
                />
              </button>

              <div
                v-if="screenWidth < 769"
                class="bottom-button-container-mobile"
              >
                <!-- fixed to bottom button -->
                <button
                  v-if="!audioPlayerVisible"
                  id="button-fixed"
                  class="button mobile is-large is-primary has-text-white"
                  :class="{
                    'is-loading': isSaving,
                    'is-enabled': !loginButtonDisabled,
                  }"
                  :disabled="loginButtonDisabled"
                  @click="login()"
                >
                  <span>
                    <font-awesome-icon
                      v-if="loginButtonDisabled"
                      class="mr-2"
                      icon="lock"
                    />
                    <span>Log In</span>
                    <font-awesome-icon
                      v-if="!loginButtonDisabled"
                      class="ml-2"
                      icon="arrow-right"
                    />
                  </span>
                </button>
                <!-- float buttons if audio player is visible -->
                <button
                  v-if="audioPlayerVisible"
                  id="button-float"
                  class="button mobile is-large is-primary has-text-white"
                  :class="{
                    'is-loading': isSaving,
                    'is-enabled': !loginButtonDisabled,
                  }"
                  :disabled="loginButtonDisabled"
                  @click="login()"
                >
                  <span>
                    <font-awesome-icon
                      v-if="loginButtonDisabled"
                      class="mr-2"
                      icon="lock"
                    />
                    <span>Log In</span>
                    <font-awesome-icon
                      v-if="!loginButtonDisabled"
                      class="ml-2"
                      icon="arrow-right"
                    />
                  </span>
                </button>
              </div>
            </div>
          </form>
          <div>
            <span
              >Don't have an account?
              <NuxtLink
                to="/account/register"
                class="has-text-purple has-text-bold"
                >Register</NuxtLink
              >
              here.</span
            >
            <div class="is-divider"></div>
            <span
              >Forgot your password?
              <NuxtLink
                to="/account/recover"
                class="has-text-purple has-text-bold"
                >Reset your password</NuxtLink
              >
              here.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import accountProvider from '~/providers/account.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: true,
      isSaving: false,
      afterSubmitEmailError: '',
      afterSubmitPasswordError: '',
    }
  },
  computed: {
    ...mapGetters({
      accountData: 'account/getAccountData',
      isLoggedIn: 'account/getIsLoggedIn',
      audioPlayerVisible: 'userInterface/getAudioPlayerVisible',
      screenWidth: 'userInterface/getScreenWidth',
    }),

    loginButtonDisabled() {
      return true
    },
  },
  methods: {
    resetAfterSubmitEmailError() {
      this.afterSubmitEmailError = ''
    },

    resetAfterSubmitPasswordError() {
      this.afterSubmitPasswordError = ''
    },

    async login() {
      if (!this.isSaving) {
        this.isSaving = true
      } else {
        await accountProvider.methods
          .loginAccount({
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe,
          })

          .then((response) => {
            // if success (if api call returns an object), log in
            if (typeof response.data === 'object' && response.data !== null) {
              // reset accountStore (just in case)
              this.$store.commit('account/setAccountState', null)

              // set accountdata in accountStore
              this.$store.commit('account/setAccountState', response.data)

              // redirect
              setTimeout(() => {
                if (response.data.is_verified === 1) {
                  this.$router.push({
                    name: `account-dashboard`,
                  })
                } else if (response.data.is_verified === 0) {
                  this.$router.push({
                    name: `account-verify`,
                  })
                }
              }, 10)
            }
            this.isSaving = false
          })
          .catch((error) => {
            if (error.response.status === 403) {
              if (error.response.data === 'Access Blocked Temporarily') {
                // if access has been temporarily blocked
                this.$nuxt.$emit('show-notification', {
                  cardColor: 'danger',
                  text: `Your access has been blocked temporarily.\n Please try again in a couple of minutes.`,
                  onCardClick: 'closeNotificationManually',
                  notificationTypeId: 0,
                  duration: -1,
                })
                this.email = ''
                this.password = ''
                this.$v.$reset()
              } else {
                // if other 403 error
                this.$router.push({ path: 'oops' })
              }
            } else if (error.response.status === 401) {
              // 401 = unauthorized (email unknown or password incorrect)
              if (error.response.data.startsWith('Email Unknown')) {
                if (error.response.data.charAt(15) > 0) {
                  // if user has tries left
                  // set error
                  if (error.response.data.charAt(15) > 1) {
                    this.afterSubmitEmailError = `The email you entered is unknown, ${error.response.data.charAt(
                      15
                    )} tries left`
                  } else {
                    this.afterSubmitEmailError = `The email you entered is unknown, 1 try left`
                  }
                  // reset email input field
                  this.email = ''
                } else {
                  // if user has no tries left
                  // set error
                  this.afterSubmitEmailError = `The email you entered is unknown, no tries left`
                  // reset email input field
                  this.email = ''
                  this.$nuxt.$emit('show-notification', {
                    cardColor: 'danger',
                    text: `Oops, we've reached a limit 😭\n Please try again in a couple of minutes.`,
                    onCardClick: 'closeNotificationManually',
                    notificationTypeId: 0,
                    duration: -1,
                  })
                }
              } else if (error.response.data.startsWith('Password Incorrect')) {
                if (error.response.data.charAt(20) > 0) {
                  // if user has tries left
                  // set error
                  if (error.response.data.charAt(20) > 1) {
                    this.afterSubmitPasswordError = `The password you entered is incorrect, ${error.response.data.charAt(
                      20
                    )} tries left`
                  } else {
                    this.afterSubmitPasswordError = `The password you entered is incorrect, 1 try left`
                  }
                  // reset password input field
                  this.password = ''
                } else {
                  // if user has no tries left
                  // set error
                  this.afterSubmitPasswordError = `The password you entered is incorrect, no tries left`
                  // reset password input field
                  this.password = ''
                  this.$nuxt.$emit('show-notification', {
                    cardColor: 'danger',
                    text: `Oops, we've reached a limit 😭\n Please try again in a couple of minutes.`,
                    onCardClick: 'closeNotificationManually',
                    notificationTypeId: 0,
                    duration: -1,
                  })
                }
              }
            } else {
              this.$nuxt.$emit('show-notification', {
                cardColor: 'danger',
                text: `Oops, something unexpected happened 🤔\n Please try again or contact support if the issue persists.`,
                onCardClick: 'closeNotificationManually',
                notificationTypeId: 0,
                duration: -1,
              })
            }
            // re-enable login button
            this.isSaving = false
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* Hero styling */
@media only screen and (max-width: 768px) {
  .box {
    box-shadow: none;
  }
}
</style>
