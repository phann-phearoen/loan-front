<template>
  <v-card
    v-if="isLoggedIn"
  >
    <v-card-title class="justify-center text-h5">គណនីរបស់ខ្ញុំ</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
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
          {{ getUser.name }}
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
          {{ getUser.gender }}
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
          {{ getUser.total_deposit }} ៛
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
          {{ getUser.total_deposit }} ៛
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
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

<style scoped>
.detail-row {
  min-height: 100px !important;
}
</style>
