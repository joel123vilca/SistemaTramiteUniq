export default [
  {
    path: '/',
    redirect: {
      name: 'sistemaTramite'
    }
  },
  {
    path: '/sistema-tramite',
    name: 'sistemaTramite',
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
    path: '/documentos',
    name: 'documentos',
    component: () => import('@/views/Documentos/PreDocumentos.vue')
  },
  {
    path: '/registrar',
    name: 'regis',
    component: () => import('@/views/Documentos/RegistrarDocumento.vue')
  },
  {
    path: '/registrar-ciudadano',
    name: 'regisCiudadano',
    component: () => import('@/views/Documentos/RegistrarCiudadano.vue')
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
  }
]
