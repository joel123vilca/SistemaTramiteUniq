import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define((can, cannot) => {
  can(['test'], 'Banners')
})

export function defineAbilitiesFor (user = {}) {
  const roleType = user.typeUser.title || 'guest'
  // const roleType = user.typeUser.id === 1 ? 'Registrador' : 'Administrador'

  switch (roleType) {
    case 'Administrador':
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
          subject: 'Inscritos',
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
          subject: 'Inscritos',
          actions: ['list', 'update']
        }
      ]

    default:
      return []
  }
}
