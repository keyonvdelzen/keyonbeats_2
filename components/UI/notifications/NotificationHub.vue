<template>
    <div v-if="notifications.length > 0" class="notification-hub">
        <Notification
            v-for="notification of notifications"
            :key="notification.notificationId"
            class="notification"
            :notificationData="notification"
        />
    </div>
</template>

<script>
import Notification from '~/components/UI/notifications/Notification.vue'

export default {
    components: {
        Notification
    },
    data() {
        return {
            notifications: []
        }
    },
    created() {
        // push notification into array
        this.$nuxt.$on('show-notification', notificationData => {
            // generate random 9-digit number
            const randomNumbers = Math.floor(
                Math.random() * 999999999
            ).toString()

            // generate timestamp in milliseconds (from epoch date)
            const timestamp = Date.now().toString()

            // add the two together (as a string) to generate an id that's very unlikely to reproduce itself
            notificationData.id = randomNumbers + timestamp

            // push notification to notifcations array
            this.notifications.push(notificationData)
        })
        // remove notification from array automatically after $duration
        this.$nuxt.$on('remove-notification', notificationId => {
            this.removeNotification(notificationId)
        })
        // remove notification if user clicks delete button
        this.$nuxt.$on('close-notification-manually', notificationId => {
            this.removeNotificationManually(notificationId)
        })
    },
    methods: {
        removeNotification(notificationData) {
            if (notificationData.duration > -1) {
                setTimeout(() => {
                    // find index of notification from notifications array where id = notificationData.id
                    let index = this.notifications.findIndex(
                        e => e.id === notificationData.id
                    )

                    // splice that notification from array (if it exists)
                    if (index !== -1) {
                        this.notifications.splice(index, 1)
                    }

                    // reset index
                    index = 0
                }, notificationData.duration) // set duration to -1 to force user to close notification manually
            }
        },
        removeNotificationManually(notificationId) {
            // get index of notification from notifications array with Id = notificationData.notificationId
            let index = this.notifications.findIndex(
                e => e.id === notificationId
            )

            // splice that notification from array if it exists
            if (index !== -1) {
                this.notifications.splice(index, 1)
            }

            // reset index to prevent code failure
            index = 0
        }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 769px) {
    .notification-hub {
        position: fixed;
        bottom: 30px;
        margin-bottom: 0;
        width: 500px;
        right: 30px;
        z-index: 1000;
    }
}

@media only screen and (max-width: 768px) {
    .notification-hub {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 15px;
        z-index: 1000;
    }
}
</style>
