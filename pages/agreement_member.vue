<template>
  <v-card
    v-if="
      loanProvider &&
      loanTaker &&
      loan &&
      pawn
    "
    width="100%"
    tile
    outlined
    class="px-10 pt-8"
    style="padding-bottom: 10em"
  >
    <v-card-text>
      <div class="text-center title">
        ព្រះរាជាណាចករកម្ពុជា<br />
        ជាតិ សាសនា ព្រះមហាក្សត្រ<br /><br />
        <u>កិច្ចសន្យាខ្ចីចងការប្រាក់ និងដាក់បញ្ចាំ</u>
      </div>
      <div>
        <v-card-text class="normal">
            ១- ភាគីអោយខ្ចីចងការៈ ឈ្មោះ {{loanProvider.name ? loanProvider.name : '.................'}} 
            ភេទ {{loanProvider.gender ? loanProvider.gender: '....................'}}​ អាយុ​ {{loanProvider.date_of_birth ? calcAge(loanProvider.date_of_birth) : '............'}} ឆ្នាំ 
            មានទីលំនៅនៅ {{loanProvider.address ? loanProvider.address : '......................................................................'}} ជាភាគី(ក)។
          <br>
          ២- ភាគីសុំខ្ចីចងការៈ ឈ្មោះ ​{{loanTaker.name ? loanTaker.name : '.................'}} ភេទ {{loanTaker.gender ? loanTaker.gender : '..............'}} អាយុ​ {{ loanTaker.date_of_birth ? calcAge(loanTaker.date_of_birth) : '........'}}​​ ឆ្នាំ អត្តសញ្ញាណបណ្ណលេខ
           {{loanTaker.national_id ? loanTaker.national_id : '................................'}}​​ មានទីលំនៅនៅ {{loanTaker.address ? loanTaker.address : '..............................................................'}} ជាភាគី(ខ)។
          <p class="indent">
          1. ភាគ(ក)យល់ព្រមឲ្យភាគី(ខ)​ខ្ចីចងការ ហើយបើភាគី(ខ) បានព្រមទទួល និងសន្យាសងមក ភាគី(ក)​​ ជាដាច់ខាត នូវ
        ប្រាក់ខ្ចីចងការនះតាមចំនួន និងរាល់លក្ខខ័ណ្ឌដែលបានព្រមព្រៀងគ្នាដូចតទៅ​៖ <br>
            ១-១. ប្រាក់ខ្ចីចងការដែល ភាគី(ខ)បានទទួលពីភាគី(ក)​មានចំនួនជាលេខ​ {{loan.amount ? loan.amount : '........................'}} ៛ ប្រាក់សរសេរជាអក្សរ..................................................................
            <br>
            ១-២. រយៈពេលខ្ចីចងការចំនួន​ {{loan.period ? loan.period : '...............................'}} ខែ គិតចាប់ពី {{loan.from ? loan.from : '...........................'}} រហូតដល់​ {{loan.to ? loan.to : '............................'}}
            <br>
            ១-៣. អត្រាការប្រាក់​ {{loan.rate ? loan.rate : '.............................'}} ភាគរយក្នុងមួយខែ
            <br>
            ១-៤. ក្នុងករណី​ភាគី(ខ)មិនបានសងការប្រាក់ក្នងរយៈពេលពីរខែជាប់គ្នា​ ភាគី(ខ)សុខចិត្តឲ្យភាគី(ក)ចាត់ចែងលក់ក្នុងតម្លៃឡាយឡុង នូវចលនៈវត្ថុឫអចលនៈវត្ថុ
             ដែលដាក់បញ្ចាំ ដើម្បីកាត់យកមកទូរទាត់បំណុលដែលនៅជំពាក់រួមទាំង
             ការប្រាក់ និងរាល់សោហ៊ុយចំណាយក្នុងការប្តឹងផ្តល់ ឫលក់ដូរជាបន្ទុករបស់ភាគីកូនបំណុលភាគី(ខ)
          </p>
          <p class="indent">
            2. ភាគី(ខ)​បានដាក់បញ្ចាំនូវអចលនៈឫ ចលនៈវត្ថុ ដែលជាកម្មសិទ្ធស្របច្បាប់ផ្ទាល់ខ្លួន ដើម្បីធានាបំណុលទាំងដើមនិងការប្រាក់ដល់ភាគី(ក)​ រួមមាន៖
            <br>
            ២-១. ដីលំនៅដ្ឋានមានប័ណ្ណសំគាល់លេខ​{{pawn.no ? pawn.no : '..........................'}} ចុះថ្ងៃទី​ {{pawn.registerDate ? pawn.registerDate : '...............................'}} ដោយ{{pawn.registeredBy ? pawn.registeredBy : '.............................................'}}
            ដីនេះមានទំហំ​​ {{pawn.surfaceArea}} ម៉ែត្រការ៉េ<br>
            និងមានតម្លៃប៉ាន់ស្មានចំនួន {{ pawn.estimateValue ? parseInt(pawn.estimateValue).toLocaleString() : '.................................................................' }} ៛
            <p class="indent">
            ខាងជើងទល់នឹង​ {{pawn.north ? pawn.north : '.............................................'}}
             ខាងត្បូងទល់នឹង {{pawn.south ? pawn.south : '.............................................'}}
            </p>
            <p class="indent">
            ខាងកើតទល់នឹង {{pawn.east ? pawn.east : '.............................................'}}
            ខាងលិចទល់នឹង{{pawn.west ? pawn.west : '..............................................'}}
            </p>
            <p class="indent">
            -ទ្រព្យសម្បត្តិផ្សេងៗទៀតដែលបានដាក់ធានាប្រាក់ខ្ចី {{pawn.otherAsset ? pawn.otherAsset : '.......................................................................................'}}
            </p>
          <p>
            ២-២ ភាគី(ខ)សូមធ្វើការធានាអះអាងចមពោះមុខច្បាប់ថា៖
          </p>
            <p class="indent" >
              -ទ្រព្យសម្បត្តិដែលបានដាក់ចញ្ចាំនេះពិតជាកម្មសិទ្ធិស្របច្បាប់ផ្ទាល់របស់ខ្លួន​ ដោយពុំមានពាក់ព័ន្ទនិងបញ្ចាំអ្វីមួ​យ ឫជនណាមួយឡើយ ហើយបើផ្ទុយពីនេះ ភាគី(ខ)ហ៊ានទទួលខុសត្រូវចំពោះមុខច្បាប់។
            </p>
          
          <p>
            ៣-១ ភាគី(ក)សូមធ្វើការធានាអះអាងចំពោះមុខច្បាប់ថា៖
            <p class="indent">
              -ភាគី(ក)សូមធ្វើការសន្យាថានៅក្នុងរយៈពេលនៃការដាក់បញ្ចាំនេះ នឹងពុំមានការដោះដូរ លក់ ផ្ទេរ ឫដាក់បញ្ចាំទៅឲ្យជនណាផ្សេងទៀតឡើយនូវទ្រព្យរបស់ដែលភាគី(ខ)ដាក់បញ្ចាំ 
              ហើយសន្យាថែរក្សាគ្រប់គ្រងអោយបានគង់វង្សល្អរហូតដល់
              សងថ្ងៃកំណត់សងបំណុលរួចរាល់ នឹងប្រគល់របស់ដាក់បញ្ចាំនោះទៅភាគី(ខ)វិញ។​​​​​​​​​​​​​​
            </p>
            <p class="indent">
              ភាគីទាំងពីរសន្យាគោរពយ៉ាងម៉ឺងម៉ាត់ រាល់ប្រការនៃកិច្ចសន្យាខាងលើ។​ ក្នុងករណីមានការអនុវត្តផ្ទុយ ឫរំលោភលើកិច្ចសន្យាដោយប្រការណាមួយ​ភាគីដែលល្មើសត្រូវទទួលទោសចំពោះ
              មុខច្បាប់រដ្ខជាធរមាន
            </p>
            <p class="indent">
              កិច្ចសន្យាមានប្រសិទ្ធិភាពចាប់ពីថ្ងៃផ្តិតស្នាមមេដៃតទៅ ហើយត្រូវបានធ្វើឡើង៤ច្បាប់ ដើម្បីតំកល់ទុកនៅភាគី(ក)​០១ច្បាប់ ភាគី(ខ)០១ច្បាប់ រដ្ឋអំណាចភូមិ០១ច្បាប់
              រដ្ឋអំណាចឃុំ០១ច្បាប់។
            </p>
          <div class="justify-end">ធ្វើនៅ...................ថ្ងៃទី......ខែ..............ឆ្នាំ.......................</div>
        </v-card-text>
      </div>
      <v-row justify="center" class="mt-12" style="min-height: 200px">
        <v-col>
          <div class="text-center normal">
            ភាគីសុំខ្ចីចងការ​ ភាគី(ខ)
            <br />
            ស្នាមមេដៃស្តាំ
          </div>
        </v-col>
        <v-col>
          <div class="text-center normal">
            អ្នកធានា
            <br />
            ស្នាមមេដាំស្តាំ
          </div>
        </v-col>
        <v-col>
          <div class="text-center normal">
            ភាគីឲ្យចងការ ភាគី(ក)
            <br />
            ស្នាមមេដៃស្តាំ
          </div>
        </v-col>
        <v-col>
          <div class="text-center normal">
            សាក្សី
            <br />
            ស្នាមមេដៃស្តាំ
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div
            class="pa-2"
            tile
          >
            លេខ.............................................................
            <br>
            បានឃើញនិងបញ្ជាក់ថាៈ សេចក្តីបញ្ជាក់របស់​លោកមេភូមិ​.....................
            ខាងលើនេះពិតជាត្រឹមត្រូវប្រាកដមែន។
            <br>
            ថ្ងៃទី...........................ខែ...............ឆ្នាំ...............
            <br>
            មេឃុំ.............................................................
            <div class="text-center">
              ហត្ថលេខា​ និងត្រា
            </div>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-card-text
            class="pa-2"
            tile
          >
            លេខ.............................................................
            បានឃើញនឹងបញ្ជាក់ថាៈ ស្នាមមេដៃស្តាំខាងលើពិតជារបស់ភាគី(ខ) ពិតប្រាកដមែន។ ពិតជាបានយល់ព្រមដាក់បញ្ចាំដីឫ ........................
            ជាកម្មសិទ្ធិផ្ទាល់ទៅឲ្យឈ្មោះ...........................................................​ពិតប្រាកដមេន។
            <br>
            ថ្ងៃទី.....................​ខែ.....................ឆ្នាំ.................
            <br>
            មេភូមិ............................
            <br>
            <div class="text-center">ហត្ថលេខា​</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: "agreement",
  computed: {
    loanProvider() { return JSON.parse(sessionStorage.getItem('loanProvider')) },
    loanTaker() { return JSON.parse(sessionStorage.getItem('loanTaker')) },
    loan() { return JSON.parse(sessionStorage.getItem('loan')) },
    pawn() { return JSON.parse(sessionStorage.getItem('pawn'))}
  },
  methods: {
    calcAge(dateString) {
      let today = new Date()
      let birthDate = new Date(dateString)
      let age = today.getFullYear() - birthDate.getFullYear()
      let m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  },
  mounted() {
    console.log(this.loanProvider)
    console.log(this.loanTaker)
    console.log(this.loan)
    console.log(this.pawn)
  },
};
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
.indent {
  text-indent: 2rem;
}
.justify-end {
  justify-content: flex-end;
  display: flex;
}
</style>
