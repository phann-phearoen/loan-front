<template>
  <v-card>
    <v-card-title class="justify-center">ផ្ដល់ប្រាក់កម្ចី</v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="forMembers = true"
      >
        សម្រាប់សមាជិក
      </v-btn>
      <v-btn
        color="orange"
        dark
        @click="forMembers = false"
      >
        សម្រាប់អតិថិជនក្រៅ
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-text
      v-if="forMembers"
      style="min-height: 200px"
    >
      <v-card-subtitle>ជ្រើសរើសគណនីដែលខ្ចី</v-card-subtitle>
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
        <v-row v-if="getOneMember">
          <v-col cols="7">
            <div
              id="foundMember"
              :class="getOneMember === getMemberToDeoposit ? 'is-selected primary--text' : ''"
            >
              <div class="d-inline mr-auto">
                អត្តលេខ៖​ {{ getOneMember.id }}, 
                ឈ្មោះ៖ {{ getOneMember.name }}, 
                ភេទ៖ {{ getOneMember.gender }}
              </div>
              <div
                v-if="getOneMember === getMemberToDeoposit"
                class="d-inline ml-auto"
              >
                <v-icon color="#2196F3">mdi-check</v-icon>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              min-width="150"
              @click="doSelectMember"
            >
              យកគណនីនេះ
            </v-btn>
            <v-btn
              color="red"
              dark
              min-width="150"
              @click="doFindOtherMember"
            >
              ស្វែងរកថ្មី
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="getMemberToDeoposit">
          <v-col cols="7">
            <v-text-field
              label="បញ្ចូលចំនួនទឹកប្រាក់"
              hint="លេខរ៉ូម៉ាំង"
              type="number"
              suffix="៛"
              v-model="amount"
              :rules="[v => !!v || 'សូមបញ្ចូលលេខឲ្យបានត្រឹមត្រូវ។']"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              min-width="150"
              :disabled="!amount"
              @click="confirmSubmit"
            >
              បញ្ចប់
            </v-btn>
          </v-col>
        </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      forMembers: null,
      memberId: null,
      amount: null,
    }
  },
  computed: {
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getOneMember', 'getMemberToLoan']),
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
    doSelectMember () {
      this.getMemberToDeoposit = this.getOneMember
      this.$store.commit('members/set_member_to_deposit', this.getOneMember)
    },
  },
}
</script>