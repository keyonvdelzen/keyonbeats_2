export const state = () => (
    {
        firstName: "",
        email: "",
        downloadedProduct: {}
    }
) 

export const getters = {
    getFirstName: (state) => state.firstName,
    getEmail: (state) => state.email,
    getDownloadedProduct: (state) => state.downloadedProduct
}

export const mutations = {
    setFirstName(state, firstName) {
        state.firstName = firstName
    },
    setEmail(state, email) {
        state.email = email
    },
    setDownloadedProduct(state, product) {
        state.downloadedProduct = product
    }
}