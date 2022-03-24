export const state = () => (
    {
      shoppingCart: [],
      billingDetailsId: null
    }
) 

export const getters = {
  getShoppingCart: (state) => state.shoppingCart,
  getBillingDetailsId: (state) => state.billingDetailsId
}

export const mutations = {
  // TODO: Implement server-side shopping cart data persistence
  addToCart(state, product) {
    // Check if product is already in cart
    let isAlreadyInCart = null

    // Find product by productId, return array of objects where is productId
    const duplicateProducts = state.shoppingCart.filter( (cartItem) => {
          return ((cartItem.productId === product.productId))
      })
    let duplicateProductUscid = null
      
    if (duplicateProducts.length > 0) {
      let isIdentical = null
      
      // Check if license configuration is identical with any product in shopping cart that has productId
      for (
          let i = 0;
          i < duplicateProducts.length;
          i++
      ) {
          const a = duplicateProducts[i].licenseConfiguration
          const b = product.licenseConfiguration
          // Check if identical (excluding the license name) for beats
          if (product.type === 'Beat') {
              if (
                  a.type === b.type &&
                  a.fileType === b.fileType &&
                  a.streams === b.streams &&
                  a.musicVideos === b.musicVideos &&
                  a.radioBroadcasting === b.radioBroadcasting &&
                  a.livePerformances === b.livePerformances
              ) {
                  isIdentical = true
                  // If identical, save the uscid of the identical shopping cart item
                  duplicateProductUscid =
                      duplicateProducts[i].uscid
                  break
              } else {
                  isIdentical = false
              }
          } // Check if identical (excluding the license name) for packs
          else if (product.type === 'Pack') {
              if (
                  a.type === b.type &&
                  a.fileType === b.fileType
              ) {
                  isIdentical = true
                  // If identical, save the uscid of the identical shopping cart item
                  duplicateProductUscid =
                      duplicateProducts[i].uscid
                  break
              } else {
                  isIdentical = false
              }
          }
      }
      if (isIdentical) {
        isAlreadyInCart = true
      } else {
        isAlreadyInCart = false
      }
    } else {
      isAlreadyInCart = false
    }

    // Handle add to cart/increase quantity
      if (isAlreadyInCart) {
        // Get index of duplicate product in state.shoppingcart
        const duplicateProductIndex = state.shoppingCart.findIndex(x => (x.uscid === duplicateProductUscid))
        // Increment quantity
        state.shoppingCart[duplicateProductIndex].quantity++
        // Update localStorage
        // ...
      } else if (!isAlreadyInCart) {
        // Generate a new USCID (Unique Shopping Cart Id, not to be confused with the productId)
        const timestamp = Date.now().toString()
        const randomNumbers = Math.floor(
            Math.random() * 999999
        ).toString()
        // Attach USCID to product object
        product.uscid = timestamp + randomNumbers
        // Push to cart state
        state.shoppingCart.push(product)

        // Update localStorage
        // ...
      }
  },
  removeFromCart(state, uscid) {
    // find index of item in shopping cart with uscid
    const index = state.shoppingCart.findIndex(item => (item.uscid === uscid))

    // remove item at index from shopping cart
    state.shoppingCart.splice(index, 1)

  },
  setBillingDetailsId(state, id) {
    state.billingDetailsId = id
  },
  setRemoveBillingDetailsId(state) {
    state.billingDetailsId = null
  },
  addToCartOld(state, product) {
    // check if product with Id is already added to currentOrder and return array of the object if it already exists
    let resultArray = state.currentOrder.productData.filter( (item) => {
        return ((item.id === product.id))
    });

    // check if product with LicenseTypeId is already added to currentOrder and return array of the object if it already exists
    resultArray = resultArray.filter( (item) => {
      return (item.selectedLicenseData.licenseTypeId === product.selectedLicenseData.licenseTypeId)
    })

    // get index of duplicate product in list of products in currentOrder
    const productIndex = state.currentOrder.productData.findIndex(e => (e.id === product.id) && (e.selectedLicenseData.licenseTypeId === product.selectedLicenseData.licenseTypeId))

    // if array isn't empty (ie. product with Id and license type is already added), increase amount of product in currentOrder
    if (resultArray.length > 0) {
      state.currentOrder.productData[productIndex].count++
      
      // and update localStorage
      localStorage.setItem("shoppingCart", JSON.stringify(state.currentOrder.productData))
    }

    // if array is empty (ie. product with Id and license type isn't already added), push product to currentOrder
    if (resultArray.length === 0) {
      state.currentOrder.productData.push(product)

      // and update localStorage
      if (!localStorage.shoppingCart) {
        const shoppingCart = [product]
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
      } else {
        const localStorageShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
        localStorageShoppingCart.push(product)
        localStorage.setItem("shoppingCart", JSON.stringify(localStorageShoppingCart))
      }
    }
  },
  removeFromCartOld(state, product) {
    // find product object index by Id in array of productData
    const productIndex = state.currentOrder.productData.findIndex(e => (e.id === product.id) && (e.selectedLicenseData.licenseTypeId === product.selectedLicenseData.licenseTypeId))

    // remove product with index from array of productData
    state.currentOrder.productData.splice(productIndex, 1)

    const shoppingCart = state.currentOrder.productData
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    const checkLocalStorageShoppingCartLength = JSON.parse(localStorage.getItem("shoppingCart") || "[]")
    if (checkLocalStorageShoppingCartLength.length === 0) {
      localStorage.removeItem("shoppingCart")
    }

    // // update localStorage
    // let shoppingCart = [product]
    // localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))

    

    // // get products from localstorage
    // let localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));
    // // remove product with index from array of localStorageCart
    // localStorageCart.splice(productIndex, 1)

  },
  getCartFromLocalStorageOld(state) {
    // push products in localStorage.shoppingCart to currentOrder.productData
    state.currentOrder.productData = JSON.parse(localStorage.getItem("shoppingCart") || "[]")

    // NOTE: probably better to reconstruct the product to avoid pulling outdated data?
  }
}