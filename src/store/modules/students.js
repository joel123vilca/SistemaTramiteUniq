import * as types from '../mutation-types'
import studentsAPI from '@/api/students'

export const actions = {
updateStudents ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    studentsAPI.put(payload)
      .then(response => {
        this._vm.$notify.success({
          title: 'UNIQ',
          message: 'El usuario ha sido actualizado con éxito.'
        })

        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
}
