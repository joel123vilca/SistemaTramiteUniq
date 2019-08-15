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
          <v-toolbar-title>Inscritos</v-toolbar-title>
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
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre', value: 'name' },
                  { text: 'Apellido', value: 'father_surname' },
                  { text: 'DNI', value: 'dni' }
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
                    {{ props.item.name }}
                  </td>
                  <td class="px-3">
                    {{ props.item.father_surname }}
                  </td>
                  <td class="px-3">
                    {{ props.item.dni }}
                  </td>
                  <td>
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    :to="{ name: 'reporte', params: { id: props.item.id } }"
                  >
                  Reporte
                  <v-icon right dark>cloud_download</v-icon>
                  </v-btn>
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    :to="{ name: 'reportePreinscription', params: { id: props.item.id } }"
                  >
                    Preinscripción
                  <v-icon right dark>cloud_download</v-icon>
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="indigo"
                    dark
                    :to="{ name: 'camara', params: { id: props.item.id } }"
                  >
                  <v-icon right dark>party_mode</v-icon>
                  </v-btn>
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('patch', 'Inscritos')">
                      <v-btn
                      class="ma-0"
                      small
                      fab
                      flat
                      color="info"
                      @click="openModalAbility(props.item)"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                    </template>
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('delete', 'Inscritos')">
                      <v-btn
                      class="ma-0"
                      small
                      fab
                      flat
                      color="red"
                      @click="openModalDelete(props.item)"
                      >
                        <v-icon small>
                          delete
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
      <ModalAbility />
      <ModalDeleteInscribed />
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
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ModalAbility: () => import('@/views/registereds/ModalAbility'),
    ModalDeleteInscribed: () => import('@/views/registereds/ModalDeleteInscribed')
  },
  data () {
    return {
      searchUsers: '',
      excel_path: ''
    }
  },
  computed: {
    ...mapState({
      currentRegistered: state => state.register.currentRegistered,
      registereds: state => state.register.registereds,
      loadingRegistereds: state => state.register.loadingRegistereds
    })
  },
  created () {
    if (!this.$can('list', 'Registereds')) return false
    this.getRegistereds({
      confirmed: true
    })
  },
  methods: {
    ...mapActions({
      getRegistereds: 'register/getRegistereds',
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      replaceRegistereds: 'register/replaceRegistereds',
      replaceShowModalAbility: 'register/replaceShowModalAbility',
      replaceShowModalDeleteInscribed: 'register/replaceShowModalDeleteInscribed'
    }),
    openModalAbility (register) {
      this.replaceCurrentRegistered({ register })
      this.replaceShowModalAbility({ status: true })
    },
    openModalDelete (register){
      this.replaceCurrentRegistered({ register })
      this.replaceShowModalDeleteInscribed({ status: true})
    }
  }
}
</script>
