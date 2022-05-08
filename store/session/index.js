import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  status: '',
  token: '',
  writer: null,
  ip_addr: '',
})

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
