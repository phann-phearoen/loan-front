<template>
  <v-container>
    <v-card>
      <v-card-title>ព័ត៌មានសមាជិកថ្មី</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            label="ឈ្មោះ"
            outlined
            v-model="name"
            :rules="required"
          ></v-text-field>
          <v-text-field
            label="ថ្ងៃខែឆ្នាំកំណើត"
            outlined
            type="date"
            append-icon="mdi-calendar-range"
            v-model="dateOfBirth"
            @click:append="datePicker = true"
          ></v-text-field>
          <v-text-field
            label="លេខអត្តសញ្ញាណប័ណ្ឌ"
            outlined
            type="number"
            counter="8"
            v-model="nationalId"
            :rules="idRules"
          ></v-text-field>
          <v-text-field
            label="លេខទូរស័ព្ទ"
            outlined
            v-model="phone"
            type="number"
            :rules="required"
          ></v-text-field>
          <v-text-field
            label="អាស័យដ្ឋាន"
            outlined
            v-model="address"
            :rules="required"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          min-width="150"
          @click="clearForm"
        >
          លុប
        </v-btn>
        <v-btn
          min-width="150"
          color="primary"
          @click="proceedForm"
        >
          រក្សារទុក
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="datePicker" max-width="320">
      <v-card>
        <v-card-title>ជ្រើសរើសថ្ងៃខែឆ្នាំ</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-date-picker
            full-width
            v-model="dateOfBirth"
          ></v-date-picker>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="datePicker = false; dateOfBirth = null">លុប</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!dateOfBirth"
            color="primary"
            @click="datePicker = false"
          >ជ្រើសរើស</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      gender: null,
      dateOfBirth: null,
      datePicker: false,
      nationalId: '',
      phone: '',
      address: '',
      required: [ v => !!v || 'ចាំបាច់ត្រូវបញ្ចូលទិន្ន័យ' ],
      idRules: [ v => !!v || 'ចាំបាច់ត្រូវបញ្ចូលទិន្ន័យ', v => v.length === 8 || 'លេខអត្តសញ្ញាណប័ណ្ឌ៨ខ្ទង់' ],
    }
  },
  methods: {
    clearForm() {
      this.name = ''
      this.gender = null
      this.dateOfBirth = null
      this.nationalId = ''
      this.phone = ''
      this.address = ''
    },
    proceedForm() {

    },
  },
}
</script>