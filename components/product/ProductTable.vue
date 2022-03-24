<template>
  <div>
    <div class="product-table">
      <table class="table is-striped is-hoverable is-fullwidth has-text-left">
        <thead v-if="products.length > 0">
          <tr>
            <th></th>
            <th>Name</th>
            <th class="is-hidden-touch">Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product of products"
            :key="'tr_' + product.id"
            class="product-table-row"
          >
            <td
              class="product-image is-vcentered is-clickable"
              @click="playAudioPreview(product)"
            >
              <figure class="image is-64x64 is-hcentered has-text-centered">
                <img :src="product.image" width="64" height="64" />
                <!-- On hover -->
                <div v-if="screenWidth > 1023" class="overlay-hover">
                  <font-awesome-icon
                    icon="play"
                    class="icon overlay-hover-icon is-medium"
                  />
                </div>

                <!-- If is current track in audio player -->
                <!-- If loaded -->
                <div
                  v-if="product.id === currentTrackProductId && audioIsPlaying"
                  class="play-overlay-bg"
                ></div>
                <div
                  v-if="product.id === currentTrackProductId && !audioIsPlaying"
                  class="pause-overlay-bg"
                ></div>
                <font-awesome-icon
                  v-if="
                    product.id === currentTrackProductId &&
                    !audioIsPlaying &&
                    !audioIsLoading
                  "
                  icon="play"
                  class="icon pause-overlay is-medium"
                  @click="toggleAudio()"
                />
                <font-awesome-icon
                  v-if="
                    product.id === currentTrackProductId &&
                    audioIsPlaying &&
                    !audioIsLoading
                  "
                  icon="pause"
                  class="icon play-overlay is-medium"
                  @click="toggleAudio()"
                />
                <!-- If audio loading -->
                <div
                  v-if="product.id === currentTrackProductId && audioIsLoading"
                  class="loading-ring"
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </figure>
            </td>
            <td
              class="is-vcentered is-clickable"
              @click="goToProduct(product.id, product.slug)"
            >
              <div>
                <h1 class="title is-5 is-size-6-mobile mb-1">
                  {{ product.name }}
                </h1>
              </div>
            </td>
            <td class="is-vcentered is-hidden-touch">
              <div class="tags">
                <span
                  class="tag is-clickable is-purple mr-4"
                  @click="setProductType(product.type)"
                  >{{ product.type }}</span
                >
              </div>
            </td>
            <td class="is-vcentered has-text-right">
              <!-- Desktop ATC buttons -->
              <div v-if="screenWidth > 768">
                <!-- Beats -->
                <button
                  v-if="product.type === 'Beat'"
                  class="button is-primary has-text-white"
                  data-tooltip="Click to select license"
                  data-tooltip-location="top"
                  @click="setShowSelectLicenseModal(product)"
                >
                  <span>Add to cart</span>
                </button>
                <!-- Packs -->
                <button
                  v-if="product.type === 'Pack'"
                  class="button is-primary has-text-white"
                  @click="setShowSelectLicenseModal(product)"
                >
                  <span>Add to cart</span>
                </button>
              </div>
              <!-- Mobile ATC buttons -->
              <div v-if="screenWidth < 769">
                <!-- Beats -->
                <span
                  v-if="product.type === 'Beat'"
                  class="has-text-primary mr-2"
                  @click="setShowSelectLicenseModal(product)"
                >
                  <font-awesome-icon
                    class="icon is-medium pt-1"
                    icon="cart-plus"
                  />
                </span>
                <!-- Packs -->
                <span
                  v-if="product.type === 'Pack'"
                  class="has-text-primary mr-2"
                  @click="setShowSelectLicenseModal(product)"
                >
                  <font-awesome-icon
                    class="icon is-medium pt-1"
                    icon="cart-plus"
                  />
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <article class="message mt-3">
              <div class="message-body">
                <div
                  v-if="
                    searchQuery.keyword === '' &&
                    searchQuery.types.length === 0 &&
                    searchQuery.moods.length === 0 &&
                    searchQuery.genres.length === 0
                  "
                >
                  <p>
                    We're sorry! Seems like there aren't any products
                    available.<br />
                  </p>
                </div>
                <div
                  v-if="
                    searchQuery.keyword !== '' &&
                    searchQuery.types.length === 0 &&
                    searchQuery.moods.length === 0 &&
                    searchQuery.genres.length === 0
                  "
                >
                  <p>
                    We're sorry! We couldn't find results for "{{
                      searchQuery.keyword
                    }}"
                  </p>
                </div>
                <div
                  v-if="
                    searchQuery.keyword === '' &&
                    (searchQuery.types.length !== 0 ||
                      searchQuery.moods.length !== 0 ||
                      searchQuery.genres.length !== 0)
                  "
                  class="pb-5"
                >
                  <p>We're sorry! We couldn't find any products labeled as:</p>
                  <div class="tags">
                    <span
                      v-for="type of searchQuery.types"
                      :key="type"
                      class="tag is-purple mr-4"
                      >{{ type }}</span
                    >
                    <span
                      v-for="mood of searchQuery.moods"
                      :key="mood"
                      class="tag is-primary mr-4"
                      >{{ mood }}</span
                    >
                    <span
                      v-for="genre of searchQuery.genres"
                      :key="genre"
                      class="tag is-blue mr-4"
                      >{{ genre }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="
                    searchQuery.keyword !== '' &&
                    (searchQuery.types.length !== 0 ||
                      searchQuery.moods.length !== 0 ||
                      searchQuery.genres.length !== 0)
                  "
                  class="pb-5"
                >
                  <p>
                    We're sorry! We couldn't find any products related to "{{
                      searchQuery.keyword
                    }}" in our catalog labeled as:
                  </p>
                  <div class="tags">
                    <span
                      v-for="type of searchQuery.types"
                      :key="type"
                      class="tag is-purple mr-4"
                      >{{ type }}</span
                    >
                    <span
                      v-for="mood of searchQuery.moods"
                      :key="mood"
                      class="tag is-primary mr-4"
                      >{{ mood }}</span
                    >
                    <span
                      v-for="genre of searchQuery.genres"
                      :key="genre"
                      class="tag is-blue mr-4"
                      >{{ genre }}</span
                    >
                  </div>
                </div>
              </div>
            </article>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    products: {
      type: Array,
      default() {
        return []
      },
    },
    searchQuery: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      currentTrackProductId: 'audioPlayer/getCurrentTrackProductId',
      audioIsPlaying: 'audioPlayer/getIsPlaying',
      audioIsLoading: 'audioPlayer/getIsLoading',
    }),
  },
  methods: {
    goToProduct(productId, productSlug) {
      const path = `/product/${productId}/${productSlug}`
      if (this.$route.path !== path) {
        this.$router.push({
          path,
          params: {
            productId,
            productSlug,
          },
        })
      }
    },
    playAudioPreview(product) {
      // only emit if current track Id isn't equal to product.Id
      if (product.id !== this.currentTrackProductId) {
        this.$nuxt.$emit('play-audio-preview', product)
      }
    },
    toggleAudio() {
      this.$nuxt.$emit('toggle-audio')
    },
    setProductType(type) {
      this.$emit('set-product-type', type)
    },
    setShowSelectLicenseModal(product) {
      this.$nuxt.$emit('open-select-license-modal', product)
    },
  },
}
</script>

<style scoped>
/* Product image styling mobile */
@media only screen and (max-width: 768px) {
  td.product-image {
    max-width: 64px;
    padding: 0;
    margin: 0;
  }

  td.product-image figure {
    margin-left: 0;
  }
}

/* Image play/pause overlay styling */
.overlay-hover {
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  height: 64px;
  width: 64px;
  opacity: 0;
  transition: 0.5s;
}

.overlay-hover:hover {
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  height: 64px;
  width: 64px;
  opacity: 0.4;
  transition: 0.25s;
}

.overlay-hover-icon {
  color: #f2f2f2;
  position: absolute;
  left: 16px;
  top: 16px;
  pointer-events: none;
  opacity: 0;
  transition: 0.25s;
}

.overlay-hover:hover .overlay-hover-icon {
  opacity: 1;
  transition: 0.5s;
}

.play-overlay,
.pause-overlay {
  color: #f2f2f2;
  position: absolute;
  left: 16px;
  top: 16px;
}

.play-overlay-bg {
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  height: 64px;
  width: 64px;
  opacity: 0.4;
}

.pause-overlay-bg {
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  height: 64px;
  width: 64px;
  opacity: 0.4;
}

/* Loading icon (play product audio preview) styling */
.loading-ring {
  display: inline-block;
  width: 50px;
  height: 50px;
  color: #fff;
  position: absolute;
  left: 16px;
  top: 16px;
}
.loading-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin-left: auto;
  margin-right: auto;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.loading-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.loading-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.loading-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loading-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
