import * as types from '../mutation-types'
import studentsAPI from '@/api/students'

export const state = {
  students: [],
  loadingStudents: false,
  currentStudent: null
}

export const actions = {
  updateStudents ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    studentsAPI.put(payload)
      .then(response => {
        this._vm.$notify.success({
          title: 'UNIQ',
          message: 'El Estudiante ha sido actualizado con éxito.'
        })

        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  patchStudents ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      studentsAPI.patch(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'UNIQ',
            message: 'El Estudiante ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
  replaceCurrentStudent ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_STUDENT, payload)
  },
  getStudent ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      studentsAPI.getByDni(payload)
        .then(response => {
          const student = response.data.data
          commit(types.REPLACE_CURRENT_STUDENT, { student })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getStudentId ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      studentsAPI.getById(payload)
        .then(response => {
          const student = response.data.data
          commit(types.REPLACE_CURRENT_STUDENT, { student })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getStudents ({ commit }, payload) {
    commit(types.REPLACE_LOADING_STUDENTS, { status: true })

    return new Promise((resolve, reject) => {
      studentsAPI.get(payload)
        .then(response => {
          const students = response.data.data
          commit(types.REPLACE_LOADING_STUDENTS, { status: false })
          commit(types.REPLACE_STUDENTS, { students })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_STUDENTS, { status: false })
          reject(error)
        })
    })
  },
  getReport ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      studentsAPI.getReport(payload)
        .then(response => {
          const student = response.data
          commit(types.REPLACE_CURRENT_STUDENT, { student })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getReportExcel ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      studentsAPI.getReportExcel(payload)
        .then(response => {
          const student = response.data
          commit(types.REPLACE_CURRENT_STUDENT, { student })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export const getStudent = (state) => {
  return state.student
}

export const mutations = {
  [types.REPLACE_LOADING_STUDENTS] (state, { status }) {
    state.loadingStudents = status
  },
  [types.REPLACE_STUDENTS] (state, { students }) {
    state.students = students
  },
  [types.REPLACE_CURRENT_STUDENT] (state, { student }) {
    state.currentStudent = student
  }
}

