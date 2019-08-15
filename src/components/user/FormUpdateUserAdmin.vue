<template>
  <v-form
    ref="form"
    v-model="validForm"
    lazy-validation
    @submit.prevent="launchUpdateUser"
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
          <v-layout
            row
            wrap
          >
            <v-flex sm12>
              <v-text-field
                v-model="form.name"
                label="Nombre"
                :rules="rules.name"
                box
              />
            </v-flex>
            <v-flex sm12>
              <v-text-field
                v-model="form.email"
                label="Correo electrónico"
                :rules="rules.email"
                box
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider />
    <v-container
      fluid
      class="text-xs-center"
    >
      <v-btn
        type="submit"
        color="success"
        :disabled="!validForm || processingForm"
        :loading="processingForm"
      >
        Guardar
      </v-btn>
      <v-btn @click="$router.push({ name: 'home' })">
        Cancelar
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      targetBirthDate: false,
      profileImageUrl: null,
      dniImageUrl: null,
      dniBackImageUrl: null,
      form: {
        name: '',
        email: ''
      },
      processingForm: false,
      validForm: true,

      rules: {
        name: [ v => !!v || 'El nombre es requerido' ],
        email: [ v => !!v || 'El correo electrónico es requerido' ]
      }
    }
  },

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    }),

    ...mapGetters({
      userIsClient: 'auth/userIsClient'
    })
  },

  created () {
    this.getCountries()

    this.fillForm(this.currentUser)
  },

  methods: {
    ...mapActions({
      getCountries: 'countries/getCountries',
      updateUserAsAdmin: 'users/updateUserAsAdmin',
      uploadProfileImage: 'users/uploadProfileImage',
      uploadDniImage: 'users/uploadDniImage',
      uploadDniBackImage: 'users/uploadDniBackImage',
      replaceShowModalIncreaseDecreaseCredits: 'credits/replaceShowModalIncreaseDecreaseCredits'
    }),

    fillForm (user) {
      this.form.name = user.name
      this.form.email = user.email
    },

    launchUpdateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateUserAsAdmin({
        userId: this.currentUser.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
        }).catch(() => {
          this.processingForm = false
        })
    }
  }
}
</script>
