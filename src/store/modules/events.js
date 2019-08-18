import * as types from '../mutation-types'
import eventsAPI from '@/api/events'

export const state = {
  events: [],
  loadingEvents: false
}

export const actions = {
  getEvents ({ commit }, payload) {
    commit(types.REPLACE_LOADING_EVENTS, { status: true })

    return new Promise((resolve, reject) => {
      eventsAPI.get(payload)
        .then(response => {
          const events = response.data.data

          commit(types.REPLACE_LOADING_EVENTS, { status: false })
          commit(types.REPLACE_EVENTS, { events })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_EVENTS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_EVENTS] (state, { status }) {
    state.loadingEvents = status
  },
  [types.REPLACE_EVENTS] (state, { events }) {
    state.events = events
  }
}
