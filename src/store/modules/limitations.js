import * as types from '../mutation-types'
import limitationsAPI from '@/api/limitations'

export const state = {
  limitations: [],
  loadingLimitations: false
}

export const actions = {
  getLimitations ({ commit }, payload) {
    commit(types.REPLACE_LOADING_LIMITATIONS, { status: true })

    return new Promise((resolve, reject) => {
      limitationsAPI.get(payload)
        .then(response => {
          const limitations = response.data.data

          commit(types.REPLACE_LOADING_LIMITATIONS, { status: false })
          commit(types.REPLACE_LIMITATIONS, { limitations })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_LIMITATIONS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_LIMITATIONS] (state, { status }) {
    state.loadingLimitations = status
  },
  [types.REPLACE_LIMITATIONS] (state, { limitations }) {
    state.limitations = limitations
  }
}
