import * as types from '../mutation-types'
import documentoAPI from '@/api/documento'

export const actions = {
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

