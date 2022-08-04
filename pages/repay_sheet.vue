<template>
  <v-card v-if="loanObject" tile outlined width="100%">
    <v-card-title class="justify-center">
      <div class="text-center title">
        ក្រុមសន្សំកំពង់សាមគ្គី<br>
        តារាងសងប្រាក់
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="th">
        <v-col class="br">
          <div class="subtitle">ថ្ងៃខែត្រូវបង់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ដើមនៅសល់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ដើមរំលស់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ការ</div>
        </v-col>
        <v-col>
          <div class="subtitle">ប្រាក់ត្រូវបង់</div>
        </v-col>
      </v-row>
      <v-row class="tr">
        <v-col class="br">
          <div class="subtitle">ថ្ងៃខែត្រូវបង់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ដើមនៅសល់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ដើមរំលស់</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">ប្រាក់ការ</div>
        </v-col>
        <v-col>
          <div class="subtitle">ប្រាក់ត្រូវបង់</div>
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
      rows: [],
    }
  },
  computed: {
    loanObject() {
      return JSON.parse(sessionStorage.getItem('loanObject'))
    },
  },
  methods: {
    calcRows() {
      this.loanObject.forEach((e) => {
        
      })
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: 600;
}
.sub-title {
  font-size: 1.2em;
}
.th {
  border: 1px solid grey;
}
.br {
  border-right: 1px solid grey;
}
.tr {
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
</style>