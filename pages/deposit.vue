<template>
  <v-card
    class="mx-auto mt-8"
    max-width="700"
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-chip-group
            v-model="selectedAccount"
            @change="accountTodeposit = me"
          >
            <v-chip
              label
              active
              filter
            
            >
              គណនីផ្ទាល់ខ្លួន
            </v-chip>
            <v-chip
              label
              filter
            
            >
              គណនីសមាជិកផ្សេង
            </v-chip>
          </v-chip-group>
          <div v-if="selectedAccount === 0">
            <v-chip color="primary">
              {{ me.name }}
            </v-chip>
          </div>
          <v-select
            v-if="selectedAccount === 1 && getAllMembers.length > 0"
            v-model="selectAccount"
            :items="getAllMembers"
            label="ជ្រើសរើសគណនី"
            item-text="name"
            item-value="id"
            @change="selectToDeposit"
          ></v-select>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">
            Welcome to Vuetify
          </h3>
          <span class="text-caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3 || accountTodeposit === null"
        color="primary"
        depressed
        @click="step++"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    step: 1,
    selectedAccount: [],
    selectAccount: { name: "", id: null },
    accountTodeposit: null,
  }),
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'ជ្រើសរើសគណនីដែលត្រូវសន្សំ'
        case 2: return 'Create a password'
        default: return 'Account created'
      }
    },
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getAllMembers']),
  },
  methods: {
    async fetchAllMembers() {
      await this.$store
        .dispatch('members/getAllMembers')
        .then(res => {})
        .catch()
        .finally()
    },
    selectToDeposit() {
      this.accountTodeposit = this.getAllMembers.find(e => e.id === this.selectAccount)
      console.log(this.accountTodeposit)
    }
  },
  mounted() {
    this.fetchAllMembers()
  }
}
</script>