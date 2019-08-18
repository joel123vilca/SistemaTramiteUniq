import * as types from '../mutation-types'
import bloodTypesAPI from '@/api/bloodTypes'

export const state = {
  bloodTypes: [],
  loadingBloodTypes: false
}

export const actions = {
  getBloodTypes ({ commit }, payload) {
    commit(types.REPLACE_LOADING_BLOOD_TYPES, { status: true })

    return new Promise((resolve, reject) => {
      bloodTypesAPI.get(payload)
        .then(response => {
          const bloodTypes = response.data.data

          commit(types.REPLACE_LOADING_BLOOD_TYPES, { status: false })
          commit(types.REPLACE_BLOOD_TYPES, { bloodTypes })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_BLOOD_TYPES, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_BLOOD_TYPES] (state, { status }) {
    state.loadingBloodTypes = status
  },
  [types.REPLACE_BLOOD_TYPES] (state, { bloodTypes }) {
    state.bloodTypes = bloodTypes
  }
}
