import * as types from '../mutation-types'
import typeHousingsAPI from '@/api/typeHousings'

export const state = {
  typeHousings: [],
  loadingTypeHousings: false
}

export const actions = {
  getTypeHousings ({ commit }, payload) {
    commit(types.REPLACE_LOADING_TYPE_HOUSINGS, { status: true })

    return new Promise((resolve, reject) => {
      typeHousingsAPI.get(payload)
        .then(response => {
          const typeHousings = response.data.data

          commit(types.REPLACE_LOADING_TYPE_HOUSINGS, { status: false })
          commit(types.REPLACE_TYPE_HOUSINGS, { typeHousings })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TYPE_HOUSINGS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_TYPE_HOUSINGS] (state, { status }) {
    state.loadingTypeHousings = status
  },
  [types.REPLACE_TYPE_HOUSINGS] (state, { typeHousings }) {
    state.typeHousings = typeHousings
  }
}
