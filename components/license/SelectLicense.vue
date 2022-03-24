<template>
  <div class="has-text-centered">
    <div v-if="mode === 'previewLicenseAgreement'">
      <button class="button" @click="setMode('summary')">Back</button>
      <PreviewLicenseAgreement
        :product-type="selectedProduct.type"
        :license-configuration="userInput"
      />
    </div>
    <div
      v-if="mode !== 'previewLicenseAgreement'"
      id="checkoutSteps"
      class="steps"
    >
      <div
        class="step-item"
        :class="{
          'is-active': mode == 'selectTemplate',
          'is-active is-completed': mode != 'selectTemplate',
        }"
      >
        <div class="step-marker" @click="setMode('selectTemplate')">
          <span v-if="mode == 'selectTemplate'">1</span>
          <font-awesome-icon
            v-if="mode != 'selectTemplate'"
            class="icon"
            icon="check"
          />
        </div>
        <div class="step-details" @click="setMode('selectTemplate')">
          <p class="step-title is-size-7-mobile">Select template</p>
        </div>
      </div>
      <div
        class="step-item"
        :class="{
          'is-active': mode == 'licenseCrafter',
          'is-active is-completed': mode == 'summary',
        }"
      >
        <div class="step-marker" @click="setMode('licenseCrafter')">
          <span v-if="mode == 'selectTemplate' || mode == 'licenseCrafter'"
            >2</span
          >
          <font-awesome-icon
            v-if="mode == 'summary'"
            class="icon"
            icon="check"
          />
        </div>
        <div class="step-details" @click="setMode('licenseCrafter')">
          <p class="step-title is-size-7-mobile">Craft License</p>
        </div>
      </div>
      <div
        class="step-item"
        :class="{
          'is-active is-primary': mode == 'summary',
        }"
      >
        <div class="step-marker" @click="setMode('summary')">
          <span>3</span>
        </div>
        <div class="step-details" @click="setMode('summary')">
          <p class="step-title is-size-7-mobile">Summary</p>
        </div>
      </div>
      <div class="steps-content">
        <!-- Select Template -->
        <div
          class="step-content"
          :class="{
            'is-active': mode == 'selectTemplate',
          }"
        >
          <div
            v-for="licenseTemplate of licenseTemplates"
            :key="licenseTemplate.id"
          >
            {{ licenseTemplate.name }}
            <button @click="setLicenseTemplate(licenseTemplate.id)">
              Select
            </button>
          </div>
          <div class="is-divider" data-content="OR"></div>
          <button
            class="button is-primary has-text-white"
            @click="setMode('licenseCrafter')"
          >
            <span>Craft a custom license</span
            ><font-awesome-icon class="ml-2" icon="arrow-right" />
          </button>
        </div>
        <!-- License Crafter -->
        <div
          class="step-content"
          :class="{
            'is-active is-primary': mode == 'licenseCrafter',
          }"
        >
          <div class="subtitle is-6">
            Follow the steps to craft your custom license for<br />
            <b>{{ selectedProduct.name }}</b>
          </div>
          <!-- Craft License Steps -->
          <div class="craft-license-steps-container">
            <!-- Step 1: select license type -->
            <div
              class="craft-license-step"
              :class="{
                current: currentStep.licenseCrafter === 1,
              }"
            >
              <div class="title is-5">License Type</div>
              <div class="field check-radio-group">
                <div>
                  <input
                    id="nonProfit"
                    v-model="userInput.type"
                    value="nonProfit"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="!selectedProduct.licenseData.nonProfit"
                  />
                  <label for="nonProfit">Non-profit</label>
                </div>
                <div>
                  <input
                    id="commercial"
                    v-model="userInput.type"
                    value="commercial"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="!selectedProduct.licenseData.commercial"
                  />
                  <label for="commercial">Commercial</label>
                </div>
                <div v-if="selectedProduct.type === 'Beat'">
                  <input
                    id="exclusive"
                    v-model="userInput.type"
                    value="exclusive"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="!selectedProduct.licenseData.exclusive"
                  />
                  <label for="exclusive">Exclusive</label>
                </div>
              </div>
            </div>
            <!-- Step 2: select file type -->
            <div
              v-if="userInput.type !== null"
              class="craft-license-step"
              :class="{
                current: currentStep.licenseCrafter === 2,
              }"
            >
              <div class="title is-5">File Type</div>
              <!-- File type -->
              <div class="field check-radio-group">
                <div v-if="selectedProduct.type === 'Beat'">
                  <input
                    id="fileTypeMp3t"
                    v-model="userInput.fileType"
                    value="mp3t"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="userInput.type === 'exclusive'"
                  />
                  <label for="fileTypeMp3t">Tagged MP3</label>
                </div>
                <div>
                  <input
                    id="fileTypeMp3"
                    v-model="userInput.fileType"
                    value="mp3"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="
                      !selectedProduct.licenseData.mp3 ||
                      (selectedProduct.type === 'Beat' &&
                        (userInput.type === 'nonProfit' ||
                          userInput.type === 'exclusive'))
                    "
                  />
                  <label for="fileTypeMp3">MP3</label>
                </div>
                <div>
                  <input
                    id="fileTypeWav"
                    v-model="userInput.fileType"
                    value="wav"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="
                      !selectedProduct.licenseData.wav ||
                      userInput.type === 'nonProfit' ||
                      userInput.type === 'exclusive'
                    "
                  />
                  <label for="fileTypeWav">WAV</label>
                </div>
                <div>
                  <input
                    id="fileTypeStems"
                    v-model="userInput.fileType"
                    value="stems"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="
                      !selectedProduct.licenseData.stems ||
                      userInput.type === 'nonProfit'
                    "
                  />
                  <label for="fileTypeStems">Stems</label>
                </div>
                <div v-if="selectedProduct.type === 'Pack'">
                  <input
                    id="fileTypeUnprocessed"
                    v-model="userInput.fileType"
                    value="unprocessed"
                    class="is-checkradio is-primary"
                    type="radio"
                    :disabled="
                      !selectedProduct.licenseData.unprocessed ||
                      userInput.type === 'nonProfit'
                    "
                  />
                  <label for="fileTypeUnprocessed">Unprocessed</label>
                </div>
              </div>
            </div>
            <!-- Step 3: select streams -->
            <div
              v-if="
                userInput.fileType !== null &&
                selectedProduct.type === 'Beat' &&
                userInput.type === 'commercial'
              "
              class="craft-license-step"
              :class="{
                current: currentStep.licenseCrafter === 3,
              }"
            >
              <!-- Streams slider -->
              <div class="title is-5">Commercial Streams</div>
              <div class="field">
                <p>
                  Streams:
                  {{
                    (userInput.streams * 10000)
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
                  }}
                </p>
                <input
                  v-model="userInput.streams"
                  min="0"
                  max="100"
                  type="range"
                  :disabled="userInput.type === 'nonProfit'"
                />
              </div>
            </div>
            <!-- Step 4: extra's -->
            <div
              v-if="
                userInput.streams !== null &&
                selectedProduct.type === 'Beat' &&
                userInput.type === 'commercial'
              "
              class="craft-license-step"
              :class="{
                current: currentStep.licenseCrafter === 4,
              }"
            >
              <div class="title is-5">Commercial Activities</div>
              <!-- Music video's switch -->
              <div class="field">
                <input
                  id="musicVideos"
                  v-model="userInput.musicVideos"
                  type="checkbox"
                  name="musicVideos"
                  class="switch is-rounded"
                />
                <label for="musicVideos">Music video's</label>
              </div>
              <!-- Radio broadcasting switch -->
              <div class="field">
                <input
                  id="radioBroadcasting"
                  v-model="userInput.radioBroadcasting"
                  type="checkbox"
                  name="radioBroadcasting"
                  class="switch is-rounded"
                />
                <label for="radioBroadcasting">Radio broadcasting</label>
              </div>
              <!-- Live performances switch -->
              <div class="field">
                <input
                  id="livePerformances"
                  v-model="userInput.livePerformances"
                  type="checkbox"
                  name="livePerformances"
                  class="switch is-rounded"
                />
                <label for="livePerformances">Live performances</label>
              </div>
            </div>
          </div>

          <div>
            <b>Total price: {{ totalPrice }}</b>
          </div>
          <button
            class="button is-primary has-text-white mt-3"
            @click="setMode('summary')"
          >
            Alright, I'm ready!
          </button>
          <div class="is-divider" data-content="OR"></div>
          <button class="button is-ghost" @click="setMode('selectTemplate')">
            <font-awesome-icon class="mr-2" icon="arrow-left" /><span
              >Select a template instead</span
            >
          </button>
        </div>
        <!-- Summary -->
        <div
          class="step-content"
          :class="{
            'is-active is-primary': mode == 'summary',
          }"
        >
          <div class="title">{{ userInput.name }}</div>
          <div class="subtitle">
            {{ licenseAttributesSummary.type }}
          </div>
          <ul>
            <li>Files: {{ licenseAttributesSummary.fileType }}</li>
            <li>Streams: {{ licenseAttributesSummary.streams }}</li>
            <li>
              Music video's:
              {{ licenseAttributesSummary.musicVideos }}
            </li>
            <li>
              Radio broadcasting:
              {{ licenseAttributesSummary.radioBroadcasting }}
            </li>
            <li>
              Live performances:
              {{ licenseAttributesSummary.livePerformances }}
            </li>
          </ul>
          <button
            class="button is-grey"
            @click="setMode('previewLicenseAgreement')"
          >
            Preview agreement
          </button>
          <div class="subtitle mt-3">€{{ totalPrice }}</div>
          <button class="button is-primary has-text-white" @click="addToCart()">
            <span>Add to cart</span
            ><font-awesome-icon class="ml-2" icon="cart-plus" />
          </button>
          <div class="is-divider" data-content="OR"></div>
          <button class="button is-ghost" @click="setMode('licenseCrafter')">
            <font-awesome-icon class="mr-2" icon="arrow-left" /><span
              >Customize my license</span
            >
          </button>
        </div>
      </div>
    </div>
    <!-- NOTES -->
    <div
      class="is-divider"
      data-content="NOTES"
      :class="{ 'is-success': showNotes }"
      @click="showNotes = !showNotes"
    ></div>
    <div v-if="showNotes" class="content">
      <ul>
        <li>
          user can't add to cart if total price is zero, show download option
          instead
        </li>
        <li>user can view license template details in select license mode</li>
        <li>
          user can preview the license agreement specific to their license
          (template or customized) in the license summary
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PreviewLicenseAgreement from '~/components/license/PreviewLicenseAgreement.vue'

export default {
  components: {
    PreviewLicenseAgreement,
  },
  props: {
    selectedProduct: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      showNotes: false, // dev
      mode: 'licenseCrafter',
      licenseTemplates: [
        {
          id: 0,
          name: 'Non-Profit License',
          attributes: {
            type: 'nonProfit',
            fileType: 'mp3t',
            streams: '0',
            musicVideos: false,
            radioBroadcasting: false,
            livePerformances: false,
          },
        },
        {
          id: 1,
          name: 'Basic License',
          attributes: {
            type: 'commercial',
            fileType: 'mp3',
            streams: '1',
            musicVideos: false,
            radioBroadcasting: false,
            livePerformances: false,
          },
        },
        {
          id: 2,
          name: 'Premium License',
          attributes: {
            type: 'commercial',
            fileType: 'wav',
            streams: '5',
            musicVideos: true,
            radioBroadcasting: false,
            livePerformances: true,
          },
        },
        {
          id: 3,
          name: 'Track Stems License',
          attributes: {
            type: 'commercial',
            fileType: 'stems',
            streams: '20',
            musicVideos: true,
            radioBroadcasting: false,
            livePerformances: true,
          },
        },
        {
          id: 4,
          name: 'Unlimited License',
          attributes: {
            type: 'commercial',
            fileType: 'stems',
            streams: '20',
            musicVideos: true,
            radioBroadcasting: false,
            livePerformances: true,
          },
        },
      ],
      // TODO: Keep track of user's actions, in order to conditionally show steps etc.
      // Here's a start...
      userActions: {
        hasSelectedType: false,
        hasSelectedFileType: false,
        hasSelectedStreams: 'blablabla',
      },
      // Something like that...
      // So now the userInput object doesn't have to be used for 2 purposes
      // Which makes life easier
      userInput: {
        name: 'Custom License', // not really userInput, either remove this or rename the object(!)
        type: null,
        fileType: null,
        streams: null,
        musicVideos: null,
        radioBroadcasting: null,
        livePerformances: null,
      },

      currentStep: {
        licenseCrafter: 1,
      },
    }
  },
  computed: {
    // Some ideas..
    currentLicenseCrafterStep() {
      // Return current license crafter step
      // --> Based on this.userActions in data()
      return 0
    },
    licenseSummaryDisabled() {
      // Return true if license summary step should be disabled
      // --> Based on this.userInput in data()
      // Use to disable click on license summary step
      // Use to disable the "Alright, I'm ready!" button
      return 0
    },
    // End of ideas
    totalPrice() {
      // ON REFACTOR: ALSO REFACTOR computedShoppingCart in CheckoutModal.vue

      const product = this.selectedProduct
      const staticPrices = product.licenseData.staticPrices
      const attributePrices = product.licenseData.attributePrices
      const input = this.userInput

      let totalPrice = product.basePrice

      // Beats
      if (product.type === 'Beat') {
        // if non-profit license
        if (input.type === 'nonProfit') {
          totalPrice = staticPrices.nonProfit
          // if exclusive license
        } else if (input.type === 'exclusive') {
          totalPrice = staticPrices.exclusive
          // if commercial non-exclusive license
        } else if (input.type === 'commercial') {
          // filetypes
          if (input.fileType === 'mp3') {
            totalPrice = totalPrice + attributePrices.mp3
          } else if (input.fileType === 'wav') {
            totalPrice = totalPrice + attributePrices.wav
          } else if (input.fileType === 'stems') {
            totalPrice = totalPrice + attributePrices.stems
          }

          // streams
          const streams = parseInt(input.streams) * 10000
          const costPerStream = attributePrices.streams
          totalPrice = totalPrice + streams * costPerStream

          // music videos
          if (input.musicVideos) {
            totalPrice = totalPrice + attributePrices.musicVideos
          }

          // radio broadcasting
          if (input.radioBroadcasting) {
            totalPrice = totalPrice + attributePrices.radioBroadcasting
          }

          // live performances
          if (input.livePerformances) {
            totalPrice = totalPrice + attributePrices.livePerformances
          }
        }
      } // Packs
      else if (product.type === 'Pack') {
        // license type
        if (input.type === 'nonProfit') {
          totalPrice = staticPrices.nonProfit
          // filetypes
        } else if (input.fileType === 'mp3') {
          totalPrice = totalPrice + attributePrices.mp3
        } else if (input.fileType === 'wav') {
          totalPrice = totalPrice + attributePrices.wav
        } else if (input.fileType === 'stems') {
          totalPrice = totalPrice + attributePrices.stems
        } else if (input.fileType === 'unprocessed') {
          totalPrice = totalPrice + attributePrices.unprocessed
        }
      }
      // // Round off
      // totalPrice = Math.round(totalPrice * 100) / 100

      return totalPrice
    },
    licenseAttributesSummary() {
      const input = this.userInput
      const summary = {
        type: '',
        fileType: '',
        streams: '',
        musicVideos: '',
        radioBroadcasting: '',
        livePerformances: '',
      }
      if (input.type === 'nonProfit') {
        summary.type = 'Non-Profit, Non-Exclusive'
      } else if (input.type === 'commercial') {
        summary.type = 'Commercial, Non-Exclusive'
      } else if (input.type === 'exclusive') {
        summary.type = 'Commercial, Exclusive'
      }

      if (input.fileType === 'mp3t') {
        summary.fileType = 'Tagged MP3'
      } else if (input.fileType === 'mp3') {
        summary.fileType = 'MP3'
      } else if (input.fileType === 'wav') {
        summary.fileType = 'WAV'
      } else if (input.fileType === 'stems') {
        summary.fileType = 'Track Stems (+ WAV)'
      }

      summary.streams = input.streams * 10000

      if (input.musicVideos) {
        summary.musicVideos = 'Yes'
      } else {
        summary.musicVideos = 'No'
      }

      if (input.radioBroadcasting) {
        summary.radioBroadcasting = 'Yes'
      } else {
        summary.radioBroadcasting = 'No'
      }

      if (input.livePerformances) {
        summary.livePerformances = 'Yes'
      } else {
        summary.livePerformances = 'No'
      }

      return summary
    },
  },
  mounted() {
    this.$emit('set-modal-card-title', this.mode)
  },
  methods: {
    addToCart() {
      // TODO:
      // - Validate userInput against itself and the selectedc product's license config
      // --> Set each non-applicable license config attribute to false
      // --> For each input, if only one value is available, set that value
      // Ex: if userInput.type == nonProfit --> set musicVideos to false (else it'll get passed as null)
      // Ex2: if userInput.type == exclusive --> set streams to unlimited
      // Or, should I just a call some sort of forceInput() function on user input?
      // Or a computed?
      const product = this.selectedProduct
      const input = this.userInput

      let shoppingCartObject
      // Beats
      if (product.type === 'Beat') {
        // construct product object
        shoppingCartObject = {
          productId: product.id,
          type: product.type,
          quantity: 1,
          licenseConfiguration: {
            name: input.name,
            type: input.type,
            fileType: input.fileType,
            streams: parseInt(input.streams),
            musicVideos: input.musicVideos,
            radioBroadcasting: input.radioBroadcasting,
            livePerformances: input.livePerformances,
          },
        }
      } else if (product.type === 'Pack') {
        // construct product object
        shoppingCartObject = {
          productId: product.id,
          type: product.type,
          quantity: 1,
          licenseConfiguration: {
            name: input.name,
            type: input.type,
            fileType: input.fileType,
          },
        }
      }

      // commit to cart store
      this.$store.commit('currentOrder/addToCart', shoppingCartObject)

      // close select license modal
      this.$emit('close-modal')

      // open checkout modal if first time adding to cart afer 100ms
      setTimeout(() => {
        this.$nuxt.$emit('open-checkout-modal-after-add-to-cart')
      }, 100)

      // show added to cart notification after 300ms
      setTimeout(() => {
        this.$nuxt.$emit('show-notification', {
          text: `${this.selectedProduct.name} (${this.userInput.name}) was added to your shopping cart!`,
          cardColor: `success`,
          onCardClick: 'openCheckoutModal',
          notificationTypeId: 0,
          duration: 2500,
        })
      }, 300)
    },
    setLicenseTemplate(templateId) {
      // Refactor for selected license type change
      const licenseTemplate = this.licenseTemplates.find(
        (x) => x.id === templateId
      )

      this.userInput.name = licenseTemplate.name
      this.userInput.type = licenseTemplate.attributes.type
      this.userInput.fileType = licenseTemplate.attributes.fileType
      this.userInput.streams = licenseTemplate.attributes.streams
      this.userInput.musicVideos = licenseTemplate.attributes.musicVideos
      this.userInput.radioBroadcasting =
        licenseTemplate.attributes.radioBroadcasting
      this.userInput.livePerformances =
        licenseTemplate.attributes.livePerformances

      this.setMode('summary')
    },
    setMode(mode) {
      this.mode = mode
      this.$emit('set-modal-card-title', mode)
    },
  },
}
</script>

<style lang="scss" scoped>
//
// Streams Slider
//

input[type='range'] {
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 15px;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
}

::-webkit-slider-runnable-track {
  background: #eee;
}

::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: var(--primary);
  box-shadow: -100vw 0 0 calc(100vw - 7.5px) var(--primary);
  border: 0;
  border-radius: 8px;
}

::-moz-range-track {
  height: 15px;
  background: #eee;
}

::-moz-range-thumb {
  background: var(--primary);
  height: 15px;
  width: 15px;
  border: 0;
  border-radius: 8px !important;
  box-shadow: -100vw 0 0 calc(100vw - 7.5px) var(--primary);
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: var(--primary);
}

::-ms-thumb {
  background: var(--primary);
  border: 0;
  border-radius: 8px;
  height: 15px;
  width: 15px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: var(--primary);
  color: transparent;
  height: 15px;
  border: none;
}

::-ms-tooltip {
  display: none;
}

//
// Check Radio Group
//

.check-radio-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
  div {
    white-space: nowrap;
    display: inline;
  }
}

//
// Craft License Steps
//

.craft-license-steps-container {
  padding: 0 15px 15px 15px;

  .craft-license-step {
    background-color: rgba(248, 248, 248, 0.3);
    border: 2px dotted var(--primary);
    border-radius: 8px;
    margin: 0 0 30px 0;
    padding: 15px;
    &.current {
      border-style: solid;
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
