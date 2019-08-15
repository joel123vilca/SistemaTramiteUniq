import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

  get (payload = {}) {
    const params = payload.params || {}
    const confirmed = payload.confirmed
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds?confirmed=${confirmed}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getById (payload = {}) {
    const Id = payload.Id

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${Id}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  put (payload = {}) {
    const id = payload.Id
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${id}`,
        method: 'put',
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

  saveImage (payload = {}) {
    const id = payload.Id
    const data = payload.data || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${id}/image/save`,
        method: 'patch',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  ability (payload = {}) {
    const id = payload.Id
    console.log(id)
    const data = payload.data || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${id}/edit-permission`,
        method: 'patch',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getReport (payload = {}) {
    const Id = payload.Id
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${Id}/generate/reports`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getExcel (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/report-per-day/excel`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getReportOrdinary (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/excel/list-confirmed-ordinary`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getReportExtraordinary (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/excel/list-confirmed-extraordinary`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getReportPreinscription (payload = {}) {
    const Id = payload.Id
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${Id}/generate/pre-registration`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getReportTotal (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/reports/registereds/total`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  delete (payload = {}) {
    const id = payload.id
    console.log(id)
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds/${id}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getAnnulled (payload = {}) {
    const params = payload.params || {}
    const cancelRegistereds = payload.cancelRegistereds
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds?cancelRegistereds=${cancelRegistereds}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
