<template>
  <v-card width="100%">
    <v-card-title>ផ្ដល់ប្រាក់កម្ចី</v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :color="forMembers ? 'primary' : 'secondary'"
        min-width="200"
        @click="forMembers = true"
      >
        សមាជិកក្រុម
      </v-btn>
      <v-btn
        :color="!forMembers ? 'primary' : 'secondary'"
        dark
        min-width="200"
        @click="forMembers = false"
      >
        អតិថិជនខាងក្រៅ
      </v-btn>
    </v-card-actions>
    <v-card-text v-if="forMembers">
      <v-card-subtitle>ជ្រើសរើសគណនីដែលត្រូវផ្ដល់កម្ចី</v-card-subtitle>
      <v-row>
        <v-col cols="7">
          <v-text-field
            ref="memberId"
            label="បញ្ចូលអត្តលេខសមាជិក"
            hint="លេខរ៉ូម៉ាំង"
            type="number"
            v-model="memberId"
            :rules="[v => !!v || 'សូមបញ្ចូលអត្តលេខឲ្យបានត្រឹមត្រូវ។']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            :disabled="!memberId"
            min-width="150"
            color="primary"
            @click="doFindMember"
          >ស្វែងរកសមាជិក</v-btn>
        </v-col>
      </v-row>
      <v-row>
        {{ getOneMember }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      forMembers: true,
      memberId: null,
    }
  },
  computed: {
    ...mapGetters('members', [
      'getOneMember'
    ]),
  },
  methods: {
    async doFindMember() {
      await this.$store
        .dispatch('members/getOneMember', this.memberId)
        .then((res) => {})
        .catch((err) => {
          if (err) {
            this.$nuxt.$emit('setSnackbar', 'មិនមានគណនីជាមួយអត្តលេខនេះទេ!')
            this.$refs.memberId.$refs.input.focus()
          }
        })
        .finally()
    },
  },
}
</script>