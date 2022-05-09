<template>
  <v-app :dark="setTheme">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    setTheme () {
      this.$vuetify.theme.dark = false
    },
  }
}
</script>