<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="showModal" class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="closeModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-centered mb-0">
              {{ modalCardTitle }}
            </p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <transition name="fade" mode="out-in">
              <div v-if="isLoading" class="loading-container">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <SelectLicense
                v-else-if="!isLoading && !hasLoadingError"
                :selected-product="product"
                @close-modal="closeModal()"
                @set-modal-card-title="setModalCardTitle"
              />
              <p v-else class="has-text-centered">
                Hmm, some error occurred...
              </p>
            </transition>
          </section>
          <footer class="modal-card-foot">
            <p
              class="has-text-centered"
              style="font-size: 12px; text-decoration: underline"
            >
              <font-awesome-icon class="mr-1" icon="info-circle" />Not sure?
              Find more information about licensing here.
            </p>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import productProvider from '~/providers/product'
import SelectLicense from '~/components/license/SelectLicense.vue'

export default {
  components: {
    SelectLicense,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedProductId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      modalCardTitle: 'Craft your license 🛠️',
      isLoading: true,
      hasLoadingError: null,
    }
  },
  computed: {
    ...mapGetters({
      products: 'product/getAllProducts',
    }),
    product() {
      if (this.products.length > 0) {
        return this.products.find((x) => x.id === this.selectedProductId)
      } else {
        return null
      }
    },
  },
  watch: {
    selectedProductId() {
      this.fetchFullProductData()
    },
  },
  methods: {
    async fetchFullProductData() {
      if (!this.product.isFullyFetched) {
        this.isLoading = true
        // Fetch data
        await productProvider.methods
          .getProductById({
            productId: this.product.id,
          })
          .then((response) => {
            // Set product data in store
            this.$store.commit('product/setProductData', response.data)
            this.hasLoadingError = false
          })
          .catch(() => {
            this.hasLoadingError = true
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        // if full product data is already fetched
        this.isLoading = false
        this.hasLoadingError = false
      }
    },
    closeModal() {
      this.$emit('close-modal')
    },
    setModalCardTitle(mode) {
      if (mode === 'selectTemplate') {
        this.modalCardTitle = 'Select a template'
      } else if (mode === 'licenseCrafter') {
        this.modalCardTitle = 'Craft your license 🛠️'
      } else if (mode === 'summary') {
        this.modalCardTitle = 'License summary'
      } else if (mode === 'previewLicenseAgreement') {
        this.modalCardTitle = 'Preview license agreement'
      }
    },
  },
}
</script>

<style scoped>
.loading-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-card-foot {
  justify-content: center;
}
</style>
