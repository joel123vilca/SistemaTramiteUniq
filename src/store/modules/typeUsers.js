import * as types from '../mutation-types'
import typeUserAPI from '@/api/typeUser'

export const state = {
  typeUsers: [],
  loadingTipeUsers: false
}

export const actions = {
  getTypeUsers ({ commit }, payload) {
    commit(types.REPLACE_LOADING_TYPE_USERS, { status: true })

    return new Promise((resolve, reject) => {
      typeUserAPI.get(payload)
        .then(response => {
          const typeUsers = response.data.data

          commit(types.REPLACE_LOADING_TYPE_USERS, { status: false })
          commit(types.REPLACE_TYPE_USERS, { typeUsers })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TYPE_USERS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_TYPE_USERS] (state, { status }) {
    state.loadingTipeUsers = status
  },
  [types.REPLACE_TYPE_USERS] (state, { typeUsers }) {
    state.typeUsers = typeUsers
  }
}
