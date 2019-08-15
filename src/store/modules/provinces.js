import * as types from '../mutation-types'
import provincesAPI from '@/api/provinces'

export const state = {
  provinces: [],
  loadingProvinces: false,
  currentProvince: null
}

export const actions = {
  getProvinces ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PROVINCES, { status: true })

    return new Promise((resolve, reject) => {
      provincesAPI.get(payload)
        .then(response => {
          const provinces = response.data.data
          commit(types.REPLACE_LOADING_PROVINCES, { status: false })
          commit(types.REPLACE_PROVINCES, { provinces })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PROVINCES, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_PROVINCES] (state, { status }) {
    state.loadingProvinces = status
  },
  [types.REPLACE_PROVINCES] (state, { provinces }) {
    state.provinces = provinces
  }
}
