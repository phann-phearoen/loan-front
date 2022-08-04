<template>
  <v-card v-if="loanProvider && loanTaker && loan && pawn" width="100%">
    <v-card-text>
      <div class="text-center title">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ<br><br>
       <u>កិច្ចសន្យាខ្ចីចងការប្រាក់ និងដាក់បញ្ចាំ</u> 
      </div>
      <div>
        <v-card-text>
          ១- ភាគីអោយខ្ចីចងការៈ ឈ្មោះ {{loanProvider.name}} ភេទ {{loanProvider.gender}}​ អាយុ​{{loanProvider.age}} ឆ្នាំ មានទីលំនៅនៅ {{loanProvider.address}} ជាភាគី(ក)។
          <br>
          ២- ភាគីសុំខ្ចីចងការៈ ឈ្មោះ ​{{loanTaker.name}} ភេទស្រី {{loanTaker.gender}} អាយុ​ {{loanTaker.age}}​​ ឆ្នាំ អត្តសញ្ញាណបណ្ណលេខ {{loanTaker.national_id}}​​ មានទីលំនៅនៅ {{loanTaker.address}} ជាភាគី(ខ)។
        </v-card-text>
        <v-card-text>

        </v-card-text>
      </div>
      <v-row
        justify="center"
        class="mt-12"
        style="min-height: 200px"
      >
        <v-col>
          <div class="text-center normal">
            ហត្ថលេខាឬស្នាមមេដៃសាក្សី
          </div>
        </v-col>
        <v-col>
          <div class="text-center normal">
            ហត្ថលេខាឬស្នាមមេដៃអ្នកខ្ចី
          </div>
        </v-col>
        <v-col>
          <div class="text-center normal">
            ហត្ថលេខាឬស្នាមមេដៃតំណាងក្រុម
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'agreement',
  data() {
    return {
      loanProvider: {
        name: 'hid',
        gender: 'hdso',
        age: '40',
        address: 'abcddfg',
        national_id: '1222112221',
      },
      loanTaker: {
        name: 'abcd',
        gender: 'ប្រុស',
        age: '90',
        address: 'sdjkdkldfdfdn',
        national_id: '12233444554'
      },
      loan: {
        amount: '23',
        period: '45',
        from: '14',
        to: '67dds',
        rate: 'djfd'

      },
      pawn: {
        no:'1111',
        registerDate: '',
        registeredBy: '',
        surfaceArea: '',
        estimateValue: ''
      },
    }
  },
  mounted() {
    console.log(this.loanObject)
  },
}
</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: 600;
}
.normal {
  font-size: 1.25em !important;
  line-height: 2;
}
</style>