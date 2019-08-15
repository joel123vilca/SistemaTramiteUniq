<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'preinscritos' } },
          { name: 'Colegios'},
          { name: 'Nuevo colegio' }
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
              <span class="success--text font-weight-bold headline">Registrar colegio</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateSchool"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <v-text-field
                    v-model="form.title"
                    :disabled="processingForm"
                    label="nombre de la institucion educativa"
                    :rules="rules.title"
                    :error="!!formErrors.title"
                    :error-messages="formErrors.title"
                    @keyup="() => {
                      formErrors.title = undefined
                      delete formErrors.title
                    }"
                  />
                  <v-text-field
                    v-model="form.code"
                    :disabled="processingForm"
                    label="Codigo"
                    :error="!!formErrors.code"
                    :error-messages="formErrors.code"
                    @keyup="() => {
                      formErrors.code = undefined
                      delete formErrors.code
                    }"
                  />
                  <v-text-field
                    v-model="form.address"
                    :disabled="processingForm"
                    label="Direccion"
                    :rules="rules.address"
                    :error="!!formErrors.address"
                    :error-messages="formErrors.address"
                    @keyup="() => {
                      formErrors.address = undefined
                      delete formErrors.address
                    }"
                  />
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.region_id"
                        :items="regions"
                        label="SELECCIONAR REGIÓN"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.province_id"
                        :items="filteredSchoolProvince"
                        label="SELECCIONAR PROVINCIA"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.district_id"
                        :items="filterSchoolDistrict"
                        label="SELECCIONAR DISTRITO"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                      xs12
                      md12
                    >
                      <v-autocomplete
                        v-model="form.school_level_id"
                        :items="levels"
                        label="nivel"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      md12
                    >
                      <v-autocomplete
                        v-model="form.type_management_id"
                        :items="managements"
                        label="gestion"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
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
                  <v-btn @click="$router.push({ name: 'preinscritos' })">
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
    return { title: 'Nuevo Colegio' }
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
        title: '',
        code: '',
        address: '',
        school_level_id: 0,
        type_management_id: 0,
        region_id: 0,
        province_id: 0,
        district_id: 0
      },

      validForm: true,
      processingForm: false,

      rules: {
        title: [
          v => !!v || 'El nombre es requerido'
        ],
        address: [
          v => !!v || 'la direccion es requerido'
        ],
        code: [
          v => !!v || 'El codigo es requerida'
        ]
      }
    }
  },

  computed: {
    ...mapState({
      loadingRegions: state => state.regions.loadingRegions,
      regions: state => state.regions.regions,
      loadingProvinces: state => state.provinces.loadingProvinces,
      provinces: state => state.provinces.provinces,
      loadingDistricts: state => state.districts.loadingDistricts,
      districts: state => state.districts.districts,
      loadingLevels: state => state.schools.loadingLevels,
      levels: state => state.schools.levels,
      loadingManagements: state => state.schools.loadingManagements,
      managements: state => state.schools.managements
    }),
    filteredSchoolProvince () {
      let provinces = this.provinces
      return provinces.filter(o => o.region_id === this.form.region_id)
    },
    filterSchoolDistrict () {
      let districts = this.districts
      return districts.filter(o => o.province_id === this.form.province_id)
    },
  },

  created () {
    this.getRegions()
    this.getProvinces()
    this.getDistricts()
    this.getLevels()
    this.getManagements()
  },

  methods: {
    ...mapActions({
      getRegions: 'regions/getRegions',
      getProvinces: 'provinces/getProvinces',
      getDistricts: 'districts/getDistricts',
      getLevels: 'schools/getLevels',
      getManagements: 'schools/getManagements',
      createSchool: 'schools/createSchool',
    }),

    submitCreateSchool () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createSchool({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'preinscritos' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
