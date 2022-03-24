export const state = () => ({
    isLoggedIn: false,
    accountData: null,
    isVerified: null,
    isAdmin: null,
    sessionCookie: '',
    hasFetched: {
        billingDetails: false
    },
    fetchData: {
        myProducts: {
            hasFetched: false,
            lastFetchedAt: 0,
            hasFetchError: false,
            individualProducts: []
        },
        myOrders: {
            hasFetched: false,
            lastFetchedAt: 0,
            hasFetchError: false,
            individualOrders: []
        }
    }
})

export const getters = {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getAccountData: (state) => state.accountData,
    getIsVerified: (state) => state.isVerified,
    getIsAdmin: (state) => state.isAdmin,
    getSessionCookie: (state) => state.sessionCookie,
    getHasFetchedBillingDetails: (state) => state.hasFetched.billingDetails,
    getFetchDataMyProducts: (state) => state.fetchData.myProducts,
    getFetchDataMyOrders: (state) => state.fetchData.myOrders
}

 export const mutations = {
    setAccountState(state, accountData) {
        // if accountData is null
        // reset state
        if (accountData === null) {
            state.isLoggedIn = false
            state.accountData = null
            state.isVerified = null
            state.isAdmin = null
            state.sessionCookie = ''
            state.hasFetched.billingDetails = false
            state.fetchData.myProducts = {
                hasFetched: false,
                lastFetchedAt: 0,
                hasFetchError: false,
                individualProducts: []
            }
            state.fetchData.myOrders = {
                hasFetched: false,
                lastFetchedAt: 0,
                hasFetchError: false,
                individualOrders: []
            }
        } else {
            // if accountData is not null
            // set isLoggedIn
            state.isLoggedIn = true
            // set accountData
            const transformedAccountData = {
                id: accountData.id,
                email: accountData.email,
                firstName: accountData.first_name,
                lastName: accountData.last_name
            }
            state.accountData = transformedAccountData
            // set isVerified
            if (accountData.is_verified === 1) {
                state.isVerified = true
            } else {
                state.isVerified = false
            }
            // set isAdmin
            if (accountData.is_admin === 1) {
                state.isAdmin = true
            } else {
                state.isAdmin = false
            }
            // set session cookie
            state.sessionCookie = accountData.session_cookie
        }
    },
    setIsVerified(state, newState) {
        state.isVerified = newState
    },
    setBillingDetails(state, newState) {
        // Can only set if account data has been fetched
        if (state.accountData !== null) {

            const billingDetails = []

            for (let index = 0; index < newState.length; index++) {
                const transformedBillingDetails = {
                    id: Number(newState[index].id),
                    email: newState[index].email,
                    firstName: newState[index].first_name,
                    lastName: newState[index].last_name,
                    country: newState[index].country,
                    city: newState[index].city,
                    streetAddress: newState[index].street_address,
                    postalCode: newState[index].postal_code,
                }
                billingDetails.push(transformedBillingDetails)
            }

            state.accountData.billingDetails = billingDetails
        }
    },
    setBillingDetail(state, newState) {
        // Can only set if account data has been fetched
        // Only use this function if you're sure billing details with id aren't already in accountData.billingDetails
        if (state.accountData !== null) {
            const transformedBillingDetails = {
                id: Number(newState.id),
                email: newState.email,
                firstName: newState.first_name,
                lastName: newState.last_name,
                country: newState.country,
                city: newState.city,
                streetAddress: newState.street_address,
                postalCode: newState.postal_code
            }
            state.accountData.billingDetails.push(transformedBillingDetails)
        }
    },
    setHasFetchedBillingDetails(state, newState) {
        state.hasFetched.billingDetails = newState
    },
    setCreatedBillingDetails(state, {input, billingDetailsId}) {
        if (state.accountData !== null) {
            const transformedBillingDetails = {
                id: Number(billingDetailsId),
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                country: input.country,
                city: input.city,
                streetAddress: input.streetAddress,
                postalCode: input.postalCode
            }
            if (Array.isArray(state.accountData.billingDetails)) {
                state.accountData.billingDetails.push(transformedBillingDetails)
            } else {
                state.accountData.billingDetails = []
                state.accountData.billingDetails.push(transformedBillingDetails)
            }
            
        }
    },
    setRemoveBillingDetailsById(state, billingDetailsId) {
        if (state.accountData !== null) {
            // Get index of billing details by id
            const index = state.accountData.billingDetails.findIndex(x => (x.id === billingDetailsId))

            // Remove from accountData.billingDetails array
            state.accountData.billingDetails.splice(index, 1)
        }
    },
    setUpdateBillingDetailsById(state, {input, billingDetailsId}) {
        if (state.accountData !== null) {
            // Get index of billing details by id
            const index = state.accountData.billingDetails.findIndex(x => (x.id === billingDetailsId))
            
            const transformedBillingDetails = {
                id: Number(billingDetailsId),
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                country: input.country,
                city: input.city,
                streetAddress: input.streetAddress,
                postalCode: input.postalCode
            }

            // Update billing details
            state.accountData.billingDetails[index] = transformedBillingDetails
        }
    },
    setReplaceBillingDetailsById(state, newState) {
        if (state.accountData !== null) {
            // Get index of billing details by id
            const index = state.accountData.billingDetails.findIndex(x => (x.id === newState.id))
            
            const transformedBillingDetails = {
                id: Number(newState.id),
                email: newState.email,
                firstName: newState.first_name,
                lastName: newState.last_name,
                country: newState.country,
                city: newState.city,
                streetAddress: newState.street_address,
                postalCode: newState.postal_code
            }

            // Update billing details
            state.accountData.billingDetails[index] = transformedBillingDetails
        }
    },
    setMyProducts(state, newState) {
        // Can only set if account data has been fetched
        if (state.accountData !== null) {

            const myProducts = {
                beats: newState.beats,
                packs: newState.packs
            }

            state.accountData.myProducts = myProducts
        }
    },
    setMyProduct(state, product) {
        // Can only set if account data has been fetched
        if (state.accountData !== null) {
            // Check if all (user's) products have been fetched
            if (!state.fetchData.myProducts.hasFetched) {
                const myProducts = {
                    beats: [],
                    packs: []
                }
                if (product.type === 'Beat') {
                    myProducts.beats.push(product)
                } else if (product.type === 'Pack') {
                    myProducts.packs.push(product)
                }
                state.accountData.myProducts = myProducts
            } else {
                // Check if product is already in accountData.myProducts
                let arrayIndex
                if (product.type === 'Beat') {
                    arrayIndex = state.accountData.myProducts.beats.findIndex(
                        x => (x.id === product.id)
                    )
                } else if (product.type === 'Pack') {
                    arrayIndex = state.accountData.myProducts.packs.findIndex(
                        x => (x.id === product.id)
                    )
                }
                
                // Push if not yet in myProducts, else replace
                if (arrayIndex === -1) {
                    state.accountData.myProducts.push(product)
                } else {
                    state.accountData.myProducts[arrayIndex] = product
                }
            }

            
        }
    },
    setFetchDataMyProducts(state, {hasFetched, timestamp, hasFetchError}) {
        state.fetchData.myProducts.hasFetched = hasFetched
        state.fetchData.myProducts.lastFetchedAt = timestamp
        state.fetchData.myProducts.hasFetchError = hasFetchError
    },
    setFetchDataMyProduct(state, {productType, orderProductDataId, timestamp, hasFetchError, errorResponseStatus}) {
        const productFetchData = {
            type: productType,
            id: orderProductDataId,
            lastFetchedAt: timestamp,
            hasFetchError,
            errorResponseStatus,
            hasFetched: true
        }

        const arrayIndex = state.fetchData.myProducts.individualProducts.findIndex(
            x => (x.id === orderProductDataId && x.type === productType)
        )

        if (arrayIndex === -1) {
            state.fetchData.myProducts.individualProducts.push(productFetchData)
        } else {
            state.fetchData.myProducts.individualProducts[arrayIndex] = productFetchData
        }
    },
    setMyOrders(state, myOrders) {
        // Can only set if account data has been fetched
        if (state.accountData !== null) {
            // Check if any individual orders have been fetched
            if (state.fetchData.myOrders.individualOrders.length > 0) {
                // If so, get order_id's of orders that have already been fetched
                const orderIds = []
                for (let fetchIndex = 0; fetchIndex < state.fetchData.myOrders.individualOrders.length; fetchIndex++) {
                    const orderFetchData = state.fetchData.myOrders.individualOrders[fetchIndex];
                    orderIds.push(orderFetchData.orderId)
                }

                // Check if accountData.myOrders has been set already
                if (typeof state.accountData.myOrders === 'undefined') {
                    // If not, set
                    state.accountData.myOrders = []
                }

                // Iterate over myOrders
                for (let index = 0; index < myOrders.length; index++) {
                    // Check if order_id is in list of previously fetched orders
                    if(!orderIds.includes(myOrders[index].order_id)) {
                        // If not, push into accountData.myOrders
                        state.accountData.myOrders.push(myOrders[index])
                    }
                }
            } else {
                // If no individual orders have been fetched, just set state
                state.accountData.myOrders = myOrders
            }
        }
    },
    setMyOrder(state, order) {
        // Can only set if account data has been fetched
        if (state.accountData !== null) {

            // Check if all (user's) orders have been fetched (general data)
            if (state.fetchData.myOrders.hasFetched) {

                // Check if order with order_id is already in accountData.myOrders
                const arrayIndex = state.accountData.myOrders.findIndex(
                    x => (x.order_id === order.order_id)
                )
                
                // Push if not yet in myProducts, else replace
                if (arrayIndex === -1) {
                    state.accountData.myOrders.push(order)
                } else {
                    state.accountData.myOrders[arrayIndex] = order
                }
            } else {
                // If not fetched, create myOrders array in state.accountData and add fetched order
                const myOrders = []
                myOrders.push(order)
                state.accountData.myOrders = myOrders
            }
        }
    },
    setFetchDataMyOrders(state, {timestamp, hasFetchError}) {
        state.fetchData.myOrders.hasFetched = true
        state.fetchData.myOrders.lastFetchedAt = timestamp
        state.fetchData.myOrders.hasFetchError = hasFetchError
    },
    setFetchDataMyOrder(state, {orderId, timestamp, hasFetchError, errorResponseStatus}) {
        const orderFetchData = {
            orderId,
            lastFetchedAt: timestamp,
            hasFetchError,
            errorResponseStatus,
            hasFetched: true
        }

        // Check if is already in array
        const arrayIndex = state.fetchData.myOrders.individualOrders.findIndex(
            x => (x.orderId === orderId)
        )
        
        // If not, push, else replace
        if (arrayIndex === -1) {
            state.fetchData.myOrders.individualOrders.push(orderFetchData)
        } else {
            state.fetchData.myOrders.individualOrders[arrayIndex] = orderFetchData
        }
    },
}