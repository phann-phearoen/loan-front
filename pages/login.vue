<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-card-title class="justify-center text-h3">
      ក្រុមសន្សំកំពង់សាមគ្គី
    </v-card-title>
    <v-card-subtitle class="mt-12 mb-6">
      សូមសាញអ៊ីន
    </v-card-subtitle>
    <v-card-text>
      <v-form
        v-model="valid"
        lazy-validation
        ref="form"
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="email"
          type="email"
          label="អ៊ីម៉ែល"
          outlined
          :rules="emailRule"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="លេខកូដសម្ងាត់"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          outlined
          counter="6"
          :rules="passwordRule"
          @click:append="show = !show"
        ></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      valid: true,
      email: "",
      emailRule: [
        v => !!v || 'ចាំបាច់ត្រូវតែមានអ៊ីម៉ែល។',
        v => /.+@.+\..+/.test(v) || 'សូមបញ្ចូលអ៊ីម៉ែលដែលត្រឹមត្រូវ។',
      ],
      password: "",
      passwordRule: [
        v => !!v || 'ចាំបាច់ត្រូវបញ្ចូលលេខកូដសម្ងាត់។',
        v => v.length > 0 || 'លេខកូតសម្ដាត់មានយ៉ាងតិច៦ខ្ទង់។',
      ],
      show: false,
    }
  }
}
</script>