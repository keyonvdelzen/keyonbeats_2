<template>
  <div>
    <div class="product-table">
      <table class="table is-striped is-hoverable is-fullwidth has-text-left">
        <thead v-if="products.length > 0">
          <tr>
            <th></th>
            <th>Name</th>
            <th class="is-hidden-touch">Type</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product of products"
            :key="'tr_' + product.uscid"
            class="product-table-row"
          >
            <td
              class="is-vcentered is-clickable"
              @click="
                goToProduct(
                  product.productId,
                  productStoreProducts[product.productStoreIndex].slug
                )
              "
            >
              <figure class="image is-64x64 is-hcentered">
                <img
                  :src="productStoreProducts[product.productStoreIndex].image"
                  width="64"
                  height="64"
                />
              </figure>
            </td>
            <td
              class="is-vcentered is-clickable"
              @click="
                goToProduct(
                  product.productId,
                  productStoreProducts[product.productStoreIndex].slug
                )
              "
            >
              <div>
                <h1 class="title is-5 is-size-6-touch mb-1">
                  {{ productStoreProducts[product.productStoreIndex].name }}
                </h1>
                <p v-if="product.type === 'Beat'">
                  {{ product.licenseConfiguration.name }}
                </p>
              </div>
            </td>
            <td class="is-vcentered is-hidden-touch">
              <div class="tags">
                <span class="tag is-purple mr-4">{{ product.type }}</span>
              </div>
            </td>
            <td class="is-vcentered">
              {{ product.quantity }}
            </td>
            <td class="is-vcentered">
              {{ product.unitPrice }}
            </td>
            <td class="is-vcentered">
              <font-awesome-icon
                class="icon is-small is-clickable"
                icon="trash-alt"
                @click="
                  removeFromCart(
                    productStoreProducts[product.productStoreIndex].name,
                    product.uscid
                  )
                "
              />
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <article class="message mt-3">
              <div class="message-body">
                <p>Your shopping cart is currently empty!</p>
              </div>
            </article>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Mobile product table (screenwidth < 768px) -->
    <!-- TODO: optimize mobile product table styling -->
    <!-- <div class="is-hidden-tablet">
            <div
                v-for="product of products"
                :key="
                    product.id + '_' + product.selectedLicenseData.licenseTypeId
                "
                class="product-table-mobile"
            >
                <div class="columns is-mobile is-vcentered margin-top">
                    <div class="column is-2" style="min-width: 69px;">
                        <figure class="image is-64x64">
                            <img class="product-image" :src="product.image" />
                        </figure>
                    </div>
                    <div class="column is-10 has-text-left">
                        <h1 class="title is-6 mb-1">{{ product.name }}</h1>
                        <p
                            v-if="
                                product.selectedLicenseData.LicenseTypeId !== 0
                            "
                        >
                            {{ product.selectedLicenseData.Name }}
                        </p>
                    </div>
                </div>
                <div class="columns is-mobile mb-3 is-vcentered">
                    <div class="column has-text-left">
                        <font-awesome-icon
                            @click="removeFromCart(product)"
                            class="icon is-small is-clickable ml-5"
                            icon="trash-alt"
                        />
                    </div>
                    <div class="column has-text-left">
                        {{ product.count }}
                    </div>
                    <div class="column has-text-left">
                        €{{
                            (
                                product.selectedLicenseData.amount.value *
                                product.count
                            ).toFixed(2)
                        }}
                    </div>
                </div>
            </div>
            <div v-if="products.length === 0">
                <article class="message mt-3">
                    <div class="message-body">
                        <p>Your shopping cart is currently empty!</p>
                        <button
                            class="button is-primary has-text-white mt-3"
                        >
                            Start shopping
                        </button>
                    </div>
                </article>
            </div>
        </div> -->
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
  },
  computed: {
    ...mapGetters({
      productStoreProducts: 'product/getAllProducts',
    }),
  },
  methods: {
    removeFromCart(productName, productUscid) {
      this.$store.commit('currentOrder/removeFromCart', productUscid)
      setTimeout(() => {
        this.$nuxt.$emit('show-notification', {
          text: `${productName} was removed from your shopping cart!`,
          cardColor: 'info',
          onCardClick: 'closeNotificationManually',
          notificationTypeId: 0,
          duration: 2500,
        })
      }, 300)
    },
    goToProduct(productId, productSlug) {
      this.$emit('close-modal')
      setTimeout(() => {
        const path = `/product/${productId}/${productSlug}`
        if (this.$route.path !== path) {
          this.$router.push({
            path,
            params: {
              productId,
              productSlug,
            },
          })
          // .catch(err => {
          //     err
          // })
        }
      }, 100)
    },
  },
}
</script>

<style scoped>
/* Styling mobile */
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

.product-table-mobile {
  margin-bottom: 35px;
  padding: auto;
  border-bottom: 1px solid #eee;
}

.product-table-mobile:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>
