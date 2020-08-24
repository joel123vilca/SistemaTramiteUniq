<template>
  <v-container
    fluid
    grid-list-lg
  >
    <template>
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
          md12
          sm12
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="primary--text font-weight-bold headline">Registrar Usuario</span>
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
                    v-model="form.username"
                    :disabled="processingForm"
                    label="Usuario"
                    :rules="rules.username"
                    :error="!!formErrors.username"
                    :error-messages="formErrors.username"
                    @keyup="() => {
                      formErrors.username = undefined
                      delete formErrors.username
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
                  <v-text-field
                    v-model="form.c_password"
                    type="password"
                    :disabled="processingForm"
                    label="Comprobar Contraseña"
                    :rules="rules.c_password"
                    :error="!!formErrors.c_password"
                    :error-messages="formErrors.c_password"
                    @keyup="() => {
                      formErrors.c_password = undefined
                      delete formErrors.c_password
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
                        v-model="form.tipo"
                        :items="typeUsers"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar tipo de usuario"
                        :disabled="processingForm"
                        :error="!!formErrors.tipo"
                        :error-messages="formErrors.tipo"
                        @change="() => {
                          formErrors.tipo = undefined
                          delete formErrors.tipo
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
import { mapState, mapGetters, mapActions } from 'vuex'

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
        username: '',
        password: '',
        c_password: '',
        tipo: 1,
        persona_id:'',
      },
      typeUsers:[1,2],
      validForm: true,
      processingForm: false,

      rules: {
        username: [
          v => !!v || 'El nombre es requerido'
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
    }),
    ...mapGetters({
      user: 'auth/user', 
    })
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
      this.form.persona_id = this.user.id;
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
