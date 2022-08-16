<template>
  <v-card width="100%" v-if="oneMember" outlined>
    <v-card-title class="justify-center text-h5">
      {{ oneMember.name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="text--primary">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 3}`"
              class="mx-auto pa-6 transition-swing rounded-lg"
            >
              <v-row>
                <v-col class="text-h6" cols="3" align-self="end"> ឈ្មោះ </v-col>
                <v-col align-self="end" class="text-h6">
                  {{ oneMember.name }}
                </v-col>
              </v-row>
            </div>
          </template>
        </v-hover>
        <div class="my-2"></div>
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 3}`"
              class="mx-auto pa-6 transition-swing rounded-lg"
            >
              <v-row>
                <v-col class="text-h6" cols="3" align-self="end"> ភេទ </v-col>
                <v-col align-self="end" class="text-h6">
                  {{ oneMember.gender }}
                </v-col>
              </v-row>
            </div>
          </template>
        </v-hover>
        <div class="my-2"></div>
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 3}`"
              class="mx-auto pa-6 transition-swing rounded-lg"
            >
              <v-row>
                <v-col class="text-h6" cols="3" align-self="end">
                  <p style="color: red">ប្រាក់កម្ចី</p>
                </v-col>
                <v-col align-self="end" class="text-h6">
                  <p style="color: red">
                    {{ oneMember.loan.toLocaleString() }}​​ ៛
                  </p>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-hover>
        <div class="d-flex justify-center my-4">
          <v-card-actions class="justify-center">
            <v-btn x-large color="primary" @click="toRepay"> សងប្រាក់ </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card-text>
  </v-card>
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
