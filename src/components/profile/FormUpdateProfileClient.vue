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
            <v-flex
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Nombre:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                outline
                color="primary"
                single-line
              />
            </v-flex>
            <v-flex
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Correo electrónico:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-text-field
                v-model="form.email"
                color="primary"
                :rules="rules.email"
                outline
                single-line
              />
            </v-flex>
            <v-flex
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Celular:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-text-field
                v-model="form.telephone"
                :rules="rules.telephone"
                color="primary"
                outline
                single-line
              />
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap
          >
            <v-flex
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Pais:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-autocomplete
                v-model="form.country_id"
                :loading="loadingCountries"
                :items="countries"
                item-text="long_name"
                item-value="id"
                :rules="rules.country_id"
                outline
                color="primary"
                single-line
                dense
                small-chips
              />
            </v-flex>
            <v-flex
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Fecha de Nacimiento:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
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
                  outline
                  single-line
                  color="primary"
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
              sm4
              xs12
            >
              <h2 class="font-weight-600 black--text texto">
                Que tipo de documento subirás?:
              </h2>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-radio-group
                v-model="form.document_type_id"
                row
              >
                <v-radio
                  label="Pasaporte"
                  value="1"
                  color="success"
                />
                <v-radio
                  label="Documento de identificación"
                  value="2"
                  color="success"
                />
                <v-radio
                  label="Licencia de Conducir"
                  value="3"
                  color="success"
                />
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout
            px-5
            row
            wrap
          >
            <v-flex sm4>
              <label class="grey--text text--darken-1">Imagen de perfil</label>
              <el-upload
                class="avatar-uploader"
                action=""
                :disabled="userIsActive && walletIsActive"
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
                :disabled="userIsActive && walletIsActive"
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
                :disabled="userIsActive && walletIsActive"
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
    <p class="black--text text-xs-center parrafo">
      Queremos recordarte que cuentas con un plazo
      maximo de 10 días para actualizar tus datos personales y adjuntar
      un documento de identificaciòn (Pasaporte, Documento de identificaciòn o Licencia de Conducir).
      Durante este plazo el usuario puede hacer uso de los servicios de UNIQ con normalidad,
      pero no realizar retiros de dinero.
    </p>
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
        Guardar
      </v-btn>
      <v-btn
        large
        class="text-capitalize font-weight-bold subheading"
        @click="$router.push({ name: 'home' })"
      >
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
        document_type_id: null,
        image: '',
        image_path: '',
        dni_image: '',
        dni_image_path: '',
        dni_image_back: '',
        dni_image_back_path: ''
      },
      processingForm: false,
      validForm: true,

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
      currentUser: state => state.auth.user,
      countries: state => state.countries.countries,
      loadingCountries: state => state.countries.loadingCountries
    }),

    ...mapGetters({
      userIsClient: 'auth/userIsClient',
      userIsActive: 'auth/userIsActive',
      walletIsActive: 'auth/walletIsActive'
    })
  },

  created () {
    this.getCountries()

    this.fetchUser()
      .then(response => {
        this.fillForm(response.data.data)
      })
  },

  methods: {
    ...mapActions({
      getCountries: 'countries/getCountries',
      fetchUser: 'auth/fetchUser',
      updateUserAsClient: 'users/updateUserAsClient',
      uploadProfileImage: 'users/uploadProfileImage',
      updateProfile: 'users/updateProfile',
      uploadDniImage: 'users/uploadDniImage',
      uploadDniBackImage: 'users/uploadDniBackImage',
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
        this.form.document_type_id = user.wallet.document_type ? `${user.wallet.document_type.id}` : '2'
      }

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
          title: 'uniq',
          message: 'La imagen tiene que estar en formato JPG ó PNG'
        })

        return isJPG && isLt5M
      }
      if (!isLt5M) {
        this.$notify.info({
          title: 'uniq',
          message: 'La imagen no puede exceder los 5MB de tamaño'
        })

        return isJPG && isLt5M
      }

      return isJPG && isLt5M
    },

    launchUpdateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateProfile({
        data: this.form
      })
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

<style scoped>
.texto{
  margin-left: 20%;
}
.boton{
  width:250px;
}
@media screen and (max-width: 480px) {
  .texto{
    margin-left: 1%;
  }
}

</style>
