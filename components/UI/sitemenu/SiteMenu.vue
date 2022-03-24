<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- Site logo -->
        <a
          v-if="screenWidth > 768"
          class="site-logo"
          @click="
            goToPage('/')
            closeMobileMenu()
          "
        >
          keyonbeats
        </a>
        <!-- Site logo mobile -->
        <a
          v-if="screenWidth < 769"
          class="site-logo"
          @click="
            goToPage('/')
            closeMobileMenu()
          "
        >
          keyon
        </a>
        <!-- Shopping cart mobile/tablet -->
        <div
          v-if="screenWidth < 1024"
          class="navbar-item shopping-cart is-clickable"
          style="margin-left: auto; margin-right: 0"
          @click="
            emitOpenCheckoutModal()
            closeMobileMenu(100)
            showAccountMenuDropDown = false
          "
        >
          <font-awesome-icon
            class="icon has-text-primary"
            icon="shopping-cart"
          />
          <span v-if="shoppingCart.length === 0" class="cart-total-empty">{{
            shoppingCart.length
          }}</span>
          <span v-if="shoppingCart.length > 0" class="cart-total">{{
            shoppingCart.length
          }}</span>
        </div>
        <!-- If logged in -->
        <!-- My account mobile -->

        <div
          v-if="screenWidth < 769 && isLoggedIn"
          class="navbar-item has-dropdown has-text-centered-touch"
          @click="closeMobileMenu()"
        >
          <a
            class="navbar-link is-arrowless"
            @click="toggleAccountMenuDropDown()"
          >
            <!-- Show first name if screenWidth > 399px and firstName is shorter than 11 characters -->
            <span
              v-if="screenWidth > 399 && accountData.firstName.length < 11"
              class="has-text-purple has-text-bold is-clickable"
            >
              <font-awesome-icon class="mr-2" icon="user" />
              <span>{{ accountData.firstName }}</span>
            </span>
            <!-- Hide firstName if screenWidth < 400px or if firstname is longer than 10 characters -->
            <span
              v-if="screenWidth < 400 || accountData.firstName.length > 10"
              class="has-text-purple has-text-bold is-clickable"
            >
              <font-awesome-icon icon="user" />
            </span>
          </a>
          <transition name="fade" mode="out-in">
            <div
              v-if="showAccountMenuDropDown"
              class="navbar-dropdown is-right"
              @click="toggleAccountMenuDropDown()"
            >
              <NuxtLink to="/account/dashboard" class="navbar-item"
                >Dashboard
              </NuxtLink>
              <NuxtLink to="/account/products" class="navbar-item"
                >Products</NuxtLink
              >
              <NuxtLink to="/account/orders" class="navbar-item"
                >Orders</NuxtLink
              >
              <NuxtLink to="/account/wishlist" class="navbar-item"
                >Wishlist</NuxtLink
              >
              <NuxtLink to="/account/settings" class="navbar-item"
                >Settings</NuxtLink
              >
              <NuxtLink v-if="isAdmin" to="/admin/dashboard" class="navbar-item"
                >Admin</NuxtLink
              >
              <hr class="navbar-divider" />
              <a
                class="navbar-item"
                :class="{
                  'has-activer-link-color': logOutLinkIsActive,
                }"
                @click="handleLogOut()"
              >
                Log out
              </a>
            </div>
          </transition>
        </div>
        <!-- My account tablet -->
        <div
          v-if="screenWidth < 1024 && screenWidth > 768 && isLoggedIn"
          class="navbar-item has-dropdown has-text-centered-touch"
          @click="closeMobileMenu()"
        >
          <a
            class="navbar-link is-arrowless"
            @click="toggleAccountMenuDropDown()"
          >
            <!-- Show first name if shorter than 17 characters -->
            <span
              v-if="accountData.firstName.length < 17"
              class="has-text-purple has-text-bold is-clickable"
            >
              <font-awesome-icon class="mr-2" icon="user" />
              <span>{{ accountData.firstName }}</span>
            </span>
            <!-- Hide firstName if longer than 16 characters -->
            <span
              v-if="accountData.firstName.length > 16"
              class="has-text-purple has-text-bold is-clickable"
            >
              <font-awesome-icon icon="user" />
            </span>
          </a>
          <transition name="fade" mode="out-in">
            <div
              v-if="showAccountMenuDropDown"
              class="navbar-dropdown is-right"
              @click="toggleAccountMenuDropDown()"
            >
              <NuxtLink to="/account/dashboard" class="navbar-item"
                >Dashboard</NuxtLink
              >
              <NuxtLink to="/account/products" class="navbar-item"
                >Products</NuxtLink
              >
              <NuxtLink to="/account/orders" class="navbar-item"
                >Orders</NuxtLink
              >
              <NuxtLink to="/account/wishlist" class="navbar-item"
                >Wishlist</NuxtLink
              >
              <NuxtLink to="/account/settings" class="navbar-item"
                >Settings</NuxtLink
              >
              <NuxtLink v-if="isAdmin" to="/admin/dashboard" class="navbar-item"
                >Admin</NuxtLink
              >
              <hr class="navbar-divider" />
              <a
                class="navbar-item"
                :class="{
                  'has-activer-link-color': logOutLinkIsActive,
                }"
                @click="handleLogOut()"
              >
                Log out
              </a>
            </div>
          </transition>
        </div>
        <!-- If not logged in -->
        <!-- Login button mobile -->
        <div
          v-show="screenWidth < 769 && !isLoggedIn"
          class="navbar-item"
          @click="closeMobileMenu()"
        >
          <NuxtLink to="/account/login">Log In</NuxtLink>
        </div>
        <!-- Login button tablet -->
        <div
          v-if="screenWidth < 1024 && screenWidth > 768 && !isLoggedIn"
          class="navbar-item"
          @click="closeMobileMenu()"
        >
          <NuxtLink to="/account/login">Log In</NuxtLink>
        </div>
        <!-- Sign up button tablet -->
        <div
          v-if="screenWidth < 1024 && screenWidth > 768 && !isLoggedIn"
          class="navbar-item"
          @click="closeMobileMenu()"
        >
          <NuxtLink to="/account/register">
            <button
              class="button is-primary has-text-bold"
              :class="{
                'is-outlined': $route.path === '/account/register',
                'has-text-white': $route.path !== '/account/register',
              }"
            >
              <span>
                <span>Sign Up</span>
              </span>
            </button>
          </NuxtLink>
        </div>
        <!-- Mobile burger menu toggle -->
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileMenu }"
          aria-label="menu"
          aria-expanded="false"
          @click="
            toggleMobileMenu()
            showAccountMenuDropDown = false
          "
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <transition name="fade" mode="out-in">
        <!-- Navbar menu (transforms to expandable menu on tablet/mobile) -->
        <div
          v-if="screenWidth > 1023 || showMobileMenu"
          class="navbar-menu"
          :class="{ 'is-active': showMobileMenu }"
        >
          <div class="navbar-end">
            <!-- Home -->
            <div
              class="navbar-item has-text-centered-touch"
              @click="closeMobileMenu()"
            >
              <NuxtLink to="/">Home</NuxtLink>
            </div>
            <!-- Shop -->
            <div
              class="navbar-item has-text-centered-touch"
              @click="closeMobileMenu()"
            >
              <NuxtLink to="/shop">Shop</NuxtLink>
            </div>
            <!-- Sign up CTA mobile site menu bottom -->
            <div
              v-if="
                screenWidth < 769 &&
                screenHeight > 500 &&
                !isLoggedIn &&
                $route.path !== '/account/register'
              "
              class="mobile-menu-sign-up-cta has-text-centered"
            >
              <h1 class="title is-4">New here?</h1>
              <NuxtLink to="/account/register">
                <button
                  class="button is-large is-primary has-text-bold"
                  :class="{
                    'is-outlined': $route.path === '/account/register',
                    'has-text-white': $route.path !== '/account/register',
                  }"
                  @click="closeMobileMenu()"
                >
                  <span>
                    <span>Create account 💖</span>
                    <font-awesome-icon icon="arrow-right" class="ml-2" />
                  </span>
                </button>
              </NuxtLink>
            </div>
            <!-- My account desktop -->
            <div
              v-if="screenWidth > 1023 && isLoggedIn"
              class="navbar-item has-dropdown has-text-centered-touch"
              :class="{
                'is-active': showAccountMenuDropDown,
              }"
            >
              <a
                class="navbar-link is-arrowless"
                @click="toggleAccountMenuDropDown()"
              >
                <!-- Show first name if shorter than 17 characters -->
                <span
                  v-if="accountData.firstName.length < 17"
                  class="has-text-purple has-text-bold is-clickable"
                >
                  <font-awesome-icon class="mr-2" icon="user" />
                  <span>{{ accountData.firstName }}</span>
                </span>
                <!-- Hide firstName if longer than 16 characters -->
                <span
                  v-if="accountData.firstName.length > 16"
                  class="has-text-purple has-text-bold is-clickable"
                >
                  <font-awesome-icon icon="user" />
                </span>
              </a>
              <transition name="fade" mode="out-in">
                <div
                  v-if="showAccountMenuDropDown"
                  class="navbar-dropdown is-right"
                  @click="toggleAccountMenuDropDown()"
                >
                  <NuxtLink to="/account/dashboard" class="navbar-item"
                    >Dashboard</NuxtLink
                  >
                  <NuxtLink to="/account/products" class="navbar-item"
                    >Products</NuxtLink
                  >
                  <NuxtLink to="/account/orders" class="navbar-item"
                    >Orders</NuxtLink
                  >
                  <NuxtLink to="/account/wishlist" class="navbar-item"
                    >Wishlist</NuxtLink
                  >
                  <NuxtLink to="/account/settings" class="navbar-item"
                    >Settings</NuxtLink
                  >
                  <NuxtLink
                    v-if="isAdmin"
                    to="/admin/dashboard"
                    class="navbar-item"
                    >Admin</NuxtLink
                  >
                  <hr class="navbar-divider" />
                  <a class="navbar-item" @click="handleLogOut()"> Log out </a>
                </div>
              </transition>
            </div>

            <!-- Log in button -->
            <div
              v-if="screenWidth > 1023 && !isLoggedIn"
              class="navbar-item has-text-centered-touch"
            >
              <NuxtLink to="/account/login">Log In</NuxtLink>
            </div>
            <!-- Sign up button -->
            <div
              v-if="screenWidth > 1023 && !isLoggedIn"
              class="navbar-item has-text-centered-touch"
            >
              <NuxtLink to="/account/register">
                <button
                  class="button is-primary has-text-bold"
                  :class="{
                    'is-outlined': $route.path === '/account/register',
                    'has-text-white': $route.path !== '/account/register',
                  }"
                  @mouseenter="setSignUpButtonHoverState(true)"
                  @mouseleave="setSignUpButtonHoverState(false)"
                >
                  <span>
                    <span>Sign Up</span>
                  </span>
                </button>
              </NuxtLink>
            </div>
            <!-- Shopping cart desktop-->
            <div
              v-if="screenWidth > 1023"
              class="navbar-item is-clickable"
              @click="
                emitOpenCheckoutModal()
                closeMobileMenu(100)
              "
            >
              <font-awesome-icon
                class="icon has-text-primary pb-1"
                icon="shopping-cart"
              />
              <span v-if="shoppingCart.length === 0" class="cart-total-empty">{{
                shoppingCart.length
              }}</span>
              <span v-if="shoppingCart.length > 0" class="cart-total">{{
                shoppingCart.length
              }}</span>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import accountProvider from '~/providers/account.js'

export default {
  data() {
    return {
      showMobileMenu: false,
      showAccountMenuDropDown: false,
      logOutLinkIsActive: false,
      screenHeight: 0,
      isHoveringSignUpButton: false,
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      isLoggedIn: 'account/getIsLoggedIn',
      isAdmin: 'account/getIsAdmin',
      accountData: 'account/getAccountData',
      shoppingCart: 'currentOrder/getShoppingCart',
    }),
  },
  mounted() {
    this.setScreenHeight()
    window.addEventListener('resize', this.setScreenHeight)

    document.addEventListener('click', this.closeAccountMenuDropDown)
  },
  destroyed() {
    window.removeEventListener('resize', this.setScreenHeight)
    document.removeEventListener('click', this.closeAccountMenuDropDown)
  },
  methods: {
    setSignUpButtonHoverState(value) {
      this.isHoveringSignUpButton = value
    },
    setScreenHeight() {
      this.screenHeight = window.innerHeight
    },
    clearAccountStore() {
      this.$store.commit('account/setAccountState', null)
    },
    handleLogOut() {
      this.logOutLinkIsActive = true
      this.deleteUserSession()
    },
    async deleteUserSession() {
      // logoutAccount method in accountProvider deletes current userSession from database
      await accountProvider.methods
        .logoutAccount({
          deleteAllSessions: false,
        })
        .then((response) => {
          if (response.status === 200 && response.data === 'Session Deleted') {
            this.afterLogOut()
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            if (error.response.data === 'Unauthorized Session') {
              this.afterLogOut()
            } else {
              // if other 403 error
              this.$router.push({ path: 'oops' })
            }
          } else if (
            error.response.status === 404 &&
            error.response.data === 'No Session Found'
          ) {
            this.afterLogOut()
          } else {
            this.$nuxt.$emit('show-notification', {
              cardColor: 'danger',
              text: `Oops, something unexpected happened 🤔\n Please try again or contact support if the issue persists.`,
              onCardClick: 'closeNotificationManually',
              notificationTypeId: 0,
              duration: -1,
            })
          }
        })
    },
    afterLogOut() {
      this.clearAccountStore()
      this.showAccountMenuDropDown = false
      this.logOutLinkIsActive = false
      this.goToPage('/account/login')
    },
    closeAccountMenuDropDown(e) {
      if (!this.$el.contains(e.target)) {
        this.showAccountMenuDropDown = false
      }
    },
    toggleAccountMenuDropDown() {
      this.showAccountMenuDropDown = !this.showAccountMenuDropDown
    },
    goToPage(path) {
      this.$router.push({ path })
    },
    toggleMobileMenu() {
      if (this.screenWidth < 1024) {
        if (this.showMobileMenu === false) {
          this.showMobileMenu = true
          this.$store.commit('userInterface/setMobileMenuVisibility', true)
        } else {
          this.showMobileMenu = false
          this.$store.commit('userInterface/setMobileMenuVisibility', false)
        }
      }
    },
    closeMobileMenu(delay) {
      if (this.screenWidth < 1024) {
        if (delay) {
          setTimeout(() => {
            this.showMobileMenu = false
            this.$store.commit('userInterface/setMobileMenuVisibility', false)
          }, delay)
        } else {
          this.showMobileMenu = false
          this.$store.commit('userInterface/setMobileMenuVisibility', false)
        }
      }
    },
    emitOpenCheckoutModal() {
      this.$nuxt.$emit('open-checkout-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
// Navbar styling desktop
@media only screen and (min-width: 1024px) {
  .navbar {
    padding: 0 30px 0 30px;
    height: 90px;
    margin: 0 auto;
    box-shadow: 0 2px 0 0 #f5f5f5;
  }

  .navbar-brand {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

    .site-logo {
      font-size: 40px;
      color: var(--primary);

      &:hover {
        color: var(--primary);
      }
    }
  }

  .navbar-burger {
    margin-left: 0px;
  }

  .navbar-end {
    //  Account menu dropdown
    .navbar-item.has-dropdown {
      .navbar-dropdown {
        background-color: white;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 2px solid #dbdbdb;
        box-shadow: 0 5px 8px rgb(10 10 10 / 10%);
        display: block;
        font-size: 1em;
        left: auto;
        right: 0;
        min-width: 100%;
        position: absolute;
        top: 100%;
        z-index: 30;

        .navbar-divider {
          background-color: whitesmoke;
          border: none;
          display: block;
          height: 2px;
          margin: 0.5rem 0;
        }
      }
    }
  }
}

// Navbar styling tablet
@media only screen and (min-width: 769px) and (max-width: 1023px) {
  .navbar {
    padding: 0 30px 0 30px;
    height: 90px;
    margin: 0 auto;
    box-shadow: 0 2px 0 0 #f5f5f5;
  }

  .navbar-brand {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

    .site-logo {
      font-size: 40px;
      color: var(--primary);

      &:hover {
        color: var(--primary);
      }
    }
    //  Account menu dropdown
    .navbar-item.has-dropdown {
      .navbar-dropdown {
        background-color: white;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 2px solid #dbdbdb;
        box-shadow: 0 5px 8px rgb(10 10 10 / 10%);
        display: block;
        font-size: 1em;
        left: auto;
        right: 0;
        min-width: 100%;
        position: absolute;
        top: 100%;
        z-index: 30;
        margin-top: 25px;

        .navbar-divider {
          background-color: whitesmoke;
          border: none;
          display: block;
          height: 2px;
          margin: 0.5rem 0;
        }
      }
    }
  }

  .navbar-burger {
    margin-left: 0px;
  }

  .navbar-end {
    .navbar-item .has-dropdown {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// Navbar styling mobile
@media only screen and (max-width: 768px) {
  .navbar {
    padding: 0 30px 0 30px;
    height: 60px;
    margin: 0 auto;
    box-shadow: 0 2px 0 0 #f5f5f5;
  }

  .navbar-brand {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .site-logo {
      font-size: 6vw;
      color: var(--primary);

      &:hover {
        color: var(--primary);
      }
    }
    //  Account menu dropdown
    .navbar-item.has-dropdown {
      .navbar-dropdown {
        background-color: white;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 2px solid #dbdbdb;
        box-shadow: 0 5px 8px rgb(10 10 10 / 10%);
        display: block;
        font-size: 1em;
        left: auto;
        right: 0;
        min-width: 100%;
        position: absolute;
        top: 100%;
        z-index: 30;
        margin-top: 10px;

        .navbar-divider {
          background-color: whitesmoke;
          border: none;
          display: block;
          height: 2px;
          margin: 0.5rem 0;
        }
      }
    }
  }

  .navbar-burger {
    margin-left: 0px;
  }
}

// Some extra styling
.navbar div a {
  font-weight: bold;
  color: var(--primary);
}

.navbar div a.nuxt-link-exact-active {
  color: #2c3e50;
}

.button.is-primary.is-outlined:hover,
.button.is-primary.is-outlined.is-hovered,
.button.is-primary.is-outlined:focus,
.button.is-primary.is-outlined.is-focused {
  background-color: white;
  border-color: var(--primary);
  color: var(--primary);
}

/* Sitemenu dropdown styling tablet */
@media screen and (max-width: 1023px) and (min-width: 769px) {
  .navbar-menu.is-active {
    display: block;
    position: absolute;
    width: 100%;
    height: calc(100vh - 122px);
    margin: 0;
    padding: 0;
    left: 0;
    top: 92px;
    box-shadow: none;
    overflow: hidden;
  }
  .navbar-end > .navbar-item:nth-of-type(even) {
    background: #fcfcfc;
  }

  .navbar-end .navbar-item {
    padding: 15px 0 15px 0;
    font-weight: bold;
    color: var(--primary);
    border-bottom: 1px solid #dbdbdb;
  }

  .navbar-end .navbar-item a {
    font-weight: bold;
    color: var(--primary);
    font-size: 26px;
  }
}

/* Sitemenu dropdown styling mobile */
@media screen and (max-width: 768px) {
  .navbar-menu.is-active {
    display: block;
    position: absolute;
    width: 100%;
    height: calc(100vh - 62px);
    margin: 0;
    padding: 0;
    left: 0;
    top: 62px;
    box-shadow: none;
    overflow: hidden;
  }
  .navbar-end > .navbar-item:nth-of-type(even) {
    background: #fcfcfc;
  }

  .navbar-end .mobile-menu-sign-up-cta {
    position: absolute;
    bottom: 100px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .navbar-end .navbar-item {
    padding: 15px 0 15px 0;
    font-weight: bold;
    color: var(--primary);
    border-bottom: 1px solid #dbdbdb;
  }

  .navbar-end .navbar-item a {
    font-weight: bold;
    color: var(--primary);
    font-size: 26px;
  }
}

// Shopping cart menu icon styling
.cart-total-empty {
  color: white;
  background-color: #474747;
  padding: 0;
  display: inline-block;
  border-radius: 50%;
  font-size: 9px;
  width: 14px;
  text-align: center;
  height: 14px;
  margin: 3px 0 0 3px;
  line-height: 14px;
}

.cart-total {
  color: white;
  background-color: #474747;
  padding: 0;
  display: inline-block;
  border-radius: 50%;
  font-size: 9px;
  width: 14px;
  text-align: center;
  height: 14px;
  margin: 3px 0 0 3px;
  line-height: 14px;
}
</style>
