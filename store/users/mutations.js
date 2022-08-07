export default {
  set_all_users(state, payload) {
    state.allUsers = payload
  },
  set_total_members(state, val) {
    state.totalMembers = val
  },
  set_total_deposits(state, val) {
    state.totalDeposits = val
  },
  set_total_loans(state, val) {
    state.totalLoans = val
  },
  set_total_clients(state, val) {
    state.totalClients = val
  },
}
