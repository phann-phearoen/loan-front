<template>
  <v-container>
    <v-card width="100%">
      <v-card-title>ដាក់ប្រាក់សន្សំ</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-card-subtitle>ជ្រើសរើសគណនីដែលត្រូវសន្សំ</v-card-subtitle>
        <v-row>
          <v-col cols="8">
            <v-text-field
              ref="memberId"
              label="បញ្ចូលអត្តលេខសមាជិក"
              hint="លេខរ៉ូម៉ាំង"
              type="number"
              v-model="memberId"
              :rules="[v => !!v || 'សូមបញ្ចូលអត្តលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              :disabled="!memberId"
              color="primary"
              @click="doFindMember"
            >ស្វែងរកសមាជិក</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="getOneMember">
          <v-col cols="8">
            <div
              id="foundMember"
              :class="getOneMember === selectedMember ? 'is-selected' : ''"
            >
              <div class="d-inline mr-auto">
                អត្តលេខ៖​ {{ getOneMember.id }}, 
                ឈ្មោះ៖ {{ getOneMember.name }}, 
                ភេទ៖ {{ getOneMember.gender }}
              </div>
              <div
                v-if="getOneMember === selectedMember"
                class="d-inline ml-auto"
              >
                <v-icon color="#2196F3">mdi-check</v-icon>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              @click="doSelectMember"
            >
              យកគណនីនេះ
            </v-btn>
            <v-btn
              color="red"
              dark
              @click="doFindOtherMember"
            >
              ស្វែងរកថ្មី
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              ref="memberId"
              label="បញ្ចូលចំនួនទឹកប្រាក់"
              hint="លេខរ៉ូម៉ាំង"
              type="number"
              suffix="៛"
              v-model="amount"
              :rules="[v => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
        </v-row>
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
      selectedMember: null,
      amount: null,
    }
  },
  computed: {
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getOneMember']),
  },
  methods: {
    async doFindMember() {
      await this.$store
        .dispatch('members/getOneMember', this.memberId)
        .then()
        .catch()
        .finally()
    },
    doSelectMember () {
      this.selectedMember = this.getOneMember
    },
    doFindOtherMember() {
      this.$store.commit('members/set_one_member', null)
      this.$refs.memberId.$refs.input.focus()
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
    }
  },
}
</script>

<style scoped>
#foundMember {
  display: flex;
  width: 100%;
  border: 1px grey solid;
  border-radius: 5px;
  padding: .5em;
  font-size: 1.2em;
}
.is-selected {
  border: 1px #2196F3 solid !important;
}
</style>