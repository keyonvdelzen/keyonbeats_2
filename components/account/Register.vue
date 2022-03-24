<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6-tablet is-5-desktop is-4-widescreen">
        <div class="box">
          <h1 class="title is-5">Let's create your account! 😎</h1>
          <form @submit.prevent="register">
            <div class="field">
              <label class="label">
                <span>First name</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-left has-icons-right">
                <input :value="firstName" placeholder="Emily" class="input" />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user" />
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">
                <span>Last name</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-left has-icons-right">
                <input :value="lastName" placeholder="Smith" class="input" />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user" />
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">
                <span>Email</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-left has-icons-right">
                <input
                  :value="email"
                  placeholder="emily@example.com"
                  class="input"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope" />
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">
                <span>Password</span>
                <span class="has-text-danger"> *</span>
              </label>
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
            <div class="field mt-4">
              <button
                v-if="screenWidth > 768"
                class="button desktop is-primary has-text-white mb-3"
                :class="{
                  'is-loading': isSaving,
                  'is-enabled': !registerButtonDisabled,
                }"
                :disabled="registerButtonDisabled"
                @click="register()"
              >
                <font-awesome-icon
                  v-if="registerButtonDisabled"
                  class="mr-2"
                  icon="lock"
                />
                <span>Create Account</span>
                <font-awesome-icon
                  v-if="!registerButtonDisabled"
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
                    'is-enabled': !registerButtonDisabled,
                  }"
                  :disabled="registerButtonDisabled"
                  @click="register()"
                >
                  <span>
                    <font-awesome-icon
                      v-if="registerButtonDisabled"
                      class="mr-2"
                      icon="lock"
                    />
                    <span>Create Account</span>
                    <font-awesome-icon
                      v-if="!registerButtonDisabled"
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
                    'is-enabled': !registerButtonDisabled,
                  }"
                  :disabled="registerButtonDisabled"
                  @click="register()"
                >
                  <span>
                    <font-awesome-icon
                      v-if="registerButtonDisabled"
                      class="mr-2"
                      icon="lock"
                    />
                    <span>Create Account</span>
                    <font-awesome-icon
                      v-if="!registerButtonDisabled"
                      class="ml-2"
                      icon="arrow-right"
                    />
                  </span>
                </button>
              </div>
            </div>
          </form>
          <div>
            <p>
              By signing up, you agree to our
              <b class="is-clickable has-text-purple">Terms of Use</b>
              and
              <b class="is-clickable has-text-purple">Privacy Policy</b>.
            </p>
            <div class="is-divider"></div>
            <span
              >Already have an account?
              <NuxtLink
                to="/account/login"
                class="has-text-purple has-text-bold"
                >Log in</NuxtLink
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
  props: {
    preSelectedFirstName: {
      Type: String,
      Default: '',
    },
    preSelectedEmail: {
      Type: String,
      Default: '',
    },
  },
  data() {
    return {
      isSaving: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // termsAndConditions: false,
      afterSubmitEmailError: '',
    }
  },
  computed: {
    ...mapGetters({
      accountData: 'account/getAccountData',
      audioPlayerVisible: 'userInterface/getAudioPlayerVisible',
      screenWidth: 'userInterface/getScreenWidth',
    }),
    registerButtonDisabled() {
      return true
    },
  },
  created() {
    if (this.preSelectedFirstName !== '') {
      this.firstName = this.preSelectedFirstName
    }
    if (this.preSelectedEmail !== '') {
      this.email = this.preSelectedEmail
    }
  },
  methods: {
    resetAfterSubmitEmailError() {
      this.afterSubmitEmailError = ''
    },

    async register() {
      if (!this.isSaving) {
        this.isSaving = true
      } else {
        await accountProvider.methods
          .registerAccount({
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            password: this.password,
          })
          .then((response) => {
            if (response.data === 'Successfully Registered') {
              // log user in
              this.login()
            }
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
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.password = ''
                this.$v.$reset()
              } else {
                // if other 403 error
                this.$router.push({ path: '/oops' })
              }
            } else if (error.response.status === 401) {
              // 401 = unauthorized (email already taken)
              if (error.response.data.startsWith('Email Taken')) {
                if (error.response.data.charAt(13) > 0) {
                  // if user has tries left
                  // set error
                  if (error.response.data.charAt(13) > 1) {
                    this.afterSubmitEmailError = `The email you entered is already taken, ${error.response.data.charAt(
                      13
                    )} tries left`
                  } else {
                    this.afterSubmitEmailError = `The email you entered is already taken, 1 try left`
                  }
                  // reset email input field
                  this.email = ''
                } else {
                  // if user has no tries left
                  // set error
                  this.afterSubmitEmailError = `The email you entered is already taken, no tries left`
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
              }
            } else if (
              error.response.status === 503 &&
              error.response.data === 'Too Many Mail Requests'
            ) {
              this.$nuxt.$emit('show-notification', {
                cardColor: 'danger',
                text: `Oops, looks like you've made too many requests 😭\n Please try again in a couple of minutes.`,
                onCardClick: 'closeNotificationManually',
                notificationTypeId: 0,
                duration: -1,
              })
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
    async login() {
      await accountProvider.methods
        .loginAccount({
          email: this.email,
          password: this.password,
          rememberMe: true,
        })
        .then((response) => {
          // if success (if api call returns an object), log in
          if (typeof response.data === 'object' && response.data !== null) {
            // reset accountStore (just in case)
            this.$store.commit('account/setAccountState', null)

            // set accountdata in accountStore
            this.$store.commit('account/setAccountState', response.data)

            // redirect to account-verify
            setTimeout(() => {
              this.$router.push({
                path: `/account/verify`,
              })
            }, 10)
          }
          this.isSaving = false
        })
      // TODO: catch error just in case
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
