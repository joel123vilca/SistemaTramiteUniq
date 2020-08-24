<template>
  <v-app id="login" class="login">
    <v-container fluid fill-height>
      <template v-if="!authenticated">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-title>
                <!-- <div class="layout column align-center">
                  <img src="@/assets/uniq.png" alt="uniq" width="200" height="200" />
                </div> -->
              </v-card-title>
              <h4>LOGIN</h4>
              <v-divider />
              <v-card-text class="pa-0">
                <v-form v-model="validForm" lazy-validation @submit.prevent="lauchLogin">
                  <v-container fluid class="pb-0" grid-list-lg>
                    <v-text-field
                      v-model="form.username"
                      :disabled="processingForm"
                      :error="!!validationErrors.username"
                      :error-messages="validationErrors.username"
                      autofocus
                      outline
                      prepend-inner-icon="email"
                      label="Correo electrónico"
                      @keyup="() => {
                        validationErrors.username = undefined
                        delete validationErrors.username
                      }"
                    />

                    <v-text-field
                      v-model="form.password"
                      :disabled="processingForm"
                      :error="!!validationErrors.password"
                      :error-messages="validationErrors.password"
                      type="password"
                      outline
                      prepend-inner-icon="lock"
                      label="Contraseña"
                      @keyup="() => {
                        validationErrors.password = undefined
                        delete validationErrors.password
                      }"
                    />
                  </v-container>
                  <v-divider />
                  <v-container fluid grid-list-lg>
                    <div class="text-xs-center">
                      <v-btn
                        type="submit"
                        color="primary"
                        :disabled="!validForm || processingForm"
                        :loading="processingForm"
                      >Iniciar sesión</v-btn>
                      <p class="mb-0">
                        <a>¿Olvidaste tu contraseña?</a>
                      </p>
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  components: {
  },

  data () {
    return {
      validForm: true,
      processingForm: false,
      form: {
        username: '',
        password: ''
      },
      validationErrors: {},
      remember: true,
      rules: {
        username: [
          v => !!v || 'El correo electrónico es requerido',
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
      showModalLogin: state => state.auth.showModalLogin,
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: 'auth/check'
    })
  },


  created () {
    if (this.authenticated) this.$router.push({ name: 'documentos' })
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
      replacePrimaryDrawer: 'layout/replacePrimaryDrawer'
    }),

    lauchLogin () {
      this.processingForm = true

      this.login({ params: this.form })
        .then(response => {
          // Save the token.
          console.log(response)
          this.$store.dispatch('auth/saveToken', {
            token: response.data.success.token,
            remember: this.remember
          })

          this.processingForm = false
          this.replacePrimaryDrawerModel()

          // Fetch the user.
          this.$store.dispatch('auth/fetchUser')
            .then(response => {
              this.processingForm = false
              console.log('para saber el tiopp',response)
              const roleType = response.data.success.tipo
              if (roleType === 'N') {
                this.$router.push({ name: 'sgcUsersCreate' })
              } else {
                this.$router.push({ name: 'sgcUsersCreate' })
              }
            })
            .catch(error => {
              console.log('errrorrrr')
              this.processingForm = false
            })
        })
        .catch((error) => {
          this.processingForm = false
        })
    },

    replacePrimaryDrawerModel () {
      let primaryDrawer = this.primaryDrawer
      primaryDrawer.model = true

      this.replacePrimaryDrawer({ primaryDrawer })
    }
  }
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
    background: #0F62AC !important;
  }
</style>
