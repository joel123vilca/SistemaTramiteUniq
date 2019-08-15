import * as types from '../mutation-types'
import admisionAPI from '@/api/admision'

export const state = {
  loadingProducts: false,
  costProductByLots: [],
  loadingCostProductsByLots: false,
  showModalDeleteProduct: false,
  currentProduct: null,
  loadingCurrentProduct: false
}

export const actions = {
  createAdmision ({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      admisionAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Universidad Nacional Intercultural de Quillabamba',
            message: 'El Usuario ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
          this._vm.$notify.success({
            title: 'Universidad Nacional Intercultural de Quillabamba',
            message: 'El Usuario no se ha podido registrar éxito, verifique sus datos.'
          })
        })
    })
  },
  getVerify ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      admisionAPI.getVerify(payload)
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
  [types.REPLACE_LOADING_PRODUCTS] (state, { status }) {
    state.loadingProducts = status
  },
  [types.REPLACE_PRODUCTS] (state, { products }) {
    state.products = products
  },
  [types.REPLACE_LOADING_COST_PRODUCT_BY_LOTS] (state, { status }) {
    state.loadingCostProductsByLots = status
  },
  [types.REPLACE_COST_PRODUCTS_BY_LOTS] (state, { products }) {
    state.costProductsByLots = products
  },
  [types.REPLACE_SHOW_MODAL_DELETE_PRODUCT] (state, { status }) {
    state.replaceShowModalDeleteProduct = status
  },
  [types.REPLACE_CURRENT_PRODUCT] (state, { product }) {
    state.currentProduct = product
  },
  [types.REPLACE_LOADING_CURRENT_PRODUCT] (state, { status }) {
    state.loadingCurrentProduct = status
  }
}
