export default [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/bienestar',
    name: 'bienestar',
    component: () => import('@/views/wellness/searchForDni.vue')
  },
  {
    path: '/completar-ficha',
    name: 'completar-ficha',
    component: () => import('@/views/wellness/completeData.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/preinscritos',
    name: 'preinscritos',
    component: () => import('@/views/registereds/List.vue')
  },

  // sgc users
  {
    path: '/users',
    name: 'sgcUsersList',
    component: () => import('@/views/users/ListUsers.vue')
  },
  {
    path: '/users/create',
    name: 'sgcUsersCreate',
    component: () => import('@/views/users/CreateUser.vue')
  },
  {
    path: '/users/:id',
    name: 'sgcUsersEdit',
    component: () => import('@/views/users/EditUser.vue')
  },

  // school
  {
    path: '/school/create',
    name: 'createSchool',
    component: () => import('@/views/school/Create.vue')
  }
]
