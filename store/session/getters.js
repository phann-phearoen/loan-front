export default {
  isLoggedIn: (state) => !!state.token && !!state.user,
  getToken: (state) => state.token,
  getIpAddr: (state) => state.ip_addr || '',
  getUser: (state) => state.user,
}
