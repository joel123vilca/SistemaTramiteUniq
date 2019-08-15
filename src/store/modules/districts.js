import * as types from '../mutation-types'
import districtsAPI from '@/api/districts'

export const state = {
  districts: [],
  loadingDistricts: false,
  currentDistricts: null
}

export const actions = {
  getDistricts ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DISTRICTS, { status: true })

    return new Promise((resolve, reject) => {
      districtsAPI.get(payload)
        .then(response => {
          const districts = response.data.data
          commit(types.REPLACE_LOADING_DISTRICTS, { status: false })
          commit(types.REPLACE_DISTRICTS, { districts })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DISTRICTS, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_DISTRICTS] (state, { status }) {
    state.loadingDistricts = status
  },
  [types.REPLACE_DISTRICTS] (state, { districts }) {
    state.districts = districts
  }
}
