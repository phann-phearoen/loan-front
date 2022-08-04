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
  async apiCreateNewMember({ dispatch, commit }, payload) {
    return await new Promise((resolve, reject) => {
      securedInst
        .post(`/api/v1/members/create_new_member`, {
          name: payload.name,
          gender: payload.gender,
          date_of_birth: payload.dateOfBirth,
          national_id: payload.nationalId,
          phone: payload.phone,
          address: payload.address,
          is_client: payload.isClient || false,
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
  async getAllMembers({ dispatch, commit }, payload) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`/api/v1/members/get_all_members`, {
          params: {
            page: payload.page,
            per: payload.itemsPerPage,
          }
        })
        .then((resp) => {
          const obj = resp.data
          console.log(obj)
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_all_members', obj.members)
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
  async getOneMember({ state, dispatch, commit}, payload) {
    return await new Promise((resolve, reject) => {
      securedInst
        .get(`/api/v1/members/get_one_member`, {
          params: { id: payload },
        })
        .then((resp) => {
          const obj = resp.data
          if (!obj) {
            reject(new Error('API return value is wrong'))
          }
          resolve(resp)
          commit('set_one_member', obj)
        })
        .catch((err) => {
          reject(err)
        })
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
