export const state = () => ({
  allCountriesLoadingError: null,
  countries: []
})

export const getters = {
  getAllCountriesLoadingError: (state) => state.allCountriesLoadingError,
  getAllCountries: (state) => state.countries
}

export const mutations = {
  setAllCountriesLoadingError(state, newState) {
    state.allCountriesLoadingError = newState
  },
  setCountryData(state, countries) {
    state.countries = countries
  }
}