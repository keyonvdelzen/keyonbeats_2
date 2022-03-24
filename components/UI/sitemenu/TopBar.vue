<template>
    <div class="topbar">
        <div class="store-notice">
            <p class="store-notice-message has-text-bold">
                INSTANT DOWNLOAD ON ALL PRODUCTS
            </p>
        </div>
        <!-- <div class="cart">
          <a>
              <span class="text has-text-white">View cart</span>
              <font-awesome-icon class="icon has-text-white" icon="shopping-cart" />
              <span class="cart-total">0</span>
          </a>
      </div> -->
    </div>
</template>

<style scoped>
.topbar {
    height: 30px;
    background-color: var(--primary);
}

.cart {
    float: right;
    padding: 0 30px 0 0;
}

.store-notice {
    line-height: 30px;
    text-align: center;
    color: #fff;
}

@media only screen and (min-width: 769px) {
    .store-notice-message {
        text-align: center;
        font-size: 20px;
    }
}

@media only screen and (max-width: 768px) {
    .store-notice-message {
        text-align: center;
        font-size: 13px;
    }
}
</style>
