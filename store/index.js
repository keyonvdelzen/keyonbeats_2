/* eslint-disable prefer-const */
export const state = () => ({
  
})

export const mutations = {
  
}

export const actions = {
     nuxtServerInit({ commit }, { redirect, app, req, $config}) {

        // get clientIp
        let ipAddr = req.headers["x-forwarded-for"]
        if (ipAddr){
            // var list = ipAddr.split(",")
            // ipAddr = list[list.length-1]
        } else {
            ipAddr = req.connection.remoteAddress
        }
        
        // set clientIp in store
        commit(
            'userInterface/setClientIp',
            ipAddr
        )

        // TODO: TRUNCATE TO A SINGLE API CALL, OR MOVE FETCH DATA TO LAYOUT
        // --> I'll probably do this once I implement multi-currency and cookie pop-up etc
        // Think I'll just make a single back-end endpoint 'app-startup' or something (containing general product data, country data, currency exchange rates etc)

        //
        // Fetch general product data
        // (Detailed product data is fetched on navigation to product detail page, or on 'Add to cart' click)
        //
        // await app.$axios.get(
        //     `/api/v1/product/get-all-general-product-data`,
        //     {
        //         headers: {
        //             'Content-type': 'application/json'
        //         }
        //     }
        // )
        // .then(response => {
        //     if (response.status === 200) {
        //         commit(
        //             'product/setGeneralProductData',
        //             response.data
        //         )
        //         commit(
        //         'product/setAllProductsLoadingError',
        //         false
        //     )
        //     }
        // })
        // .catch(() => {
        //     // catch unexpected error
        //     // set productStore state.allProductsLoadingError to true
        //     // use this to show users friendly errors
        //     commit(
        //         'product/setAllProductsLoadingError',
        //         true
        //     )
        // })

        // //
        // // Fetch country data
        // //
        // await app.$axios.get(
        //     `/api/v1/country/get-all`,
        //     {
        //         headers: {
        //             'Content-type': 'application/json'
        //         }
        //     }
        // )
        // .then(response => {
        //     if (response.status === 200) {
        //         commit(
        //             'country/setCountryData',
        //             response.data
        //         )
        //         commit(
        //         'country/setAllCountriesLoadingError',
        //         false
        //     )
        //     }
        // })
        // .catch(() => {
        //     // catch unexpected error
        //     // set productStore state.allProductsLoadingError to true
        //     // use this to show users friendly errors
        //     commit(
        //         'country/setAllCountriesLoadingError',
        //         true
        //     )
        // })


        //
        // Stay signed in functionality
        //

        // get user session cookie
        // const userSessionCookie = app.$cookies.get('userSession')

        // // remove deprecated user session cookie
        // app.$cookies.remove('userSession')

        // // check if user session cookie exists
        // if (userSessionCookie) {
        //     // check if rememberMe is true or false
        //     if (userSessionCookie.rememberMe === true) {
        //         // if rememberMe is true, validate sessionToken
        //         await app.$axios.post(
        //             `/api/v1/account/remember`,
        //             {
        //                 rememberMe: true
        //             },
        //             {
        //                 headers: {
        //                     'Content-type': 'application/json'
        //                 }
        //             }
        //         )
        //         .then((response) => {
        //             if (response.status === 201) {
        //                 // create new userSession cookie object
        //                 const userSessionCookieData = {
        //                     accountId: response.data.id,
        //                     sessionToken: response.data.new_session_token,
        //                     rememberMe: true
        //                 }
                        
        //                 // set updated userSession cookie
        //                 app.$cookies.set('userSession', userSessionCookieData, {
        //                     path: '/',
        //                     maxAge: 60 * 60 * 24,
        //                     sameSite: 'Lax',
        //                     secure: true,
        //                     httpOnly: true
        //                 })

        //                 // construct accountData object
        //                 let accountData = {
        //                     id: response.data.id,
        //                     email: response.data.email,
        //                     first_name: response.data.first_name,
        //                     last_name: response.data.last_name,
        //                     is_verified: response.data.is_verified,
        //                     is_admin: response.data.is_admin,
        //                     session_cookie: JSON.stringify(userSessionCookieData)
        //                 }
                        
        //                 // set accountData in accountStore
        //                 commit(
        //                         'account/setAccountState',
        //                         accountData
        //                     )
        //             }
        //         })
        //         .catch((error) => {
        //             if (error.response.status === 403 && error.response.data === 'Unauthorized Session') {
        //                 return redirect('/account/login?showNotification=sessionExpired')
        //             } 
        //         })
        //     } else {
        //         // if rememberMe is false

        //         // if cookie has accountId and sessionToken, remove expired token from database
        //         if (userSessionCookie.accountId && userSessionCookie.sessionToken ) {
        //             await app.$axios.post(
        //                 `/api/v1/account/remember`,
        //                 {
        //                     rememberMe: false
        //                 },
        //                 {
        //                     headers: {
        //                         'Content-type': 'application/json'
        //                     }
        //                 }
        //             )
        //             .catch(() => {})
        //             .finally(() => {
        //                 return redirect('/account/login?showNotification=sessionExpired')
        //             })
        //         }
        //     }
        // } 
    }
}