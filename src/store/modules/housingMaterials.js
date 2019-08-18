import * as types from '../mutation-types'
import housingMaterialsAPI from '@/api/housingMaterials'

export const state = {
  housingMaterials: [],
  loadingHousingMaterials: false
}

export const actions = {
  getHousingMaterials ({ commit }, payload) {
    commit(types.REPLACE_LOADING_HOUSING_MATERIALS, { status: true })

    return new Promise((resolve, reject) => {
      housingMaterialsAPI.get(payload)
        .then(response => {
          const housingMaterials = response.data.data

          commit(types.REPLACE_LOADING_HOUSING_MATERIALS, { status: false })
          commit(types.REPLACE_HOUSING_MATERIALS, { housingMaterials })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_HOUSING_MATERIALS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_HOUSING_MATERIALS] (state, { status }) {
    state.loadingHousingMaterials = status
  },
  [types.REPLACE_HOUSING_TENURES] (state, { housingMaterials }) {
    state.housingMaterials = housingMaterials
  }
}
