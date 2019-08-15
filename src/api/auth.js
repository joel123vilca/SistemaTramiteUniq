import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  login (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/login`,
        method: 'post',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  logout (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/logout`,
        method: 'post'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  user (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/user`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
