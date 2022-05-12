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
