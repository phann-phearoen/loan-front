<template>
  <div v-if="getAllClients">
    {{ getAllClients }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('members', ['getAllClients'])
  },
  methods: {
    async fetchAllClients() {
      this.$store
        .dispatch('members/getAllClients', {})
        .then()
        .catch()
        .finally()
    },
  },
  mounted() {
    this.fetchAllClients()
  },
}
</script>