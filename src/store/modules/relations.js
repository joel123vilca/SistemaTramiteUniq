import * as types from '../mutation-types'
import relationsAPI from '@/api/relations'

export const state = {
  relations: [],
  loadingRelations: false
}

export const actions = {
  getRelations ({ commit }, payload) {
    commit(types.REPLACE_LOADING_RELATIONS, { status: true })

    return new Promise((resolve, reject) => {
      relationsAPI.get(payload)
        .then(response => {
          const relations = response.data.data

          commit(types.REPLACE_LOADING_RELATIONS, { status: false })
          commit(types.REPLACE_RELATIONS, { relations })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_RELATIONS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_RELATIONS] (state, { status }) {
    state.loadingRelations = status
  },
  [types.REPLACE_RELATIONS] (state, { relations }) {
    state.relations = relations
  }
}
