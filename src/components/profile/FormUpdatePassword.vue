<template>
  <v-form
    ref="form"
    v-model="validForm"
    lazy-validation
    @submit.prevent="launchUpdatePassword"
  >
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-text-field
            v-model="form.current_password"
            type="password"
            label="Contraseña actual"
            :rules="rules.current_password"
            outline
            color="primary"
          />
          <v-text-field
            v-model="form.password"
            type="password"
            :disabled="!form.current_password.length"
            label="Nueva contraseña"
            :rules="rules.password"
            outline
            color="primary"
          />
          <v-text-field
            v-model="form.password_confirmation"
            type="password"
            :disabled="!form.current_password.length"
            label="Repita la nueva contraseña"
            :rules="rules.password_confirmation"
            outline
            color="primary"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider />
    <v-container
      fluid
      class="text-xs-center"
    >
      <v-btn
        large
        color="accent"
        class="text-capitalize font-weight-bold subheading btn-special-green"
        type="submit"
        :disabled="!validForm || processingForm"
        :loading="processingForm"
      >
        Cambiar contraseña
      </v-btn>
      <v-btn
        large
        class="text-capitalize font-weight-bold subheading"
        @click="$router.push({ name: 'preinscritos' })"
      >
        Cancelar
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        current_password: '',
        password: '',
        password_confirmation: ''
      },
      processingForm: false,
      validForm: true,

      rules: {
        current_password: [
          v => !!v || 'La contraseña actual es requerida'
        ],
        password: [
          v => !!v || 'La nueva contraseña es requerida'
        ],
        password_confirmation: [
          v => !!v || 'La confirmación de la nueva contraseña es requerida',
          v => v === this.form.password || 'Las contraseñasno coinciden'
        ]
      }
    }
  },

  created () {
    this.fetchUser()
      .then(response => {
        this.fillForm(response.data.data)
      })
  },

  methods: {
    ...mapActions({
      updatePasswordAsClient: 'users/updatePasswordAsClient',
      fetchUser: 'auth/fetchUser'
    }),

    fillForm (user) {
      this.form.email = user.email
    },

    launchUpdatePassword () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true

      this.updatePasswordAsClient({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.fetchUser()
        }).catch(() => {
          this.processingForm = false
        })
    }
  }
}
</script>
