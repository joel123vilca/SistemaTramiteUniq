import * as types from '../mutation-types'
import userAPI from '@/api/user'

export const state = {
  users: [],
  loadingUsers: false,
  currentUser: null
}

export const actions = {
  getUsers ({ commit }, payload) {
    commit(types.REPLACE_LOADING_USERS, { status: true })
    return new Promise((resolve, reject) => {
      userAPI.get(payload)
        .then(response => {
          const users = response.data.data

          commit(types.REPLACE_LOADING_USERS, { status: false })
          commit(types.REPLACE_USERS, { users })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_USERS, { status: false })
          reject(error)
        })
    })
  },

  getUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.getById(payload)
        .then(response => {
          const user = response.data.data

          commit(types.REPLACE_CURRENT_USER, { user })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceCurrentUser ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_USER, payload)
  },

  updateUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.put(payload)
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

  createUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El usuario ha sido creado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  sendTokenForResetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.sendTokenForResetPassword(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'Le hemos enviado un correo de cambio de contraseña!'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  resetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.resetPassword(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'Su contraseña han sido actualizada con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportExcel ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.getReportExcel(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_USERS] (state, { status }) {
    state.loadingUsers = status
  },
  [types.REPLACE_USERS] (state, { users }) {
    state.users = users
  },
  [types.REPLACE_CURRENT_USER] (state, { user }) {
    state.currentUser = user
  }
}
