<template>
  <v-container fluid grid-list-lg>
    <v-toolbar height="65" app center class="baner" dark color="teal">
      <v-spacer />
      <v-avatar :tile="tile" size="60px">
        <v-img :src="require('@/assets/uniq.png')" />
      </v-avatar>

      <h2 class="center">UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA</h2>
      <v-spacer />
    </v-toolbar>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card>
            <v-layout align-center justify-center row fill-height>
              <v-card-title primary-title>
                <span
                  class="success--text font-weight-bold headline align-center justify-center"
                >SISTEMA DE TRAMITE DOCUMENTARIO UNIQ</span>
              </v-card-title>
            </v-layout>
            <p
              class="card-content-text"
            >Estimados usuarios, para mayor facilidad, se ha puesto a su disposición este formulario, que le permitirá el envío de documentos a la UNIQ.</p>
            <p
              class="card-content-text"
            >Esta modalidad de recepción estará activa en tanto dura la emergencia nacional declarada por D.S. N° 044-2020-PCM</p>
            <p
              class="card-content-text"
            >El horario de recepción de documentos es de 8:00 a 13 horas y de 15:00 - 18:00 horas, de lunes a viernes. El envio despues de las 18:00 horas sera registrado el dia habil siguiente.</p>
            <p>
              <v-container fluid grid-list-lg>
                <v-form ref="form" v-model="validForm" lazy-validation @submit.prevent="submitDoc">
                  <v-layout row wrap>
                    <h2>Datos del solicitante</h2>
                    <v-flex sm12 xs12>
                      <v-autocomplete
                        v-model="form.tipo"
                        :items="tipos"
                        dense
                        clearable
                        small-chips
                        label="Tipo de persona"
                        outline
                        :rules="rules.tipo"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout v-if="form.tipo === 'PERSONA JURIDICA'" row wrap>
                    <v-flex sm12 xs12></v-flex>
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
                    <v-flex sm12 xs12>
                      <h2>Datos del documento</h2>
                    </v-flex>
                    <v-flex sm12 xs12>
                      <v-textarea outline v-model="form.asunto" label="Asunto" />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-card outlined width="250">
                        <br />
                        <center>
                          <h4>Subir Archivo</h4>
                        </center>
                        <v-fab-transition>
                          <v-btn
                            v-show="docUrl"
                            color="pink"
                            small
                            dark
                            absolute
                            left
                            fab
                            @click="deleteDoc()"
                          >X</v-btn>
                        </v-fab-transition>
                        <center>
                          <el-upload
                            class="avatar-uploader"
                            action
                            name="archivo"
                            :http-request="onFilePickedDoc"
                            :show-file-list="false"
                          >
                            <img v-if="docUrl" :src="docUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                          </el-upload>
                        </center>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout v-if="form.tipo === 'CIUDADANO'" row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.nombres"
                        label="NOMBRES"
                        :error="!!formErrors.nombres"
                        :error-messages="formErrors.nombres"
                        @keyup="() => {
                          formErrors.nombres= undefined
                          delete formErrors.nombres
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                        v-model="form.apellido_paterno"
                        label="Apellido Paterno"
                        :error="!!formErrors.apellido_paterno"
                        :error-messages="formErrors.apellido_paterno"
                        @keyup="() => {
                          formErrors.apellido_paterno= undefined
                          delete formErrors.apellido_paterno
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
                        v-model="form.apellido_materno"
                        label="Apellido Materno"
                        :error="!!formErrors.apellido_materno"
                        :error-messages="formErrors.apellido_materno"
                        @keyup="() => {
                          formErrors.apellido_materno= undefined
                          delete formErrors.apellido_materno
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
                        v-model="form.dni"
                        label="DNI"
                        :error="!!formErrors.dni"
                        :error-messages="formErrors.dni"
                        @keyup="() => {
                          formErrors.dni= undefined
                          delete formErrors.dni
                        }"
                        outline
                      />
                    </v-flex>
                    <v-flex sm12 xs12>
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
                    <v-flex sm12 xs12>
                      <h2>Datos del documento</h2>
                    </v-flex>
                    <v-flex sm12 xs12>
                      <v-textarea outline v-model="form.asunto" label="Asunto" />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-card outlined width="250">
                        <br />
                        <center>
                          <h4>Subir Archivo</h4>
                        </center>
                        <v-fab-transition>
                          <v-btn
                            v-show="docUrl"
                            color="pink"
                            small
                            dark
                            absolute
                            left
                            fab
                            @click="deleteDoc()"
                          >X</v-btn>
                        </v-fab-transition>
                        <center>
                          <el-upload
                            class="avatar-uploader"
                            action
                            name="archivo"
                            :http-request="onFilePickedDoc"
                            :show-file-list="false"
                          >
                            <img v-if="docUrl" :src="docUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                          </el-upload>
                        </center>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-flex sm6 sx12>
                    <v-btn type="submit" block color="success">Enviar</v-btn>
                  </v-flex>
                </v-form>
              </v-container>
            </p>
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
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermission')
  },
  data () {
    return {
      tipos: [
        'PERSONA JURIDICA',
        'CIUDADANO',
      ],
      formErrors: {},
      formErrores: {},
      docName: '',
      docUrl: '',
      docFile: '',
      form: {
        tipo:'',
        nombres:'',
        email:'',
        apellido_paterno: '',
        apellido_materno:'',
        telefono:'',
        direccion:'',
        dni:'',
        asunto:'',
        razon_social:'',
        ruc:'',
        dependencia:'',
        firmante:'',
        cargo_firmante:'',
        file:'',
        archivo_url:'',
        archivo_path:''
      },
      validForm: true,
      processingForm: false,
      processing: false,
      rules: {
        tipo: [
          v => !!v || 'El Tipo es requerido'
        ],
        direccion: [
          v => !!v || 'La direccion  es requerido'
        ],
        dni: [
          v => !!v || 'El dni  es requerido'
        ],
        email: [
          v => !!v || 'El correo electrónico es requerido',
          // eslint-disable-next-line no-useless-escape
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'El correo electrónico debe ser válido'
        ],
        nombres: [
          v => !!v || 'El nombre es requerido'
        ],
        apellido_materno: [
          v => !!v || 'El apellido es requerido'
        ]
      }
    }
  },
  computed: {
    ...mapState({
         })
  },
  created () {
  },
  methods: {
    ...mapActions({
      replaceCurrentProduct: 'admision/replaceCurrentProduct',
      createRepresentante:'documentos/createRepresentante',
      createCiudadano: 'documentos/createCiudadano',
      uploadArchivo: 'documentos/uploadArchivo'
    }),
    deleteDoc() {
      this.docUrl = null;
    },
    onFilePickedDoc(e) {
      console.log(e.filename);
      this.form.file = e.file;
      if(e.file !== undefined) {
        this.docName = e.file.name;
        const fr = new FileReader()
        fr.readAsDataURL(e.file)
        fr.addEventListener('load', () => {
          this.docUrl = 'https://img2.freepng.es/20181211/jll/kisspng-computer-file-computer-software-document-file-form-5c0f62f6a186c6.8357000615445122466616.jpg';
            this.docFile = e.file;
        })
        let formData = new FormData();
        formData.append(e.filename, e.file, e.file.name)
      this.uploadArchivo({ formData })
        .then(response => {
          this.form.archivo_url = response.data.file_url
          this.form.archivo_path = response.data.file_path
        })

      } else {
        this.docName = '';
        this.docFile = '';
        this.focUrl = '';
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    submitDoc () {
      if (!this.$refs.form.validate()) return false
      this.processingForm = true
      if(this.form.tipo != 'CIUDADANO'){        
      this.createRepresentante({ data: this.form })
        .then(response => {
          this.processingForm = false
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
      } else {        
      this.createCiudadano({ data: this.form })
        .then(response => {
          this.processingForm = false
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
      }
    },
  }
}
</script>
<style scoped>
.scoped-toolbar-title {
  display: flex;
  filter: opacity(70%);
  align-items: center;
  padding-right: 1.4rem;
}
.center{
    display: flex;
    align-items: center;
  padding-right: 1.4rem;
  font-size: 25px;
  margin-inline-start: 20px;
}
.v-progress-circular {
  margin: 1rem;
}
.progress{
   display: flex;
   justify-content: center;
   margin-top: 70px;
}
.card-content-text{
  margin-left: 50px;
  text-align: start;
  font-size: 1.2rem;
}
@media only screen and (max-width: 600px) {
  .center{
  display: flex;
  align-items: center;
  padding-right: 0.5em;
  font-size: 14px;
  margin-inline-start: 20px;
}
}
</style>
