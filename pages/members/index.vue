<template>
  <v-container>
    <v-card width="100%">
      <v-card-title>
        <div>បញ្ជីសមាជិក</div>
        <v-btn
          class="d-block ml-auto"
          color="primary"
          @click="addNewMember"
        >
          បន្ថែមសមាជិកថ្មី
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="members"
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
          <template #[`item.deposit`]="{ item }">
            <div>{{ item.deposit > 0 ? item.deposit.toLocaleString() : 0 }}៛</div>
          </template>
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
        <div
          style="max-width: 150px"
        >{{ '総数：' + pagination.totalCount }}</div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'អត្តលេខ',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'ឈ្មោះ', value: 'name' },
        { text: 'ភេទ', value: 'gender' },
        { text: 'លេខទូរស័ព្ទ', value: 'phone' },
        { text: 'ប្រាក់សន្សំសរុប', value: 'deposit' },
        { text: 'ប្រាក់កម្ចីសរុប', value: 'loan' },
      ],
      isLoading: false,
      pagination: {
        itemsPerPage: 10,
        page: 1,
        totalCount: null,
        totalPages: null,
      },
      perPage: [5, 10, 15],
    }
  },
  computed: {
    ...mapGetters('members', { members: 'getAllMembers'}),
  },
  methods: {
    async fetchMembers() {
      this.isLoading = true
      await this.$store
        .dispatch('members/getAllMembers', {
          page: this.pagination.page,
          per: this.pagination.itemsPerPage,
        })
        .then((res) => {
          this.pagination.totalCount = res.data.total_count
          this.pagination.totalPages = res.data.total_pages
        })
        .catch()
        .finally(() => this.isLoading = false)
    },
    paginated() {
      this.fetchMembers()
    },
    doGoToTheMember(member) {
      this.$router.push(`/members/${member.id}`)
    },
    addNewMember() {
      this.$router.push('/members/new')
    },
  },
  mounted() {
    this.fetchMembers()
  },
}
</script>