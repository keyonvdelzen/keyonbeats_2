export const state = () => ({
  allProductsLoadingError: null,
  // ProductCategory: "beat" or "pack"
  // Moods: "Hard", "Happy", "Sad", "Chill", "Moody"
  // Max 4 moods per beat
  // Genres: "Trap", "Lo-fi", "Hip-hop", "Boom bap", "Alternative", "Pop", "R&B"
  // Max 4 genres per beat

  // DEV: DUMMY PRODUCT DATA
  products: [
    {
        isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
        id: 0,
        name: 'Reverie - Hard Aries Type Beat',
        slug: 'reverie-hard-aries-type-beat',
        type: 'Beat',
        moods: ['Sad', 'Chill', 'Hard'],
        genres: ['Trap', 'Lo-fi', 'Pop'],
        artists: ['Aries'],
        image: require("@/assets/images/reverie.png"),
        audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/reverie.mp3',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        beatDetails: {
          bpm: 120,
          key: 'A minor',
          length: '02:23',
        },
        stemsInclude: {
          instruments: ['Drums', 'Guitar', '808', 'Background vocals'],
        },
        downloadDetails: [],
        licenseTemplates: [],
        basePrice: 15,
        licenseData: {
            nonProfit: true,
            commercial: true,
            exclusive: false,
            mp3: true,
            wav: true,
            stems: true,
            staticPrices: {
                nonProfit: 0,
                exclusive: 250
            },
            attributePrices: {
                mp3: 0,
                wav: 5,
                stems: 20,
                streams: 0.00005,
                musicVideos: 5,
                radioBroadcasting: 5,
                livePerformances: 5
            }
        },
        publicationDate: '2019-03-07'
    },
    {
      isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
      id: 1,
      name: 'I Wonder - Chill Aries Type Beat',
      slug: 'i-wonder-chill-aries-type-beat',
      type: 'Beat',
      moods: ['Happy', 'Chill'],
      genres: ['Pop', 'R&B', 'Trap'],
      artists: ['Aries'],
      image: require("@/assets/images/wonder.png"),
      audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/wonder.mp3',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
      beatDetails: {
        bpm: 120,
        key: 'A minor',
        length: '02:23',
      },
      stemsInclude: {
        instruments: ['Drums', 'Guitar', '808', 'Background vocals'],
      },
      downloadDetails: [],
      licenseTemplates: [],
      basePrice: 15,
      licenseData: {
          nonProfit: true,
          commercial: true,
          exclusive: false,
          mp3: true,
          wav: true,
          stems: true,
          staticPrices: {
              nonProfit: 0,
              exclusive: 250
          },
          attributePrices: {
              mp3: 0,
              wav: 5,
              stems: 20,
              streams: 0.00005,
              musicVideos: 5,
              radioBroadcasting: 5,
              livePerformances: 5
          }
      },
      publicationDate: '2019-03-09'
    },
    {
      isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
      id: 2,
      name: 'Move to the City - The Neighbourhood Type Beat',
      slug: 'move-to-the-city-the-neighbourhood-type-beat',
      type: 'Beat',
      moods: ['Dreamy', 'Chill'],
      genres: ['Pop', 'R&B', 'Alternative'],
      artists: ['The Neighbourhood'],
      image: require("@/assets/images/city.png"),
      audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/city.mp3',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
      beatDetails: {
        bpm: 120,
        key: 'A minor',
        length: '02:23',
      },
      stemsInclude: {
        instruments: ['Drums', 'Guitar', 'Bass Guitar', 'Background vocals'],
      },
      downloadDetails: [],
      licenseTemplates: [],
      basePrice: 15,
      licenseData: {
          nonProfit: true,
          commercial: true,
          exclusive: false,
          mp3: true,
          wav: true,
          stems: true,
          staticPrices: {
              nonProfit: 0,
              exclusive: 250
          },
          attributePrices: {
              mp3: 0,
              wav: 5,
              stems: 20,
              streams: 0.00005,
              musicVideos: 5,
              radioBroadcasting: 5,
              livePerformances: 5
          }
      },
      publicationDate: '2019-03-10'
    },
    {
      isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
      id: 3,
      name: 'Rain - Chill Lo-fi Type Beat',
      slug: 'rain-chill-lo-fi-type-beat',
      type: 'Beat',
      moods: ['Dreamy', 'Chill', 'Sad', 'Moody'],
      genres: ['Lo-fi', 'R&B', 'Alternative', 'Hip-hop', 'Boom bap'],
      artists: [],
      image: require("@/assets/images/rain.png"),
      audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/rain.mp3',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
      beatDetails: {
        bpm: 120,
        key: 'A minor',
        length: '02:23',
      },
      stemsInclude: {
        instruments: ['Drums', 'Guitar', 'Bass Guitar', 'Piano', 'Background vocals'],
      },
      downloadDetails: [],
      licenseTemplates: [],
      basePrice: 15,
      licenseData: {
          nonProfit: true,
          commercial: true,
          exclusive: false,
          mp3: true,
          wav: true,
          stems: true,
          staticPrices: {
              nonProfit: 0,
              exclusive: 250
          },
          attributePrices: {
              mp3: 0,
              wav: 5,
              stems: 20,
              streams: 0.00005,
              musicVideos: 5,
              radioBroadcasting: 5,
              livePerformances: 5
          }
      },
      publicationDate: '2019-03-11'
    },
    {
      isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
      id: 4,
      name: 'Alternative Lo-Fi Guitar Sample Pack',
      slug: 'alternative-lo-fi-guitar-sample-pack',
      type: 'Pack',
      moods: ['Dreamy', 'Chill', 'Sad', 'Moody'],
      genres: ['Lo-fi', 'R&B', 'Alternative', 'Trap'],
      artists: [],
      image: require("@/assets/images/pack.png"),
      audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/pack.mp3',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
      beatDetails: {
        bpm: 120,
        key: 'A minor',
        length: '02:23',
      },
      stemsInclude: {
        instruments: ['Drums', 'Guitar', 'Bass Guitar', 'Piano', 'Background vocals'],
      },
      downloadDetails: [],
      licenseTemplates: [],
      basePrice: 15,
      licenseData: {
          nonProfit: true,
          commercial: true,
          exclusive: false,
          mp3: true,
          wav: true,
          stems: true,
          staticPrices: {
              nonProfit: 0,
              exclusive: 250
          },
          attributePrices: {
              mp3: 0,
              wav: 5,
              stems: 20,
              streams: 0.00005,
              musicVideos: 5,
              radioBroadcasting: 5,
              livePerformances: 5
          }
      },
      publicationDate: '2019-03-11'
    },
    {
      isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
      id: 5,
      name: 'Foresight - Men I Trust Type Beat',
      slug: 'foresight-men-i-trust-type-beat',
      type: 'Beat',
      moods: ['Dreamy', 'Chill', 'Moody'],
      genres: ['Lo-fi', 'R&B', 'Alternative', 'Pop'],
      artists: ['Men I Trust'],
      image: require("@/assets/images/foresight.png"),
      audioPreview: 'http://deadboybeats.com/wp-content/uploads/2022/03/foresight.mp3',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
      beatDetails: {
        bpm: 120,
        key: 'A minor',
        length: '02:23',
      },
      stemsInclude: {
        instruments: ['Drums', 'Guitar', 'Bass Guitar', 'Piano', 'Background vocals'],
      },
      downloadDetails: [],
      licenseTemplates: [],
      basePrice: 15,
      licenseData: {
          nonProfit: true,
          commercial: true,
          exclusive: false,
          mp3: true,
          wav: true,
          stems: true,
          staticPrices: {
              nonProfit: 0,
              exclusive: 250
          },
          attributePrices: {
              mp3: 0,
              wav: 5,
              stems: 20,
              streams: 0.00005,
              musicVideos: 5,
              radioBroadcasting: 5,
              livePerformances: 5
          }
      },
      publicationDate: '2019-03-17'
    },
  ],
  licenseTypes: []
})

export const getters = {
  getAllProductsLoadingError: (state) => state.allProductsLoadingError,
  getAllProducts: (state) => state.products,
  getLicenseTypes: (state) => state.licenseTypes
}

export const mutations = {
  setAllProductsLoadingError(state, newState) {
    state.allProductsLoadingError = newState
  },
  setGeneralProductData(state, products) {
    // Iterate over array of products
    // Transform each and parse data for some attributes (split by comma)
    // Finally, push into state.products
    for (let index = 0; index < products.length; index++) {
      // Transform product data
      const transformedProductsData = {
        isFullyFetched: false,
        id: Number(products[index].product_id),
        name: products[index].name,
        slug: products[index].slug,
        type: products[index].type,
        moods: products[index].moods.split(','),
        genres: products[index].genres.split(','),
        artists: products[index].artists.split(','),
        image: 'https://api.keyonbeats.com/storage/images/product/' + products[index].image,
        audioPreview: 'https://api.keyonbeats.com/storage/audio/' + products[index].audio_preview,
        publicationDate: products[index].publication_date,
      }
      // push into state.products
      state.products.push(transformedProductsData)
    }
  },
  setProductData(state, product) {
    // Find index of product with product.id
    const index = state.products.findIndex(x => x.id === product.product_id)

    if (product.type === 'Beat') {
      // Transform product data for beats
      const transformedBeatData = {
        isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
        id: Number(product.product_id),
        name: product.name,
        slug: product.slug,
        type: product.type,
        moods: product.moods.split(','),
        genres: product.genres.split(','),
        artists: product.artists.split(','),
        image: 'https://api.keyonbeats.com/storage/images/product/' + product.image,
        audioPreview: 'https://api.keyonbeats.com/storage/audio/' + product.audio_preview,
        description: product.description.split('<br>').join('\n'), // replace '<br>' with a line break, give html elements that use this data the 'persist-multiline' class
        beatDetails: {
          bpm: Number(product.bpm),
          key: product.key_signature,
          length: product.track_length,
        },
        stemsInclude: {
          instruments: product.instruments.split(','),
        },
        downloadDetails: [],
        licenseTemplates: [],
        basePrice: parseFloat(product.base_price),
        licenseData: {
            nonProfit: product.non_profit,
            commercial: product.commercial,
            exclusive: product.exclusive,
            mp3: product.mp3,
            wav: product.wav,
            stems: product.stems,
            staticPrices: {
                nonProfit: parseFloat(product.non_profit_price),
                exclusive: parseFloat(product.exclusive_price)
            },
            attributePrices: {
                mp3: parseFloat(product.mp3_price),
                wav: parseFloat(product.wav_price),
                stems: parseFloat(product.stems_price),
                streams: parseFloat(product.streams_price),
                musicVideos: parseFloat(product.music_videos_price),
                radioBroadcasting: parseFloat(product.radio_broadcasting_price),
                livePerformances: parseFloat(product.live_performances_price)
            }
        },
        publicationDate: product.publication_date
      }

      // Remove empty tags
      if (transformedBeatData.artists[0] === '') {
        transformedBeatData.artists = []
      }
      if (transformedBeatData.genres[0] === '') {
        transformedBeatData.genres = []
      }
      if (transformedBeatData.moods[0] === '') {
        transformedBeatData.moods = []
      }

      // Replace product data of product at $index with full product data
      state.products.splice(index, 1, transformedBeatData)

    } else if (product.type === 'Pack') {
      // Transform product data for packs
      const transformedPackData = {
        isFullyFetched: true, // to prevent product data from being re-fetched unnecessarily
        id: Number(product.product_id),
        name: product.name,
        slug: product.slug,
        type: product.type,
        moods: product.moods.split(','),
        genres: product.genres.split(','),
        artists: product.artists.split(','),
        image: 'https://api.keyonbeats.com/storage/images/product/' + product.image,
        audioPreview: 'https://api.keyonbeats.com/storage/audio/' + product.audio_preview,
        description: product.description.split('<br>').join('\n'), // replace '<br>' with a line break, give html elements that use this data the 'persist-multiline' class
        publicationDate: product.publication_date,
        basePrice: parseFloat(product.base_price),
        licenseData: {
            nonProfit: product.non_profit,
            commercial: product.commercial,
            mp3: product.mp3,
            wav: product.wav,
            stems: product.stems,
            unprocessed: product.unprocessed,
            staticPrices: {
                nonProfit: parseFloat(product.non_profit_price)
            },
            attributePrices: {
                mp3: parseFloat(product.mp3_price),
                wav: parseFloat(product.wav_price),
                stems: parseFloat(product.stems_price),
                unprocessed: parseFloat(product.unprocessed_price),
            }
        },
      }

      // Replace product data of product at $index with full product data
      state.products.splice(index, 1, transformedPackData)
    }
    

  },
  setProductsDeprecated(state, products) {
    // transform products and store in state.accountData
    for (let index = 0; index < products.length; index++) {

      // transform product data
      const transformedProductData = {
        id: Number(products[index].id),
        name: products[index].name,
        description: products[index].description.split('<br>').join('\n'), // replace '<br>' with a line break, give html elements that use this data the 'persist-multiline' class
        slug: products[index].slug,
        image: 'https://api.keyonbeats.com/storage/images/product/' + products[index].image_file_name,
        trackPreview: 'https://api.keyonbeats.com/storage/audio/' + products[index].track_preview_file_name,
        type: products[index].type,
        moods: [],
        genres: [],
        beatDetails: {
          bpm: Number(products[index].bpm),
          key: products[index].key_signature,
          length: products[index].track_length,
        },
        stemsInclude: {
          instruments: products[index].instruments.split(','),
        },
        downloadDetails: [],
        licenses: [],
        creationDate: products[index].reg_date,
      }

      // parse moods
      const parsedMoods = products[index].moods.split(',')

      for (let i = 0; i < parsedMoods.length; i++) {
        // remove first character if it's a space
        parsedMoods[i] = parsedMoods[i].replace(/^ /, '')
        transformedProductData.moods.push(parsedMoods[i])
      }

      // parse genres
      const parsedGenres = products[index].genres.split(',')

      for (let i = 0; i < parsedGenres.length; i++) {
        // remove first character if it's a space
        parsedGenres[i] = parsedGenres[i].replace(/^ /, '')
        transformedProductData.genres.push(parsedGenres[i])
      }

      // cross-reference license types and push product's license types into transformedProductData.Licenses
      const parsedLicenseTypes = products[index].license_types.split(',')

      for (let i = 0; i < parsedLicenseTypes.length; i++) {
        // remove spaces
        parsedLicenseTypes[i] = parsedLicenseTypes[i].replace(/\s+/g, '')
        // turn string to number
        parsedLicenseTypes[i] = Number(parsedLicenseTypes[i])
        // match license type by id and push into transformedProductData.Licenses
        const license = state.licenseTypes.find(x => x.licenseTypeId === parsedLicenseTypes[i])
        transformedProductData.licenses.push(license)
      }

      // parse download sizes (using licensetype array as reference)
      const parsedDownloadSizes = products[index].download_sizes.split(',')
      
      for (let i = 0; i < parsedDownloadSizes.length; i++) {
        // remove first character if it's a space
        parsedDownloadSizes[i] = parsedDownloadSizes[i].replace(/^ /, '')
        
        const transformedDownloadSizeObject = {
            name: transformedProductData.licenses[i].name,
            size: parsedDownloadSizes[i]
        }
        
        transformedProductData.downloadDetails.push(transformedDownloadSizeObject)
      }

      // push into state.products
      state.products.push(transformedProductData)

    }
  },
  removeProduct(state, productId) {
    // find index of product with id
    const index = state.products.findIndex(x => x.id === productId)

    // splice that notification from array (if it exists)
    if (index > -1) {
        state.products.splice(index, 1)
    }
  },
  updateProductName(state, newState) {
    // find index of product with id
    const index = state.products.findIndex(x => x.id === newState.id)
    // set state of product.name with id to newState
    state.products[index].name = newState.newName
  },
  updateProductDescription(state, newState) {
    // find index of product with id
    const index = state.products.findIndex(x => x.id === newState.id)
    // set state of product.name with id to newState
    state.products[index].description = newState.newDescription
  },
}