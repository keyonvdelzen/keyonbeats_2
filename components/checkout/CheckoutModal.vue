<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="showModal" class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="closeModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-centered mb-0">
              <span v-if="currentStep === 1">Shopping Cart</span>
              <span v-if="currentStep === 2">Billing Details</span>
              <span v-if="currentStep === 3">Order Summary</span>
              <span v-if="currentStep === 4">Checkout</span>
            </p>
            <button
              class="delete"
              aria-label="close"
              :disabled="isLoadingAny"
              @click="closeModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <div id="checkoutSteps" class="steps">
              <div
                class="step-item"
                :class="{
                  'is-active': currentStep === 1,
                  'is-active is-completed': currentStep > 1,
                }"
              >
                <div
                  class="step-marker"
                  :class="{
                    'is-clickable': currentStep !== 1 && !isLoadingAny,
                  }"
                >
                  <span v-if="currentStep === 1">1</span>
                  <font-awesome-icon
                    v-if="currentStep > 1"
                    class="icon"
                    icon="check"
                  />
                </div>
                <div
                  class="step-details"
                  :class="{
                    'is-clickable': currentStep !== 1 && !isLoadingAny,
                  }"
                >
                  <p class="step-title is-size-7-mobile">Shopping Cart</p>
                </div>
              </div>
              <div
                class="step-item"
                :class="{
                  'is-active': currentStep === 2,
                  'is-active is-completed': currentStep > 2,
                }"
              >
                <div
                  class="step-marker"
                  :class="{
                    'is-clickable':
                      stepIsUnlocked.billingDetails &&
                      currentStep !== 2 &&
                      !isLoadingAny,
                  }"
                >
                  <span v-if="currentStep <= 2">2</span>
                  <font-awesome-icon
                    v-if="currentStep > 2"
                    class="icon"
                    icon="check"
                  />
                </div>
                <div
                  class="step-details"
                  :class="{
                    'is-clickable':
                      stepIsUnlocked.billingDetails &&
                      currentStep !== 2 &&
                      !isLoadingAny,
                  }"
                >
                  <p class="step-title is-size-7-mobile">Billing Details</p>
                </div>
              </div>
              <div
                class="step-item"
                :class="{
                  'is-active': currentStep === 3,
                  'is-active is-completed': currentStep > 3,
                }"
              >
                <div
                  class="step-marker"
                  :class="{
                    'is-clickable':
                      stepIsUnlocked.orderSummary &&
                      currentStep !== 3 &&
                      !isLoadingAny,
                  }"
                >
                  <span v-if="currentStep <= 3">3</span>
                  <font-awesome-icon
                    v-if="currentStep > 3"
                    class="icon"
                    icon="check"
                  />
                </div>
                <div
                  class="step-details"
                  :class="{
                    'is-clickable':
                      stepIsUnlocked.orderSummary &&
                      currentStep !== 3 &&
                      !isLoadingAny,
                  }"
                >
                  <p class="step-title is-size-7-mobile">Order Summary</p>
                </div>
              </div>
              <div
                class="step-item"
                :class="{
                  'is-active': currentStep === 4,
                  'is-active is-completed': currentStep > 4,
                }"
              >
                <div class="step-marker">
                  <span>4</span>
                </div>
                <div class="step-details">
                  <p class="step-title is-size-7-mobile">Checkout</p>
                </div>
              </div>
              <div class="steps-content has-text-centered">
                <transition name="fade" mode="out-in">
                  <ShoppingCart
                    v-if="currentStep === 1"
                    :products="computedOrderData.products"
                    @close-modal="closeModal()"
                  />
                  <BillingDetails
                    v-if="currentStep === 2"
                    :call-method-create-billing-details="
                      callMethodSwitch.createBillingDetails
                    "
                    :call-method-update-billing-details="
                      callMethodSwitch.updateBillingDetails
                    "
                    @set-mode="setBillingDetailsMode"
                    @set-form-input-validity="
                      setBillingDetailsFormInputValidity
                    "
                    @set-is-loading="setBillingDetailsIsLoading"
                    @next-step="setStep('next')"
                  />
                  <OrderSummary
                    v-if="currentStep === 3"
                    :total-order-price="computedOrderData.totalPrice"
                  />
                  <div v-if="currentStep === 4">
                    <p v-if="isLoading.createOrder">creating order...</p>
                    <p v-if="isLoading.checkoutRedirect">redirecting...</p>
                  </div>
                </transition>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <!-- Previous Button -->
            <transition name="fade" mode="out-in">
              <button
                v-if="currentStep > 1"
                class="button is-ghost has-text-black"
                :class="{ 'is-small': screenWidth < 400 }"
                @click="setStep('previous')"
              >
                <span class="icon">
                  <font-awesome-icon icon="arrow-left" />
                </span>
                <transition name="fade" mode="out-in">
                  <span v-if="currentStep === 2" key="two">
                    Shopping Cart
                  </span>
                  <span v-else-if="currentStep === 3" key="three">
                    Billing Details
                  </span>
                </transition>
              </button>
            </transition>
            <!-- Next Button -->
            <button
              class="button is-primary has-text-white has-text-weight-bold"
              :class="{
                'is-loading': nextStepIsLoading,
                'is-small': screenWidth < 400,
              }"
              :disabled="nextStepIsDisabled"
              @click="handleNextStepClick()"
            >
              <transition name="fade" mode="out-in">
                <span v-if="currentStep === 1" key="one">
                  Proceed to checkout
                </span>
                <span v-else-if="currentStep === 2" key="two">
                  Order Summary
                </span>
                <span v-else-if="currentStep === 3" key="three">
                  Checkout
                </span>
              </transition>
              <transition name="rotate-icon" mode="out-in">
                <span v-if="nextStepIsDisabled" key="lock" class="icon">
                  <font-awesome-icon icon="lock" />
                </span>
                <span v-else key="arrow" class="icon">
                  <font-awesome-icon icon="arrow-right" />
                </span>
              </transition>
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShoppingCart from '~/components/checkout/ShoppingCart.vue'
import BillingDetails from '~/components/checkout/BillingDetails.vue'
import OrderSummary from '~/components/checkout/OrderSummary.vue'
import orderProvider from '~/providers/order.js'

export default {
  components: {
    ShoppingCart,
    BillingDetails,
    OrderSummary,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentStep: 1,
      isLoading: {
        createOrder: false,
        checkoutRedirect: false,
      },
      stepData: {
        billingDetails: {
          mode: 'create',
          formInputIsValid: false,
          isLoading: false,
        },
      },
      // Sets prop in child-component, on change it will trigger a watcher that triggers a method (like createBillingDetails())
      callMethodSwitch: {
        createBillingDetails: false,
        updateBillingDetails: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      shoppingCart: 'currentOrder/getShoppingCart',
      productStoreProducts: 'product/getAllProducts',
      selectedBillingDetailsId: 'currentOrder/getBillingDetailsId',
      accountData: 'account/getAccountData',
    }),
    stepIsUnlocked() {
      const data = {
        shoppingCart: true, // always unlocked
        billingDetails: false,
        orderSummary: false,
      }

      // Billing Details
      if (this.shoppingCart.length > 0) {
        data.billingDetails = true
      }

      // Order Summary
      if (
        this.shoppingCart.length > 0 &&
        this.selectedBillingDetailsId !== null
      ) {
        data.orderSummary = true
      }
      return data
    },
    isLoadingAny() {
      let isLoadingAny = false

      if (this.stepData.billingDetails.isLoading) {
        isLoadingAny = true
      }

      return isLoadingAny
    },
    nextStepIsLoading() {
      let isLoading

      // Shopping Cart
      if (this.currentStep === 1) {
        isLoading = false
      }
      // Billing Details
      else if (this.currentStep === 2) {
        if (this.stepData.billingDetails.mode === 'create') {
          if (this.stepData.billingDetails.isLoading) {
            isLoading = true
          } else {
            isLoading = false
          }
        } else if (this.stepData.billingDetails.mode === 'edit') {
          if (this.stepData.billingDetails.isLoading) {
            isLoading = true
          } else {
            isLoading = false
          }
        } else if (this.stepData.billingDetails.mode === 'select') {
          isLoading = false
        }
      }
      // Order Summary
      else if (this.currentStep === 3) {
        isLoading = false
      }

      return isLoading
    },
    nextStepIsDisabled() {
      return true
    },
    computedOrderData() {
      let totalOrderPrice = 0

      const shoppingCart = this.shoppingCart
      const productStoreProducts = this.productStoreProducts

      // for every item in shoppingCart
      // - store associated product's main product store index (for displaying product data in shopping cart)
      // - calculate product's unit price

      for (let index = 0; index < shoppingCart.length; index++) {
        //
        // Set productStoreIndex in shopping cart item object
        //
        const productStoreIndex = productStoreProducts.findIndex(
          (x) => x.id === shoppingCart[index].productId
        )
        shoppingCart[index].productStoreIndex = productStoreIndex

        //
        // Calculate unit price
        //
        const licenseConfiguration = shoppingCart[index].licenseConfiguration

        // Get product's pricing data
        const basePrice = this.productStoreProducts[productStoreIndex].basePrice
        const staticPrices =
          this.productStoreProducts[productStoreIndex].licenseData.staticPrices
        const attributePrices =
          this.productStoreProducts[productStoreIndex].licenseData
            .attributePrices

        // Start with base price
        let unitPrice = basePrice

        // Beats
        if (shoppingCart[index].type === 'Beat') {
          // if non-profit license
          if (licenseConfiguration.type === 'nonProfit') {
            unitPrice = staticPrices.nonProfit
            // if exclusive license
          } else if (licenseConfiguration.type === 'exclusive') {
            unitPrice = staticPrices.exclusive
            // if commercial, non-exclusive license
          } else {
            // Filetypes
            if (licenseConfiguration.fileType === 'mp3') {
              unitPrice = unitPrice + attributePrices.mp3
            } else if (licenseConfiguration.fileType === 'wav') {
              unitPrice = unitPrice + attributePrices.wav
            } else if (licenseConfiguration.fileType === 'stems') {
              unitPrice = unitPrice + attributePrices.stems
            }

            // Streams
            const streams = parseInt(licenseConfiguration.streams) * 10000
            const costPerStream = attributePrices.streams
            unitPrice = unitPrice + streams * costPerStream

            // Music videos
            if (licenseConfiguration.musicVideos) {
              unitPrice = unitPrice + attributePrices.musicVideos
            }

            // Radio broadcasting
            if (licenseConfiguration.radioBroadcasting) {
              unitPrice = unitPrice + attributePrices.radioBroadcasting
            }

            // Live performances
            if (licenseConfiguration.livePerformances) {
              unitPrice = unitPrice + attributePrices.livePerformances
            }
          }
        } // Packs
        else if (shoppingCart[index].type === 'Pack') {
          // if non-profit license
          if (licenseConfiguration.type === 'nonProfit') {
            unitPrice = staticPrices.nonProfit
          } // if commercial license
          // filetypes
          if (licenseConfiguration.fileType === 'mp3') {
            unitPrice = unitPrice + attributePrices.mp3
          } else if (licenseConfiguration.fileType === 'wav') {
            unitPrice = unitPrice + attributePrices.wav
          } else if (licenseConfiguration.fileType === 'stems') {
            unitPrice = unitPrice + attributePrices.stems
          } else if (licenseConfiguration.fileType === 'unprocessed') {
            unitPrice = unitPrice + attributePrices.unprocessed
          }
        }

        // // Round off
        // unitPrice = Math.round(unitPrice * 100) / 100

        // Calc total price per product
        const totalProductPrice = unitPrice * shoppingCart[index].quantity

        // Add to total order price
        totalOrderPrice = totalOrderPrice + totalProductPrice

        // Set unitPrice in shopping cart item object
        shoppingCart[index].unitPrice = unitPrice

        // Set totalProductPrice in shopping cart item object
        shoppingCart[index].totalProductPrice = totalProductPrice
      }

      // Construct orderData object
      const orderData = {
        totalPrice: totalOrderPrice,
        products: shoppingCart,
      }

      return orderData
    },
  },
  mounted() {
    // REFACTOR
    // if (process.client) {
    //     if (localStorage.shoppingCart) {
    //         this.$store.commit('currentOrder/getCartFromLocalStorage')
    //         setTimeout(() => {
    //             $nuxt.$emit(
    //                 'open-checkout-modal-if-shopping-cart-in-local-storage'
    //             )
    //         }, 100)
    //     }
    // }
  },
  methods: {
    handleNextStepClick() {
      if (!this.nextStepIsDisabled) {
        const step = this.currentStep

        if (step === 1) {
          this.setStep('next')
        } else if (step === 2) {
          const mode = this.stepData.billingDetails.mode
          if (mode === 'create') {
            // Call createBillingDetails method in child component
            this.callMethodSwitch.createBillingDetails =
              !this.callMethodSwitch.createBillingDetails
          } else if (mode === 'edit') {
            // Call updateBillingDetails method in child component
            this.callMethodSwitch.updateBillingDetails =
              !this.callMethodSwitch.updateBillingDetails
          } else if (mode === 'select') {
            this.setStep('next')
          }
        } else if (step === 3) {
          this.createOrder()
        }
      }
    },
    setBillingDetailsIsLoading(val) {
      this.stepData.billingDetails.isLoading = val
    },
    setBillingDetailsFormInputValidity(val) {
      this.stepData.billingDetails.formInputIsValid = val
    },
    setBillingDetailsMode(newMode) {
      this.stepData.billingDetails.mode = newMode
    },
    setStep(to) {
      // Next / Previous
      if (typeof to === 'string') {
        if (to === 'next') {
          this.setBillingDetailsIsLoading(false) // force reset loading on going to next step
          this.currentStep++
        } else if (to === 'previous' && !this.isLoadingAny) {
          this.currentStep--
        }
      }
      // Set to a step by number (1, 2, 3, 4)
      else if (typeof to === 'number') {
        if (!this.isLoadingAny) {
          if (to !== this.currentStep) {
            if (to === 1) {
              if (this.stepIsUnlocked.shoppingCart) {
                this.currentStep = to
              }
            } else if (to === 2) {
              if (this.stepIsUnlocked.billingDetails) {
                this.currentStep = to
              }
            } else if (to === 3) {
              if (this.stepIsUnlocked.orderSummary) {
                this.currentStep = to
              }
            } else {
              this.currentStep = to
            }
          }
        }
      }
    },
    async createOrder() {
      if (!this.isLoading.createOrder) {
        this.isLoading.createOrder = true
        this.setStep('next')

        const products = this.computedOrderData.products
        const totalOrderPrice = this.computedOrderData.totalPrice
        const billingDetails =
          this.accountData.billingDetails[
            this.accountData.billingDetails.findIndex(
              (x) => x.id === this.selectedBillingDetailsId
            )
          ]

        await orderProvider.methods
          .createOrder({
            products,
            totalOrderPrice,
            billingDetails,
          })
          .then((response) => {
            // if success
            this.isLoading.createOrder = false
            if (response.status === 201) {
              // Redirect user to checkout
              this.isLoading.checkoutRedirect = true
              // const checkoutLink = response.data.checkoutLink
              setTimeout(() => {
                // window.location.href = checkoutLink
              }, 500) // <-- To delay or not to delay...?
            }
          })
          .catch(() => {
            this.isLoading.createOrder = false
          })
      }
    },
    closeModal() {
      if (!this.isLoadingAny) {
        this.$emit('close-modal')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
