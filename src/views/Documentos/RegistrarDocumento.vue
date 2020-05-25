<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio' },
          { name: 'Documentos' },
          { name: 'Registrar' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md6 sm6 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Documento</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateUser"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.descripcion"
                    :disabled="processingForm"
                    label="Descripcion"
                    outline
                  />
                  <v-text-field
                    v-model="form.observaciones"
                    :disabled="processingForm"
                    label="Observaciones"
                    outline
                  />

                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.tipo_documento_id"
                        :items="typeUsers"
                        :loading="loadingTipeUsers"
                        dense
                        clearable
                        small-chips
                        label="Tipo de tramite segun TUPA"
                        item-text="title"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.tipo_documento_id"
                        :error-messages="formErrors.tipo_documento_id"
                        @change="() => {
                          formErrors.tipo_documento_id = undefined
                          delete formErrors.tipo_documento_id
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.asunto"
                        :disabled="processingForm"
                        label="Asunto"
                        outline
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.numero_folios"
                        :disabled="processingForm"
                        label="N° de Folios"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.fecha_registro"
                        :disabled="processingForm"
                        label="Fecha de Registro"
                        outline
                        type="date"
                      />
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.numero_documento"
                        :disabled="processingForm"
                        label="Numero de documento"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.numero_tramite_documentario"
                        :disabled="processingForm"
                        label="Numero de Tramite Documentario"
                        outline
                      />
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.prioridad"
                        :disabled="processingForm"
                        label="Prioridad"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.procedimiento_id"
                        :disabled="processingForm"
                        label="Procedimiento"
                        outline
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >Guardar</v-btn>
                  <v-btn @click="$router.push({ name: 'registros' })">Cancelar</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Editar Usuario' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {

      imageUrl: '',

      formErrors: {},

      form: {
        descripcion: "",
        observaciones: "",
        asunto: "",
        numero_folios: "",
        fecha_registro: "",
        numero_documento: "",
        numero_tramite_documentario: "",
        prioridad: "Normal",
        archivo_url: "",
        tipo_documento_id: 0,
        procedimiento_id: 0
      },
      validForm: true,
      processingForm: false,

      rules: {
        name: [
          v => !!v || 'El nombre es requerido'
        ],
        email: [
          v => !!v || 'El correo electrónico es requerido',
          // eslint-disable-next-line no-useless-escape
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'El correo electrónico debe ser válido'
        ]
      }
    }
  },

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      typeUsers: state => state.typeUsers.typeUsers,
      loadingTipeUsers: state => state.typeUsers.loadingTipeUsers
    })
  },

  created () {
    if (!this.$can('update', 'Users')) return false

    this.getTypeUsers()

    this.getUser({ userId: this.$route.params.id })
      .then(response => {
        const userInfo = response.data.data
        this.setForm(userInfo)
      })
  },

  methods: {
    ...mapActions({
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      updateUser: 'users/updateUser',
      getUser: 'users/getUser'

    }),

    setForm (user) {
      this.form.email = user.email
      this.form.name = user.name
      this.form.type_user_id = user.typeUser ? user.typeUser.id : ''
    },

    submitUpdateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateUser({
        userId: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'sgcUsersList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
