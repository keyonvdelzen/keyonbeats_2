import axios from 'axios'

export default {
    methods: {
        async registerAccount({ 
            firstName = '',
            lastName = '',
            email = '',
            password = ''
        }) {
            const response = await axios.post(
                `/api/v1/account/register`,
                {
                    firstName,
                    lastName,
                    email,
                    password
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async loginAccount({
            email = '',
            password = '',
            rememberMe = false
        }) {
            const response = await axios.post(
                `/api/v1/account/login`,
                {
                    email,
                    password,
                    rememberMe
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            return response
        },
        async rememberAccount({
            accountId = '',
            sessionToken = ''
        }) {
            const response = await axios.post(
                `/api/v1//account/remember`,
                {
                    accountId,
                    sessionToken
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            return response
        },
        async verifyAccount({
            verificationCode = ''
        }) {
            const response = await axios.post(
                `/api/v1/account/verify`,
                {
                    verificationCode
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async sendNewVerificationCode() {
            const response = await axios.post(
                `/api/v1/account/send-new-verification-code`,
                {},
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async logoutAccount({
            deleteAllSessions = false
        }) {
            const response = await axios.post(
                `/api/v1/account/logout`,
                {
                    deleteAllSessions
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async sendPasswordResetMail({
            email = ''
        }) {
            const response = await axios.post(
                `/api/v1/account/send-reset-password-mail`,
                {
                    email
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async resetPassword({
            email = '',
            newPassword = '',
            passwordResetHash = ''
        }) {
            const response = await axios.post(
                `/api/v1/account/reset-password`,
                {
                    email,
                    newPassword,
                    passwordResetHash
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async getBillingDetails() {
            const response = await axios.get(
                `/api/v1/account/billing-details/get`,
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
                return response
        },
        async createBillingDetails({
            email = '',
            firstName = '',
            lastName = '',
            country = '',
            city = '',
            streetAddress = '',
            postalCode = ''
        }) {
            const response = await axios.post(
                `/api/v1/account/billing-details/create`,
                {
                    email,
                    firstName,
                    lastName,
                    country,
                    city,
                    streetAddress,
                    postalCode
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async deleteBillingDetails(billingDetailsId) {
            const response = await axios.delete(
                `/api/v1/account/billing-details/delete`, 
                { 
                    data: { 
                        billingDetailsId 
                    } 
                }
            )
            return response
        },
        async updateBillingDetails({
            billingDetailsId,
            email,
            firstName,
            lastName,
            country,
            city,
            streetAddress,
            postalCode
        }) {
            const response = await axios.post(
                `/api/v1/account/billing-details/update`,
                {
                    billingDetailsId,
                    email,
                    firstName,
                    lastName,
                    country,
                    city,
                    streetAddress,
                    postalCode
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async getMyProducts(userSessionCookie) {
            if (process.server) {
                const response = await axios.get(
                    `${process.env.API_BASE_URL}/account/products/get`,
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Origin': `${process.env.APP_BASE_URL}`,
                            'X-Api-Token': `${process.env.API_TOKEN}`,
                            'Cookie': `userSession=${userSessionCookie}`
                            
                        },
                    })
                return response
            } else if (process.client) {
                const response = await axios.get(
                    `/api/v1/account/products/get`,
                    {
                        headers: {
                            'Content-type': 'application/json'
                        },
                    })
                return response
            }
            
        },
        async getMyProduct(productType, orderProductDataId, userSessionCookie) {
            if (process.server) {
                const response = await axios.get(
                `${process.env.API_BASE_URL}/account/product/get`,
                { params: 
                    {
                        productType,
                        orderProductDataId
                    },
                    headers: {
                        'Content-type': 'application/json',
                        'Origin': `${process.env.APP_BASE_URL}`,
                        'X-Api-Token': `${process.env.API_TOKEN}`,
                        'Cookie': `userSession=${userSessionCookie}`
                    },
                })
                return response
            } else if (process.client) {
                const response = await axios.get(
                `/api/v1/account/product/get`,
                { params: 
                    {
                        productType,
                        orderProductDataId
                    }
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
                return response
            }
            
        },
        async getMyOrders(userSessionCookie) {
            if (process.server) {
                const response = await axios.get(
                    `${process.env.API_BASE_URL}/account/orders/get`,
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Origin': `${process.env.APP_BASE_URL}`,
                            'X-Api-Token': `${process.env.API_TOKEN}`,
                            'Cookie': `userSession=${userSessionCookie}`
                            
                        },
                    })
                return response
            } else if (process.client) {
                const response = await axios.get(
                    `/api/v1/account/orders/get`,
                    {
                        headers: {
                            'Content-type': 'application/json'
                        },
                    })
                return response
            }
            
        },
        async getMyOrder(orderId, userSessionCookie) {
            if (process.server) {
                const response = await axios.get(
                `${process.env.API_BASE_URL}/account/order/get`,
                { params: 
                    {
                        orderId
                    },
                    headers: {
                        'Content-type': 'application/json',
                        'Origin': `${process.env.APP_BASE_URL}`,
                        'X-Api-Token': `${process.env.API_TOKEN}`,
                        'Cookie': `userSession=${userSessionCookie}`
                    },
                })
                return response
            } else if (process.client) {
                const response = await axios.get(
                `/api/v1/account/order/get`,
                { params: 
                    {
                        orderId
                    }
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
                return response
            }
            
        },
    },
}