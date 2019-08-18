import * as types from '../mutation-types'
import stateCivilAPI from '@/api/stateCivil'

export const state = {
  statesCivil: [],
  loadingStatesCivil: false
}

export const actions = {
  getStateCivil ({ commit }, payload) {
    commit(types.REPLACE_LOADING_STATES_CIVIL, { status: true })

    return new Promise((resolve, reject) => {
      stateCivilAPI.get(payload)
        .then(response => {
          const statesCivil = response.data.data
          console.log(statesCivil)
          commit(types.REPLACE_LOADING_STATES_CIVIL, { status: false })
          commit(types.REPLACE_STATES_CIVIL, { statesCivil })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_STATES_CIVIL, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_STATES_CIVIL] (state, { status }) {
    state.loadingStatesCivil = status
  },
  [types.REPLACE_STATES_CIVIL] (state, { statesCivil }) {
    state.statesCivil = statesCivil
  }
}
