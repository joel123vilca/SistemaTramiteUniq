import * as types from '../mutation-types'
import examsAPI from '@/api/typeExams'

export const state = {
  typeexams: [],
  loadingTypeexams: false,
  currentTypeexams: null
}

export const actions = {
  getExams ({ commit }, payload) {
    commit(types.REPLACE_LOADING_TYPE_EXAMS, { status: true })

    return new Promise((resolve, reject) => {
      examsAPI.get(payload)
        .then(response => {
          const typeexams = response.data.data
          commit(types.REPLACE_LOADING_TYPE_EXAMS, { status: false })
          commit(types.REPLACE_TYPE_EXAMS, { typeexams })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TYPE_EXAMS, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_TYPE_EXAMS] (state, { status }) {
    state.loadingTypeexams = status
  },
  [types.REPLACE_TYPE_EXAMS] (state, { typeexams }) {
    state.typeexams = typeexams
  }
}
