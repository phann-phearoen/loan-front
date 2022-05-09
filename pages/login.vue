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
          :loading="sending"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="លេខកូដសម្ងាត់"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          outlined
          :rules="passwordRule"
          @click:append="show = !show"
          :loading="sending"
        ></v-text-field>
        <div class="text-center">
          <v-btn
            color="primary"
            min-width="200"
            type="submit"
          >សាញអ៊ីន</v-btn>
        </div>
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
      sending: false,
    }
  },
  methods: {
    submit() {
      const email = this.email
      const password = this.password
      const formValid = this.$refs.form.validate()
      if(formValid) {
        this.sending = true
        this.$store
          .dispatch('session/apiLogin', { email, password })
          .then((resp) => {
            const user = resp.data.user
            if (user) {
              this.$router.replace('/')
            }
          })
          .catch((err) => {
            if(err) {
              this.sending = false
              const msg = 'សូមបញ្ជាក់លេខកូដសម្ងាត់ និង អ៊ីម៉ែលឡើងវិញ។'
              this.$nuxt.$emit('setSnackbar', { text: msg, color: 'red' })
              this.auth_error = true
            }
          })
          .finally(() => {
            this.sending = false
          })
      }
    }
  }
}
</script>