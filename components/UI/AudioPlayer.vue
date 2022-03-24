<template>
  <div v-if="tracks.length > 0">
    <!-- Hide the default audio player -->
    <div>
      <audio :id="playerid" ref="player" style="display: none">
        <source :src="tracks[currentTrack].audioPreview" type="audio/mpeg" />
      </audio>
    </div>
    <!-- Audio player styling -->
    <!-- Note on long v-if: Hide player if any modal or overlay is visible to prevent ugly overscrolling on mobile browsers -->
    <!-- TODO: Fix this for tablet -->
    <div
      v-if="
        (tracks.length > 0 && showAudioPlayer && screenWidth < 769) ||
        (tracks.length > 0 && showAudioPlayer && screenWidth > 768)
      "
      class="audio-player-container"
    >
      <div
        class="audio-progress-bar"
        :data-tooltip="elapsedTime() + ` / ` + totalTime()"
        data-tooltip-location="top"
      >
        <input
          v-model="playbackTime"
          type="range"
          min="0"
          :max="audioDuration"
        />
      </div>
      <div v-if="screenWidth > 768" class="content-container columns">
        <div class="content-left column is-5">
          <figure
            class="image is-90x90 is-clickable"
            @click="
              goToProduct(tracks[currentTrack].id, tracks[currentTrack].slug)
            "
          >
            <img :src="tracks[currentTrack].image" />
          </figure>
          <div>
            <h1
              class="title is-6 is-size-7-touch is-clickable mt-3 mb-3"
              @click="
                goToProduct(tracks[currentTrack].id, tracks[currentTrack].slug)
              "
            >
              {{ tracks[currentTrack].name }}
            </h1>
            <div class="tags mt-3 is-hidden-touch">
              <span class="tag is-purple mr-4">{{
                tracks[currentTrack].type
              }}</span>
              <span
                v-for="mood of tracks[currentTrack].moods"
                :key="mood"
                class="tag is-small is-primary mr-4"
                >{{ mood }}</span
              >
              <span
                v-for="genre of tracks[currentTrack].genres"
                :key="genre"
                class="tag is-blue mr-4"
                >{{ genre }}</span
              >
            </div>
          </div>
        </div>
        <div class="content-center column is-2">
          <div class="columns" style="padding-top: 20px">
            <div class="column has-text-left" style="padding-top: 10px">
              <font-awesome-icon
                class="icon has-text-primary"
                :class="{
                  'is-clickable': currentTrack > 0,
                }"
                icon="step-backward"
                style="height: 30px; width: 30px"
                @click="goBackward()"
              />
            </div>
            <div class="column has-text-centered">
              <!-- Pure CSS loading icon -->
              <div v-if="!audioLoaded" class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <font-awesome-icon
                v-if="!isPlaying && audioLoaded"
                class="icon has-text-primary is-clickable"
                icon="play-circle"
                style="height: 50px; width: 50px"
                @click="toggleAudio()"
              />
              <font-awesome-icon
                v-if="isPlaying && audioLoaded"
                class="icon has-text-primary is-clickable"
                icon="pause-circle"
                style="height: 50px; width: 50px"
                @click="toggleAudio()"
              />
            </div>
            <div class="column has-text-right" style="padding-top: 10px">
              <font-awesome-icon
                class="icon has-text-primary"
                :class="{
                  'is-clickable': currentTrack - tracks.length < -1,
                }"
                icon="step-forward"
                style="height: 30px; width: 30px"
                @click="goForward()"
              />
            </div>
          </div>
        </div>
        <div class="content-right column is-5 has-text-right">
          <div class="columns mr-3">
            <div class="column is-10 mr-3">
              <button
                v-if="tracks[currentTrack].type === 'Beat'"
                class="button is-primary has-text-white"
                style="margin-top: 25px"
                @click="setShowSelectLicenseModal(tracks[currentTrack])"
              >
                <span>
                  <span>Add to cart</span>
                  <font-awesome-icon class="ml-2" icon="cart-plus" />
                </span>
              </button>
            </div>
            <div class="column is-2">
              <font-awesome-icon
                class="icon has-text-primary is-clickable"
                icon="times"
                style="
                  height: 30px;
                  width: 30px;
                  margin-top: 30px;
                  margin-right: 35px;
                "
                @click="closeAudioPlayer()"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="screenWidth < 769" class="content-container columns is-mobile">
        <div class="content-left column is-4">
          <figure
            class="image is-90x90 is-clickable"
            @click="
              goToProduct(tracks[currentTrack].id, tracks[currentTrack].slug)
            "
          >
            <img :src="tracks[currentTrack].image" />
          </figure>
          <div class="is-hidden-mobile">
            <h1
              class="title is-6 is-size-7-touch is-clickable mt-3 mb-3"
              @click="
                goToProduct(tracks[currentTrack].id, tracks[currentTrack].slug)
              "
            >
              {{ tracks[currentTrack].name }}
            </h1>
            <div class="tags mt-3 is-hidden-touch">
              <span class="tag is-purple mr-4">{{
                tracks[currentTrack].type
              }}</span>
              <span
                v-for="mood of tracks[currentTrack].moods"
                :key="mood"
                class="tag is-small is-primary mr-4"
                >{{ mood }}</span
              >
              <span
                v-for="genre of tracks[currentTrack].genres"
                :key="genre"
                class="tag is-blue mr-4"
                >{{ genre }}</span
              >
            </div>
          </div>
        </div>
        <div class="content-center column is-4">
          <div class="columns is-mobile" style="padding-top: 20px">
            <div class="column has-text-left" style="padding-top: 10px">
              <font-awesome-icon
                class="icon has-text-primary"
                :class="{
                  'is-clickable': currentTrack > 0,
                }"
                icon="step-backward"
                style="height: 30px; width: 30px"
                @click="goBackward()"
              />
            </div>
            <div class="column has-text-centered">
              <!-- Pure CSS loading icon -->
              <div v-if="!audioLoaded" class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <font-awesome-icon
                v-if="!isPlaying && audioLoaded"
                class="icon has-text-primary is-clickable"
                icon="play-circle"
                style="height: 50px; width: 50px"
                @click="toggleAudio()"
              />
              <font-awesome-icon
                v-if="isPlaying && audioLoaded"
                class="icon has-text-primary is-clickable"
                icon="pause-circle"
                style="height: 50px; width: 50px"
                @click="toggleAudio()"
              />
            </div>
            <div class="column has-text-right" style="padding-top: 10px">
              <font-awesome-icon
                class="icon has-text-primary"
                :class="{
                  'is-clickable': currentTrack - tracks.length < -1,
                }"
                icon="step-forward"
                style="height: 30px; width: 30px"
                @click="goForward()"
              />
            </div>
          </div>
        </div>
        <div class="content-right column is-4 has-text-right">
          <div class="columns is-mobile mr-3">
            <div class="column is-8">
              <span
                v-if="tracks[currentTrack].type === 'Beat' && screenWidth < 769"
                class="has-text-primary"
                @click="setShowSelectLicenseModal(tracks[currentTrack])"
              >
                <font-awesome-icon
                  class="icon is-medium"
                  style="margin-top: 30px"
                  icon="cart-plus"
                />
              </span>
            </div>
            <div class="column is-4">
              <font-awesome-icon
                class="icon has-text-primary is-clickable"
                icon="times"
                style="height: 30px; width: 30px; margin-top: 32px"
                @click="closeAudioPlayer()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['url', 'playerid'],
  data() {
    return {
      showAudioPlayer: false,
      tracks: [],
      currentTrack: 0,
      playbackTime: 0,
      audioDuration: 0,
      audioLoaded: false,
      isPlaying: false,
    }
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
    }),
  },
  created() {
    this.$nuxt.$on('play-audio-preview', (trackData) => {
      this.audioLoaded = false
      this.setIsLoadingInStore(true)
      this.showAudioPlayer = true
      this.setAudioPlayerToVisibleInStore()
      if (this.tracks.length > 0) {
        this.tracks.push(trackData)
        this.currentTrack = this.tracks.length - 1
        this.toggleAudio()
        this.playbackTime = 0
        const audio = this.$refs.player
        audio.load()
        audio.play()
        this.isPlaying = true
        this.setCurrentTrackProductIdInStore()
        this.setIsPlayingInStore(true)
      } else {
        this.tracks.push(trackData)
        setTimeout(() => {
          const audio = this.$refs.player
          audio.load()
          audio.play()
          this.isPlaying = true
          this.setCurrentTrackProductIdInStore()
          this.setIsPlayingInStore(true)
        }, 0)
      }

      this.$nextTick(() => {
        const audio = this.$refs.player
        // Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider
        // Documented here: https://www.w3schools.com/tags/av_event_loadedmetadata.asp
        audio.addEventListener(
          'loadedmetadata',
          function () {
            this.initSlider()
          }.bind(this)
        )

        // "canplay" HTML Event lets us know audio is ready for play
        // Documented here: https://www.w3schools.com/tags/av_event_canplay.asp
        audio.addEventListener(
          'canplay',
          function () {
            this.audioLoaded = true
            this.setIsLoadingInStore(false)
          }.bind(this)
        )

        // Wait for audio to begin play, then start playback listener function
        this.$watch('isPlaying', function () {
          if (this.isPlaying) {
            const audio = this.$refs.player
            this.initSlider()
            // console.log("Audio playback started.")

            // prevent starting multiple listeners at the same time
            if (!this.listenerActive) {
              this.listenerActive = true

              // For a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
              audio.addEventListener('timeupdate', this.playbackListener)
            }
          }
        })

        // Update current audio position when user drags progress slider
        this.$watch('playbackTime', function () {
          if (this.audio) {
            // const audio = this.$refs.player
          }

          const diff = Math.abs(
            this.playbackTime - this.$refs.player.currentTime
          )

          // Throttle synchronization to prevent infinite loop between playback listener and this watcher
          if (diff > 0.01) {
            this.$refs.player.currentTime = this.playbackTime
          }
        })

        // Play or pause if user presses spacebar
        // document.addEventListener('keyup', event => {
        //     if (event.code === 'Space') {
        //         if (audio.paused) {
        //         audio.play();
        //         this.isPlaying = true;
        //     } else {
        //         audio.pause();
        //         this.isPlaying = false;
        //     }
        //     }
        // })
      })
    })
    this.$nuxt.$on('toggle-audio', () => {
      this.toggleAudio()
    })
  },
  methods: {
    setAudioPlayerToVisibleInStore() {
      this.$store.commit('userInterface/setAudioPlayerVisibility', true)
    },

    setCurrentTrackProductIdInStore(reset) {
      this.$store.commit(
        'audioPlayer/setCurrentTrackProductId',
        this.tracks[this.currentTrack].id
      )

      if (reset === -1) {
        this.$store.commit('audioPlayer/setCurrentTrackProductId', reset)
      }
      // console.log(this.tracks[this.currentTrack].id)
    },

    setIsPlayingInStore(value) {
      this.$store.commit('audioPlayer/setIsPlaying', value)
    },

    setIsLoadingInStore(value) {
      this.$store.commit('audioPlayer/setIsLoading', value)
    },

    setShowSelectLicenseModal(product) {
      this.$nuxt.$emit('open-select-license-modal', product)
    },
    closeAudioPlayer() {
      const audio = this.$refs.player
      if (!audio.paused) {
        audio.pause()
        this.isPlaying = false
        this.setIsPlayingInStore(false)
      }
      this.cleanupListeners()
      this.listenerActive = false

      this.showAudioPlayer = false
      this.$store.commit('userInterface/setAudioPlayerVisibility', false)
      this.setCurrentTrackProductIdInStore(-1)
    },

    // Set the range slider max value equal to audio duration
    initSlider() {
      const audio = this.$refs.player
      if (audio) {
        this.audioDuration = Math.round(audio.duration)
      }
    },

    // Convert audio current time from seconds to min:sec display
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2)

      // var hours = seconds / 3600
      const minutes = (seconds % 3600) / 60

      return [minutes, seconds % 60].map(format).join(':')
    },

    // Show the total duration of audio file
    totalTime() {
      const audio = this.$refs.player
      if (audio) {
        const seconds = audio.duration
        return this.convertTime(seconds)
      } else {
        return '00:00'
      }
    },

    // Display the audio time elapsed so far
    elapsedTime() {
      const audio = this.$refs.player
      if (audio) {
        const seconds = audio.currentTime
        return this.convertTime(seconds)
      } else {
        return '00:00'
      }
    },

    // Playback listener function runs every 100ms while audio is playing
    playbackListener() {
      const audio = this.$refs.player

      // Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = audio.currentTime

      // Add listeners for audio pause and audio end events
      audio.addEventListener('ended', this.endListener)
      audio.addEventListener('pause', this.pauseListener)
    },

    // Function to run when audio is paused by user
    pauseListener() {
      this.isPlaying = false
      this.setIsPlayingInStore(false)
      this.listenerActive = false
      this.cleanupListeners()
    },

    // Function to run when audio play reaches the end of file
    endListener() {
      this.isPlaying = false
      this.setIsPlayingInStore(false)
      this.listenerActive = false
      this.cleanupListeners()
    },

    // Remove listeners after audio play stops
    cleanupListeners() {
      const audio = this.$refs.player
      audio.removeEventListener('timeupdate', this.playbackListener)
      audio.removeEventListener('ended', this.endListener)
      audio.removeEventListener('pause', this.pauseListener)
    },
    toggleAudio() {
      const audio = this.$refs.player
      if (audio.paused) {
        audio.play()
        this.isPlaying = true
        this.setIsPlayingInStore(true)
      } else {
        audio.pause()
        this.isPlaying = false
        this.setIsPlayingInStore(false)
      }
    },
    goBackward() {
      if (this.currentTrack > 0) {
        const audio = this.$refs.player
        this.currentTrack--
        this.toggleAudio()
        this.playbackTime = 0
        audio.load()
        audio.play()
        this.isPlaying = true
        this.setCurrentTrackProductIdInStore()
        this.setIsPlayingInStore(true)
      }
    },
    goForward() {
      if (this.currentTrack - this.tracks.length < -1) {
        const audio = this.$refs.player
        this.currentTrack++
        this.toggleAudio()
        this.playbackTime = 0
        audio.load()
        audio.play()
        this.isPlaying = true
        this.setCurrentTrackProductIdInStore()
        this.setIsPlayingInStore(true)
      }
    },
    goToProduct(productId, productSlug) {
      const path = `/product/${productId}/${productSlug}`
      if (this.$route.path !== path) {
        this.$router.push({
          path,
          params: {
            productId,
            productSlug,
          },
        })
      }
    },
  },
}
</script>

<style scoped>
.audio-player-container {
  z-index: 30;
  width: 100%;
  height: 100px;
  background-color: white;
  position: fixed;
  bottom: 0;
}

.audio-player-container .columns {
  height: 90%;
  padding: 0;
  margin: 0;
}

.audio-player-container .columns .column {
  height: 100%;
  padding: 0;
  margin: 0;
}

.content-left figure {
  margin-right: 15px;
  float: left;
}

.content-right {
  margin-top: 30px;
}

.audio-progress-bar {
  height: 10px;
}

input[type='range'] {
  top: -7.5px;
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-radius: 0; /* iOS */
  background: transparent;
}

input[type='range']:focus {
  outline: none;
}

::-webkit-slider-runnable-track {
  background: #eee;
}

::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0; /* 1 */
  height: 10px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw var(--primary);
}

::-moz-range-track {
  height: 10px;
  background: #ddd;
}

::-moz-range-thumb {
  background: #fff;
  height: 10px;
  width: 0; /* 20px; */
  border: none;
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw var(--primary);
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: var(--primary);
}

::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 10px;
  width: 20px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: #ddd;
  color: transparent;
  height: 10px;
  border: none;
}

::-ms-tooltip {
  display: none;
}
</style>
