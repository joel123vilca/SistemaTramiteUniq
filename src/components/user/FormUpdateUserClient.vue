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
            <v-flex sm6>
              <v-text-field
                v-model="form.name"
                label="Nombre"
                :rules="rules.name"
                box
              />
            </v-flex>
            <v-flex sm3>
              <v-text-field
                v-model="form.email"
                label="Correo electrónico"
                :rules="rules.email"
                box
              />
            </v-flex>
            <v-flex sm3>
              <v-text-field
                v-model="form.telephone"
                label="Teléfono/Celular"
                :rules="rules.telephone"
                box
              />
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap
          >
            <v-flex sm4>
              <v-autocomplete
                v-model="form.country_id"
                :loading="loadingCountries"
                :items="countries"
                item-text="long_name"
                item-value="id"
                label="País"
                :rules="rules.country_id"
                box
                dense
                small-chips
              />
            </v-flex>
            <v-flex sm4>
              <v-menu
                v-model="form.targetBirthDate"
                :close-on-content-click="false"
                lazy
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :value="formatDate(form.birth_date)"
                  :rules="rules.birth_date"
                  readonly
                  box
                  hint="Formato DD/MM/AAAA"
                  persistent-hint
                  label="Fecha de nacimiento"
                  append-icon="event"
                />
                <v-date-picker
                  v-model="form.birth_date"
                  locale="es-pe"
                  @input="form.targetBirthDate = false"
                />
              </v-menu>
            </v-flex>
            <v-flex
              v-if="user.user_type === 'admin'"
              sm4
            >
              <v-layout
                column
                wrap
              >
                <v-flex sm6>
                  <v-switch
                    v-model="stateUser"
                    class="mt-0 pa-0"
                    hide-details
                    :label="`Cuenta ${stateUser ? 'Activa' : 'Desactivada'} `"
                    @change="onchangeStateUser"
                  />
                  <v-switch
                    v-model="stateWallet"
                    class="mt-2 pa-0"
                    hide-details
                    :label="`Monedero ${stateWallet ? 'Activo' : 'Desactivado'}`"
                    @change="onChangeStateWallet"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap
          >
            <v-flex sm4>
              <label class="grey--text text--darken-1">Imagen de perfil</label>
              <el-upload
                class="avatar-uploader"
                action=""
                name="image"
                :http-request="launchUploadProfileImage"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="profileImageUrl"
                  :src="profileImageUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </v-flex>
            <v-flex sm4>
              <label class="grey--text text--darken-1">Imagen de su DNI - frontal</label>
              <el-upload
                class="avatar-uploader"
                action=""
                name="dni_image"
                :http-request="launchUploadDniImage"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="dniImageUrl"
                  :src="dniImageUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </v-flex>
            <v-flex sm4>
              <label class="grey--text text--darken-1">Imagen de su DNI - reverso</label>
              <el-upload
                class="avatar-uploader"
                action=""
                name="dni_image_back"
                :http-request="launchUploadDniBackImage"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="dniBackImageUrl"
                  :src="dniBackImageUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
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
      <v-btn @click="$router.push({ name: 'sgcUsersList' })">
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
        email: '',
        telephone: '',
        birth_date: '',
        country_id: null,
        image: '',
        image_path: '',
        dni_image: '',
        dni_image_path: '',
        dni_image_back: '',
        dni_image_back_path: ''
      },
      processingForm: false,
      validForm: true,

      stateUser: false,
      stateWallet: false,

      rules: {
        name: [ v => !!v || 'El nombre es requerido' ],
        email: [ v => !!v || 'El correo electrónico es requerido' ],
        country_id: [ v => !!v || 'El país es requerido' ],
        telephone: [ v => !!v || 'El teléfono | celular es requerido' ],
        birth_date: [ v => !!v || 'La fecha de nacimiento es requerida' ],
        state: [ v => !!v || 'El estado es requerido' ]
      }
    }
  },

  computed: {
    ...mapState({
      countries: state => state.countries.countries,
      loadingCountries: state => state.countries.loadingCountries,
      currentUser: state => state.users.currentUser,
      user: state => state.auth.user
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
      updateUserAsClient: 'users/updateUserAsClient',
      uploadProfileImage: 'users/uploadProfileImage',
      uploadDniImage: 'users/uploadDniImage',
      uploadDniBackImage: 'users/uploadDniBackImage',
      updateStateUser: 'users/updateStateUser',
      getUser: 'users/getUser',
      updateStateWallet: 'wallet/updateStateWallet',
      replaceShowModalIncreaseDecreaseCredits: 'credits/replaceShowModalIncreaseDecreaseCredits'
    }),

    fillForm (user) {
      this.form.name = user.name
      this.form.email = user.email

      if (user.wallet) {
        this.form.telephone = user.wallet.telephone
        this.form.birth_date = user.wallet.birth_date
        this.form.country_id = user.wallet.country ? user.wallet.country.id : null
        this.form.image = user.wallet.image
        this.form.image_path = user.wallet.image_path
        this.form.dni_image = user.wallet.dni_image
        this.form.dni_image_path = user.wallet.dni_image_path
        this.form.dni_image_back = user.wallet.dni_image_back
        this.form.dni_image_back_path = user.wallet.dni_image_back_path
      }

      this.stateUser = user.is_active === 'Si'
      this.stateWallet = user.wallet.state !== 'disabled'

      this.profileImageUrl = user.wallet.image_path
      this.dniImageUrl = user.wallet.dni_image_path
      this.dniBackImageUrl = user.wallet.dni_image_back_path
    },

    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    launchUploadProfileImage (option) {
      let formData = new FormData()
      formData.append(option.filename, option.file, option.file.name)

      this.uploadProfileImage({ formData })
        .then(response => {
          this.form.image = response.data.image_url
          this.form.image_path = response.data.image_path

          this.profileImageUrl = response.data.image_path
        })
    },

    launchUploadDniImage (option) {
      let formData = new FormData()
      formData.append(option.filename, option.file, option.file.name)

      this.uploadDniImage({ formData })
        .then(response => {
          this.form.dni_image = response.data.image_url
          this.form.dni_image_path = response.data.image_path

          this.dniImageUrl = response.data.image_path
        })
    },

    launchUploadDniBackImage (option) {
      let formData = new FormData()
      formData.append(option.filename, option.file, option.file.name)

      this.uploadDniBackImage({ formData })
        .then(response => {
          this.form.dni_image_back = response.data.image_url
          this.form.dni_image_back_path = response.data.image_path

          this.dniBackImageUrl = response.data.image_path
        })
    },

    beforeImageUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$notify.info({
          title: 'UNIQ',
          message: 'La imagen tiene que estar en formato JPG ó PNG'
        })

        return isJPG && isLt5M
      }
      if (!isLt5M) {
        this.$notify.info({
          title: 'UNIQ',
          message: 'La imagen no puede exceder los 5MB de tamaño'
        })

        return isJPG && isLt5M
      }

      return isJPG && isLt5M
    },

    launchUpdateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateUserAsClient({
        userId: this.currentUser.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'sgcUsersList' })
        }).catch(() => {
          this.processingForm = false
        })
    },

    onchangeStateUser () {
      const userId = this.currentUser.id
      this.updateStateUser({ userId })
    },

    onChangeStateWallet () {
      const userId = this.currentUser.id
      const data = {
        state: this.stateWallet ? 'active' : 'disabled'
      }
      this.updateStateWallet({ userId, data })
    }
  }
}
</script>
