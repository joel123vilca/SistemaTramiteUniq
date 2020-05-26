<template>
  <v-container fluid>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio' },
          { name: 'Documentos' },
          { name: 'Registrar' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
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
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.razon_social"
                        label="Razon Social"
                        :error="!!formErrors.razon_social"
                        :error-messages="formErrors.razon_social"
                        @keyup="() => {
                          formErrors.razon_social = undefined
                          delete formErrors.razon_social
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.ruc"
                        label="Ruc"
                        :error="!!formErrors.ruc"
                        :error-messages="formErrors.ruc"
                        @keyup="() => {
                          formErrors.ruc= undefined
                          delete formErrors.ruc
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.dependencia"
                        label="Dependencia"
                        :error="!!formErrors.dependencia"
                        :error-messages="formErrors.dependencia"
                        @keyup="() => {
                          formErrors.dependencia= undefined
                          delete formErrors.dependencia
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.firmante"
                        label="Firmante"
                        :error="!!formErrors.firmante"
                        :error-messages="formErrors.firmante"
                        @keyup="() => {
                          formErrors.firmante= undefined
                          delete formErrors.firmante
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.cargo_firmante"
                        label="Cargo Firmante"
                        outlined
                        :error="!!formErrors.cargo_firmante"
                        :error-messages="formErrors.cargo_firmante"
                        @keyup="() => {
                          formErrors.cargo_firmante= undefined
                          delete formErrors.cargo_firmante
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.direccion"
                        label="Direccion"
                        :error="!!formErrors.direccion"
                        :error-messages="formErrors.direccion"
                        @keyup="() => {
                          formErrors.direccion= undefined
                          delete formErrors.direccion
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.telefono"
                        label="Telefono"
                        :error="!!formErrors.telefono"
                        :error-messages="formErrors.telefono"
                        @keyup="() => {
                          formErrors.telefono= undefined
                          delete formErrors.telefono
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        :error="!!formErrors.email"
                        :error-messages="formErrors.email"
                        @keyup="() => {
                          formErrors.email= undefined
                          delete formErrors.email
                        }"
                        outline
                      />
                    </v-flex>
                  </v-layout>
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
                  <v-flex sm6 xs12>
                    <img
                      src="data:image/png;base64,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"
                    />
                  </v-flex>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >Registrar</v-btn>
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
