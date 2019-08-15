export default [
  {
    path: '/',
    redirect: {
      name: 'admin'
    }
  },
  {
    path: '/bienestar',
    name: 'bienestar',
    component: () => import('@/views/wellness/searchForDni.vue')
  },
  {
    path: '/reporte-inscritos',
    name: 'reporte-inscritos',
    component: () => import('@/views/registereds/UserReport.vue')
  },
  {
    path: '/foto',
    name: 'foto',
    component: () => import('@/views/registereds/camara.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/preinscripcion',
    name: 'preinscripcion',
    component: () => import('@/views/admision/admision.vue')
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
  // inscritos
  {
    path: '/preinscrito/:id',
    name: 'registerEdit',
    component: () => import('@/views/registereds/Edit.vue')
  },
  {
    path: '/inscritos',
    name: 'inscritos',
    component: () => import('@/views/registereds/Inscribed.vue')
  },
  {
    path: '/camara/:id',
    name: 'camara',
    component: () => import('@/views/registereds/foto.vue')
  },
  {
    path: '/reporte/:id',
    name: 'reporte',
    component: () => import('@/views/registereds/Report.vue')
  },
  {
    path: '/reporte-preinscripcion/:id',
    name: 'reportePreinscription',
    component: () => import('@/views/registereds/ReportPreinscription.vue')
  },

  // school
  {
    path: '/school/create',
    name: 'createSchool',
    component: () => import('@/views/school/Create.vue')
  },
  {
    path: '/reporte-admision',
    name: 'reportAdmin',
    component: () => import('@/views/registereds/ReportesAdmin.vue')
  },
  {
    path: '/anulados',
    name: 'annulled',
    component: () => import('@/views/registereds/Annulled.vue')
  }
]
