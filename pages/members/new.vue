<template>
  <v-container>
    <v-card>
      <v-card-title>ព័ត៌មានសមាជិកថ្មី</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="form" lazy-validation>
          <v-text-field
            label="ឈ្មោះ"
            outlined
            v-model="name"
            :rules="required"
          ></v-text-field>
          <div>ភេទ</div>
          <v-radio-group v-model="gender">
            <v-radio
              v-for="item in genderGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            label="ថ្ងៃខែឆ្នាំកំណើត"
            outlined
            type="date"
            v-model="dateOfBirth"
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
          :disabled="!formValid"
          min-width="150"
          color="primary"
          @click="confirmForm = true"
        >
          រក្សារទុក
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="confirmForm" max-width="80%">
      <v-card width="100%">
        <v-card-title>បញ្ជាក់ទិន្ន័យ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-text-field
            readonly
            label="ឈ្មោះ"
            outlined
            v-model="name"
          ></v-text-field>
          <v-text-field
            readonly
            label="ភេទ"
            outlined
            v-model="gender"
          ></v-text-field>
          <v-text-field
            readonly
            label="ថ្ងៃខែឆ្នាំកំណើត"
            outlined
            type="date"
            v-model="dateOfBirth"
          ></v-text-field>
          <v-text-field
            readonly
            label="លេខអត្តសញ្ញាណប័ណ្ឌ"
            outlined
            type="number"
            counter="8"
            v-model="nationalId"
          ></v-text-field>
          <v-text-field
            readonly
            label="លេខទូរស័ព្ទ"
            outlined
            v-model="phone"
            type="number"
          ></v-text-field>
          <v-text-field
            readonly
            label="អាស័យដ្ឋាន"
            outlined
            v-model="address"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn min-width="150" @click="confirmForm = false">ត្រឡប់</v-btn>
          <v-btn min-width="150" color="primary" @click="submit">រក្សារទុក</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: null,
      name: '',
      gender: null,
      genderGroup: [
        {
          label: 'ស្រី',
          value: 'F',
        },
        {
          label: 'ប្រុស',
          value: 'M',
        },
      ],
      dateOfBirth: null,
      datePicker: false,
      nationalId: '',
      phone: '',
      address: '',
      required: [ v => !!v || 'ចាំបាច់ត្រូវបញ្ចូលទិន្ន័យ' ],
      idRules: [ v => !!v || 'ចាំបាច់ត្រូវបញ្ចូលទិន្ន័យ', v => v.length === 8 || 'លេខអត្តសញ្ញាណប័ណ្ឌ៨ខ្ទង់' ],
      confirmForm: false,
    }
  },
  computed: {
    formValid() {
      if(
        this.form &&
        this.name !== '' &&
        this.dateOfBirth !== null &&
        this.nationalId !== '' &&
        this.phone !== '' &&
        this.address !== ''
      ) {
        return true
      }
      return false
    },
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
    async submit() {
      await this.$store
        .dispatch('members/apiCreateNewMember', {
          name: this.name,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth,
          national_id: this.nationalId,
          phone: this.phone,
          address: this.address,
        })
    },
  },
}
</script>