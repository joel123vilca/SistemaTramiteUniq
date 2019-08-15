import * as types from '../mutation-types'
import careersAPI from '@/api/careers'

export const state = {
  careers: [],
  loadingCareers: false,
  currentCareer: null
}

export const actions = {
  getCareers ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CAREERS, { status: true })

    return new Promise((resolve, reject) => {
      careersAPI.get(payload)
        .then(response => {
          const careers = response.data.data
          commit(types.REPLACE_LOADING_CAREERS, { status: false })
          commit(types.REPLACE_CAREERS, { careers })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CAREERS, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_CAREERS] (state, { status }) {
    state.loadingCareers = status
  },
  [types.REPLACE_CAREERS] (state, { careers }) {
    state.careers = careers
  }
}
