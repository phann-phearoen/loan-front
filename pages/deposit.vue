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
            @change="selectToDeposit"
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
              {{ accountTodeposit.name }}
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
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-if="accountTodeposit"
              label="គណនីដែលបានជ្រើសរើស"
              readonly
              v-model="accountTodeposit.name"
              outlined
            ></v-text-field>
            <v-text-field
              label="ចំនួនទឹកប្រាក់ជារៀល"
              outlined
              v-model="amount"
              type="number"
              :rules="amountRule"
              suffix="៛"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-card-text>
          <v-text-field
            v-if="accountTodeposit"
            label="ឈ្មោះគណនី"
            readonly
            v-model="accountTodeposit.name"
            outlined
          ></v-text-field>
          <v-text-field
            v-if="accountTodeposit"
            label="ចំនួនទឹកប្រាក់"
            readonly
            v-model="amount"
            outlined
            suffix="៛"
          ></v-text-field>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        ត្រឡប់
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step !== 3"
        :disabled="accountTodeposit === null"
        color="primary"
        depressed
        @click="step++"
      >
        បន្ត
      </v-btn>
      <v-btn
        v-if="step === 3"
        :disabled="accountTodeposit === null"
        color="primary"
        depressed
        @click="submit"
      >
        បន្ត
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
    amount: null,
    amountRule: [ v => !!v || 'សូមបញ្ចូលចំនួនទឹកប្រាក់។' ]
  }),
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'ជ្រើសរើសគណនីដែលត្រូវសន្សំ'
        case 2: return 'បញ្ចូលទឹកប្រាក់ដែលត្រូវសន្សំ'
        default: return 'បញ្ជាក់ទិន្នន័យ'
      }
    },
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getAllMembers', 'getThisMember']),
  },
  methods: {
    async fetchThisMember() {
      await this.$store
        .dispatch('members/getThisMember')
        .then((res) => {
          this.fetchAllMembers(this.getThisMember.id)
        })
        .catch()
        .finally()
    },
    async fetchAllMembers(admin_id) {
      await this.$store
        .dispatch('members/getAllMembers', {
          admin_id: admin_id
        })
        .then(res => {})
        .catch()
        .finally()
    },
    selectToDeposit() {
      if (this.selectedAccount === 0) {
        this.accountTodeposit = this.getThisMember
        return
      }
      this.accountTodeposit = this.getAllMembers.find(e => e.id === this.selectAccount)
    },
    async submit() {
      await this.$store
        .dispatch('members/apiNewDeposit', {
          amount: this.amount,
          id: this.accountTodeposit.id,
        })
        .then((res) => {
          console.log(res)
        })
        .catch()
        .finally()
    },
  },
  mounted() {
    this.fetchThisMember()
  }
}
</script>