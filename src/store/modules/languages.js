import * as types from '../mutation-types'
import languagesAPI from '@/api/languages'

export const state = {
  languages: [],
  loadingLanguages: false,
  currentLanguages: null
}

export const actions = {
  getLanguages ({ commit }, payload) {
    commit(types.REPLACE_LOADING_LANGUAGES, { status: true })

    return new Promise((resolve, reject) => {
      languagesAPI.get(payload)
        .then(response => {
          const languages = response.data.data
          commit(types.REPLACE_LOADING_LANGUAGES, { status: false })
          commit(types.REPLACE_LANGUAGES, { languages })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_LANGUAGES, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_LANGUAGES] (state, { status }) {
    state.loadingLanguages = status
  },
  [types.REPLACE_LANGUAGES] (state, { languages }) {
    state.languages = languages
  }
}
