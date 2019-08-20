<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Estudiantes')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'estudiantes' } },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Estudiantes</v-toolbar-title>
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
              v-if="students.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingStudents"
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
                  { text: 'Modalidad de Ingreso', value: 'type_exam' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="students"
                :search="searchUsers"
                :loading="loadingStudents"
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
                    {{ props.item.type_exam }}
                  </td>
                  <td class="text-xs-center px-3">
                    <template>
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'estudiante', params: { id: props.item.id } }"
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
                  <td>
                    <v-btn
                      color="blue-grey"
                      class="ma-2 white--text"
                      :to="{ name: 'reporte', params: { id: props.item.id } }"
                    >
                    Reporte
                    <v-icon right dark>cloud_download</v-icon>
                    </v-btn>
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
    return { title: 'Listado de Estudiantes' }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermisionAuth'),
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
      currentStudent: state => state.students.currentStudent,
      students: state => state.students.students,
      loadingStudents: state => state.students.loadingStudents
    })
  },
  created () {
    this.getStudents()
  },
  methods: {
    ...mapActions({
      getStudents: 'students/getStudents'
    })
  }
}
</script>
