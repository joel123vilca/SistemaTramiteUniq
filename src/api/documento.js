import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

    postCiudadano(payload = {}) {
        const data = payload.data || {}
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/ciudadanos/registros`,
            method: 'post',
            data
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      postRepresentante(payload = {}) {
        const data = payload.data || {}
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/representantes/registros`,
            method: 'post',
            data
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
  uploadArchivo (payload = {}) {
    const formData = payload.formData
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registros/archivo`,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
