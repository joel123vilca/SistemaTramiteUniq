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
          { name: 'Preinscritos' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Preinscritos</v-toolbar-title>
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
              v-if="registereds.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingRegistereds"
                box
                append-icon="search"
                label="Buscar por dni o apellido"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'DNI', value: 'dni' },
                  { text: 'Nombre', value: 'name' },
                  { text: 'Apellido', value: 'father_surname' },
                  { text: 'Carrera', value: 'career' },
                  { text: 'Modalidad de examen', value: 'typeExam' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="registereds"
                :search="searchUsers"
                :loading="loadingRegistereds"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.dni }}
                  </td>
                  <td class="px-3">
                    {{ props.item.name }}
                  </td>
                  <td class="px-3">
                    {{ props.item.father_surname }}
                  </td>
                  <td class="px-3">
                    {{ props.item.career.title }}
                  </td>
                  <td class="px-3">
                    {{ props.item.typeExam.title }}
                  </td>
                  <td>
                    <v-btn
                      color="blue-grey"
                      class="ma-2 white--text"
                      :to="{ name: 'reportePreinscription', params: { id: props.item.id } }"
                    >
                      Ficha Reporte
                    <v-icon right dark>cloud_download</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('update', 'Registereds')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'registerEdit', params: { id: props.item.id } }"
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
    return { title: 'Listado de Preinscritos' }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },
  data () {
    return {
      searchUsers: '',
      excel_path: ''
    }
  },
  computed: {
    ...mapState({
      currentRegistred: state => state.register.replaceCurrentRegistered,
      registereds: state => state.register.registereds,
      loadingRegistereds: state => state.register.loadingRegistereds
    })
  },
  created () {
    if (!this.$can('list', 'Registereds')) return false
    this.getRegistereds({
      confirmed: false
    })
  },
  methods: {
    ...mapActions({
      getRegistereds: 'register/getRegistereds',
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      replaceRegistereds: 'register/replaceRegistereds'
    })
  }
}
</script>
