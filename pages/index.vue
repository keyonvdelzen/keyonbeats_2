<template>
  <div>
    <div class="page-content-full has-text-centered">
      <div class="columns is-vcentered is-mobile is-fullheight">
        <div class="column">
          <h1 class="title is-size-2-desktop is-size-3-tablet is-size-5-mobile">
            Hey, welcome 🙋‍♂️
          </h1>
          <p
            class="subtitle is-size-4-desktop is-size-5-tablet is-size-5-mobile"
          >
            This is a beatstore.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<router lang="js">
{
  name: 'home',
  path: '/',
}
</router>

<script>
export default {
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Beats by Keyon',
        },
      ],
    }
  },
}
</script>
