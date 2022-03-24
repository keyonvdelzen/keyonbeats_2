<template>
  <div>
    <!-- If Loading -->
    <div v-if="isLoading.getBillingDetails">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <!-- If Loading Error -->
      <div
        v-if="hasLoadingError.getBillingDetails || allCountriesLoadingError"
        class="modal-error-container"
      >
        <div class="block">
          <h1 class="title is-size-3-desktop is-size-4-tablet is-size-5-mobile">
            Oops... 😭
          </h1>
          <p
            class="subtitle is-size-5-desktop is-size-5-tablet is-size-6-mobile"
          >
            Something went wrong, <br />
            please try reloading
            <span v-if="allCountriesLoadingError">the page, </span>
            or contact support if the issue persists.
          </p>
        </div>
        <div v-if="!allCountriesLoadingError" class="block">
          <button
            class="button is-primary has-text-white"
            @click="getBillingDetails"
          >
            <span>Reload</span>
            <span class="icon">
              <font-awesome-icon icon="sync-alt" />
            </span>
          </button>
        </div>
      </div>
      <!-- Component Content -->
      <div v-else>
        <!-- Billing Details Selection -->
        <div v-if="mode === 'select'">
          <div class="block">
            <div class="title is-5">Select your billing details</div>
          </div>
          <!-- Existing billing details -->
          <transition-group
            v-if="accountData.billingDetails.length > 0"
            name="fade"
            tag="div"
            class="billing-details-items"
          >
            <div
              v-for="billingDetail of accountData.billingDetails"
              :key="billingDetail.id"
              class="billing-details-item"
              :class="{
                'is-selected': selectedBillingDetailsId === billingDetail.id,
              }"
              @click="setSelectedBillingDetailsId(billingDetail.id)"
            >
              <div class="block">
                <div class="title is-5">
                  {{ billingDetail.firstName }}
                  {{ billingDetail.lastName }}
                </div>
                <div class="subtitle is-6">
                  {{ billingDetail.email }}
                </div>
                <div>
                  {{ billingDetail.streetAddress }}
                  {{ billingDetail.postalCode }}
                </div>
                <div>
                  {{ billingDetail.city }},
                  {{ billingDetail.country }}
                </div>
              </div>
              <div
                v-if="selectedBillingDetailsId === billingDetail.id"
                class="block"
              >
                <div class="buttons is-centered">
                  <!-- Edit Button -->
                  <div
                    class="button is-small is-blue"
                    :disabled="isSavingAny"
                    @click="handleEditBillingDetailsButtonClick(billingDetail)"
                  >
                    <span> Edit </span>
                    <span class="icon">
                      <font-awesome-icon icon="edit" />
                    </span>
                  </div>
                  <!-- Delete Button -->
                  <div
                    class="button is-small is-danger"
                    :class="{
                      'is-loading': isSaving.deleteBillingDetails,
                    }"
                    :disabled="isSaving.deleteBillingDetails"
                    @click="
                      showDeleteSafetyCheck &&
                      deleteSafetyCheckId === billingDetail.id
                        ? deleteBillingDetails(billingDetail.id)
                        : setShowDeleteSafetyCheck(billingDetail.id)
                    "
                  >
                    <transition name="fade" mode="out-in">
                      <span
                        v-if="
                          deleteSafetyCheckId === billingDetail.id &&
                          showDeleteSafetyCheck
                        "
                        key="deleteBillingDetailsButtonTextCheck"
                      >
                        Yes, I'm sure
                      </span>
                      <span v-else key="deleteBillingDetailsButtonText">
                        Delete
                      </span>
                    </transition>
                    <transition name="rotate-icon" mode="out-in">
                      <span
                        v-if="
                          deleteSafetyCheckId === billingDetail.id &&
                          showDeleteSafetyCheck
                        "
                        key="deleteCheck"
                        class="icon"
                      >
                        <font-awesome-icon icon="check" />
                      </span>
                      <span v-else key="deleteTrash" class="icon">
                        <font-awesome-icon icon="times" />
                      </span>
                    </transition>
                  </div>
                </div>
              </div>
              <div class="block">
                <article
                  v-if="hasSavingError.deleteBillingDetails"
                  class="message is-danger"
                >
                  <div class="message-body">
                    <div>
                      {{ savingError.deleteBillingDetails.message }}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </transition-group>
          <div v-if="accountData.billingDetails.length < 3">
            <div
              v-if="accountData.billingDetails.length > 0"
              class="is-divider"
              data-content="OR"
            ></div>
            <!-- Add new billing details -->
            <div class="billing-details-items">
              <div class="billing-details-item is-dormant">
                <button
                  class="button"
                  :disabled="isSavingAny"
                  @click="
                    setModeTo('create')
                    resetErrorState()
                  "
                >
                  <span>
                    <span v-if="screenWidth > 399"
                      >Add new billing details</span
                    >
                    <span v-else>Add new</span>
                  </span>

                  <span class="icon">
                    <font-awesome-icon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Create/Edit Billing Details -->
        <div v-else>
          <!-- Billing Details Form -->
          <div class="block has-text-left">
            <!-- First name and last name -->
            <div class="columns is-mobile">
              <div class="column">
                <div class="field">
                  <label class="label">
                    <span>First name</span>
                    <span class="has-text-danger"> *</span>
                  </label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      :value="formInput.firstName"
                      placeholder="First name"
                      class="input"
                      :class="{
                        'is-danger': $v.formInput.firstName.$error,
                        'is-success':
                          !$v.formInput.firstName.$error &&
                          $v.formInput.firstName.$dirty,
                      }"
                      :disabled="
                        isSaving.createBillingDetails ||
                        isSaving.updateBillingDetails
                      "
                      @input="
                        delayTouch($v.formInput.firstName)
                        formInput.firstName = $event.target.value
                      "
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="user" />
                    </span>
                    <span
                      v-if="
                        !$v.formInput.firstName.$error &&
                        $v.formInput.firstName.$dirty
                      "
                      class="icon is-small is-right has-text-success"
                    >
                      <font-awesome-icon icon="check" />
                    </span>
                    <span
                      v-if="$v.formInput.firstName.$error"
                      class="icon is-small is-right"
                    >
                      <font-awesome-icon icon="exclamation-triangle" />
                    </span>
                  </div>
                  <p
                    v-if="
                      !$v.formInput.firstName.minLength &&
                      $v.formInput.firstName.$error &&
                      formInput.firstName.length > 0
                    "
                    class="help is-danger"
                  >
                    First name must have at least
                    {{ $v.formInput.firstName.$params.minLength.min }}
                    characters
                  </p>
                  <p
                    v-if="
                      !$v.formInput.firstName.maxLength &&
                      $v.formInput.firstName.$error &&
                      formInput.firstName.length > 0
                    "
                    class="help is-danger"
                  >
                    First name can have a maximum of
                    {{ $v.formInput.firstName.$params.maxLength.max }}
                    characters
                  </p>
                  <p
                    v-if="
                      $v.formInput.firstName.$dirty &&
                      formInput.firstName.length === 0
                    "
                    class="help is-danger"
                  >
                    First name is required
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">
                    <span>Last name</span>
                    <span class="has-text-danger"> *</span>
                  </label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      :value="formInput.lastName"
                      placeholder="Last name"
                      class="input"
                      :class="{
                        'is-danger': $v.formInput.lastName.$error,
                        'is-success':
                          !$v.formInput.lastName.$error &&
                          $v.formInput.lastName.$dirty,
                      }"
                      :disabled="
                        isSaving.createBillingDetails ||
                        isSaving.updateBillingDetails
                      "
                      @input="
                        delayTouch($v.formInput.lastName)
                        formInput.lastName = $event.target.value
                      "
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="user" />
                    </span>
                    <span
                      v-if="
                        !$v.formInput.lastName.$error &&
                        $v.formInput.lastName.$dirty
                      "
                      class="icon is-small is-right has-text-success"
                    >
                      <font-awesome-icon icon="check" />
                    </span>
                    <span
                      v-if="$v.formInput.lastName.$error"
                      class="icon is-small is-right"
                    >
                      <font-awesome-icon icon="exclamation-triangle" />
                    </span>
                  </div>
                  <p
                    v-if="
                      !$v.formInput.lastName.minLength &&
                      $v.formInput.lastName.$error &&
                      formInput.lastName.length > 0
                    "
                    class="help is-danger"
                  >
                    Last name must have at least
                    {{ $v.formInput.lastName.$params.minLength.min }}
                    characters
                  </p>
                  <p
                    v-if="
                      !$v.formInput.lastName.maxLength &&
                      $v.formInput.lastName.$error &&
                      formInput.lastName.length > 0
                    "
                    class="help is-danger"
                  >
                    Last name can have a maximum of
                    {{ $v.formInput.lastName.$params.maxLength.max }}
                    characters
                  </p>
                  <p
                    v-if="
                      $v.formInput.lastName.$dirty &&
                      formInput.lastName.length === 0
                    "
                    class="help is-danger"
                  >
                    Last name is required
                  </p>
                </div>
              </div>
            </div>
            <!-- Email -->
            <div class="field mb-5">
              <label class="label">
                <span>Email</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-left has-icons-right">
                <input
                  :value="formInput.email"
                  placeholder="email@example.com"
                  class="input"
                  :class="{
                    'is-danger': $v.formInput.email.$error,
                    'is-success':
                      !$v.formInput.email.$error && $v.formInput.email.$dirty,
                  }"
                  :disabled="
                    isSaving.createBillingDetails ||
                    isSaving.updateBillingDetails
                  "
                  @input="
                    delayTouch($v.formInput.email)
                    formInput.email = $event.target.value
                  "
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope" />
                </span>
                <span
                  v-if="!$v.formInput.email.$error && $v.formInput.email.$dirty"
                  class="icon is-small is-right has-text-success"
                >
                  <font-awesome-icon icon="check" />
                </span>
                <span
                  v-if="$v.formInput.email.$error"
                  class="icon is-small is-right"
                >
                  <font-awesome-icon icon="exclamation-triangle" />
                </span>
              </div>
              <!-- Validation errors (email) -->
              <p
                v-if="!$v.formInput.email.email && $v.formInput.email.$error"
                class="help is-danger"
              >
                This email is invalid
              </p>
              <p
                v-if="
                  $v.formInput.email.email &&
                  $v.formInput.email.$error &&
                  $v.formInput.email.$dirty
                "
                class="help is-danger"
              >
                Email is required
              </p>
            </div>
            <!-- Country -->
            <div class="field">
              <label class="label">
                <span>Country</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-left">
                <div
                  class="select is-fullwidth"
                  :class="{
                    'is-success': $v.formInput.country.hasValidInput,
                  }"
                >
                  <select
                    name="country"
                    :value="formInput.country"
                    :disabled="
                      isSaving.createBillingDetails ||
                      isSaving.updateBillingDetails
                    "
                    @input="
                      delayTouch($v.formInput.country)
                      formInput.country = $event.target.value
                    "
                  >
                    <option selected disabled>Select a country</option>
                    <option
                      v-for="country of countryData"
                      :key="country.id"
                      :value="country['alpha-2_code']"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="globe" />
                </span>
              </div>
            </div>
            <!-- City -->
            <div class="field">
              <label class="label">
                <span>City</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-right">
                <input
                  :value="formInput.city"
                  placeholder="City or town"
                  class="input"
                  :class="{
                    'is-danger': $v.formInput.city.$error,
                    'is-success':
                      !$v.formInput.city.$error && $v.formInput.city.$dirty,
                  }"
                  :disabled="
                    isSaving.createBillingDetails ||
                    isSaving.updateBillingDetails
                  "
                  @input="
                    delayTouch($v.formInput.city)
                    formInput.city = $event.target.value
                  "
                />
                <span
                  v-if="!$v.formInput.city.$error && $v.formInput.city.$dirty"
                  class="icon is-small is-right has-text-success"
                >
                  <font-awesome-icon icon="check" />
                </span>
                <span
                  v-if="$v.formInput.city.$error"
                  class="icon is-small is-right"
                >
                  <font-awesome-icon icon="exclamation-triangle" />
                </span>
              </div>
              <p
                v-if="
                  !$v.formInput.city.maxLength &&
                  $v.formInput.city.$error &&
                  formInput.city.length > 0
                "
                class="help is-danger"
              >
                City can have a maximum of
                {{ $v.formInput.city.$params.maxLength.max }}
                characters
              </p>
              <p
                v-if="$v.formInput.city.$dirty && formInput.city.length === 0"
                class="help is-danger"
              >
                City is required
              </p>
            </div>
            <!-- Street address -->
            <div class="field">
              <label class="label">
                <span>Street address</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-right">
                <input
                  :value="formInput.streetAddress"
                  placeholder="Street address"
                  class="input"
                  :class="{
                    'is-danger': $v.formInput.streetAddress.$error,
                    'is-success':
                      !$v.formInput.streetAddress.$error &&
                      $v.formInput.streetAddress.$dirty,
                  }"
                  :disabled="
                    isSaving.createBillingDetails ||
                    isSaving.updateBillingDetails
                  "
                  @input="
                    delayTouch($v.formInput.streetAddress)
                    formInput.streetAddress = $event.target.value
                  "
                />
                <span
                  v-if="
                    !$v.formInput.streetAddress.$error &&
                    $v.formInput.streetAddress.$dirty
                  "
                  class="icon is-small is-right has-text-success"
                >
                  <font-awesome-icon icon="check" />
                </span>
                <span
                  v-if="$v.formInput.streetAddress.$error"
                  class="icon is-small is-right"
                >
                  <font-awesome-icon icon="exclamation-triangle" />
                </span>
              </div>
              <p
                v-if="
                  !$v.formInput.streetAddress.maxLength &&
                  $v.formInput.streetAddress.$error &&
                  formInput.streetAddress.length > 0
                "
                class="help is-danger"
              >
                Street address can have a maximum of
                {{ $v.formInput.streetAddress.$params.maxLength.max }}
                characters
              </p>
              <p
                v-if="
                  $v.formInput.streetAddress.$dirty &&
                  formInput.streetAddress.length === 0
                "
                class="help is-danger"
              >
                Street address is required
              </p>
            </div>
            <!-- Postal code -->
            <div class="field">
              <label class="label">
                <span>Postal code</span>
                <span class="has-text-danger"> *</span>
              </label>
              <div class="control has-icons-right">
                <input
                  :value="formInput.postalCode"
                  placeholder="Postal code"
                  class="input"
                  :class="{
                    'is-danger': $v.formInput.postalCode.$error,
                    'is-success':
                      !$v.formInput.postalCode.$error &&
                      $v.formInput.postalCode.$dirty,
                  }"
                  :disabled="
                    isSaving.createBillingDetails ||
                    isSaving.updateBillingDetails
                  "
                  @input="
                    delayTouch($v.formInput.postalCode)
                    formInput.postalCode = $event.target.value
                  "
                />
                <span
                  v-if="
                    !$v.formInput.postalCode.$error &&
                    $v.formInput.postalCode.$dirty
                  "
                  class="icon is-small is-right has-text-success"
                >
                  <font-awesome-icon icon="check" />
                </span>
                <span
                  v-if="$v.formInput.postalCode.$error"
                  class="icon is-small is-right"
                >
                  <font-awesome-icon icon="exclamation-triangle" />
                </span>
              </div>
              <p
                v-if="
                  !$v.formInput.postalCode.minLength &&
                  $v.formInput.postalCode.$error &&
                  formInput.postalCode.length > 0
                "
                class="help is-danger"
              >
                Postal code must have at least
                {{ $v.formInput.postalCode.$params.minLength.min }}
                characters
              </p>
              <p
                v-if="
                  !$v.formInput.postalCode.maxLength &&
                  $v.formInput.postalCode.$error &&
                  formInput.postalCode.length > 0
                "
                class="help is-danger"
              >
                Postal code can have a maximum of
                {{ $v.formInput.postalCode.$params.maxLength.max }}
                characters
              </p>
              <p
                v-if="
                  $v.formInput.postalCode.$dirty &&
                  formInput.postalCode.length === 0
                "
                class="help is-danger"
              >
                Postal code is required
              </p>
            </div>
          </div>
          <!-- Form Submit Errors -->
          <div class="block">
            <article
              v-if="hasSavingError.createBillingDetails"
              class="message is-danger"
            >
              <div class="message-body">
                <div>
                  {{ savingError.createBillingDetails.message }}
                </div>
                <button
                  v-if="savingError.createBillingDetails.type === 'isDuplicate'"
                  class="button mt-3"
                  @click="
                    handleClickDuplicateDetailsError(
                      savingError.createBillingDetails.duplicateBillingDetails
                    )
                  "
                >
                  <span>Yes</span>
                  <span class="icon">
                    <font-awesome-icon icon="arrow-right" />
                  </span>
                </button>
                <button
                  v-if="savingError.createBillingDetails.type === 'reachedMax'"
                  class="button mt-3"
                  @click="getBillingDetails"
                >
                  <span>Reload</span>
                  <span class="icon">
                    <font-awesome-icon icon="sync-alt" />
                  </span>
                </button>
              </div>
            </article>
            <article
              v-if="hasSavingError.updateBillingDetails"
              class="message is-danger"
            >
              <div class="message-body">
                <div>
                  {{ savingError.updateBillingDetails.message }}
                </div>
                <button
                  v-if="savingError.updateBillingDetails.type === 'isDuplicate'"
                  class="button mt-3"
                  @click="
                    handleClickDuplicateDetailsError(
                      savingError.updateBillingDetails.duplicateBillingDetails
                    )
                  "
                >
                  <span>Yes</span>
                  <span class="icon">
                    <font-awesome-icon icon="arrow-right" />
                  </span>
                </button>
              </div>
            </article>
          </div>
          <!-- Back button -->
          <div v-if="hasFetchedBillingDetails" class="block">
            <button
              v-if="accountData.billingDetails.length > 0"
              class="button is-ghost"
              :disabled="isSavingAny"
              @click="handleClickBackButton"
            >
              <span class="icon"><font-awesome-icon icon="arrow-left" /></span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  maxLength,
  not,
} from '@vuelidate/validators'
import accountProvider from '~/providers/account.js'

const touchMap = new WeakMap()

export default {
  props: {
    callMethodCreateBillingDetails: {
      type: Boolean,
      default: false,
    },
    callMethodUpdateBillingDetails: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      formInput: {
        firstName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(64),
        },
        lastName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(64),
        },
        email: {
          required,
          email,
        },
        country: {
          hasValidInput: not((val) => {
            return val === 'Select a country'
          }),
        },
        city: {
          required,
          maxLength: maxLength(128),
        },
        streetAddress: {
          required,
          maxLength: maxLength(128),
        },
        postalCode: {
          required,
          maxLength: maxLength(16),
        },
      },
    }
  },
  data() {
    return {
      mode: 'create',
      formInput: {
        firstName: '',
        lastName: '',
        email: '',
        country: 'Select a country',
        city: '',
        streetAddress: '',
        postalCode: '',
      },
      showDeleteSafetyCheck: false,
      deleteSafetyCheckId: null,
      isLoading: {
        getBillingDetails: false,
      },
      hasLoadingError: {
        getBillingDetails: false,
      },
      isSaving: {
        createBillingDetails: false,
        deleteBillingDetails: false,
        updateBillingDetails: false,
      },
      hasSavingError: {
        createBillingDetails: false,
        deleteBillingDetails: false,
        updateBillingDetails: false,
      },
      savingError: {
        createBillingDetails: {
          type: '',
          message: '',
          duplicateBillingDetails: null,
        },
        deleteBillingDetails: {
          type: '',
          message: '',
        },
        updateBillingDetails: {
          type: '',
          message: '',
          duplicateBillingDetails: null,
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      accountData: 'account/getAccountData',
      hasFetchedBillingDetails: 'account/getHasFetchedBillingDetails',
      selectedBillingDetailsId: 'currentOrder/getBillingDetailsId',
      countryData: 'country/getAllCountries',
      allCountriesLoadingError: 'country/getAllCountriesLoadingError',
    }),
    isSavingAny() {
      let isSavingAny = false

      if (
        this.isSaving.createBillingDetails ||
        this.isSaving.deleteBillingDetails ||
        this.isSaving.updateBillingDetails
      ) {
        isSavingAny = true
      }

      return isSavingAny
    },
    formInputIsValid() {
      let isValid

      if (this.$v.formInput.$dirty && !this.$v.formInput.$invalid) {
        isValid = true
      } else {
        isValid = false
      }

      return isValid
    },
  },
  watch: {
    mode(newMode) {
      this.$emit('set-mode', newMode)
    },
    formInputIsValid(newValue) {
      this.$emit('set-form-input-validity', newValue)
    },
    'isSaving.createBillingDetails'(newValue) {
      this.$emit('set-is-loading', newValue)
    },
    'isSaving.deleteBillingDetails'(newValue) {
      this.$emit('set-is-loading', newValue)
    },
    'isSaving.updateBillingDetails'(newValue) {
      this.$emit('set-is-loading', newValue)
    },
    callMethodCreateBillingDetails(a, b) {
      if (a !== b) {
        this.createBillingDetails()
      }
    },
    callMethodUpdateBillingDetails(a, b) {
      if (a !== b) {
        this.updateBillingDetails()
      }
    },
  },
  mounted() {
    // Initiate component
    if (!this.hasFetchedBillingDetails) {
      this.getBillingDetails()
      // --> Calls setMode
    } else {
      this.setMode()
    }
  },
  beforeDestroy() {
    // Reset synced data on parent component
    this.$emit('set-form-input-validity', false)
    this.$emit('set-is-loading', false)
    this.$emit('set-mode', 'create')
  },
  methods: {
    resetErrorState() {
      this.hasSavingError.createBillingDetails = false
      this.hasSavingError.deleteBillingDetails = false
      this.hasSavingError.updateBillingDetails = false

      this.savingError.createBillingDetails.type = ''
      this.savingError.createBillingDetails.message = ''
      this.savingError.createBillingDetails.duplicateBillingDetails = null
      this.savingError.deleteBillingDetails.type = ''
      this.savingError.deleteBillingDetails.message = ''
      this.savingError.updateBillingDetails.type = ''
      this.savingError.updateBillingDetails.message = ''
      this.savingError.updateBillingDetails.duplicateBillingDetails = null
    },
    handleClickBackButton() {
      this.setModeTo('select')
      this.clearFormInput()
      this.resetErrorState()
    },
    handleClickDuplicateDetailsError(duplicateBillingDetails) {
      // Find index of duplicate billing details by id in accountStore
      const index = this.accountData.billingDetails.findIndex(
        (x) => x.id === duplicateBillingDetails.id
      )

      if (index !== -1) {
        // If billing details with id is already in accountStore, replace it with fresh data
        this.$store.commit(
          'account/setReplaceBillingDetailsById',
          duplicateBillingDetails
        )
      } else {
        // If not, add it to accountStore
        this.$store.commit('account/setBillingDetail', duplicateBillingDetails)
      }

      // Set billing details id
      this.setSelectedBillingDetailsId(duplicateBillingDetails.id)

      // Move user to next step in checkout process
      this.$emit('next-step')
    },
    handleEditBillingDetailsButtonClick(billingDetailData) {
      if (!this.isSaving.deleteBillingDetails) {
        this.setModeTo('edit')
        this.resetErrorState()
        this.setFormInput(billingDetailData)
      }
    },
    setShowDeleteSafetyCheck(id) {
      this.deleteSafetyCheckId = id
      this.showDeleteSafetyCheck = true

      setTimeout(() => {
        this.setCloseDeleteSafetyCheck(id)
      }, 3000)
    },
    setCloseDeleteSafetyCheck(id) {
      if (id === this.deleteSafetyCheckId) {
        this.deleteSafetyCheckId = null
        this.showDeleteSafetyCheck = false
      }
    },
    clearFormInput() {
      if (!this.isSavingAny) {
        this.formInput.firstName = ''
        this.formInput.lastName = ''
        this.formInput.email = ''
        this.formInput.country = 'Select a country'
        this.formInput.city = ''
        this.formInput.streetAddress = ''
        this.formInput.postalCode = ''

        // Reset validation
        this.$v.$reset()
      }
    },
    setFormInput(billingDetailData) {
      // Set form input
      this.formInput.firstName = billingDetailData.firstName
      this.formInput.lastName = billingDetailData.lastName
      this.formInput.email = billingDetailData.email
      this.formInput.country = billingDetailData.country
      this.formInput.city = billingDetailData.city
      this.formInput.streetAddress = billingDetailData.streetAddress
      this.formInput.postalCode = billingDetailData.postalCode

      // Trigger validation
      this.$v.formInput.firstName.$touch()
      this.$v.formInput.lastName.$touch()
      this.$v.formInput.email.$touch()
      this.$v.formInput.country.$touch()
      this.$v.formInput.city.$touch()
      this.$v.formInput.streetAddress.$touch()
      this.$v.formInput.postalCode.$touch()
    },
    setSelectedBillingDetailsId(id) {
      if (id !== this.selectedBillingDetailsId) {
        // Set in store
        this.$store.commit('currentOrder/setBillingDetailsId', id)
      }
    },
    setModeTo(mode) {
      if (!this.isSavingAny) {
        this.mode = mode
      }
    },
    setMode() {
      if (this.accountData.billingDetails.length === 0) {
        this.mode = 'create'
      } else {
        this.mode = 'select'
      }
    },
    async getBillingDetails() {
      if (!this.isLoading.getBillingDetails) {
        this.isLoading.getBillingDetails = true
        await accountProvider.methods
          .getBillingDetails()
          .then((response) => {
            if (response.status === 200 && Array.isArray(response.data)) {
              // Set billing details in account store
              this.$store.commit('account/setBillingDetails', response.data)

              // Set hasFetched.billingDetails in account store
              this.$store.commit('account/setHasFetchedBillingDetails', true)

              this.hasLoadingError.getBillingDetails = false

              this.setMode()
            } else {
              this.hasLoadingError.getBillingDetails = true
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.hasLoadingError.getBillingDetails = true
            } else {
              this.hasLoadingError.getBillingDetails = true
            }
          })
          .finally(() => {
            this.isLoading.getBillingDetails = false
          })
      }
    },
    async createBillingDetails() {
      if (!this.isSaving.createBillingDetails) {
        this.resetErrorState()
        this.isSaving.createBillingDetails = true
        const input = this.formInput
        await accountProvider.methods
          .createBillingDetails({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            country: input.country,
            city: input.city,
            streetAddress: input.streetAddress,
            postalCode: input.postalCode,
          })
          .then((response) => {
            // If success
            if (response.status === 201) {
              // Set created billing details in account store
              const billingDetailsId = response.data.id
              this.$store.commit('account/setCreatedBillingDetails', {
                input,
                billingDetailsId,
              })
              // Set created billing details id in currentOrder store
              this.$store.commit(
                'currentOrder/setBillingDetailsId',
                billingDetailsId
              )
              // Reset validation
              this.$v.$reset()

              // Set has no saving error
              this.hasSavingError.createBillingDetails = false
            } else if (response.status === 200) {
              if (response.data.status === 'Reached Max Billing Details') {
                this.hasSavingError.createBillingDetails = true
                this.savingError.createBillingDetails.type = 'reachedMax'
                this.savingError.createBillingDetails.message =
                  "Sorry, you can't add more than three different billing details. Please select, edit or delete details you've previously submitted."
              } else if (response.data.status === 'Duplicate Found') {
                //  If is duplicate
                this.hasSavingError.createBillingDetails = true
                this.savingError.createBillingDetails.type = 'isDuplicate'
                this.savingError.createBillingDetails.message =
                  'Hmm, it seems these billing details are an exact copy of details you have already provided. Would you like to use these details?'
                this.savingError.createBillingDetails.duplicateBillingDetails =
                  response.data.data
              } else {
                // Unexpected response
                this.hasSavingError.createBillingDetails = true
                this.savingError.createBillingDetails.type = 'unexpected'
                this.savingError.createBillingDetails.message =
                  'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
              }
            }
            // Unexpected response
            else {
              this.hasSavingError.createBillingDetails = true
              this.savingError.createBillingDetails.type = 'unexpected'
              this.savingError.createBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.hasSavingError.createBillingDetails = true
            } else {
              this.hasSavingError.createBillingDetails = true
              this.savingError.createBillingDetails.type = 'unexpected'
              this.savingError.createBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
          })
          .finally(() => {
            this.isSaving.createBillingDetails = false
            if (!this.hasSavingError.createBillingDetails) {
              // Go to next step
              this.$emit('next-step')
            }
          })
      }
    },
    async deleteBillingDetails(billingDetailsId) {
      if (!this.isSaving.deleteBillingDetails) {
        this.resetErrorState()
        this.isSaving.deleteBillingDetails = true
        await accountProvider.methods
          .deleteBillingDetails(billingDetailsId)
          .then((response) => {
            if (response.status === 204) {
              // Remove deleted billing details from account store
              this.$store.commit(
                'account/setRemoveBillingDetailsById',
                billingDetailsId
              )

              // Remove deleted billing details from currentOrder store
              this.$store.commit('currentOrder/setRemoveBillingDetailsId')

              this.hasSavingError.deleteBillingDetails = false
            } else {
              this.hasSavingError.deleteBillingDetails = true
              this.savingError.deleteBillingDetails.type = 'unexpected'
              this.savingError.deleteBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.hasSavingError.deleteBillingDetails = true
            } else {
              this.hasSavingError.deleteBillingDetails = true
              this.savingError.deleteBillingDetails.type = 'unexpected'
              this.savingError.deleteBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
            this.hasSavingError.deleteBillingDetails = true
          })
          .finally(() => {
            this.isSaving.deleteBillingDetails = false
          })
      }
    },
    async updateBillingDetails() {
      if (!this.isSaving.updateBillingDetails) {
        this.resetErrorState()
        this.isSaving.updateBillingDetails = true
        const input = this.formInput
        const billingDetailsId = this.selectedBillingDetailsId
        await accountProvider.methods
          .updateBillingDetails({
            billingDetailsId,
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            country: input.country,
            city: input.city,
            streetAddress: input.streetAddress,
            postalCode: input.postalCode,
          })
          .then((response) => {
            if (response.status === 204) {
              // Update billing details in account store
              this.$store.commit('account/setUpdateBillingDetailsById', {
                input,
                billingDetailsId,
              })

              // Reset validation
              this.$v.$reset()

              this.hasSavingError.updateBillingDetails = false
            } else if (response.status === 200) {
              //  If is duplicate
              this.hasSavingError.updateBillingDetails = true
              this.savingError.updateBillingDetails.type = 'isDuplicate'
              this.savingError.updateBillingDetails.message =
                'Hmm, it seems these billing details are an exact copy of details you have already provided. Would you like to use these details?'
              this.savingError.updateBillingDetails.duplicateBillingDetails =
                response.data
            }
            // Unexpected response
            else {
              this.hasSavingError.updateBillingDetails = true
              this.savingError.updateBillingDetails.type = 'unexpected'
              this.savingError.updateBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.hasSavingError.updateBillingDetails = true
            } else {
              this.hasSavingError.updateBillingDetails = true
              this.savingError.updateBillingDetails.type = 'unexpected'
              this.savingError.updateBillingDetails.message =
                'Sorry, something unexpected happened. Please try again or contact support if the issue persist.'
            }
          })
          .finally(() => {
            this.isSaving.updateBillingDetails = false
            if (!this.hasSavingError.updateBillingDetails) {
              // Go to next step
              this.$emit('next-step')
            }
          })
      }
    },
    delayTouch($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

// .form-error-container {
//     p {
//         background-color: var(--danger);
//         padding: 0.5em 1em 0.5em 1em;
//         border-radius: 4px;
//         font-size: 16px;
//         margin: 0;
//     }
// }

.billing-details-items {
  padding: 0 15px 15px 15px;

  .billing-details-item {
    display: block;
    background-color: rgba(248, 248, 248, 0.3);
    border: 2px dotted var(--primary);
    border-radius: 8px;
    margin: 0 0 30px 0;
    padding: 15px;
    &.is-selected {
      border: 2px solid var(--primary);
    }
    &.is-dormant {
      border-color: #eee;
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
