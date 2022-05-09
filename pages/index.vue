<template>
  <div v-if="isLoggedIn">
    Hello Kampong Samki
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters('session', ['getUser', 'isLoggedIn'])
  },
  mounted() {
    if(!this.isLoggedIn) {
      this.$router.replace('/login')
    }
  }
}
</script>
