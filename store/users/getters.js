export default {
  getAllUsers: (state) => state.allUsers || [],
  getTotalMembers: (state) => state.totalMembers || 0,
  getTotalDeposits: (state) => state.totalDeposits || 0,
  getTotalLoans: (state) => state.totalLoans || 0,
  getTotalClients: (state) => state.totalClients || 0,
}
