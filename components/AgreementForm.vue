<template>
  <v-card width="100%">
    <v-card-text>
      <div class="text-center">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['client', 'isMember', 'amount', 'period'],
  computed: {
    rate() {
      return this.isMember ? 0.01 : 0.03
    },
  },
}
</script>