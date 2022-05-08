const initialState = () => ({
  status: '',
  token: '',
  writer: null,
  ip_addr: '',
})

export default {
  async resetState(state) {
    const initial = initialState()
    await Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },

  SET_WRITER(state, writer) {
    state.writer = writer
  },
  auth_request(state) {
    state.status = 'loading'
    localStorage.setItem('status', 'loading')
  },
  auth_success(state, token) {
    state.token = token
    state.status = 'success'
    localStorage.setItem('token', token)
    localStorage.setItem('status', 'success')
  },
  auth_error(state) {
    state.status = 'error'
    localStorage.setItem('status', 'error')
    localStorage.removeItem('token')
  },
  SET_LOGOUT(state) {
    state.status = ''
    state.token = ''
    state.user = {}
    localStorage.removeItem('token')
    localStorage.setItem('status', 'logged out')
    
    const initial = initialState()
    Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },
  SET_IP_ADDR(state, ip) {
    state.ip_addr = ip
  },
}
