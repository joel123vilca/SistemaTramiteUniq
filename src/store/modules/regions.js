import * as types from '../mutation-types'
import regionsAPI from '@/api/regions'

export const state = {
  regions: [],
  loadingRegions: false,
  currentRegion: null
}

export const actions = {
  getRegions ({ commit }, payload) {
    commit(types.REPLACE_LOADING_REGIONS, { status: true })

    return new Promise((resolve, reject) => {
      regionsAPI.get(payload)
        .then(response => {
          const regions = response.data.data
          commit(types.REPLACE_LOADING_REGIONS, { status: false })
          commit(types.REPLACE_REGIONS, { regions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_REGIONS, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_REGIONS] (state, { status }) {
    state.loadingRegions = status
  },
  [types.REPLACE_REGIONS] (state, { regions }) {
    state.regions = regions
  }
}
