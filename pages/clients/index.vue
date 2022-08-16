<template>
  <div v-if="getAllClients">
    <v-card width="100%">
      <v-card-title>បញ្ជីអតិថិជន</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="getAllClients"
          class="elevation-1"
          :loading="isLoading"
          loading-text="ローディング..."
          no-data-text="データがありません。"
          no-results-text="一致する投稿がありません。"
          show-select
          hide-default-footer
          :items-per-page="pagination.itemsPerPage"
          @click:row="doGoToTheMember"
        >
          <template #[`item.loan`]="{ item }">
            <div>{{ item.loan > 0 ? item.loan.toLocaleString() : 0 }}៛</div>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-space-around">
        <v-select
          style="max-width: 150px"
          :items="perPage"
          v-model="pagination.itemsPerPage"
          label="ក្នុងមួយទំព័រ"
          @change="paginated"
        ></v-select>
        <v-pagination
          v-model="pagination.page"
          :length="pagination.totalPages"
          :total-visible="8"
          circle
          @next="paginated"
          @previous="paginated"
          @input="paginated"
        ></v-pagination>
        <div style="max-width: 150px">
          {{ "総数：" + pagination.totalCount }}
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "អត្តលេខ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ឈ្មោះ", value: "name" },
        { text: "ភេទ", value: "gender" },
        { text: "លេខទូរស័ព្ទ", value: "phone" },
        { text: "ប្រាក់កម្ចីសរុប", value: "loan" },
      ],
      isLoading: false,
      pagination: {
        itemsPerPage: 10,
        page: 1,
        totalCount: null,
        totalPages: null,
      },
      perPage: [5, 10, 15],
    };
  },
  computed: {
    ...mapGetters("members", ["getAllClients"]),
  },
  methods: {
    async fetchAllClients() {
      this.$store
        .dispatch("members/getAllClients", {
          page: this.pagination.page,
          per: this.pagination.itemsPerPage,
        })
        .then((res) => {
          this.pagination.totalCount = res.data.total_count
          this.pagination.totalPages = res.data.total_pages
        })
        .catch()
        .finally();
    },
    paginated() {
      this.fetchMembers();
    },
    doGoToTheMember(member) {
      this.$router.push(`/members/${member.id}`);
    },
  },
  mounted() {
    this.fetchAllClients();
  },
};
</script>
