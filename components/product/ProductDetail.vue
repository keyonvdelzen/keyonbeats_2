<template>
  <div>
    <div class="product-details">
      <div class="product-header">
        <div class="content columns is-centered margin-top pb-0">
          <div class="column is-one-third-desktop is-half-tablet">
            <figure class="image is-hcentered mb-5">
              <img class="product-image" :src="product.image" />
            </figure>
            <div class="columns has-text-centered is-mobile">
              <div class="column has-text-right">
                <span class="has-text-primary">
                  <!-- If not loading -->
                  <font-awesome-icon
                    v-if="
                      (!audioIsPlaying && !audioIsLoading) ||
                      product.id !== currentTrackProductId
                    "
                    class="icon is-medium is-clickable"
                    icon="play"
                    @click="playAudioPreview(product)"
                  />
                  <font-awesome-icon
                    v-if="
                      audioIsPlaying &&
                      !audioIsLoading &&
                      product.id === currentTrackProductId
                    "
                    class="icon is-medium is-clickable"
                    icon="pause"
                    @click="toggleAudio()"
                  />
                  <!-- If loading -->
                  <div
                    v-if="
                      product.id === currentTrackProductId && audioIsLoading
                    "
                    class="lds-ring-audio"
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </span>
              </div>
              <div class="column has-text-centered">
                <span class="has-text-primary">
                  <font-awesome-icon
                    class="icon is-medium is-clickable"
                    icon="heart"
                  />
                </span>
              </div>
              <div class="column has-text-left">
                <span class="has-text-primary">
                  <font-awesome-icon
                    class="icon is-medium is-clickable"
                    icon="download"
                    @click="setShowFreeDownloadModal(product)"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            class="column is-two-thirds-desktop is-half-tablet has-text-centered-mobile"
          >
            <h1
              class="title mb-3 is-size-3-desktop is-size-4-tablet is-size-5-mobile"
            >
              {{ product.name }}
            </h1>
            <p class="persist-multiline mb-3">
              {{ product.description }}
            </p>
            <div class="tags is-hidden-mobile">
              <span
                class="tag is-clickable is-purple mr-4"
                @click="searchType(product.type)"
                >{{ product.type }}</span
              >
              <span
                v-for="mood of product.moods"
                :key="mood"
                class="tag is-clickable is-primary mr-4"
                @click="searchMood(mood)"
                >{{ mood }}</span
              >
              <span
                v-for="genre of product.genres"
                :key="genre"
                class="tag is-clickable is-blue mr-4"
                @click="searchGenre(genre)"
                >{{ genre }}</span
              >
            </div>
            <!-- Desktop ATC button -->
            <div
              v-if="screenWidth > 768"
              class="add-to-cart-button-container mb-3"
            >
              <!-- add to cart button for beats -->
              <button
                v-if="product.type === 'Beat'"
                class="button desktop is-large is-primary has-text-white"
                data-tooltip="Click to select license"
                data-tooltip-location="top"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
              <!-- add to cart button for packs -->
              <button
                v-if="product.type === 'Pack'"
                class="button desktop is-large is-primary has-text-white"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
            </div>
            <!-- Mobile ATC button -->
            <div
              v-if="screenWidth < 769"
              class="bottom-button-container-mobile"
            >
              <!-- fixed to bottom buttons -->
              <button
                v-if="product.type === 'Beat' && !audioPlayerVisible"
                id="button-fixed"
                class="button mobile is-large is-primary has-text-white"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
              <button
                v-if="product.type === 'Pack' && !audioPlayerVisible"
                id="button-fixed"
                class="button mobile is-large is-primary has-text-white"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
              <!-- float buttons if audio player is visible -->
              <button
                v-if="product.type === 'Beat' && audioPlayerVisible"
                id="button-float"
                class="button is-large is-primary has-text-white"
                data-tooltip="Click to select license"
                data-tooltip-location="top"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
              <!-- add to cart button for packs -->
              <button
                v-if="product.type === 'Pack' && audioPlayerVisible"
                id="button-float"
                class="button is-large is-primary has-text-white"
                @click="setShowSelectLicenseModal(product)"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="product.type === 'Beat'" class="page-content-default">
        <div class="mb-5">
          <div class="columns has-text-centered-mobile">
            <div class="column">
              <button
                v-if="screenWidth > 768"
                class="accordion is-not-clickable"
              >
                <h1
                  v-if="screenWidth > 1023"
                  class="title is-3 has-text-white mb-0"
                >
                  BEAT DETAILS
                </h1>
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                >
                  DETAILS
                </h1>
              </button>
              <button
                v-if="screenWidth < 769"
                class="accordion"
                @click="toggleAccordion('beatDetails')"
              >
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                  style="position: relative"
                >
                  BEAT DETAILS
                  <font-awesome-icon
                    v-if="!accordionsState.beatDetails"
                    class="icon has-text-white is-clickable"
                    icon="plus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                  <font-awesome-icon
                    v-if="accordionsState.beatDetails"
                    class="icon has-text-white is-clickable"
                    icon="minus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                </h1>
              </button>
              <div
                id="beatDetails"
                :class="{
                  'accordion-panel-active': screenWidth > 768,
                  'accordion-panel': screenWidth < 769,
                }"
              >
                <div class="columns is-multiline is-mobile is-vcentered">
                  <div class="column is-full">
                    BPM: {{ product.beatDetails.bpm }}
                  </div>
                  <div class="column is-full">
                    Key: {{ product.beatDetails.key }}
                  </div>
                  <div class="column is-full">
                    Length: {{ product.beatDetails.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <button
                v-if="screenWidth > 768"
                class="accordion is-not-clickable"
              >
                <h1
                  v-if="screenWidth > 1023"
                  class="title is-3 has-text-white mb-0"
                >
                  STEMS INCLUDE
                </h1>
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                >
                  STEMS
                </h1>
              </button>
              <button
                v-if="screenWidth < 769"
                class="accordion"
                @click="toggleAccordion('trackStemsInclude')"
              >
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                  style="position: relative"
                >
                  STEMS INCLUDE
                  <font-awesome-icon
                    v-if="!accordionsState.stemsInclude"
                    class="icon has-text-white is-clickable"
                    icon="plus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                  <font-awesome-icon
                    v-if="accordionsState.stemsInclude"
                    class="icon has-text-white is-clickable"
                    icon="minus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                </h1>
              </button>
              <div
                id="trackStemsInclude"
                :class="{
                  'accordion-panel-active': screenWidth > 768,
                  'accordion-panel': screenWidth < 769,
                }"
              >
                <div class="columns is-multiline is-mobile is-vcentered">
                  <div
                    v-for="instrument in product.stemsInclude.instruments"
                    :key="product.stemsInclude.instruments[instrument]"
                    class="column is-half"
                  >
                    {{ instrument }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <button
                v-if="screenWidth > 768"
                class="accordion is-not-clickable"
              >
                <h1
                  v-if="screenWidth > 1023"
                  class="title is-3 has-text-white mb-0"
                >
                  DOWNLOAD DETAILS
                </h1>
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                >
                  DOWNLOAD
                </h1>
              </button>
              <button
                v-if="screenWidth < 769"
                class="accordion"
                @click="toggleAccordion('downloadDetails')"
              >
                <h1
                  v-if="screenWidth < 1024"
                  class="title is-4 has-text-white mb-0"
                  style="position: relative"
                >
                  DOWNLOAD DETAILS
                  <font-awesome-icon
                    v-if="!accordionsState.downloadDetails"
                    class="icon has-text-white is-clickable"
                    icon="plus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                  <font-awesome-icon
                    v-if="accordionsState.downloadDetails"
                    class="icon has-text-white is-clickable"
                    icon="minus"
                    style="
                      height: 26px;
                      width: 26px;
                      position: absolute;
                      right: 0;
                      margin-top: 1px;
                    "
                  />
                </h1>
              </button>
              <div
                id="downloadDetails"
                :class="{
                  'accordion-panel-active': screenWidth > 768,
                  'accordion-panel': screenWidth < 769,
                }"
              >
                <div
                  v-for="downloadDetail of product.downloadDetails"
                  :key="downloadDetail.index"
                  class="columns is-multiline is-mobile is-vcentered"
                >
                  <div class="column is-half">
                    {{ downloadDetail.name }}
                  </div>
                  <div class="column is-half">
                    {{ downloadDetail.size }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 class="title is-3">PRODUCT INFO</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus.
          </p>
        </div>
      </div>
      <div v-if="product.type === 'Pack'" class="page-content-default">
        pack details go here...
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      productId: Number(this.$route.params.id),
      showFreeDownloadModal: false,
      accordionsState: {
        beatDetails: false,
        stemsInclude: false,
        downloadDetails: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      products: 'product/getAllProducts',
      audioPlayerVisible: 'userInterface/getAudioPlayerVisible',
      currentTrackProductId: 'audioPlayer/getCurrentTrackProductId',
      audioIsPlaying: 'audioPlayer/getIsPlaying',
      audioIsLoading: 'audioPlayer/getIsLoading',
      isLoggedIn: 'account/getIsLoggedIn',
      screenWidth: 'userInterface/getScreenWidth',
    }),
    product() {
      if (this.products.length > 0) {
        return this.products.find((product) => product.id === this.productId)
      } else {
        return null
      }
    },
  },
  methods: {
    toggleAudio() {
      this.$nuxt.$emit('toggle-audio')
    },
    toggleAccordion(accordionId) {
      // toggle accordion panel div class
      const panel = document.getElementById(accordionId)
      if (panel.className === 'accordion-panel') {
        panel.className = 'accordion-panel-active'
        if (accordionId === 'beatDetails') {
          this.accordionsState.beatDetails = true
        } else if (accordionId === 'trackStemsInclude') {
          this.accordionsState.stemsInclude = true
        } else if (accordionId === 'downloadDetails') {
          this.accordionsState.downloadDetails = true
        }
      } else if (panel.className === 'accordion-panel-active') {
        panel.className = 'accordion-panel'
        if (accordionId === 'beatDetails') {
          this.accordionsState.beatDetails = false
        } else if (accordionId === 'trackStemsInclude') {
          this.accordionsState.stemsInclude = false
        } else if (accordionId === 'downloadDetails') {
          this.accordionsState.downloadDetails = false
        }
      }
    },
    searchMood(mood) {
      // mood = mood.toLowerCase()
      this.$router
        .push({
          name: `search-mood`,
          params: { mood },
        })
        .catch((err) => {
          return err
        })
    },
    searchGenre(genre) {
      // genre = genre.toLowerCase()
      this.$router
        .push({
          name: `search-genre`,
          params: { genre },
        })
        .catch((err) => {
          return err
        })
    },
    searchType(type) {
      // type = type.toLowerCase()
      this.$router
        .push({
          name: `search-type`,
          params: { type },
        })
        .catch((err) => {
          return err
        })
    },
    setShowSelectLicenseModal(product) {
      this.$nuxt.$emit('open-select-license-modal', product)
    },
    setShowFreeDownloadModal(product) {
      if (this.isLoggedIn) {
        // if user is logged in
        // add product to user's products
        // redirect to user's products list (account/products)
        // user can download product there
        // give user a coupon code that works only on the product the user got a free download of(?)
        // coupon gives user 10% off the product(?)
      } else if (!this.isLoggedIn) {
        // if user is not logged in
        // show free download modal
        this.$nuxt.$emit('show-free-download-modal', product)
      }
    },
    playAudioPreview(product) {
      // If current track is playing, toggle audio instead of emitting play-audio-preview
      if (product.id !== this.currentTrackProductId) {
        this.$nuxt.$emit('play-audio-preview', product)
      } else {
        this.toggleAudio()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/*  */
/* TODO: CSS below is a mess, fix this later */
/*  */

@media only screen and (min-width: 769px) {
  .product-header {
    height: 500px;
    background-color: #fff;
    padding-top: 30px;
  }

  .product-header .content {
    background-color: #fff;
    max-width: 1260px;
    padding: 30px;
    margin: auto auto 0 auto;
  }

  .product-header .columns .column {
    position: relative;
    padding: 0;
  }

  .product-header .columns .column .add-to-cart-button-container {
    position: absolute;
    bottom: 38px;
  }
}

@media only screen and (max-width: 768px) {
  .product-details {
    padding-bottom: 60px;
  }
  .product-header {
    background-color: #fff;
  }

  .product-header .content {
    background-color: #fff;
    max-width: 1260px;
    padding: 30px;
    margin: auto auto 0 auto;
  }
}

/* Accordion test */
.accordion {
  background-color: var(--primary);
  cursor: pointer;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.accordion-panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.accordion-panel-active {
  padding: 18px;
  background-color: white;
  max-height: auto;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

/* Loading icon (play product audio preview) styling */
.lds-ring-audio {
  display: inline-block;
  width: 30px;
  height: 30px;
  color: var(--primary);
}
.lds-ring-audio div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  margin-left: -5px;
  width: 32px;
  height: 32px;
  border: 8px solid var(--primary);
  border-radius: 50%;
  animation: lds-ring-audio 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--primary) transparent transparent transparent;
}
.lds-ring-audio div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring-audio div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring-audio div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring-audio {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss" scoped>
/* Button pulse on enter page */

// Desktop
.button.desktop {
  animation: 1s jump-desktop ease;
}

@keyframes jump-desktop {
  0% {
    transform: scale(1);
    box-shadow: none;
    background-color: var(--primary);
  }
  25% {
    transform: scale(1.1);
    box-shadow: 0 4px 100px rgba(0, 0, 0, 0.1);
    background-color: #ffd7d7;
  }
  50% {
    transform: scale(1);
    box-shadow: none;
    background-color: var(--primary);
  }
  75% {
    transform: scale(1.1);
    box-shadow: 0 4px 100px rgba(0, 0, 0, 0.1);
    background-color: #ffd7d7;
  }
  100% {
    transform: scale(1);
    box-shadow: none;
    background-color: var(--primary);
  }
}

// Mobile
.button.mobile {
  animation: 1s jump-mobile ease;
}

@keyframes jump-mobile {
  0% {
    transform: scale(1);
    height: 60px;
    background-color: var(--primary);
  }
  25% {
    transform: scale(1.05);
    height: 65px;
    background-color: #ffd7d7;
  }
  50% {
    transform: scale(1);
    height: 60px;
    background-color: var(--primary);
  }
  75% {
    transform: scale(1.05);
    height: 65px;
    background-color: #ffd7d7;
  }
  100% {
    transform: scale(1);
    height: 60px;
    background-color: var(--primary);
  }
}
</style>
