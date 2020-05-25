import * as types from '../mutation-types'
import documentoAPI from '@/api/documento'

export const state = {
  documentos: [],
  loadingDocumentos: false,
}
export const actions = {
  getDocumentos ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DOCUMENTOS, { status: true })
    return new Promise((resolve, reject) => {
      documentoAPI.get(payload)
        .then(response => {
          const documentos = response.data.data

          commit(types.REPLACE_LOADING_DOCUMENTOS, { status: false })
          commit(types.REPLACE_DOCUMENTOS, { documentos })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DOCUMENTOS, { status: false })
          reject(error)
        })
    })
  },
    createCiudadano({ commit }, payload) {
        return new Promise((resolve, reject) => {
          documentoAPI.postCiudadano(payload)
            .then(response => {
              this._vm.$notify.success({
                title: 'UNIQ',
                message: 'El documento ha sido enviado con éxito.'
              })
    
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      createRepresentante({ commit }, payload) {
        return new Promise((resolve, reject) => {
          documentoAPI.postRepresentante(payload)
            .then(response => {
              this._vm.$notify.success({
                title: 'UNIQ',
                message: 'El documento ha sido enviado con éxito.'
              })
    
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      uploadArchivo ({ commit }, payload) {
        return new Promise((resolve, reject) => {
          documentoAPI.uploadArchivo(payload)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
    
}

export const mutations = {
  [types.REPLACE_LOADING_DOCUMENTOS] (state, { status }) {
    state.loadingDocumentos = status
  },
  [types.REPLACE_DOCUMENTOS] (state, { documentos }) {
    state.documentos = documentos
  }
}