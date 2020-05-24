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
  uploadImage (payload = {}) {
    const img = payload
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/image`,
        method: 'post',
        data: img
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
