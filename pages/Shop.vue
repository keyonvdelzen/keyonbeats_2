<template>
  <div>
    <PageLoadingError
      v-if="allProductsLoadingError"
      error-message="Something went wrong,<br>please try reloading the page."
    />
    <div v-else class="page-content-default">
      <ProductSearch />
    </div>
  </div>
</template>

<router lang="js">
{
  name: 'shop',
  path: '/shop',
}
</router>

<script>
import { mapGetters } from 'vuex'
import ProductSearch from '~/components/product/ProductSearch.vue'
import PageLoadingError from '~/components/UI/loading/PageLoadingError.vue'

export default {
  components: {
    PageLoadingError,
    ProductSearch,
  },
  head() {
    return {
      title: 'Shop',
    }
  },
  computed: {
    ...mapGetters({
      allProductsLoadingError: 'product/getAllProductsLoadingError',
    }),
  },
}
</script>
