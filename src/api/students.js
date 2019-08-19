import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  put (payload = {}) {
  const id = payload.id
  const data = payload.data || {}

  return new Promise((resolve, reject) => {
    axios({
      url: `${HOST}/students/${id}`,
      method: 'patch',
      data
    })
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
  },
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/students`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getByDni (payload = {}) {
    const params = payload.params || {}
    const dni= payload.dni
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/students/search?dni=${dni}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getById (payload = {}) {
    const params = payload.params || {}
    const id= payload.id
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/students/${id}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
