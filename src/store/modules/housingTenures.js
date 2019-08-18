import * as types from '../mutation-types'
import housingTenuresAPI from '@/api/housingTenures'

export const state = {
  housingTenures: [],
  loadingHousingTenures: false
}

export const actions = {
  getHousingTenures ({ commit }, payload) {
    commit(types.REPLACE_LOADING_HOUSING_TENURES, { status: true })

    return new Promise((resolve, reject) => {
      housingTenuresAPI.get(payload)
        .then(response => {
          const housingTenures = response.data.data

          commit(types.REPLACE_LOADING_HOUSING_TENURES, { status: false })
          commit(types.REPLACE_HOUSING_TENURES, { housingTenures })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_HOUSING_TENURES, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_HOUSING_TENURES] (state, { status }) {
    state.loadingHousingTenures = status
  },
  [types.REPLACE_HOUSING_TENURES] (state, { housingTenures }) {
    state.housingTenures = housingTenures
  }
}
