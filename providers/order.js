import axios from 'axios'

export default {
    methods: {
        async createOrder({ 
            products,
            totalOrderPrice,
            billingDetails
        }) {
            const response = await axios.post(
                `/api/v1/order/create`,
                {
                    products,
                    totalOrderPrice,
                    billingDetails
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
    }
}