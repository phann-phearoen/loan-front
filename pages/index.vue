<template>
  <v-card v-if="isLoggedIn && me" outlined>
    <v-card-title class="justify-center text-h5">ទំព័រដើម</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>គណនីរបស់ខ្ញុំ</v-card-title>
            <v-card-text>
              <v-row class="detail-row">
                <v-col cols="3" align-self="end">
                  <div class="label">ឈ្មោះ</div>
                </v-col>
                <v-col align-self="end">
                  <div class="label">{{ me.name }}</div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="detail-row">
                <v-col cols="3" align-self="end">
                  <div class="label">ភេទ</div>
                </v-col>
                <v-col align-self="end">
                  <div class="label">{{ me.gender }}</div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="detail-row">
                <v-col cols="3" align-self="end">
                  <div class="label">ប្រាក់សន្សំសរុប</div>
                </v-col>
                <v-col align-self="end">
                  <div class="label">{{ me.deposit ? me.deposit.toLocaleString() : 0 }} ៛</div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="detail-row">
                <v-col cols="3" align-self="end">
                  <div class="label">ប្រាក់កម្ចីសរុប</div>
                </v-col>
                <v-col align-self="end">
                  <div class="label">{{ me.loan ? me.loan.toLocaleString() : 0 }} ៛</div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>

        </v-col>
      </v-row>
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
    ...mapGetters('members', { me: 'getThisMember' }),
  },
  methods: {
    toDeposit() { this.$router.push('/deposit') },
    async fetchMe() {
      return await this.$store
        .dispatch('members/getThisMember')
        .then()
        .finally()
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.replace('/login')
    }
    this.fetchMe()
  },
  beforeDestroy() {
    this.$store.commit('members/set_one_member', null)
  },
}
</script>

<style scoped>

</style>
