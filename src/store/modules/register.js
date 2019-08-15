import * as types from '../mutation-types'
import registerAPI from '@/api/register'

export const state = {
  registereds: [],
  annulled: [],
  loadingAnnulled: false,
  loadingRegistereds: false,
  currentRegistered: null,
  showModalAbility: false,
  showModalDeleteInscribed: false
}

export const actions = {
  getRegistereds ({ commit }, payload) {
    commit(types.REPLACE_LOADING_REGISTEREDS, { status: true })

    return new Promise((resolve, reject) => {
      registerAPI.get(payload)
        .then(response => {
          const registereds = response.data.data
          commit(types.REPLACE_LOADING_REGISTEREDS, { status: false })
          commit(types.REPLACE_REGISTEREDS, { registereds })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_REGISTEREDS, { status: false })
          reject(error)
        })
    })
  },

  getRegistered ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getById(payload)
        .then(response => {
          const register = response.data.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReport ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getReport(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportExcel ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getExcel(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportOrdinary ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getReportOrdinary(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportExtraordinary ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getReportExtraordinary(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportPreinscription ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getReportPreinscription(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportTotal ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.getReportTotal(payload)
        .then(response => {
          const register = response.data
          commit(types.REPLACE_CURRENT_REGISTERED, { register })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  replaceCurrentRegistered ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_REGISTERED, payload)
  },
  replaceShowModalAbility ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_ABILITY, payload)
  },
  replaceShowModalDeleteInscribed ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_INSCRIBED, payload)
  },
  updateRegistered ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El usuario ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  uploadImage ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.uploadImage(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  patchImage ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.saveImage(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El usuario ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  ability ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.ability(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El usuario ha sido habilitado.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteInscribed ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      registerAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_REGISTERED, { register: null })
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El inscrito ha sido anulado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAnnulled ({ commit }, payload) {
    commit(types.REPLACE_LOADING_ANNULLED, { status: true })

    return new Promise((resolve, reject) => {
      registerAPI.getAnnulled(payload)
        .then(response => {
          const annulled = response.data.data
          commit(types.REPLACE_LOADING_ANNULLED, { status: false })
          commit(types.REPLACE_ANNULLED, { annulled })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_ANNULLED, { status: false })
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_REGISTEREDS] (state, { status }) {
    state.loadingRegistereds = status
  },
  [types.REPLACE_REGISTEREDS] (state, { registereds }) {
    state.registereds = registereds
  },
  [types.REPLACE_CURRENT_REGISTERED] (state, { register }) {
    state.currentRegistered = register
  },
  [types.REPLACE_SHOW_MODAL_ABILITY] (state, { status }) {
    state.showModalAbility = status
  },
  [types.REPLACE_SHOW_MODAL_DELETE_INSCRIBED] (state, { status }) {
    state.showModalDeleteInscribed = status
  },
  [types.REPLACE_LOADING_ANNULLED] (state, { status }) {
    state.loadingAnnulled = status
  },
  [types.REPLACE_ANNULLED] (state, { annulled }) {
    state.annulled = annulled
  }
}
