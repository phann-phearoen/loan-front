import axios from 'axios'

  const inBrowser = typeof window !== 'undefined'
  const securedInst = axios.create({
    baseURL: process.env.NUXT_ENV_API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${inBrowser ? sessionStorage.getItem('token') : ''}`,
    },
  })
  securedInst.interceptors.request.use((config) => {
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
  async getAllUsers({ state, dispatch, commit }) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`${process.env.NUXT_ENV_API_URL}/api/v1/users/get_all_users`)
        .then((resp) => {
            const obj = resp.data
            if (!obj) {
              reject(new Error('API return value is wrong'))
            }
            resolve(resp)
            commit('set_all_users', obj)
        })
        .catch((err) => {
            dispatch('handle_error', { reject, err })
        })
    })
  },
  async getTotalMembers({ commit }) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`${process.env.NUXT_ENV_API_URL}/api/v1/members/get_total_members_count`)
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_total_members', obj)
        })
        .catch((err) => {})
    })
  },
  async getTotalDeposits({ commit }) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`${process.env.NUXT_ENV_API_URL}/api/v1/deposits/get_total_deposits`)
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_total_deposits', obj)
        })
        .catch((err) => {})
    })
  },
  async getTotalLoans({ commit }) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`${process.env.NUXT_ENV_API_URL}/api/v1/loans/get_total_loans`)
        .then((resp) => {
          const obj = resp.data
          if (obj === null) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_total_loans', obj)
        })
        .catch((err) => {})
    })
  },
  async getTotalClients({ commit }) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`${process.env.NUXT_ENV_API_URL}/api/v1/members/get_total_clients_count`)
        .then((resp) => {
          const obj = resp.data
          if (obj === null) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_total_clients', obj)
        })
        .catch((err) => {})
    })
  },
}
