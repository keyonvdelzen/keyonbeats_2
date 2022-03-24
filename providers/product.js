import axios from 'axios'
// import store from '@/store'

export default {
    methods: {
        async getProductById({ 
            productId
        }) {
            // Split by process (server/client), because server-side axios calls can't be proxied (for some reason?...)
            // Client-side axios calls get proxied just fine
            if (process.server) {
                const response = await axios.get(
                `${process.env.API_BASE_URL}/product/get-product-by-id`,
                { params: 
                    {
                        productId
                    },
                    headers: {
                        'Content-type': 'application/json',
                        'Origin': `${process.env.APP_BASE_URL}`,
                        'X-Api-Token': `${process.env.API_TOKEN}`
                    },
                })
                return response
            } else if (process.client) {
                const response = await axios.get(
                `/api/v1/product/get-product-by-id`,
                { params: 
                    {
                        productId
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
        async addProduct({ 
            name = '',
            description = '',
            slug = '',
            productImageFile = '',
            trackPreview = '',
            type = '',
            moods = '',
            genres = '',
            bpm = 0,
            keySignature = '',
            trackLength = '',
            instruments = '',
            downloadSizes = '',
            licenseTypes = '',
        }) {

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('slug', slug)
            formData.append('productImageFile', productImageFile)
            formData.append('trackPreview', trackPreview)
            formData.append('type', type)
            formData.append('moods', moods)
            formData.append('genres', genres)
            formData.append('bpm', bpm)
            formData.append('keySignature', keySignature)
            formData.append('trackLength', trackLength)
            formData.append('instruments', instruments)
            formData.append('downloadSizes', downloadSizes)
            formData.append('licenseTypes', licenseTypes)

            const response = await axios.post(
                `/api/v1/product/add`,
                formData,
                {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    },
                }
            )
            return response
        },
        async updateProductName({ 
            id = '',
            name = '',
        }) {
            const response = await axios.post(
                `/api/v1/product/update/name`,
                {
                    id,
                    name
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            )
            return response
        },
        async updateProductDescription({ 
            id = '',
            description = '',
        }) {
            const response = await axios.post(
                `/api/v1/product/update/description`,
                {
                    id,
                    description
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