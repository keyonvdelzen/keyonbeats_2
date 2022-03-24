<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="showModal" class="modal" :class="{ 'is-active': showModal }">
        <div
          v-if="screenWidth > 768"
          class="modal-background"
          @click="closeModal()"
        ></div>
        <div class="modal-card">
          <header v-if="screenWidth < 1024" class="modal-card-head">
            <p class="modal-card-title has-text-centered mb-0"></p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <progress
              class="progress is-primary is-large"
              value="1"
              max="2"
            ></progress>
            <p
              class="progress-bar-percentage title is-6 has-text-black has-text-centered"
            >
              50%
            </p>
            <h1 class="title is-4 has-text-centered almost-there-text mb-3">
              You're almost there!
            </h1>
            <p class="has-text-centered mb-5">
              Where should we send this free download?
            </p>
            <div class="columns is-mobile is-vcentered mb-5">
              <div class="column is-5">
                <figure class="image is-square is-hcentered has-text-centered">
                  <img :src="selectedProduct.image" />
                </figure>
              </div>
              <div class="column is-7">
                <div class="field">
                  <div class="control">
                    <input
                      id="first-name-input"
                      v-model="firstName"
                      class="input is-primary"
                      type="text"
                      placeholder="First Name*"
                      @keyup.enter="blurInput('first-name-input')"
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      id="email-input"
                      v-model="email"
                      class="input is-primary"
                      type="text"
                      placeholder="Email*"
                      @keyup.enter="blurInput('email-input')"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-centered">
              <button
                class="button is-primary is-large has-text-white mb-5"
                :disabled="!firstName || !email"
                @click="submit()"
              >
                Send it to me!
              </button>
            </div>
            <p
              v-if="screenWidth > 1023"
              class="has-text-centered"
              style="font-size: 12px; text-decoration: underline"
            >
              <font-awesome-icon class="mr-1" icon="lock" />Your data is safe
              and you can unsubscribe at any time
            </p>
          </section>
          <footer v-if="screenWidth < 1024" class="modal-card-foot">
            <p
              class="has-text-centered"
              style="font-size: 12px; text-decoration: underline; margin: auto"
            >
              <font-awesome-icon class="mr-1" icon="lock" />Your data is safe
              and you can unsubscribe at any time
            </p>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedProduct: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      firstName: '',
      email: '',
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
    }),
  },
  methods: {
    submit() {
      // set details in freeDownloadStore
      this.$store.commit('freeDownload/setFirstName', this.firstName)
      this.$store.commit('freeDownload/setEmail', this.email)
      this.$store.commit(
        'freeDownload/setDownloadedProduct',
        this.selectedProduct
      )
      // add to mailing list
      // send free download via email
      // redirect to account-register-free-download after download
      this.$router.push({
        path: `/account/register/free-download`,
      })
      // close modal
      this.closeModal()
    },
    blurInput(id) {
      document.getElementById(id).blur()
    },
    closeModal() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style scoped>
/*  */
/* Overrule .modal-card styles from main.css */
/*  */
@media only screen and (min-width: 1024px) {
  .modal-card {
    width: 500px !important;
    height: 500px !important;
  }
}

@media only screen and (min-width: 769px) {
  .almost-there-text {
    margin-top: -50px;
  }
}

/* Percentage bar text styling */
.progress-bar-percentage {
  position: relative;
  top: -45px;
}
</style>
