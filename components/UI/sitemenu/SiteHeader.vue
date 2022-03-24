<template>
  <div class="site-header">
    <TopBar v-if="screenWidth > 768" />
    <SiteMenu />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteMenu from '@/components/UI/sitemenu/SiteMenu.vue'
import TopBar from '@/components/UI/sitemenu/TopBar.vue'

export default {
  components: {
    SiteMenu,
    TopBar,
  },
  computed: {
    ...mapGetters({
      screenWidth: 'userInterface/getScreenWidth',
    }),
  },
}
</script>

<style lang="scss" scoped>
.site-header {
  top: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}
</style>
