<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Registereds')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'preinscritos' } },
          { name: 'Editar usuario' }
        ]"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          md12
          sm12
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
                @submit.prevent="submitUpdateRegister"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      xs12
                      md6
                    >
                      <v-autocomplete
                        v-model="form.type_exam_id"
                        :items="typeexams"
                        :loading="loadingTypeexams"
                        dense
                        clearable
                        small-chips
                        label="MODALIDAD DE EXAMEN"
                        item-text="title"
                        item-value="id"
                        :rules="rules.type_exam_id"
                        :error="!!formErrors.type_exam_id"
                        :error-messages="formErrors.type_exam_id"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.career_id"
                        :items="careers"
                        :loading="loadingCareers"
                        dense
                        clearable
                        small-chips
                        label="CARRERA"
                        item-text="title"
                        item-value="id"
                        :rules="rules.career_id"
                        :error="!!formErrors.career_id"
                        :error-messages="formErrors.career_id"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
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
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.father_surname"
                        :disabled="processingForm"
                        label="Apellido Paterno"
                        :error="!!formErrors.father_surname"
                        :error-messages="formErrors.father_surname"
                        @keyup="() => {
                          formErrors.father_surname = undefined
                          delete formErrors.father_surname
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
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
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.mother_surname"
                        :disabled="processingForm"
                        label="Apellido Materno"
                        :rules="rules.mother_surname"
                        :error="!!formErrors.mother_surname"
                        :error-messages="formErrors.mother_surname"
                        @keyup="() => {
                          formErrors.mother_surname = undefined
                          delete formErrors.mother_surname
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.dni"
                        :disabled="processingForm"
                        label="N° de DNI"
                        mask="########"
                        return-masked-value
                        :error="!!formErrors.dni"
                        :error-messages="formErrors.dni"
                        @keyup="() => {
                          formErrors.dni = undefined
                          delete formErrors.dni
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.telephone"
                        :disabled="processingForm"
                        label="Celular"
                        :error="!!formErrors.telephone"
                        :error-messages="formErrors.telephone"
                        @keyup="() => {
                          formErrors.telephone = undefined
                          delete formErrors.telephone
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-menu
                        v-model="form.targetIssueDate"
                        :close-on-content-click="false"
                        lazy
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          :value="formatDate(form.birth_date)"
                          hint="Formato DD/MM/AAAA"
                          persistent-hint
                          label="FECHA DE NACIMIENTO"
                          :rules="rules.birth_date"
                          :error="!!formErrors.birth_date"
                          :error-messages="formErrors.birth_date"
                          append-icon="event"
                          @keyup="() => {
                            formErrors.birth_date = undefined
                            delete formErrors.birth_date
                          }"
                        />
                        <v-date-picker
                          v-model="form.birth_date"
                          locale="es-pe"
                          min="1950-01-01"
                          max="2004-03"
                          show-current="2004-03-01"
                          @input="form.targetIssueDate = false"
                        />
                      </v-menu>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.gender"
                        :items="sexo"
                        label="SEXO"
                        :rules="rules.gender"
                        :error="!!formErrors.gender"
                        :error-messages="formErrors.gender"
                        @keyup="() => {
                          formErrors.gender = undefined
                          delete formErrors.gender
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>Colegio de Procedencia</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_region"
                        :items="regions"
                        label="SELECCIONAR REGIÓN"
                        item-text="name"
                        item-value="id"
                        :rules="rules.school_region"
                        :error="!!formErrors.school_region"
                        :error-messages="formErrors.school_region"
                        @keyup="() => {
                          formErrors.school_region = undefined
                          delete formErrors.school_region
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_province"
                        :items="filteredSchoolProvince"
                        label="SELECCIONAR PROVINCIA"
                        item-text="name"
                        item-value="id"
                        :rules="rules.school_province"
                        :error="!!formErrors.school_province"
                        :error-messages="formErrors.school_province"
                        @keyup="() => {
                          formErrors.school_province = undefined
                          delete formErrors.school_province
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_district_id"
                        :items="filterSchoolDistrict"
                        label="SELECCIONAR DISTRITO"
                        item-text="name"
                        item-value="id"
                        :rules="rules.school_district_id"
                        :error="!!formErrors.school_district_id"
                        :error-messages="formErrors.school_district_id"
                        @change="school"
                        @keyup="() => {
                          formErrors.school_district_id = undefined
                          delete formErrors.school_district_id
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-autocomplete
                      v-model="form.school_id"
                      :items="schools"
                      label="NOMBRE DEL COLEGIO"
                      item-text="title"
                      item-value="id"
                      :rules="rules.school_id"
                      :error="!!formErrors.school_id"
                      :error-messages="formErrors.school_id"
                      @change="school"
                      @keyup="() => {
                        formErrors.school_id = undefined
                        delete formErrors.school_id
                      }"
                    />
                  </v-flex>
                  <h2>Lugar de Procedencia</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_region"
                        :items="regions"
                        label="SELECCIONAR REGIÓN"
                        item-text="name"
                        item-value="id"
                        :rules="rules.origin_region"
                        :error="!!formErrors.origin_region"
                        :error-messages="formErrors.origin_region"
                        @keyup="() => {
                          formErrors.origin_region = undefined
                          delete formErrors.origin_region
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_province"
                        :items="filterOriginProvince"
                        label="SELECCIONAR PROVINCIA"
                        item-text="name"
                        item-value="id"
                        :rules="rules.origin_province"
                        :error="!!formErrors.origin_province"
                        :error-messages="formErrors.origin_province"
                        @keyup="() => {
                          formErrors.origin_province = undefined
                          delete formErrors.origin_province
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_district_id"
                        :items="filterOriginDistrict"
                        label="SELECCIONAR DISTRITO"
                        item-text="name"
                        item-value="id"
                        :rules="rules.origin_district_id"
                        :error="!!formErrors.origin_district_id"
                        :error-messages="formErrors.origin_district_id"
                        @keyup="() => {
                          formErrors.origin_district_id = undefined
                          delete formErrors.origin_district_id
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.origin_address"
                      label="DIRECCION DE ORIGEN"
                      :rules="rules.origin_address"
                      :error="!!formErrors.origin_address"
                      :error-messages="formErrors.origin_address"
                      @keyup="() => {
                        formErrors.origin_address = undefined
                        delete formErrors.origin_address
                      }"
                    />
                  </v-flex>
                  <h2>Lugar de Nacimiento</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_region"
                        :items="regions"
                        label="SELECCIONAR REGIÓN"
                        item-text="name"
                        item-value="id"
                        :rules="rules.birth_region"
                        :error="!!formErrors.birth_region"
                        :error-messages="formErrors.birth_region"
                        @keyup="() => {
                          formErrors.birth_region = undefined
                          delete formErrors.birth_region
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_province"
                        :items="filterData"
                        label="SELECCIONAR PROVINCIA"
                        item-text="name"
                        item-value="id"
                        :rules="rules.birth_province"
                        :error="!!formErrors.birth_province"
                        :error-messages="formErrors.birth_province"
                        @keyup="() => {
                          formErrors.birth_province = undefined
                          delete formErrors.birth_province
                        }"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_district_id"
                        :items="filteredData"
                        label="SELECCIONAR DISTRITO"
                        item-text="name"
                        item-value="id"
                        :rules="rules.birth_district_id"
                        :error="!!formErrors.birth_district_id"
                        :error-messages="formErrors.birth_district_id"
                        @keyup="() => {
                          formErrors.birth_district_id = undefined
                          delete formErrors.birth_district_id
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-radio-group
                    v-model="form.payment_method"
                    row
                  >
                    <template v-slot:label>
                      <div><strong>Metodo de Pago</strong></div>
                    </template>
                    <v-radio
                      value="Voucher"
                    >
                      <template v-slot:label>
                        <div>Por <strong class="success--text">Voucher</strong></div>
                      </template>
                    </v-radio>
                    <v-radio value="Boleta de venta">
                      <template v-slot:label>
                        <div>Por <strong class="primary--text">Recibo de Caja</strong></div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-if="form.payment_method === 'Voucher'"
                      v-model="form.code_voucher"
                      label="NUMERO VOUCHER"
                      :rules="rules.code_voucher"
                      :error="!!formErrors.code_voucher"
                      :error-messages="formErrors.code_voucher"
                      @keyup="() => {
                        formErrors.code_voucher = undefined
                        delete formErrors.code_voucher
                      }"
                      :counter="7"
                      maxlength="7"
                    />
                    <v-text-field
                      v-if="form.payment_method === 'Boleta de venta'"
                      v-model="form.code_bill"
                      label="RECIBO DE CAJA"
                      :rules="rules.code_bill"
                      :error="!!formErrors.code_bill"
                      :error-messages="formErrors.code_bill"
                      @keyup="() => {
                        formErrors.code_bill = undefined
                        delete formErrors.code_bill
                      }"
                      :counter="6"
                      maxlength="6"
                    />
                  </v-flex>
                  <v-text-field
                      v-model="form.price"
                      label="CANTIDAD DE PAGO O PRECIO"
                      :rules="rules.price"
                      :error="!!formErrors.price"
                      :error-messages="formErrors.price"
                      prefix="S/."
                      @keyup="() => {
                        formErrors.price = undefined
                        delete formErrors.price
                      }"
                    />
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Confirmar Inscripción
                  </v-btn>
                  <v-btn @click="$router.push({ name: 'preinscritos'})">
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
import { userInfo } from 'os';

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
      sexo: [
        'Masculino',
        'Femenino'
      ],
      formErrors: {},
      form: {
        dni: '',
        cdni: '',
        name: '',
        father_surname: '',
        mother_surname: '',
        telephone: '',
        email: '',
        birth_district_id: 0,
        birth_province: 0,
        birth_region: 0,
        origin_district_id: 0,
        origin_province: 0,
        origin_region: 0,
        origin_address: '',
        school_district_id: '',
        school_province: 0,
        school_region: 0,
        school_id: 0,
        career_id: 0,
        birth_date: '',
        gender: '',
        type_exam_id: 0,
        code_bill: '',
        code_voucher: '',
        payment_method: 'Voucher',
        confirmed: true,
        price:'0.00'
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
        code_voucher: [
          v => !!v || 'El voucher es requerido.',
          v => /^[0-9]{7}$/.test(v) || 'Ingresar solo numeros y 7 digitos.'
        ],
        code_bill:[
          v => !!v || 'El número de la boleta de venta es requerido.',
          v => /^[0-9]{6}$/.test(v) || 'Ingresar solo numeros y 6 digitos.'
        ],
         price: [
          v => !!v || 'El precio es requerido'
        ],
      }
    }
  },

  computed: {
    ...mapState({
      currentRegistered: state => state.register.currentRegistered,
      careers: state => state.careers.careers,
      loadingCareers: state => state.careers.loadingCareers,
      typeexams: state => state.typeExams.typeexams,
      loadingTypeexams: state => state.typeExams.loadingTypeexams,
      loadingRegions: state => state.regions.loadingRegions,
      regions: state => state.regions.regions,
      loadingProvinces: state => state.provinces.loadingProvinces,
      provinces: state => state.provinces.provinces,
      loadingDistricts: state => state.districts.loadingDistricts,
      districts: state => state.districts.districts,
      loadingSchools: state => state.schools.loadingSchools,
      schools: state => state.schools.schools
    }),
    filteredSchoolProvince () {
      let provinces = this.provinces
      return provinces.filter(o => o.region_id === this.form.school_region)
    },
    filterSchoolDistrict () {
      let districts = this.districts
      return districts.filter(o => o.province_id === this.form.school_province)
    },
    filterOriginProvince () {
      let provinces = this.provinces
      return provinces.filter(o => o.region_id === this.form.origin_region)
    },
    filterOriginDistrict () {
      let districts = this.districts
      return districts.filter(o => o.province_id === this.form.origin_province)
    },
    filterData () {
      let provinces = this.provinces
      return provinces.filter(o => o.region_id === this.form.birth_region)
    },
    filteredData () {
      let districts = this.districts
      return districts.filter(o => o.province_id === this.form.birth_province)
    }
  },
  created () {
    if (!this.$can('update', 'Registereds')) return false
    this.getRegistered({ Id: this.$route.params.id })
      .then(response => {
        const userInfo = response.data.data
        this.setForm(userInfo)
        if(userInfo.school!= null){
          this.getSchools({id: userInfo.school.district_id})
        }
      })
    this.getCareers()
    this.getExams()
    this.getRegions()
    this.getProvinces()
    this.getDistricts()
  },

  methods: {
    ...mapActions({
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      updateRegistered: 'register/updateRegistered',
      getRegistered: 'register/getRegistered',
      getCareers: 'careers/getCareers',
      getExams: 'typeExams/getExams',
      getRegions: 'regions/getRegions',
      getProvinces: 'provinces/getProvinces',
      getDistricts: 'districts/getDistricts',
      getSchools: 'schools/getSchools'
    }),
    setForm (user) {
      this.form.type_exam_id = user.typeExam.id
      this.form.career_id = user.career.id
      this.form.email = user.email
      this.form.name = user.name
      this.form.father_surname = user.father_surname
      this.form.mother_surname = user.mother_surname
      this.form.dni = user.dni
      this.form.gender = user.gender
      this.form.birth_date = user.birth_date
      this.form.telephone = user.telephone
      this.form.school_id = user.school == null ? 0: user.school.id;
      this.form.school_region = user.school != null ? user.school.region_id: 0;
      this.form.school_province = user.school != null ? user.school.province_id: 0;
      this.form.school_district_id = user.school != null ? user.school.district_id: 0;
      this.form.origin_address = user.origin_address
      this.form.origin_region = user.originDistrict.region_id
      this.form.origin_province = user.originDistrict.province_id
      this.form.origin_district_id = user.originDistrict.id
      this.form.birth_region = user.birthDistrict.region_id
      this.form.birth_province = user.birthDistrict.province_id
      this.form.birth_district_id = user.birthDistrict.id
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    school () {
      this.getSchools({ id: this.form.school_district_id })
        .then(response => {
          let schools = response.data.data
          return schools
        })
    },
    submitUpdateRegister () {
      if (!this.$refs.form.validate()) return false
      console.log(this.$route.params.id)
      this.processingForm = true
      this.updateRegistered({
        Id: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'camara' , params: { id: this.$route.params.id }})
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
