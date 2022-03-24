export const state = () => (
    {
        currentTrackProductId: -1,
        isPlaying: false,
        isLoading: false
    }
) 

export const getters = {
    getCurrentTrackProductId: (state) => state.currentTrackProductId,
    getIsPlaying: (state) => state.isPlaying,
    getIsLoading: (state) => state.isLoading
}

export const mutations = {
    setCurrentTrackProductId(state, id) {
        state.currentTrackProductId = id
    },
    setIsPlaying(state, value) {
        state.isPlaying = value
    },
    setIsLoading(state, value) {
        state.isLoading = value
    }
}