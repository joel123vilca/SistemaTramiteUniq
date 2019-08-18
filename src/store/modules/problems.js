import * as types from '../mutation-types'
import problemsAPI from '@/api/problems'

export const state = {
  problems: [],
  loadingProblems: false
}

export const actions = {
  getProblems ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PROBLEMS, { status: true })

    return new Promise((resolve, reject) => {
      problemsAPI.get(payload)
        .then(response => {
          const problems = response.data.data
          console.log(problems)
          commit(types.REPLACE_LOADING_PROBLEMS, { status: false })
          commit(types.REPLACE_PROBLEMS, { problems })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PROBLEMS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_PROBLEMS] (state, { status }) {
    state.loadingRelations = status
  },
  [types.REPLACE_PROBLEMS] (state, { problems }) {
    state.problems = problems
  }
}
