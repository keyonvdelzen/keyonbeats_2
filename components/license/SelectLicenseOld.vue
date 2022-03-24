<template>
  <div>
    <!-- <div class="columns has-text-centered">
        <div v-for="license of product.Licenses" :key="license.LicenseTypeId" class="column">
            <div class="card is-full-height">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-5">{{license.Name}}</p>
                            <p class="subtitle is-6">€{{license.amount.value}}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p class="subtitle is-6">{{license.Subname}}</p>
                        <br><br>
                        <button @click="addToCart(license.LicenseTypeId)" class="button is-primary has-text-white">Add to cart</button>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div> -->
    <div class="pricing-table is-comparative">
      <div class="pricing-plan is-features">
        <div class="plan-header"><br /></div>
        <div class="plan-price">
          <span class="plan-price-amount"><br /></span>
        </div>
        <div class="plan-items">
          <div class="plan-item">MP3</div>
          <div class="plan-item">WAV</div>
          <div
            class="plan-item"
            data-tooltip="The track stems are the single instrument tracks of every individual instrument or sound that the instrumental contains. For example, individual audio files for the drums, bass, guitar, piano and background vocals."
            data-tooltip-location="right"
          >
            Track Stems
          </div>
          <div
            class="plan-item"
            data-tooltip="Non-profit streaming platforms include platforms like Soundcloud and YouTube (unmonetized). But exclude platforms like Spotify, Apple Music and Deezer."
            data-tooltip-location="right"
          >
            Streams (non-profit)
          </div>
          <div
            class="plan-item"
            data-tooltip="For-profit streaming platforms are platforms where you'll earn revenue from your tracks, either directly or indirectly (ad-based) like monetized YouTube video's. Examples are Spotify, Apple Music and Deezer."
            data-tooltip-location="right"
          >
            Streams (for-profit)
          </div>
          <div
            class="plan-item"
            data-tooltip="The amount of different music video's you're allowed to create featuring your finished track."
            data-tooltip-location="right"
          >
            Music video's
          </div>
          <div
            class="plan-item"
            data-tooltip="The amount of different radio stations you're allowed to broadcast your finished track on."
            data-tooltip-location="right"
          >
            Radio stations
          </div>
          <div
            class="plan-item"
            data-tooltip="The type of live performance you're allowed to use your finished track for."
            data-tooltip-location="right"
          >
            Live performances
          </div>
        </div>
        <div class="plan-footer"></div>
      </div>
      <div class="pricing-plan">
        <div class="plan-header">{{ product.licenses[0].name }}</div>
        <div
          class="plan-price"
          data-tooltip="This is a one-time payment."
          data-tooltip-location="bottom"
        >
          <span class="plan-price-amount"
            ><span class="plan-price-currency">€</span
            >{{ product.licenses[0].amount.value }}</span
          >
        </div>
        <div class="plan-items">
          <div class="plan-item" data-feature="MP3">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="WAV">
            <font-awesome-icon
              class="icon is-small has-text-danger"
              icon="times"
            />
          </div>
          <div class="plan-item" data-feature="Track Stems">
            <font-awesome-icon
              class="icon is-small has-text-danger"
              icon="times"
            />
          </div>
          <div class="plan-item" data-feature="Streams (non-profit)">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Streams (for-profit)">
            50.000
          </div>
          <div class="plan-item" data-feature="Music video's">1</div>
          <div class="plan-item" data-feature="Radio stations">0</div>
          <div class="plan-item" data-feature="Live performances">
            Non-profit only
          </div>
        </div>
        <div class="plan-footer">
          <button
            class="button is-fullwidth"
            @click="addToCart(product.licenses[0].licenseTypeId)"
          >
            Choose
          </button>
        </div>
      </div>

      <div class="pricing-plan is-purple">
        <div class="plan-header">{{ product.licenses[1].name }}</div>
        <div
          class="plan-price"
          data-tooltip="This is a one-time payment."
          data-tooltip-location="bottom"
        >
          <span class="plan-price-amount"
            ><span class="plan-price-currency">€</span
            >{{ product.licenses[1].amount.value }}</span
          >
        </div>
        <div class="plan-items">
          <div class="plan-item" data-feature="MP3">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="WAV">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="Track Stems">
            <font-awesome-icon
              class="icon is-small has-text-danger"
              icon="times"
            />
          </div>
          <div class="plan-item" data-feature="Streams (non-profit)">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Streams (for-profit)">
            250.000
          </div>
          <div class="plan-item" data-feature="Music video's">1</div>
          <div class="plan-item" data-feature="Radio stations">1</div>
          <div class="plan-item" data-feature="Live performances">
            Non-profit only
          </div>
        </div>
        <div class="plan-footer">
          <button
            class="button is-fullwidth has-text-white"
            @click="addToCart(product.licenses[1].licenseTypeId)"
          >
            Choose
          </button>
        </div>
      </div>

      <div class="pricing-plan is-active">
        <div class="plan-header">{{ product.licenses[2].name }}</div>
        <div
          class="plan-price"
          data-tooltip="This is a one-time payment."
          data-tooltip-location="bottom"
        >
          <span class="plan-price-amount"
            ><span class="plan-price-currency">€</span
            >{{ product.licenses[2].amount.value }}</span
          >
        </div>
        <div class="plan-items">
          <div class="plan-item" data-feature="MP3">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="WAV">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="Track Stems">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="Streams (non-profit)">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Streams (for-profit)">
            500.000
          </div>
          <div class="plan-item" data-feature="Music video's">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Radio stations">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Live performances">
            No limitations
          </div>
        </div>
        <div class="plan-footer">
          <button
            class="button is-fullwidth has-text-white"
            @click="addToCart(product.licenses[2].licenseTypeId)"
          >
            Choose
          </button>
        </div>
      </div>

      <div class="pricing-plan is-blue">
        <div class="plan-header">{{ product.licenses[3].name }}</div>
        <div
          class="plan-price"
          data-tooltip="This is a one-time payment."
          data-tooltip-location="bottom"
        >
          <span class="plan-price-amount"
            ><span class="plan-price-currency">€</span
            >{{ product.licenses[3].amount.value }}</span
          >
        </div>
        <div class="plan-items">
          <div class="plan-item" data-feature="MP3">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="WAV">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="Track Stems">
            <font-awesome-icon
              class="icon is-small has-text-success"
              icon="check"
            />
          </div>
          <div class="plan-item" data-feature="Streams (non-profit)">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Streams (for-profit)">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Music video's">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Radio stations">
            <font-awesome-icon class="icon is-small" icon="infinity" />
          </div>
          <div class="plan-item" data-feature="Live performances">
            No limitations
          </div>
        </div>
        <div class="plan-footer">
          <button
            class="button is-fullwidth has-text-white"
            @click="addToCart(product.licenses[3].licenseTypeId)"
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    addToCart(licenseTypeId) {
      let selectedLicense = this.product.licenses.filter((obj) => {
        return obj.licenseTypeId === licenseTypeId
      })
      selectedLicense = selectedLicense[0]

      const productObject = {
        id: this.product.id,
        name: this.product.name,
        slug: this.product.slug,
        image: this.product.image,
        type: this.product.type,
        moods: this.product.moods,
        genres: this.product.genres,
        selectedLicenseData: selectedLicense,
        count: 1,
      }

      this.$store.commit('currentOrder/addToCart', productObject)
      // close modal
      this.$emit('close-modal')
      // open shopping cart modal if first time adding to cart afer 100ms
      setTimeout(() => {
        this.$nuxt.$emit('open-checkout-modal-after-add-to-cart')
      }, 100)
      // show added to cart notification after 500ms
      setTimeout(() => {
        this.$nuxt.$emit('show-notification', {
          text: `${productObject.name} (${productObject.selectedLicenseData.name}) was added to your shopping cart!`,
          cardColor: `success`,
          onCardClick: 'openCheckoutModal',
          notificationTypeId: 0,
          duration: 2500,
        })
      }, 300)
    },
  },
}
</script>

<style scoped>
.card {
  height: 100%;
}
</style>
