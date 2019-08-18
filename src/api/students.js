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
}
}
