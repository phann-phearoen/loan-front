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
            :rules="[(v) => !!v || 'សូមបញ្ចូលអត្តលេខឲ្យបានត្រឹមត្រូវ។']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            :disabled="!memberId"
            min-width="150"
            color="primary"
            @click="doFindMember"
            >ស្វែងរកសមាជិក</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="getOneMember">
        <v-col cols="7">
          <div
            id="foundMember"
            :class="
              getOneMember === getMemberToLoan
                ? 'is-selected primary--text'
                : ''
            "
          >
            <div class="d-inline mr-auto">
              អត្តលេខ៖​ {{ getOneMember.id }}, ឈ្មោះ៖ {{ getOneMember.name }},
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
          <v-btn color="primary" min-width="150" @click="doSelectMember">
            យកគណនីនេះ
          </v-btn>
          <v-btn color="red" dark min-width="150" @click="doFindOtherMember">
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
            :rules="[(v) => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="បញ្ចូលរយពេលជាខែ"
            type="number"
            suffix="ខែ"
            v-model="period"
            :rules="[(v) => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="អត្រាការប្រាក់"
            suffix="%"
            v-model="rate"
            :rules="[(v) => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-else>
      <v-card-title>អតិថិជនខាងក្រៅ</v-card-title>
      <v-divider></v-divider>
      <v-text-field outlined label="ឈ្មោះ" clearable v-model="loanTaker.name">
      </v-text-field>
      <v-select
        v-model="loanTaker.gender"
        :items="loanTaker.gender"
        outlined
        label="ភេទ"
      >
      </v-select>
      <v-text-field
        outlined
        label="ថ្ងៃខែឆ្នាំកំណើត"
        type="date"
        clearable
        v-model="loanTaker.birthDate"
      ></v-text-field>
      <v-text-field
        outlined
        label="អាស័យដ្ឋាន"
        type="adress"
        clearable
        v-model="loanTaker.address"
      ></v-text-field>
      <v-text-field
        label="លេខអត្តសញ្ញាណប័ណ្ណ"
        type="number"
        outlined
        clearable
        v-model="loanTaker.national_id"
      ></v-text-field>
      <v-text-field
        outlined
        v-model="loan.amount"
        label="ទឹកប្រាក់ដែលត្រូវខ្ចី"
        suffix="៛"
        type="number"
        clearable
      ></v-text-field>
      <v-row>
        <v-col>
          <v-text-field
            label="កាលបរិច្ឆេទខ្ជី"
            v-model="loan.date"
            outlined
            type="date"
            clearable
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="កាលបរិច្ឆេទសង"
            outlined
            type="date"
            clearable
            v-model="loan.to"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            label="រយៈពេលខ្ចី"
            suffix="ខែ"
            outlined
            type="number"
            clearable
            v-model="loan.period"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="អត្រាការប្រាក់"
            suffix="%"
            outlined
            type="number"
            clearable
            v-model="loan.rate"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            label="លេខប័ណ្ណសំគាល់លំនៅដ្ឋាន"
            outlined
            type="number"
            clearable
            v-model="pawn.no"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="កាលបរិច្ឆេទចុះបញ្ជី"
            outlined
            type="date"
            readonly
            clearable
            v-model="pawn.registerDate"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="ទំហំដី"
            outlined
            type="number"
            suffix="ម៉ែត្រការេ"
            clearable
            v-model="pawn.surfaceArea"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="តម្លៃដីប៉ាន់ស្មាន"
            outlined
            suffix="៛"
            type="number"
            clearable
            v-model="pawn.estimateValue"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="ព្រំប្រទល់ខាងជើង"
            clearable
            px-6
            v-model="pawn.north"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="ព្រំប្រទល់ខាងត្បូង"
            clearable
            v-model="pawn.south"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="ព្រំប្រទល់ខាងលិច"
            clearable
            v-model="pawn.west"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="ព្រំប្រទល់ខាងកើត"
            clearable
            v-model="pawn.east"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        label="ទ្រព្យសម្បត្តិដទៃទៀត"
        clearable
        v-model="pawn.otherAsset"
        type="text"
      >
      </v-text-field>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      forMembers: false,
      memberId: null,
      amount: null,
      period: null,
      rate: 3,
      agreed: false,
      sheetCreated: false,
      loanTaker: {
        name: "",
        gender: ["ប្រុស", "ស្រី"],
        age: null,
        address: "",
        national_id: "",
      },
      loan: {
        amount: null,
        period: null,
        from: "",
        to: "",
        rate: null,
      },
      pawn: {
        no: null,
        registerDate: "",
        registeredBy: "",
        surfaceArea: null,
        estimateValue: null,
        north: "",
        south: "",
        east: "",
        west: "",
        otherAsset: "",
      },
    };
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
        .dispatch("members/getOneMember", this.memberId)
        .then((res) => {})
        .catch((err) => {
          if (err) {
            this.$nuxt.$emit("setSnackbar", "មិនមានគណនីជាមួយអត្តលេខនេះទេ!");
            this.$refs.memberId.$refs.input.focus();
          }
        })
        .finally();
    },
    doSelectMember() {
      this.$store.commit("members/set_member_to_loan", this.getOneMember);
    },
    doFindOtherMember() {
      this.$store.commit("members/set_one_member", null);
      this.$store.commit("members/set_member_to_loan", null);
      this.$refs.memberId.$refs.input.focus();
      this.amount = null;
    },
    doCreateAgreementForMember() {
      sessionStorage.setItem('loanProvider', JSON.stringify(this.getThisMember))
      sessionStorage.setItem('loanTaker', JSON.stringify(this.getMemberToLoan))
      let now = new Date()
      const loan = {
        amount: parseInt(this.amount).toLocaleString(),
        period: this.period,
        rate: this.rate,
        from: now.toISOString().slice(0, 10),
        to: 
          new Date(now.setMonth(now.getMonth() + parseInt(this.period)))
          .toISOString().slice(0, 10),
      }
      sessionStorage.setItem('loan', JSON.stringify(loan))
      window.open(`/agreement_member`)
    },
    doCreateRepaySheet() {
      this.sheetCreated = true;
      const obj = {
        amount: this.amount,
        period: this.period,
        rate: this.rate / 100,
      };
      sessionStorage.setItem("loanObject", JSON.stringify(obj));
      window.open("/repay_sheet");
    },
    submit() {},
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
  padding: 0.5em;
  font-size: 1.2em;
}
.is-selected {
  border: 1px #2196f3 solid !important;
}
</style>
