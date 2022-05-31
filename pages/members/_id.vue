<template>
  <v-card width="100%">
    <v-card-title class="justify-center text-h5">
      គណណីរបស់ {{ oneMember.name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-16">
      <v-row class="detail-row">
        <v-col
          class="text-h6"
          cols="3"
          align-self="end"  
        >
          ឈ្មោះ
        </v-col>
        <v-col
          align-self="end"
          class="text-h6"
        >
          {{ oneMember.name }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="detail-row">
        <v-col
          class="text-h6"
          cols="3"
          align-self="end"  
        >
          ភេទ
        </v-col>
        <v-col
          align-self="end"
          class="text-h6"
        >
          {{ oneMember.gender }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="detail-row">
        <v-col
          class="text-h6"
          cols="3"
          align-self="end"  
        >
          ប្រាក់សន្សំសរុប
        </v-col>
        <v-col
          align-self="end"
          class="text-h6"
        >
          {{ oneMember.total_deposit }} ៛
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="detail-row">
        <v-col
          class="text-h6"
          cols="3"
          align-self="end"  
        >
          ប្រាក់កម្ចីសរុប
        </v-col>
        <v-col
          align-self="end"
          class="text-h6"
        >
          {{ oneMember.loan }} ៛
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    id() { return this.$route.params.id },
    ...mapGetters('members', { oneMember: 'getOneMember' }),
  },
  methods: {
    async fetchOneMember() {
      await this.$store
        .dispatch('members/getOneMember', this.id)
        .then()
        .finally()
    },
  },
  mounted() {
    this.fetchOneMember()
  },
}
</script>

<style scoped>
.detail-row {
  min-height: 100px !important;
}
</style>