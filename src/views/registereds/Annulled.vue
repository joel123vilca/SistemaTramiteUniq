<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Registereds')" />
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'preinscritos' } },
          { name: 'Registrados' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Anulados</v-toolbar-title>
          <v-spacer />
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
              v-if="annulled.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingAnnulled"
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
                  { text: 'Nombre', value: 'name' },
                  { text: 'Apellido Paterno', value: 'father_surname' },
                  { text: 'Apellido Materno' },
                  { text: 'DNI', value: 'dni' },
                  { text: 'Fecha de anulación'}

                ]"
                :items="annulled"
                :search="searchUsers"
                :loading="loadingAnnulled"
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
                    {{ props.item.father_surname }}
                  </td>
                  <td class="px-3">
                    {{ props.item.mother_surname }}
                  </td>
                  <td class="px-3">
                    {{ props.item.dni }}
                  </td>
                  <td class="px-3">
                    {{ props.item.deleted_at }}
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
    return { title: 'Listado de Anulados' }
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
      currentRegistered: state => state.register.currentRegistered,
      annulled: state => state.register.annulled,
      loadingAnnulled: state => state.register.loadingAnnulled
    })
  },
  created () {
    if (!this.$can('list', 'Registereds')) return false
    this.getAnnulled({
      cancelRegistereds: true
    })
  },
  methods: {
    ...mapActions({
      getAnnulled: 'register/getAnnulled',
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      replaceAnnulled: 'register/replaceAnnulled',
    })
  }
}
</script>
