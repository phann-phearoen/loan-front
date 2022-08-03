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
      Authorization: `Bearer ${inBrowser ? sessionStorage.getItem('token') : ''}`,
    },
  })
  securedAxiosInstance.interceptors.request.use((config) => {
    const method = config.method.toUpperCase()
    if (method !== 'OPTIONS') {
      const token = `${inBrowser ? sessionStorage.getItem('token') : ''}`
      config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  })
  
export default {
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
          const user = resp.data.user
          if (!user) {
            reject(new Error('API return value is wrong'))
          }
          commit('SET_USER', user)
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
        commit('SET_LOGOUT')
        delete axios.defaults.headers.common.Authorization

        commit('SET_LOGOUT')
        delete axios.defaults.headers.common.Authorization

        resolve()
      })
    })
  },
}
