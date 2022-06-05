<template>
  <v-dialog v-model="dialog.model" max-width="500">
    <v-card width="100%">
      <v-card-title>{{ dialog.title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="min-height: 150px">
        <slot></slot>
        {{ dialog.desc }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="red"
          dark
          min-width="100"
          @click="confirmNo"
        >
          ទេ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          min-width="100"
          @click="confirmYes"
        >
          បាទ/ចាស
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  methods: {
    confirmNo() { this.$nuxt.$emit('confirmNo') },
    confirmYes() { this.$nuxt.$emit('confirmYes') },
  },
}
</script>