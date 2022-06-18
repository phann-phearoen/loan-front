<template>
  <v-card v-if="getLoanObject" width="100%">
    <v-card-text>
      <div class="text-center">
        ព្រះរាជាណាចករកម្ពុជា<br>
        ជាតិ សាសនា ព្រះមហាក្សត្រ
      </div>
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