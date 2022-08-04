<template>
  <v-card v-if="loanObject" tile outlined width="100%">
    <v-card-title class="justify-center">
      <div class="text-center title">
        ក្រុមសន្សំកំពង់សាមគ្គី<br>
        តារាងសងប្រាក់
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="rows.length > 0">
      <v-row class="th">
        <v-col class="br" cols="1">
          <div class="subtitle">លេខរៀង</div>
        </v-col>
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
      <v-row
        v-for="(row, i) in rows"
        :key="i"
        class="tr"
      >
        <v-col class="br" cols="1">
          <div class="subtitle">{{ i + 1 }}</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">{{ row.date }}</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">{{ row.remain }}</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">{{ row.offSet }}</div>
        </v-col>
        <v-col class="br">
          <div class="subtitle">{{ row.interest }}</div>
        </v-col>
        <v-col>
          <div class="subtitle">{{ row.payment }}</div>
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
      let stake = this.loanObject.amount
      let i = 1
      var d = new Date()
      while (i <= this.loanObject.period) {
        const obj = {}
        let nextDate = new Date(d.setMonth(d.getMonth() + 1))
        obj["date"] = nextDate.toISOString().slice(0, 10)
        obj["offSet"] = Math.ceil(this.loanObject.amount / this.loanObject.period),
        obj["interest"] = Math.ceil(stake * this.loanObject.rate),
        obj["payment"] = obj.offSet + obj.interest
        obj["remain"] = stake - obj.payment
        stake -= obj.offSet
        this.rows.push(obj)
        i++
      }
    },
  },
  mounted() {
    this.calcRows()
  },
}
</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: 600;
}
.sub-title {
  font-size: 1.3em;
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