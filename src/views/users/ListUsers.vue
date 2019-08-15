<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name:'preinscritos' } },
          { name: 'Usuarios' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'sgcUsersCreate' }"
            color="success"
          >
            Agregar Usuario
          </v-btn>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="users.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingUsers"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'name' },
                  { text: 'Correo electrónico', value: 'email' },
                  { text: 'Tipo', value: 'typeUser' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="users"
                :search="searchUsers"
                :loading="loadingUsers"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.name }}
                  </td>
                  <td class="px-3">
                    {{ props.item.email }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.typeUser.title === 'Administrador'"
                      small
                      color="primary"
                      text-color="white"
                    >
                      {{ props.item.typeUser.title }}
                    </v-chip>
                    <v-chip
                      v-else-if="props.item.typeUser.title === 'Registrador'"
                      small
                    >
                      {{ props.item.typeUser.title }}
                    </v-chip>
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('update', 'Users')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'sgcUsersEdit', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                    </template>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de Usuarios' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      searchUsers: ''
    }
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      loadingUsers: state => state.users.loadingUsers
    })
  },

  watch: {
  },

  created () {
    if (!this.$can('list', 'Users')) return false
    this.getUsers()
  },

  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
      replaceShowModalDeleteUser: 'users/replaceShowModalDeleteUser',
      replaceShowModalIncreaseDecreaseCredits: 'credits/replaceShowModalIncreaseDecreaseCredits',
      replaceCurrentUser: 'users/replaceCurrentUser',
      replaceUsers: 'users/replaceUsers'
    }),

    openModalDeleteUser (user) {
      this.replaceCurrentUser({ user })
      this.replaceShowModalDeleteUser({ status: true })
    }

  }
}
</script>

<style scoped>

</style>
