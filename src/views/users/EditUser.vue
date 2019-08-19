<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Users')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'preinscritos' } },
          { name: 'Users', to: { name: 'sgcUsersList' } },
          { name: 'Editar usuario' }
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
              <span class="success--text font-weight-bold headline">Editar Usuario</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateUser"
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
        email: '',
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
