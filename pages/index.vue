<template>
  <v-card
    v-if="isLoggedIn"
  >
    <v-card-title class="justify-center text-h5">គណនីរបស់ខ្ញុំ</v-card-title>
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
          {{ getThisMember.total_deposit }} ៛
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
    <v-divider class="mt-12"></v-divider>
    <v-card-title class="justify-center text-h5">ប្រត្តិបត្តិការណ៍</v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="px-16 py-8">
      <v-btn
        x-large
        color="primary"
        @click="toDeposit"
      >
        ដាក់ប្រាក់សន្សំ
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        x-large
        color="primary"
      >
        សងប្រាក់
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        x-large
        color="red"
        dark
      >
        ផ្ដល់ប្រាក់កម្ចី
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        x-large
        color="green"
        dark
      >
        គ្រប់គ្រងសមាជិក
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        x-large
        color="green"
        dark
      >
        គ្រប់គ្រងអតិថិជន
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters('session', ['getUser', 'isLoggedIn']),
    ...mapGetters('members', ['getThisMember'])
  },
  methods: {
    toDeposit() { this.$router.push('/deposit') },
    async fetchThisMember() {
      await this.$store
        .dispatch('members/getThisMember')
        .then()
        .catch()
        .finally()
    },
  },
  mounted() {
    if(!this.isLoggedIn) {
      this.$router.replace('/login')
    }
  },
}
</script>

<style scoped>
.detail-row {
  min-height: 100px !important;
}
</style>
