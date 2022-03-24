<template>
  <div>
    {{ licenseAgreement }}
  </div>
</template>

<script>
export default {
  props: {
    productType: {
      type: String,
      required: true,
    },
    licenseConfiguration: {
      type: Object,
      default() {
        return {}
      },
      required: true,
    },
  },
  computed: {
    licenseAgreement() {
      const productType = this.productType
      const license = this.licenseConfiguration

      let licenseAgreement

      if (productType === 'Beat') {
        if (license.type === 'commercial') {
          licenseAgreement =
            'Commercial, non-exclusive beat license agreement...'
        } else if (license.type === 'nonProfit') {
          licenseAgreement =
            'Non-profit, non-exclusive beat license agreement...'
        } else if (license.type === 'exclusive') {
          licenseAgreement = 'Commercial, exclusive beat license agreement...'
        }
      } else if (productType === 'Pack') {
        if (license.type === 'commercial') {
          licenseAgreement = 'Commercial pack license agreement...'
        } else if (license.type === 'nonProfit') {
          licenseAgreement = 'Non-profit pack license agreement...'
        }
      }

      return licenseAgreement
    },
  },
}
</script>

<style></style>
