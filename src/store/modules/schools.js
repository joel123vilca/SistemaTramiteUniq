import * as types from '../mutation-types'
import schoolsAPI from '@/api/schools'

export const state = {
  schools: [],
  loadingSchools: false,
  levels: [],
  loadingLevels: false,
  managements: [],
  loadingManagements: false
}

export const actions = {
  getSchools ({ commit }, payload) {
    commit(types.REPLACE_LOADING_SCHOOLS, { status: true })
    commit(types.REPLACE_SCHOOLS, { schools: null })
    return new Promise((resolve, reject) => {
      schoolsAPI.get(payload)
        .then(response => {
          const schools = response.data.data
          commit(types.REPLACE_LOADING_SCHOOLS, { status: false })
          commit(types.REPLACE_SCHOOLS, { schools })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_SCHOOLS, { status: false })
          reject(error)
        })
    })
  },
  getLevels ({ commit }, payload) {
    commit(types.REPLACE_LOADING_LEVELS, { status: true })
    commit(types.REPLACE_LEVELS, { levels: null })
    return new Promise((resolve, reject) => {
      schoolsAPI.getLevels(payload)
        .then(response => {
          const levels = response.data.data
          commit(types.REPLACE_LOADING_LEVELS, { status: false })
          commit(types.REPLACE_LEVELS, { levels })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_LEVELS, { status: false })
          reject(error)
        })
    })
  },
  getManagements ({ commit }, payload) {
    commit(types.REPLACE_LOADING_MANAGEMENTS, { status: true })
    commit(types.REPLACE_MANAGEMENTS, { managements: null })
    return new Promise((resolve, reject) => {
      schoolsAPI.getManagements(payload)
        .then(response => {
          const managements = response.data.data
          commit(types.REPLACE_LOADING_MANAGEMENTS, { status: false })
          commit(types.REPLACE_MANAGEMENTS, { managements })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_MANAGEMENTS, { status: false })
          reject(error)
        })
    })
  },
  createSchool ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      schoolsAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El Colegio ha sido creado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_SCHOOLS] (state, { status }) {
    state.loadingSchools = status
  },
  [types.REPLACE_SCHOOLS] (state, { schools }) {
    state.schools = schools
  },
  [types.REPLACE_LOADING_LEVELS] (state, { status }) {
    state.loadingLevels = status
  },
  [types.REPLACE_LEVELS] (state, { levels }) {
    state.levels = levels
  },
  [types.REPLACE_LOADING_MANAGEMENTS] (state, { status }) {
    state.loadingManagements = status
  },
  [types.REPLACE_MANAGEMENTS] (state, { managements }) {
    state.managements = managements
  }
}
