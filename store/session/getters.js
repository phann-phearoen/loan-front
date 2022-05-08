export default {
  // token과 user 둘다 검사 해야 한다. 코딩중 유저만 실수로 지우면 복구가 안되기때문
  isLoggedIn: (state) => !!state.token && !!state.writer,
  getToken: (state) => state.token,
  getIpAddr: (state) => state.ip_addr || '',
  getWriter: (state) => state.writer,
}
