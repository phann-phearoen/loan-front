export default {
  isLoggedIn: () => {
    return !!sessionStorage.getItem('token') && !!sessionStorage.getItem('user') ? true : false
  },
  getToken: () => sessionStorage.getItem('token') || null,
  getIpAddr: (state) => state.ip_addr || '',
  getUser: (state) => state.user || JSON.parse(sessionStorage.getItem('user')),
}
