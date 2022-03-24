// this store doesn't actually set the elements listed below to visible or hidden.
// instead, this store keeps track of which elements are visible or hidden
// in turn, the variables kept in this store can be referenced to dynamically show or hide elements based on the state of these variables
// this store also keeps track of other general UI data, like the screen dimensions
// and this store also contains some hard coded values, like the audio player height

export const state = () => ({
    // Visibility elements
    showAudioPlayer: false,
    showMobileMenu: false,
    showCheckoutModal: false,
    showSelectLicenseModal: false,
    showFreeDownloadModal: false,
    showMobileAdminMenu: false,

    // Width and height elements
    screenWidth: 0,
    screenHeight: 0,
    siteHeaderHeightMobile: 60,
    audioPlayerHeight: 100,

    // Other elements
    adminViewScroll: true,
    clientIp: ''
})

export const getters = {
    // Visibility getters
    getAudioPlayerVisible: (state) => state.showAudioPlayer,
    getMobileMenuVisible: (state) => state.showMobileMenu,
    getCheckoutModalVisible: (state) => state.showCheckoutModal,
    getSelectLicenseModalVisible: (state) => state.showSelectLicenseModal,
    getFreeDownloadModalVisible: (state) => state.showFreeDownloadModal,
    getMobileAdminMenuVisible: (state) => state.showMobileAdminMenu,

    // Width and height getters
    getScreenWidth: (state) => state.screenWidth,
    getScreenHeight: (state) => state.screenHeight,
    getSiteHeaderHeightMobile: (state) => state.siteHeaderHeightMobile,
    getAudioPlayerHeight: (state) => state.audioPlayerHeight,

    // Other getters
    getAdminViewScroll: (state) => state.adminViewScroll,
    getClientIp: (state) => state.clientIp,
}

export const mutations = {
    // Visibility mutations
    setAudioPlayerVisibility(state, newState) {
        state.showAudioPlayer = newState
    },
    setMobileMenuVisibility(state, newState) {
        state.showMobileMenu = newState
    },
    setCheckoutModalVisibility(state, newState) {
        state.showCheckoutModal = newState
    },
    setSelectLicenseModalVisibility(state, newState) {
        state.showSelectLicenseModal = newState
    },
    setFreeDownloadModalVisibility(state, newState) {
        state.showFreeDownloadModal = newState
    },
    setMobileAdminMenuVisibility(state, newState) {
        state.showMobileAdminMenu = newState
    },

    // width and height mutations
    setScreenWidth(state, newState) {
        state.screenWidth = newState
    },
    setScreenHeight(state, newState) {
        state.screenHeight = newState
    },

    // Other mutations
    setAdminViewScroll(state, newState) {
        state.adminViewScroll = newState
    },
    setClientIp(state, newState) {
        state.clientIp = newState
    },
}