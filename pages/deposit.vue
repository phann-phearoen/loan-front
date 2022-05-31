<template>
  <v-container>
    <v-card width="100%">
      <v-card-title>ដាក់ប្រាក់សន្សំ</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>ជ្រើសរើសគណនីដែលត្រូវសន្សំ</v-card-subtitle>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            label="បញ្ចូលអត្តលេខសមាជិក"
            hint="លេខរ៉ូម៉ាំង"
            type="number"
            v-model="memberId"
            :rules="v => !!v || 'សូមបញ្ចូលអត្តលេខឲ្យបានត្រឹមត្រូវ។'"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      memberId: null,
      selectedMember: {
        id: null,
      },
    }
  },
  computed: {
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getAllMembers', 'getThisMember']),
  },
  methods: {
    async fetchAllMembers() {
      await this.$store
        .dispatch('members/getAllMembers', {
          page: 1,
          per: 10,
        })
        .then(res => {})
        .catch()
        .finally()
    },
    async fetchThisMember() {
      await this.$store
        .dispatch('members/getThisMember')
        .then()
        .finally()
    },
    async submit() {
      await this.$store
        .dispatch('members/apiNewDeposit', {
          amount: this.amount,
          id: this.accountTodeposit.id,
        })
        .then((res) => {
          this.$nuxt.$emit('setSnackbar', res.data.message)
          if (this.getThisMember.id === this.accountTodeposit.id) {
            this.$router.push('/')
            return
          }
          this.$router.push(`/members/${this.accountTodeposit.id}`)
        })
        .catch()
        .finally()
    },
    mounted() {
      this.fetchAllMembers()
      this.fetchThisMember()
    }
  },
}
</script>