<template>
  <v-container>
    <v-card width="100%">
      <v-card-title>ដាក់ប្រាក់សន្សំ</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-card-subtitle>ជ្រើសរើសគណនីដែលត្រូវសន្សំ</v-card-subtitle>
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
              :class="getOneMember === selectedMember ? 'is-selected primary--text' : ''"
            >
              <div class="d-inline mr-auto">
                អត្តលេខ៖​ {{ getOneMember.id }}, 
                ឈ្មោះ៖ {{ getOneMember.name }}, 
                ភេទ៖ {{ getOneMember.gender }}
              </div>
              <div
                v-if="getOneMember === selectedMember"
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
        <v-row v-if="selectedMember">
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
    <confirm-dialog :dialog="dialog">
      <template v-if="selectedMember && amount">
        <div>
          <span>អត្តលេខ៖ </span><strong>{{ selectedMember.id }}</strong>
        </div>
        <div>
          <span>ឈ្មោះ៖ </span><strong>{{ selectedMember.name }}</strong>
        </div>
        <div>
          <span>ចំនួនទឹកប្រាក់៖ </span><strong>{{ amount }}៛</strong>
        </div>
      </template>
    </confirm-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmDialog from '../components/ConfirmDialog.vue'
export default {
  components: { ConfirmDialog },
  data() {
    return {
      memberId: null,
      selectedMember: null,
      amount: null,
      dialog: {
        model: false,
        title: '',
      },
    }
  },
  computed: {
    ...mapGetters('session', { me: 'getUser' }),
    ...mapGetters('members', ['getOneMember']),
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
      this.selectedMember = this.getOneMember
    },
    doFindOtherMember() {
      this.$store.commit('members/set_one_member', null)
      this.$refs.memberId.$refs.input.focus()
    },
    async submit() {
      await this.$store
        .dispatch('members/apiNewDeposit', {
          amount: this.amount,
          id: this.selectedMember.id,
        })
        .then((res) => {
          this.$nuxt.$emit('setSnackbar', res.data.message)
          if (this.selectedMember.name === this.me.name) {
            this.$router.push('/')
            return
          }
          this.$router.push(`/members/${this.selectedMember.id}`)
        })
        .catch()
        .finally()
    },
    confirmSubmit() {
      this.dialog.title = 'សូមបញ្ជាក់ទិន្នន័យ!'
      this.dialog.model = true
    },
  },
  mounted() {
    this.$nuxt.$on('confirmYes', () => {
      this.submit()
    })
    this.$nuxt.$on('confirmNo', () => {
      this.dialog.model = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('confirmYes')
    this.$nuxt.$off('confirmNo')
  },
}
</script>

<style scoped>
#foundMember {
  display: flex;
  width: 100%;
  border: 1px grey solid;
  border-radius: 5px;
  padding: .5em;
  font-size: 1.2em;
}
.is-selected {
  border: 1px #2196F3 solid !important;
}
</style>