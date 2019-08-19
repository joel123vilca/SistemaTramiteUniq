<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'estudiantes' } },
          { name: 'Nuevo usuario' }
        ]"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          md6
          sm6
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Usuario</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateUser"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <v-text-field
                    v-model="form.email"
                    :disabled="processingForm"
                    label="Email"
                    :rules="rules.email"
                    :error="!!formErrors.email"
                    :error-messages="formErrors.email"
                    @keyup="() => {
                      formErrors.email = undefined
                      delete formErrors.email
                    }"
                  />
                  <v-text-field
                    v-model="form.name"
                    :disabled="processingForm"
                    label="Nombre"
                    :error="!!formErrors.name"
                    :error-messages="formErrors.name"
                    @keyup="() => {
                      formErrors.name = undefined
                      delete formErrors.name
                    }"
                  />
                  <v-text-field
                    v-model="form.password"
                    type="password"
                    :disabled="processingForm"
                    label="Contraseña"
                    :rules="rules.password"
                    :error="!!formErrors.password"
                    :error-messages="formErrors.password"
                    @keyup="() => {
                      formErrors.password = undefined
                      delete formErrors.password
                    }"
                  />
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.type_user_id"
                        :items="typeUsers"
                        :loading="loadingTipeUsers"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar tipo de usuario"
                        item-text="title"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.type_user_id"
                        :error-messages="formErrors.type_user_id"
                        @change="() => {
                          formErrors.type_user_id = undefined
                          delete formErrors.type_user_id
                        }"
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
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ name: 'sgcUsersList' })">
                    Cancelar
                  </v-btn>
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
    return { title: 'Nuevo Usuario' }
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
        email: '',
        password: '',
        name: '',
        type_user_id: 0
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
        ],
        password: [
          v => !!v || 'La contraseña es requerida'
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
    if (!this.$can('create', 'Users')) return false
    this.getTypeUsers()
  },

  methods: {
    ...mapActions({
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      createUser: 'users/createUser',
      getUsers: 'users/getUsers'

    }),

    submitCreateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createUser({ data: this.form })
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
