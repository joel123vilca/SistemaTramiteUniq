import * as types from '../mutation-types'
import typeInsurancesAPI from '@/api/typeInsurances'

export const state = {
  typeInsurances: [],
  loadingTypeInsurances: false
}

export const actions = {
  getTypeInsurances ({ commit }, payload) {
    commit(types.REPLACE_LOADING_TYPE_INSURANCES, { status: true })

    return new Promise((resolve, reject) => {
      typeInsurancesAPI.get(payload)
        .then(response => {
          const typeInsurances = response.data.data

          commit(types.REPLACE_LOADING_TYPE_INSURANCES, { status: false })
          commit(types.REPLACE_TYPE_INSURANCES, { typeInsurances })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TYPE_INSURANCES, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_TYPE_INSURANCES] (state, { status }) {
    state.loadingTypeInsurances = status
  },
  [types.REPLACE_TYPE_INSURANCES] (state, { typeInsurances }) {
    state.typeInsurances = typeInsurances
  }
}
