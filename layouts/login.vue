<template>
  <v-app :dark="setTheme">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      outlined
      :color="color"
      timeout="2000"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      color: "",
    }
  },
  computed: {
    setTheme () {
      this.$vuetify.theme.dark = false
    },
  },
  methods: {
    setSnackbar(text, color) {
      this.snackbar = true
      this.text = text
      this.color = color
    }
  },
  mounted() {
    this.$nuxt.$on('setSnackbar', (value) => {
      this.setSnackbar(value.text, value.color)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('setSnackbar')
  },
}
</script>