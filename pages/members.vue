<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="justify-center">បញ្ជីសមាជិក</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-for="member in members" :key="member.id">{{ member.name }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('members', { members: 'getAllMembers'}),
  },
  methods: {
    async fetchMembers() {
      await this.$store
        .dispatch('members/getAllMembers')
        .then()
        .catch()
        .finally()
    },
  },
  mounted() {
    this.fetchMembers()
  },
}
</script>