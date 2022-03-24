<template>
  <div class="notification-container">
    <!-- Default notification -->
    <div
      v-if="notificationData.notificationTypeId === 0"
      class="notification has-text-centered"
      :class="{
        'is-success': notificationData.cardColor === 'success',
        'is-danger': notificationData.cardColor === 'danger',
        'is-info': notificationData.cardColor === 'info',
      }"
    >
      <button
        class="delete"
        @click="closeNotificationManually(notificationData)"
      ></button>
      <div
        class="notification-content is-clickable"
        @click="handleCardClick(notificationData.onCardClick)"
      >
        <p class="persist-multiline">{{ notificationData.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notificationData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  created() {
    if (this.notificationData.duration !== -1) {
      this.$nuxt.$emit('remove-notification', this.notificationData)
    }
  },
  methods: {
    handleCardClick(functionName) {
      // if a valid function name is passed in notificationData.onCardClick, execute funcion
      // if undefined or unknown, do nothing
      if (
        functionName !== undefined &&
        (functionName === 'closeNotificationManually' ||
          functionName === 'openCheckoutModal')
      ) {
        this[functionName](this.notificationData)
      }
    },
    closeNotificationManually(notificationData) {
      this.$nuxt.$emit('close-notification-manually', notificationData.id)
    },
    openCheckoutModal(notificationData) {
      this.$nuxt.$emit('open-checkout-modal-on-click-notification')
      this.closeNotificationManually(notificationData)
    },
  },
}
</script>

<style lang="scss" scoped>
.notification-container {
  padding: 0px;
  margin-bottom: 0;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>
