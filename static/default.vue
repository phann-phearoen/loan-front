<template>
  <v-app :dark="setTheme">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" style="min-height: 30px" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-snackbar
      v-model="snackbar.model"
      :color="snackbarColor"
      outlined
      timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          small
          v-bind="attrs"
          plain
          @click="snackbar.model = false"
        >
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ទំព័រដើម',
          to: '/'
        },
        {
          icon: 'mdi-cash-fast',
          title: 'ដាក់ប្រាក់សន្សំ',
          to: '/deposit'
        },
        {
          icon: 'mdi-currency-usd-off',
          title: 'ផ្ដល់ប្រាក់កម្ចី',
          to: '/loan'
        },
        {
          icon: 'mdi-account-group',
          title: 'គ្រប់គ្រងសមាជិក',
          to: '/members'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'គ្រប់គ្រងអតិថិជន',
          to: '/clients'
        },
      ],
      right: true,
      rightDrawer: true,
      title: 'ក្រុមសន្សំកំពង់សាមគ្គី',
      snackbar: {
        model: false,
        text: '',
        type: 'info',
      },
    }
  },
  computed: {
    setTheme () {
      this.$vuetify.theme.dark = false
    },
    ...mapGetters('session', ['isLoggedIn']),
    snackbarColor() {
      if(this.snackbar.type === 'info') return 'primary'
      if(this.snackbar.type === 'error') return 'red'
    },
  },
  methods: {
    setSnackbar(val) {
      if(typeof val === 'object') {
        this.snackbar.text = val.text
        this.snackbar.type = val.type
        this.snackbar.model = true
        return
      }
      this.snackbar.model = true
      this.snackbar.text = val
    },
  },
  mounted() {
    if(!this.isLoggedIn) {
      this.$router.replace('/login')
    }
    this.$nuxt.$on('setSnackbar', (val) => this.setSnackbar(val))
  },
  beforeDestroy() {
    this.$nuxt.$off('setSnackbar')
  },
}
</script>
