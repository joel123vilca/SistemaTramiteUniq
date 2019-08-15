import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    const id = payload.id
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/districts/${id}/schools`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  post (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/schools`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getLevels () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/school-levels`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getManagements () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/type-managements`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
