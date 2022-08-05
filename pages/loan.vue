<template>
  <v-card width="100%" min-height="700">
    <v-card-title>ផ្ដល់ប្រាក់កម្ចី</v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :color="forMembers ? 'primary' : 'secondary'"
        min-width="200"
        @click="forMembers = true"
      >
        សមាជិកក្រុម
      </v-btn>
      <v-btn
        :color="!forMembers ? 'primary' : 'secondary'"
        dark
        min-width="200"
        @click="forMembers = false"
      >
        អតិថិជនខាងក្រៅ
      </v-btn>
    </v-card-actions>
    <v-card-text v-if="forMembers">
      <v-card-subtitle>ជ្រើសរើសគណនីដែលត្រូវផ្ដល់កម្ចី</v-card-subtitle>
      <v-row>
        <v-col cols="7">
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
            min-width="150"
            color="primary"
            @click="doFindMember"
          >ស្វែងរកសមាជិក</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="getOneMember">
          <v-col cols="7">
            <div
              id="foundMember"
              :class="getOneMember === getMemberToLoan ? 'is-selected primary--text' : ''"
            >
              <div class="d-inline mr-auto">
                អត្តលេខ៖​ {{ getOneMember.id }}, 
                ឈ្មោះ៖ {{ getOneMember.name }}, 
                ភេទ៖ {{ getOneMember.gender }}
              </div>
              <div
                v-if="getOneMember === getMemberToLoan"
                class="d-inline ml-auto"
              >
                <v-icon color="#2196F3">mdi-check</v-icon>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              min-width="150"
              @click="doSelectMember"
            >
              យកគណនីនេះ
            </v-btn>
            <v-btn
              color="red"
              dark
              min-width="150"
              @click="doFindOtherMember"
            >
              ស្វែងរកថ្មី
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="getMemberToLoan">
          <v-col cols="12">
            <v-text-field
              label="បញ្ចូលចំនួនទឹកប្រាក់"
              hint="លេខរ៉ូម៉ាំង"
              type="number"
              suffix="៛"
              v-model="amount"
              :rules="[v => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="បញ្ចូលរយពេលជាខែ"
              type="number"
              suffix="ខែ"
              v-model="period"
              :rules="[v => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="អត្រាការប្រាក់"
              suffix="%"
              v-model="rate"
              :rules="[v => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
        </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!getMemberToLoan || !amount || !period"
        color="primary"
        min-width="200"
        @click="doCreateAgreementForMember"
      >
        បង្កើតកិច្ចសន្យា
      </v-btn>
      <v-btn
        :disabled="!getMemberToLoan || !amount || !period"
        color="primary"
        min-width="200"
        @click="doCreateRepaySheet"
      >
        បង្កើតតារាងសងប្រាក់
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!agreed || !sheetCreated"
        color="primary"
        min-width="200"
        @click="submit"
      >
        រក្សារទុក
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      forMembers: true,
      memberId: null,
      amount: null,
      period: null,
      rate: 3,
      agreed: false,
      sheetCreated: false,
    }
  },
  computed: {
    ...mapGetters('members', [
      'getOneMember',
      'getMemberToLoan',
      'getThisMember',
    ]),
  },
  methods: {
    async doFindMember() {
      await this.$store
        .dispatch('members/getOneMember', this.memberId)
        .then((res) => {})
        .catch((err) => {
          if (err) {
            this.$nuxt.$emit('setSnackbar', 'មិនមានគណនីជាមួយអត្តលេខនេះទេ!')
            this.$refs.memberId.$refs.input.focus()
          }
        })
        .finally()
    },
    doSelectMember() {
      this.$store.commit('members/set_member_to_loan', this.getOneMember)
    },
    doFindOtherMember() {
      this.$store.commit('members/set_one_member', null)
      this.$store.commit('members/set_member_to_loan', null)
      this.$refs.memberId.$refs.input.focus()
      this.amount = null
    },
    doCreateAgreementForMember() {
      sessionStorage.setItem('loanProvider', JSON.stringify(this.getThisMember))
      sessionStorage.setItem('loanTaker', JSON.stringify(this.getMemberToLoan))
      window.open(`/agreement_member`)
    },
    doCreateRepaySheet() {
      this.sheetCreated = true
      const obj = {
        amount: this.amount,
        period: this.period,
        rate: this.rate / 100,
      }
      sessionStorage.setItem('loanObject', JSON.stringify(obj))
      window.open('/repay_sheet')
    },
    submit() {

    },
  },
  mounted() {
    if (!this.getThisMember) {
      this.$store.dispatch('members/getThisMember')
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