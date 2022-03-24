<template>
  <div>
    <!-- Product search -->
    <div class="product-search is-fullwidth">
      <div class="columns has-text-centered">
        <div class="column">
          <div class="field">
            <div class="control">
              <input
                id="product-search-input"
                v-model="productFilters.keyword"
                placeholder="What are you looking for? 👀"
                class="input search-track"
                type="text"
                @keyup.enter="blurSearchInput()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product filter -->
    <div class="product-filter is-fullwidth">
      <!-- Filter by product type -->
      <div v-if="screenWidth > 1023" class="dropdown mr-2 is-hoverable">
        <div class="dropdown-trigger">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Type</span>
            <span class="icon is-small">
              <font-awesome-icon
                class="icon has-text-black"
                icon="angle-down"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              <!-- <input type="checkbox" v-model="productFilters.types" value="Beat"/> Beat -->

              <input
                id="productFilterTypeCheckBox1"
                v-model="productFilters.types"
                value="Beat"
                class="is-checkradio is-small is-purple"
                :class="{
                  'has-background-color': productFilters.types.includes('Beat'),
                }"
                type="checkbox"
              />
              <label for="productFilterTypeCheckBox1">Beat</label>
            </a>
            <a href="#" class="dropdown-item">
              <!-- <input type="checkbox" v-model="productFilters.types" value="Pack"/> Pack -->

              <input
                id="productFilterTypeCheckBox2"
                v-model="productFilters.types"
                value="Pack"
                class="is-checkradio is-small is-purple"
                :class="{
                  'has-background-color': productFilters.types.includes('Pack'),
                }"
                type="checkbox"
              />
              <label for="productFilterTypeCheckBox2">Pack</label>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="screenWidth < 1024"
        class="dropdown mr-2"
        :class="{ 'is-active': showTypeDropdown }"
      >
        <div class="dropdown-trigger" @click="toggleFilterDropdown('Type')">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Type</span>
            <span class="icon is-small">
              <font-awesome-icon
                v-if="!showTypeDropdown"
                class="icon has-text-black"
                icon="angle-down"
              />
              <font-awesome-icon
                v-if="showTypeDropdown"
                class="icon has-text-black"
                icon="angle-up"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              <!-- <input type="checkbox" v-model="productFilters.types" value="Beat"/> Beat -->

              <input
                id="productFilterTypeCheckBox1"
                v-model="productFilters.types"
                value="Beat"
                class="is-checkradio is-small is-purple"
                :class="{
                  'has-background-color': productFilters.types.includes('Beat'),
                }"
                type="checkbox"
              />
              <label for="productFilterTypeCheckBox1">Beat</label>
            </a>
            <a href="#" class="dropdown-item">
              <!-- <input type="checkbox" v-model="productFilters.types" value="Pack"/> Pack -->

              <input
                id="productFilterTypeCheckBox2"
                v-model="productFilters.types"
                value="Pack"
                class="is-checkradio is-small is-purple"
                :class="{
                  'has-background-color': productFilters.types.includes('Pack'),
                }"
                type="checkbox"
              />
              <label for="productFilterTypeCheckBox2">Pack</label>
            </a>
          </div>
        </div>
      </div>
      <!-- Filter by mood -->
      <div v-if="screenWidth > 1023" class="dropdown is-hoverable mr-2">
        <div class="dropdown-trigger">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Mood</span>
            <span class="icon is-small">
              <font-awesome-icon
                class="icon has-text-black"
                icon="angle-down"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              v-for="mood of availableMoods"
              :key="mood"
              href="#"
              class="dropdown-item"
            >
              <input
                :id="`productFilterMoodCheckBox_ + ${mood}`"
                v-model="productFilters.moods"
                :value="mood"
                class="is-checkradio is-small is-primary"
                :class="{
                  'has-background-color': productFilters.moods.includes(
                    `${mood}`
                  ),
                }"
                type="checkbox"
              />
              <label :for="`productFilterMoodCheckBox_ + ${mood}`">{{
                mood
              }}</label>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="screenWidth < 1024"
        class="dropdown mr-2"
        :class="{ 'is-active': showMoodDropdown }"
      >
        <div class="dropdown-trigger" @click="toggleFilterDropdown('Mood')">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Mood</span>
            <span class="icon is-small">
              <font-awesome-icon
                v-if="!showMoodDropdown"
                class="icon has-text-black"
                icon="angle-down"
              />
              <font-awesome-icon
                v-if="showMoodDropdown"
                class="icon has-text-black"
                icon="angle-up"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              v-for="mood of availableMoods"
              :key="mood"
              href="#"
              class="dropdown-item"
            >
              <input
                :id="`productFilterMoodCheckBox_ + ${mood}`"
                v-model="productFilters.moods"
                :value="mood"
                class="is-checkradio is-small is-primary"
                :class="{
                  'has-background-color': productFilters.moods.includes(
                    `${mood}`
                  ),
                }"
                type="checkbox"
              />
              <label :for="`productFilterMoodCheckBox_ + ${mood}`">{{
                mood
              }}</label>
            </a>
          </div>
        </div>
      </div>
      <!-- Filter by genre -->
      <div v-if="screenWidth > 1023" class="dropdown is-hoverable mr-2">
        <div class="dropdown-trigger" @click="toggleFilterDropdown('Genre')">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Genre</span>
            <span class="icon is-small">
              <font-awesome-icon
                class="icon has-text-black"
                icon="angle-down"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              v-for="genre of availableGenres"
              :key="genre"
              href="#"
              class="dropdown-item"
            >
              <input
                :id="`productFilterGenreCheckBox_ + ${genre}`"
                v-model="productFilters.genres"
                :value="genre"
                class="is-checkradio is-small is-blue"
                :class="{
                  'has-background-color': productFilters.genres.includes(
                    `${genre}`
                  ),
                }"
                type="checkbox"
              />
              <label :for="`productFilterGenreCheckBox_ + ${genre}`">{{
                genre
              }}</label>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="screenWidth < 1024"
        class="dropdown mr-2"
        :class="{ 'is-active': showGenreDropdown }"
      >
        <div class="dropdown-trigger" @click="toggleFilterDropdown('Genre')">
          <button
            class="button"
            :class="{ 'is-small': screenWidth < 769 }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Genre</span>
            <span class="icon is-small">
              <font-awesome-icon
                v-if="!showGenreDropdown"
                class="icon has-text-black"
                icon="angle-down"
              />
              <font-awesome-icon
                v-if="showGenreDropdown"
                class="icon has-text-black"
                icon="angle-up"
              />
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              v-for="genre of availableGenres"
              :key="genre"
              href="#"
              class="dropdown-item"
            >
              <input
                :id="`productFilterGenreCheckBox_ + ${genre}`"
                v-model="productFilters.genres"
                :value="genre"
                class="is-checkradio is-small is-blue"
                :class="{
                  'has-background-color': productFilters.genres.includes(
                    `${genre}`
                  ),
                }"
                type="checkbox"
              />
              <label :for="`productFilterGenreCheckBox_ + ${genre}`">{{
                genre
              }}</label>
            </a>
          </div>
        </div>
      </div>
      <!-- Clear all filters button -->
      <button
        class="button"
        :class="{ 'is-small': screenWidth < 769 }"
        @click="clearFilters()"
      >
        <span v-if="screenWidth > 768">Clear filters</span>
        <span v-if="screenWidth < 769">Clear</span>
        <span class="icon is-small">
          <font-awesome-icon class="icon" icon="times" />
        </span>
      </button>
    </div>
    <!-- Tags -->
    <div class="tags pt-3">
      <span
        v-for="type of productFilters.types"
        :key="type"
        class="tag is-purple mr-4"
      >
        {{ type }}
        <button class="delete" @click="removeTypeFromFilter(type)"></button>
      </span>
      <span
        v-for="mood of productFilters.moods"
        :key="mood"
        class="tag is-primary mr-4"
      >
        {{ mood }}
        <button class="delete" @click="removeMoodFromFilter(mood)"></button>
      </span>
      <span
        v-for="genre of productFilters.genres"
        :key="genre"
        class="tag is-blue mr-4"
      >
        {{ genre }}
        <button class="delete" @click="removeGenreFromFilter(genre)"></button>
      </span>
    </div>
    <!-- Product table -->
    <ProductTable
      :products="computedProducts"
      :search-query="productFilters"
      @set-product-type="addTypeToFilter"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductTable from '~/components/product/ProductTable.vue'

export default {
  components: {
    ProductTable,
  },
  props: {
    preSelectedMood: {
      type: String,
      default: '',
    },
    preSelectedGenre: {
      type: String,
      default: '',
    },
    preSelectedType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      productFilters: {
        keyword: '',
        types: [],
        moods: [],
        genres: [],
      },
      showTypeDropdown: false,
      showMoodDropdown: false,
      showGenreDropdown: false,
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
      products: 'product/getAllProducts',
    }),

    computedProducts() {
      return this.products.filter((item) => {
        return (
          (this.productFilters.keyword.length === 0 ||
            item.name
              .toLowerCase()
              .includes(this.productFilters.keyword.toLowerCase()) ||
            item.type
              .toLowerCase()
              .includes(this.productFilters.keyword.toLowerCase())) &&
          (this.productFilters.types.length === 0 ||
            this.productFilters.types.includes(item.type)) &&
          (this.productFilters.moods.length === 0 ||
            (this.productFilters.moods.length === 1 &&
              (this.productFilters.moods.includes(item.moods[0]) ||
                this.productFilters.moods.includes(item.moods[1]) ||
                this.productFilters.moods.includes(item.moods[2]) ||
                this.productFilters.moods.includes(item.moods[3]))) ||
            (this.productFilters.moods.length === 2 &&
              ((this.productFilters.moods.includes(item.moods[0]) &&
                this.productFilters.moods.includes(item.moods[1])) ||
                (this.productFilters.moods.includes(item.moods[0]) &&
                  this.productFilters.moods.includes(item.moods[2])) ||
                (this.productFilters.moods.includes(item.moods[0]) &&
                  this.productFilters.moods.includes(item.moods[3])) ||
                (this.productFilters.moods.includes(item.moods[1]) &&
                  this.productFilters.moods.includes(item.moods[2])) ||
                (this.productFilters.moods.includes(item.moods[1]) &&
                  this.productFilters.moods.includes(item.moods[3])) ||
                (this.productFilters.moods.includes(item.moods[2]) &&
                  this.productFilters.moods.includes(item.moods[3])))) ||
            (this.productFilters.moods.length === 3 &&
              ((this.productFilters.moods.includes(item.moods[0]) &&
                this.productFilters.moods.includes(item.moods[1]) &&
                this.productFilters.moods.includes(item.moods[2])) ||
                (this.productFilters.moods.includes(item.moods[0]) &&
                  this.productFilters.moods.includes(item.moods[1]) &&
                  this.productFilters.moods.includes(item.moods[3])) ||
                (this.productFilters.moods.includes(item.moods[0]) &&
                  this.productFilters.moods.includes(item.moods[2]) &&
                  this.productFilters.moods.includes(item.moods[3])) ||
                (this.productFilters.moods.includes(item.moods[1]) &&
                  this.productFilters.moods.includes(item.moods[2]) &&
                  this.productFilters.moods.includes(item.moods[3])))) ||
            (this.productFilters.moods.length === 4 &&
              this.productFilters.moods.includes(item.moods[0]) &&
              this.productFilters.moods.includes(item.moods[1]) &&
              this.productFilters.moods.includes(item.moods[2]) &&
              this.productFilters.moods.includes(item.moods[3]))) &&
          (this.productFilters.genres.length === 0 ||
            (this.productFilters.genres.length === 1 &&
              (this.productFilters.genres.includes(item.genres[0]) ||
                this.productFilters.genres.includes(item.genres[1]) ||
                this.productFilters.genres.includes(item.genres[2]) ||
                this.productFilters.genres.includes(item.genres[3]))) ||
            (this.productFilters.genres.length === 2 &&
              ((this.productFilters.genres.includes(item.genres[0]) &&
                this.productFilters.genres.includes(item.genres[1])) ||
                (this.productFilters.genres.includes(item.genres[0]) &&
                  this.productFilters.genres.includes(item.genres[2])) ||
                (this.productFilters.genres.includes(item.genres[0]) &&
                  this.productFilters.genres.includes(item.genres[3])) ||
                (this.productFilters.genres.includes(item.genres[1]) &&
                  this.productFilters.genres.includes(item.genres[2])) ||
                (this.productFilters.genres.includes(item.genres[1]) &&
                  this.productFilters.genres.includes(item.genres[3])) ||
                (this.productFilters.genres.includes(item.genres[2]) &&
                  this.productFilters.genres.includes(item.genres[3])))) ||
            (this.productFilters.genres.length === 3 &&
              ((this.productFilters.genres.includes(item.genres[0]) &&
                this.productFilters.genres.includes(item.genres[1]) &&
                this.productFilters.genres.includes(item.genres[2])) ||
                (this.productFilters.genres.includes(item.genres[0]) &&
                  this.productFilters.genres.includes(item.genres[1]) &&
                  this.productFilters.genres.includes(item.genres[3])) ||
                (this.productFilters.genres.includes(item.genres[0]) &&
                  this.productFilters.genres.includes(item.genres[2]) &&
                  this.productFilters.genres.includes(item.genres[3])) ||
                (this.productFilters.genres.includes(item.genres[1]) &&
                  this.productFilters.genres.includes(item.genres[2]) &&
                  this.productFilters.genres.includes(item.genres[3])))) ||
            (this.productFilters.genres.length === 4 &&
              this.productFilters.genres.includes(item.genres[0]) &&
              this.productFilters.genres.includes(item.genres[1]) &&
              this.productFilters.genres.includes(item.genres[2]) &&
              this.productFilters.genres.includes(item.genres[3])))
        )
      })
    },
    availableMoods() {
      const availableMoods = []

      // add all available moods from products in products to availableMoods array
      this.products.forEach((product) => {
        Array.prototype.push.apply(availableMoods, product.moods)
      })

      // capitalize the first letter of every mood
      for (let i = 1; i < availableMoods.length; i++) {
        availableMoods[i] =
          availableMoods[i].charAt(0).toUpperCase() +
          availableMoods[i].substr(1)
      }

      // remove duplicates from array of moods
      const uniqueAvailableMoods = [...new Set(availableMoods)]

      // sort moods by alphabetical order
      uniqueAvailableMoods.sort()

      return uniqueAvailableMoods
    },
    availableGenres() {
      const availableGenres = []

      // add all available genres from products in products to availableGenres array
      this.products.forEach((product) => {
        Array.prototype.push.apply(availableGenres, product.genres)
      })

      // capitalize the first letter of every genre
      for (let i = 1; i < availableGenres.length; i++) {
        availableGenres[i] =
          availableGenres[i].charAt(0).toUpperCase() +
          availableGenres[i].substr(1)
      }

      // remove duplicates from array of genres
      const uniqueavailableGenres = [...new Set(availableGenres)]

      // sort genres by alphabetical order
      uniqueavailableGenres.sort()

      return uniqueavailableGenres
    },
  },
  mounted() {
    if (this.preSelectedMood !== '') {
      this.productFilters.moods = [this.preSelectedMood]
    }
    if (this.preSelectedGenre !== '') {
      this.productFilters.genres = [this.preSelectedGenre]
    }
    if (this.preSelectedType !== '') {
      this.productFilters.types = [this.preSelectedType]
    }
  },
  methods: {
    toggleFilterDropdown(val) {
      if (val === 'Type') {
        if (this.showTypeDropdown === false) {
          this.showTypeDropdown = true
          this.showMoodDropdown = false
          this.showGenreDropdown = false
        } else {
          this.showTypeDropdown = false
        }
      } else if (val === 'Mood') {
        if (this.showMoodDropdown === false) {
          this.showMoodDropdown = true
          this.showTypeDropdown = false
          this.showGenreDropdown = false
        } else {
          this.showMoodDropdown = false
        }
      } else if (val === 'Genre') {
        if (this.showGenreDropdown === false) {
          this.showGenreDropdown = true
          this.showTypeDropdown = false
          this.showMoodDropdown = false
        } else {
          this.showGenreDropdown = false
        }
      }
    },
    blurSearchInput() {
      document.getElementById('product-search-input').blur()
    },
    clearFilters() {
      this.productFilters.keyword = ''
      this.productFilters.types = []
      this.productFilters.moods = []
      this.productFilters.genres = []
      this.showTypeDropdown = false
      this.showMoodDropdown = false
      this.showGenreDropdown = false
    },
    removeMoodFromFilter(mood) {
      this.productFilters.moods = this.productFilters.moods.filter(
        (e) => e !== mood
      )
    },
    removeGenreFromFilter(genre) {
      this.productFilters.genres = this.productFilters.genres.filter(
        (e) => e !== genre
      )
    },
    removeTypeFromFilter(type) {
      this.productFilters.types = this.productFilters.types.filter(
        (e) => e !== type
      )
    },
    addTypeToFilter(type) {
      if (this.productFilters.types.length === 0) {
        this.productFilters.types.push(type)
      }
    },
  },
}
</script>

<style scoped>
.product-table {
  margin: auto;
  padding-top: 30px;
}

/* .dropdown {
  margin-right: 30px;
} */

.product-search {
  margin: auto;
  padding-top: 30px;
}

.product-filter {
  margin: auto;
  padding-top: 30px;
}

.product-table-row {
  height: 64px;
}

/* Search box styling */
@media only screen and (max-width: 768px) {
  .search-track {
    font-size: 4vw;
  }
}

@media only screen and (min-width: 769px) {
  .search-track {
    font-size: 30px;
  }
}
</style>
