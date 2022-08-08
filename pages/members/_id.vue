<template>
  <div>
    <v-card width="100%" v-if="oneMember">
      <v-card-title class="justify-center text-h5">
        គណណីរបស់ {{ oneMember.name }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-16">
        <v-row class="detail-row">
          <v-col class="text-h6" cols="3" align-self="end"> ឈ្មោះ </v-col>
          <v-col align-self="end" class="text-h6">
            {{ oneMember.name }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="detail-row">
          <v-col class="text-h6" cols="3" align-self="end"> ភេទ </v-col>
          <v-col align-self="end" class="text-h6">
            {{ oneMember.gender }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="detail-row">
          <v-col class="text-h6" cols="3" align-self="end">
            ប្រាក់សន្សំសរុប
          </v-col>
          <v-col align-self="end" class="text-h6">
            {{ oneMember.deposit }} ៛
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="detail-row">
          <v-col class="text-h6" cols="3" align-self="end">
            ប្រាក់កម្ចីសរុប
          </v-col>
          <v-col align-self="end" class="text-h6">
            {{ oneMember.loan }} ៛
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-btn x-large color="primary" @click="toDeposit">
          ដាក់ប្រាក់សន្សំ
        </v-btn>
        <v-btn x-large color="primary" @click="toRepay"> សងប្រាក់ </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    ...mapGetters("members", { oneMember: "getOneMember" }),
  },
  methods: {
    async fetchOneMember() {
      await this.$store
        .dispatch("members/getOneMember", this.id)
        .then()
        .finally();
    },
    toDeposit() {
      this.$store.commit("members/set_member_to_deposit", this.oneMember);
      this.$router.push("/deposit");
    },
    toRepay() {},
  },
  mounted() {
    this.fetchOneMember();
  },
};
</script>

<style scoped>
.detail-row {
  min-height: 100px !important;
}
</style>
