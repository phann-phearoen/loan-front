<template>
  <v-card v-if="getLoanObject" width="100%">
    <v-card-text>
      <div class="text-center title">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ<br><br>
        កិច្ចសន្យាខ្ចីចងការប្រាក់
      </div>
      <div class="normal mt-12" style="min-height: 500px">
        សមាជិកក្រុមអត្តលេខ {{ getLoanObject.member.id }}<br>
        ឈ្មោះ {{ getLoanObject.member.name }}<br>
        ចំនួន {{ getLoanObject.amount }} រៀល<br>
        ការប្រាក់​ ១%<br>
        រយៈពេល {{ getLoanObject.period }} ខែ។
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('members', ['getLoanObject']),
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