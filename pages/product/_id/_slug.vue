<template>
  <div>
    <!-- If loading  -->
    <!-- Replace PageLoader with in-component loading placeholders later -->
    <PageLoader
      v-if="isLoading"
      :loading-messages="[
        `Fetching product data... ⚙️`,
        `But, it seems that I'm a little slow today 🤔`,
        `Sorry, this usually doesn't happen... 😔`,
        `Almost done... `,
        `Okay I give up, could you try reloading me?`,
      ]"
      :loop-messages="false"
      :loading-messages-interval-duration="3000"
      :loading-message-delay-duration="1000"
    />
    <!-- If product exists in state, is not loading and there are no loading errors -->
    <ProductDetail
      v-if="
        product && !isLoading && !allProductsLoadingError && !hasLoadingError
      "
    />
    <!-- If product doesn't exist in state and there are no loading errors -->
    <div
      v-if="!product && !isLoading && !allProductsLoadingError"
      class="page-content-full has-text-centered"
    >
      <div class="columns is-vcentered is-mobile is-fullheight">
        <div class="column">
          <h1 class="title is-size-2-desktop is-size-3-tablet is-size-5-mobile">
            Oops... 🙊
          </h1>
          <p
            class="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile"
          >
            The product you're looking for doesn't exist.
          </p>
          <NuxtLink to="/" class="button is-primary has-text-white">
            <span>
              <span>Take me home</span>
              <font-awesome-icon icon="arrow-right" class="ml-2" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- If there's any loading error -->
    <div
      v-if="!isLoading && (allProductsLoadingError || hasLoadingError)"
      class="page-content-full has-text-centered"
    >
      <div class="columns is-vcentered is-mobile is-fullheight">
        <div class="column">
          <h1 class="title is-size-2-desktop is-size-3-tablet is-size-5-mobile">
            Oops... 😭
          </h1>
          <p
            class="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile mb-3"
          >
            Something went wrong, <br />
            please try reloading the page.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import productProvider from '~/providers/product'
import ProductDetail from '~/components/product/ProductDetail.vue'
import PageLoader from '~/components/UI/loading/PageLoader.vue'

export default {
  components: {
    ProductDetail,
    PageLoader,
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      productId: Number(this.$route.params.id),
      isLoading: true,
      hasLoadingError: null,
    }
  },
  // TODO: USE ASYNCDATA INSTEAD OF FETCH
  // --> RESOLVED DURING ROUTE TRANSITION
  // --> NO UGLY PAGELOADER (:
  // OR: KEEP FETCH() AND USE CUSTOM PLACEHOLDER LOADERS?
  async fetch() {
    // If product exists
    if (this.product) {
      // and hasn't been fully fetched yet
      if (!this.product.isFullyFetched) {
        this.isLoading = true
        // Fetch data
        await productProvider.methods
          .getProductById({
            productId: this.productId,
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
    } else {
      // if product with id doesn't exist (in Vuex state)
      this.isLoading = false
      this.hasLoadingError = false
    }
  },
  head() {
    if (this.product) {
      return {
        title: `${this.product.name}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.description}`,
          },
        ],
      }
    } else {
      return {
        title: "Sorry, this product doesn't exist",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              "Oops, something seems to have gone wrong. The product you're looking for doesn't exist.",
          },
          {
            hid: 'robots',
            name: 'robots',
            content: 'noindex',
          },
        ],
      }
    }
  },

  computed: {
    ...mapGetters({
      allProductsLoadingError: 'product/getAllProductsLoadingError',
      products: 'product/getAllProducts',
    }),
    product() {
      if (this.products.length > 0) {
        return this.products.find((product) => product.id === this.productId)
      } else {
        return null
      }
    },
  },
}
</script>
