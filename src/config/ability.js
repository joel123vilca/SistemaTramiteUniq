import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define((can, cannot) => {
  can(['test'], 'Banners')
})

export function defineAbilitiesFor (user = {}) {
  const roleType = user.tipoUsuario.tipo || 'guest'
  // const roleType = user.typeUser.id === 1 ? 'Registrador' : 'Administrador'

  switch (roleType) {
    case 'Tramitador':
      return [
        {
          subject: 'Dashboard',
          actions: ['list']
        },
        {
          subject: 'Users',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Registereds',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Estudiantes',
          actions: ['list', 'create', 'update', 'delete', 'patch']
        }
      ]

    case 'Bienestar':
      return [
        {
          subject: 'Registereds',
          actions: ['list', 'update']
        },
        {
          subject: 'Estudiantes',
          actions: ['list', 'update']
        }
      ]

    default:
      return []
  }
}
