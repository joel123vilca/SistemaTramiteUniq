import store from '@/store/index'

export default async (to, from, next) => {
  if (!store.getters['auth/check']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (error) {
      console.log('Error fetchUser', error.response)
    }
  }
  next()
}
