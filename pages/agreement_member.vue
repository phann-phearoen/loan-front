<template>
  <v-card v-if="loanObject" width="100%">
    <v-card-text>
      <div class="text-center title">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ<br><br>
        កិច្ចសន្យាខ្ចីចងការប្រាក់
      </div>
      <div class="normal mt-12" style="min-height: 500px">
        សមាជិកក្រុមអត្តលេខ {{ loanObject.member.id }}<br>
        ឈ្មោះ {{ loanObject.member.name }}<br>
        ចំនួន {{ loanObject.amount }} រៀល<br>
        ការប្រាក់​ ១%<br>
        រយៈពេល {{ loanObject.period }} ខែ។
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
  computed: {
    loanObject() {
      return JSON.parse(sessionStorage.getItem('loanObject'))
    },
  },
  mounted() {
    console.log(this.loanObject)
  },
  beforeDestroy() {
    sessionStorage.removeItem('loanObject')
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