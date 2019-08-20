export default [
  {
    path: '/',
    redirect: {
      name: 'bienestar'
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
    path: '/estudiantes',
    name: 'estudiantes',
    component: () => import('@/views/wellness/listStudents.vue')
  },
  {
    path: '/estudiante/:id',
    name: 'estudiante',
    component: () => import('@/views/wellness/editStudent.vue')
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
  },
  {
    path: '/reporte/:id',
    name: 'reporte',
    component: () => import('@/views/wellness/report.vue')
  }
]
