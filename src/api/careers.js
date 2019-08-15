import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/careers`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
