import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'
import router from '@/router'

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']

  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const errorResponse = error.response

  // fatal error
  if (errorResponse.status >= 500) {
    Vue.prototype.$notify.error({
      title: 'Error',
      message: errorResponse.statusText,
      duration: 10000
    })
  }

  // too many request
  if (errorResponse.status === 429) {
    Vue.prototype.$notify.info({
      title: 'Info',
      message: errorResponse.statusText
    })
  }

  // data was invalid
  if (errorResponse.status === 422) {
    const data = errorResponse.data[0]
    const error = errorResponse.data.error
    const message = errorResponse.data.message
    Vue.prototype.$notify.info({
      title: 'Info',
      message: message || error || data
    })
  }

  // conflict
  if (errorResponse.status === 409) {
    Vue.prototype.$notify.info({
      title: 'Info',
      message: errorResponse.data.message
    })
  }

  // not found
  if (errorResponse.status === 404) {
    const url = `The "${errorResponse.config.url}" url Not Found (method "${errorResponse.config.method}").`
    const message = errorResponse.data.message
    Vue.prototype.$notify.info({
      title: 'Info',
      message: message || url
    })
  }

  // not permission
  if (errorResponse.status === 403) {
    const message = errorResponse.data.message
    const url = `You do not have enough permissions to run "${errorResponse.config.url}" url Not Found (method "${errorResponse.config.method}").`
    Vue.prototype.$notify.info({
      title: 'Info',
      message: message || url
    })
  }

  // Bad Request
  if (errorResponse.status === 400) {
    const message = errorResponse.data.message
    const email = errorResponse.data.email
    Vue.prototype.$notify.info({
      title: 'Info',
      message: message || email
    })
  }

  if (errorResponse.status === 401 && store.getters['auth/check']) {
    // swal({
    //   type: 'warning',
    //   title: i18n.t('token_expired_alert_title'),
    //   text: i18n.t('token_expired_alert_text'),
    //   reverseButtons: true,
    //   confirmButtonText: i18n.t('ok'),
    //   cancelButtonText: i18n.t('cancel')
    // })
    //   .then(() => {
    store.commit('auth/LOGOUT')

    router.push({ name: 'admin' })
    // })
  }

  return Promise.reject(error)
})
