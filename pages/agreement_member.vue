<template>
  <v-card v-if="loanProvider && loanTaker && loan && pawn" width="100%">
    <v-card-text>
      <div class="text-center title">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ<br><br>
       <u>កិច្ចសន្យាខ្ចីចងការប្រាក់ និងដាក់បញ្ចាំ</u> 
      </div>
      <div>
        <v-card-text class="normal">
          <p>
            ១- ភាគីអោយខ្ចីចងការៈ ឈ្មោះ {{loanProvider.name}} ភេទ {{loanProvider.gender}}​ អាយុ​{{loanProvider.age}} ឆ្នាំ 
            មានទីលំនៅនៅ {{loanProvider.address}} ជាភាគី(ក)។
          <br>
          ២- ភាគីសុំខ្ចីចងការៈ ឈ្មោះ ​{{loanTaker.name}} ភេទស្រី {{loanTaker.gender}} អាយុ​ {{loanTaker.age}}​​ ឆ្នាំ អត្តសញ្ញាណបណ្ណលេខ
           {{loanTaker.national_id}}​​ មានទីលំនៅនៅ {{loanTaker.address}} ជាភាគី(ខ)។
          </p>
          <p style="margin-left:4rem">
          1. ភាគ(ក)យល់ព្រមឲ្យភាគី(ខ)​ខ្ចីចងការ ហើយបើភាគី(ខ) បានព្រមទទួល និងសន្យាសងមក ភាគី(ក)​​ ជាដាច់ខាត នូវ
        ប្រាក់ខ្ចីចងការនះ 
          </p> 
          <p>តាមចំនួន និងរាល់លក្ខខ័ណ្ឌដែលបានព្រមព្រៀងគ្នាដូចតទៅ​៖ <br>
            ១-១. ប្រាក់ខ្ចីចងការដែល ភាគី(ខ)បានទទួលពីភាគី(ក)​មានចំនួនជាលេខ​ {{loan.amount}} ប្រាក់សរសេរជាអក្សរ.....................
            <br>
            ១-២. រយៈពេលខ្ចីចងការចំនួន​ {{loan.period}} ខែ គិតចាប់ពី{{loan.from}} រហូតដល់​{{loan.to}}
            <br>
            ១-៣. អត្រាការប្រាក់​{{loan.rate}}ភាគរយក្នុងមួយខែ
            <br>
            ១-៤. ក្នុងករណី​ភាគី(ខ)មិនបានសងការប្រាក់ក្នងរយៈពេលពីរខែជាប់គ្នា​ ភាគី(ខ)សុខចិត្តឲ្យភាគី(ក)ចាត់ចែងលក់ក្នុងតម្លៃឡាយឡុង នូវចលនៈវត្ថុឫអចលនៈវត្ថុ
             ដែលដាក់បញ្ចាំ ដើម្បីកាត់យកមកទូរទាត់បំណុលដែលនៅជំពាក់រួមទាំង
             ការប្រាក់ និងរាល់សោហ៊ុយចំណាយក្នុងការប្តឹងផ្តល់ ឫលក់ដូរជាបន្ទុករបស់ភាគីកូនបំណុលភាគី(ខ)
          </p>
          <p style="margin-left:4rem">
          2. ភាគី(ខ)​បានដាក់បញ្ចាំនូវអចលនៈឫ ចលនៈវត្ថុ ដែលជាកម្មសិទ្ធស្របច្បាប់ផ្ទាល់ខ្លួន ដើម្បីធានាបំណុលទាំងដើមនិងការប្រាក់ដល់ភាគី(ក)​ រួមមាន៖
          </p>
            ២-១. ដីលំនៅដ្ឋានមានប័ណ្ណសំគាល់លេខ​{{pawn.no}} ចុះថ្ងៃទី​ {{pawn.registerDate}} ដោយ{{pawn.registeredBy}}
            <p style="margin-left:4rem">
            ដីនេះមានទំហំ​​ {{pawn.surfaceArea}} និងមានតម្លៃប៉ាន់ស្មានចំនួន {{estimateValue}}
            <br>
            ខាងជើងទល់នឹង​ {{pawn.north}}​ ខាងត្បូងទល់នឹង {{pawn.south}}
            <br>
            ខាងកើតទល់នឹង {{pawn.east}} ខាងលិចទល់នឹង{{pawn.west}}
            <br>
            -ទ្រព្យសម្បត្តិផ្សេងៗទៀតដែលបានដាក់ធានាប្រាក់ខ្ចី {{pawn.otherAsset}}
            </p>

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
        estimateValue: '',
        north: '',
        south: '',
        east: '',
        west: '',
        otherAsset: ''
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