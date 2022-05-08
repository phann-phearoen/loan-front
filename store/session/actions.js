import axios from 'axios'

  const signinAxiosInstance = axios.create({
    baseURL: process.env.NUXT_ENV_API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
    proxyHeaders: false,
    credentials: false,
  })
  signinAxiosInstance.interceptors.request.use((config) => {
    const method = config.method.toUpperCase()
    if (method !== 'OPTIONS' && method !== 'GET') {
      config.params = {
        ...config.params,
        client_id: process.env.NUXT_ENV_CLIENT_ID || 'no-client-id',
        client_secret: process.env.NUXT_ENV_CLIENT_SECRET || 'no-secret',
        grant_type: 'password',
      }
    }
    return config
  })

  const inBrowser = typeof window !== 'undefined'
  const securedAxiosInstance = axios.create({
    baseURL: process.env.NUXT_ENV_API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${inBrowser ? localStorage.getItem('token') : ''}`,
    },
  })
  securedAxiosInstance.interceptors.request.use((config) => {
    const method = config.method.toUpperCase()
    if (method !== 'OPTIONS') {
      const token = `${inBrowser ? localStorage.getItem('token') : ''}`
      config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  })
  
export default {
  
  async apiSignup({ commit }, payload) {
    const email = payload.email
    const password = payload.password
    return await new Promise((resolve, reject) => {
      commit('auth_request')
      const uri = `${process.env.NUXT_ENV_API_URL}/api/v1/users/public_create_user`
      signinAxiosInstance
        .post(uri, {
          email,
          password,
        })
        .then((resp) => {
          const token = resp.data.content.access_token
          const user = resp.data.content.user
          if (!user) {
            reject(new Error('API return value is wrong'))
          }
          commit('SET_USER', user)
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', token)
          // localStorage.setItem('user', JSON.stringify(user))
          resolve(resp)
        })
        .catch((err) => {
          commit('auth_error')
          const res = err.response
          if (res && res.status === 422) {
            for (const key in res.data.errors) {
              const val = res.data.errors[key]
              reject(val[0])
            }
          }
          const msg = errToMsg(err)
          reject(msg)
        })
    })
  },

  async apiLogin({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      commit('auth_request')
      const uri = `${process.env.NUXT_ENV_API_URL}/api/v1/oauth/token`
      signinAxiosInstance
        .post(uri, {
          email: payload.email,
          password: payload.password,
        })
        .then((resp) => {
          const token = resp.data.access_token
          const writer = resp.data.writer
          if (!writer) {
            reject(new Error('API return value is wrong'))
          }
          commit('SET_WRITER', writer)
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', token)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {})
    })
  },

  apiLogout({ commit, getters }, payload) {
    const dont = payload?.dontClear
    return new Promise((resolve) => {
      const url = `${process.env.NUXT_ENV_API_URL}/api/v1/oauth/revoke`
      const token = `${getters.getToken || ''}`
      axios.post(url, {
          token: token,
          client_id: process.env.NUXT_ENV_CLIENT_ID,
          client_secret: process.env.NUXT_ENV_CLIENT_SECRET,
        })
        .then((resp) => {})
        .catch((err) => {
          window.console.log('[debug]', 'signout error', err)
        })
        .finally(() => {
          if (!dont) {
            // commit('asks/resetState', null, { root: true })
            // commit('jobs/resetState', null, { root: true })
            // commit('session/resetState', null, { root: true })
            // commit('consults/resetState', null, { root: true })
          }
          commit('SET_LOGOUT')
          delete axios.defaults.headers.common.Authorization

          commit('SET_LOGOUT')
          delete axios.defaults.headers.common.Authorization

          resolve()
        })
    })
  },

  // 현재 유저의 정보를 읽어들인다.
  apiUserShowMe({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      securedAxiosInstance
        .get('/api/v1/users/user_show_me')
        .then((resp) => {
          const obj = resp.data.content.user
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          commit('SET_USER', obj)
          resolve(resp)
        })
        .catch((err) => {
          dispatch('handle_error', { reject, err })
        })
    })
  },

  async getMeAvatar({ state, dispatch, commit }) {
    return await new Promise((resolve, reject) => {
      dispatch('user/user_show_myphoto', null, { root: true })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  /*
  유저가 자기 자신의 정보를 얻는다.
  로그인 되어 있는지 실질적으로 체크 한다.
  로그인 되어 있지 않으면 로그인 페이지로 redirect 한다.
  */
  async getMe({ state, dispatch, commit }) {
    return await new Promise((resolve, reject) => {
      dispatch('apiUserShowMe')
        .then((resp) => {
          dispatch('getMeAvatar')
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
