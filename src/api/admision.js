import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

  post (payload = {}) {
    const data = payload.data || {}
    console.log(data)
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getVerify (payload = {}) {
    const params = payload.params || {}
    const dni = payload.dni
    const examId = payload.examId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/verify?dni=${dni}&examId=${examId}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
