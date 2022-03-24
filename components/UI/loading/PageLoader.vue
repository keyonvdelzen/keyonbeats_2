<template>
  <transition name="fade-slow" mode="out-in">
    <div
      class="pageloader"
      :class="{
        'is-default-layout': !isAdminLayout,
        'is-admin-layout': isAdminLayout,
      }"
    >
      <div class="loading-container">
        <div class="lds-ring-white">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <transition name="slide-fade" mode="out-in">
          <div
            v-if="loadingMessageData !== ''"
            class="loading-message title is-4 is-size-5-mobile has-text-white has-text-bold mt-4 mr-3 ml-3 has-text-centered"
          >
            {{ loadingMessageData }}
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isAdminLayout: {
      type: Boolean,
      default: false,
    },
    // single message
    loadingMessage: {
      type: String,
      default: '',
    },
    // multiple messages
    loadingMessages: {
      type: Array,
      default() {
        return []
      },
    },
    // wait a certain amount of time before showing the (first) loading message
    loadingMessageDelayDuration: {
      type: Number,
      default: 0,
    },
    // time inbetween each message
    loadingMessagesIntervalDuration: {
      type: Number,
      default: 3000,
    },
    // set to false to display the last message indefinitely
    // default = true means it loops the messages infinitely
    loopMessages: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loadingMessageData: '',
      currentLoadingMessage: 1,
    }
  },
  mounted() {
    // only execute if either loadingMessage OR loadingMessages is set
    // if both are set, don't execute
    if (!(this.loadingMessage !== '' && this.loadingMessages.length > 0)) {
      // single message
      if (this.loadingMessage !== '') {
        setTimeout(() => {
          this.loadingMessageData = this.loadingMessage
        }, this.loadingMessageDelayDuration)
      }
      // multiple messages
      if (this.loadingMessages.length > 0) {
        setTimeout(() => {
          this.loadingMessageData = this.loadingMessages[0]

          const messageLooper = setInterval(() => {
            this.loadingMessageData = ''
            setTimeout(() => {
              this.loadingMessageData =
                this.loadingMessages[this.currentLoadingMessage]
              if (
                this.currentLoadingMessage + 1 ===
                this.loadingMessages.length
              ) {
                if (this.loopMessages) {
                  this.currentLoadingMessage = 0
                } else {
                  clearInterval(messageLooper)
                }
              } else {
                this.currentLoadingMessage++
              }
            }, 50)
          }, this.loadingMessagesIntervalDuration)
        }, this.loadingMessageDelayDuration)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

@media only screen and (min-width: 769px) {
  .pageloader {
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: var(--primary);
    z-index: 25;
    height: 100%;

    &.is-default-layout {
      top: 122px;

      .loading-container {
        margin-top: -61px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    &.is-admin-layout {
      top: 0px;

      .loading-container {
        margin-top: 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .pageloader {
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: var(--primary);
    z-index: 25;
    height: 100%;

    &.is-default-layout {
      top: 62px;

      .loading-container {
        margin-top: -31px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    &.is-admin-layout {
      top: 0px;

      .loading-container {
        margin-top: -0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
