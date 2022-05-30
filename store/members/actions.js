import axios from 'axios'

  const inBrowser = typeof window !== 'undefined'
  const securedInst = axios.create({
    baseURL: process.env.NUXT_ENV_API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${inBrowser ? localStorage.getItem('token') : ''}`,
    },
  })
  securedInst.interceptors.request.use((config) => {
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
  async getAllMembers({ state, dispatch, commit, getters, rootGetters }, payload) {
    return await new Promise((resolve, reject) => {
      const thisUser = rootGetters['session/getUser']
      securedInst
        .get(`/api/v1/members`)
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          const allMembers = obj.filter(e => e.name !== thisUser.name)
          commit('set_all_members', allMembers)
          const thisMember = obj.find(e => e.name === thisUser.name)
          commit('set_this_member', thisMember)
        })
        .catch((err) => {})
    })
  },
  async getThisMember({ state, dispatch, commit, getters, rootGetters}) {
    const thisUser = rootGetters['session/getUser']
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`/api/v1/members/get_member_by_name`, {
          params: { admin_name: thisUser.name },
        })
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_this_member', obj)
        })
        .catch((err) => {})
    })
  },
  async apiNewDeposit({ state, dispatch, commit }, payload) {
    return await new Promise((resolve, reject) => {
      securedInst
        .put(`/api/v1/members/deposit`, {
          id: payload.id,
          amount: payload.amount,
        })
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
        })
        .catch((err) => {})
    })
  },
}
