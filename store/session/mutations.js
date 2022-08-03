const initialState = () => ({
  status: '',
  token: '',
  user: null,
  ip_addr: '',
})

export default {
  async resetState(state) {
    const initial = initialState()
    await Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },

  SET_USER(state, user) {
    state.user = user
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  auth_request(state) {
    state.status = 'loading'
    sessionStorage.setItem('status', 'loading')
  },
  auth_success(state, token) {
    state.token = token
    state.status = 'success'
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('status', 'success')
  },
  auth_error(state) {
    state.status = 'error'
    sessionStorage.setItem('status', 'error')
    sessionStorage.removeItem('token')
  },
  SET_LOGOUT(state) {
    state.status = ''
    state.token = ''
    state.user = {}
    sessionStorage.removeItem('token')
    sessionStorage.setItem('status', 'logged out')
    
    const initial = initialState()
    Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },
  SET_IP_ADDR(state, ip) {
    state.ip_addr = ip
  },
}
