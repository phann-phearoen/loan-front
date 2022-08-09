import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  allMembers: [],
  thisMember: null,
  oneMember: null,
  memberToDeposit: null,
  memberToLoan: null,
  loanObject: null,
  allClients: [],
})

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
