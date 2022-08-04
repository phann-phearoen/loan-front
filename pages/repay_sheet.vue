<template>
  <v-card v-if="loanObject" tile width="100%">
    
  </v-card>
</template>

<script>
export default {
  computed: {
    loanObject() {
      return JSON.parse(sessionStorage.getItem('loanObject'))
    },
  },
}
</script>