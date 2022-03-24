<template>
  <div>
    <p class="mb-5">order data goes here...</p>
    <div class="title is-4">Your Billing Details</div>
    <div class="block">
      <div class="title is-5">
        {{ billingDetail.firstName }}
        {{ billingDetail.lastName }}
      </div>
      <div class="subtitle is-6">
        {{ billingDetail.email }}
      </div>
      <div>
        {{ billingDetail.streetAddress }}
        {{ billingDetail.postalCode }}
      </div>
      <div>
        {{ billingDetail.city }},
        {{ billingDetail.country }}
      </div>
    </div>
    <div class="block">Total order price: {{ totalOrderPrice }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    totalOrderPrice: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedBillingDetailsId: 'currentOrder/getBillingDetailsId',
      accountData: 'account/getAccountData',
    }),
    billingDetail() {
      const index = this.accountData.billingDetails.findIndex(
        (x) => x.id === this.selectedBillingDetailsId
      )

      return this.accountData.billingDetails[index]
    },
  },
}
</script>

<style></style>
