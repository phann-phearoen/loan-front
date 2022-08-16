import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  allUsers: [],
  totalMembers: null,
  totalDeposits: null,
  totalLoans: null,
  totalClients: null,
})

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
