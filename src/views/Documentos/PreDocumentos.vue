<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name:'preinscritos' } },
          { name: 'Documentos Virtuales' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar color="grey darken-4" dark card>
          <v-toolbar-title>Documentos Virtuales</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex v-if="documentos.length" sm6 offset-sm6>
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingDocumentos"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-radio-group v-model="row" row>
              <v-radio label="Juridico" value="judirico"></v-radio>
              <v-radio label="Ciudadano" value="ciudadano"></v-radio>
            </v-radio-group>
            <v-flex xs12 v-if="row==='ciudadano'">
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'nombres' },
                  { text: 'Correo electrónico' },
                  { text: 'Asunto', value: 'asunto' },
                  { text: 'Fecha de Tramite' },
                  { text: 'Hora' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="documentos"
                :search="searchUsers"
                :loading="loadingDocumentos"
                class="elevation-1"
              >
                <tr slot="items" slot-scope="props">
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >{{ props.item.remitente.nombres }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >{{ props.item.remitente.email }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >{{ props.item.asunto }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >{{ props.item.fecha_registro }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >{{ props.item.hora_registro }}</td>
                  <td
                    class="text-xs-center px-3"
                    v-if="props.item.remitente.hasOwnProperty('nombres')"
                  >
                    <template>
                      <v-btn class="ma-0" small icon flat color="info">
                        <v-icon small>edit</v-icon>
                      </v-btn>
                    </template>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
            <v-flex xs12 v-else>
              <v-data-table
                :headers="[
                  { text: 'Nombre de la institución', value: 'nombres' },
                  { text: 'Firmante' },
                  { text: 'Asunto', value: 'asunto' },
                  { text:'Fecha de registro'},
                  { text: 'Hora de registro'},
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="documentos"
                :search="searchUsers"
                :loading="loadingDocumentos"
                class="elevation-1"
              >
                <tr slot="items" slot-scope="props">
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >{{ props.item.remitente.razon_social }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >{{ props.item.remitente.firmante }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >{{ props.item.asunto }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >{{ props.item.fecha_registro }}</td>
                  <td
                    class="px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >{{ props.item.hora_registro }}</td>
                  <td
                    class="text-xs-center px-3"
                    v-if="props.item.remitente.hasOwnProperty('firmante')"
                  >
                    <template>
                      <v-btn class="ma-0" small icon flat color="info">
                        <v-icon small>edit</v-icon>
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
    return { title: 'Listado de Documentos' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      searchUsers: '',
      row: 'ciudadano',
    }
  },

  computed: {
    ...mapState({
      documentos: state => state.documentos.documentos,
      loadingDocumentos: state => state.documentos.loadingDocumentos
    })
  },

  watch: {
  },

  created () {
    this.getDocumentos()
  },

  methods: {
    ...mapActions({
      getDocumentos: 'documentos/getDocumentos',
    }),
  }
}
</script>

<style scoped>

</style>
