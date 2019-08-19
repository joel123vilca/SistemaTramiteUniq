<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Estudiantes')" />
    <template v-else>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm12
          md12
        >
          <v-card>
            <v-layout
              align-center
              justify-center
              row
              fill-height
            >
              <v-card-title primary-title>
                <span class="success--text font-weight-bold headline align-center justify-center">EDITAR FICHA DE BIENESTAR UNIVERSITARIO  </span>
              </v-card-title>
            </v-layout>
            {{this.form.name}}
          <!-- </v-card> -->
          <v-divider />
          <br>
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitStuden"
              >

                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      xs12
                      md6
                    >
                      <v-text-field
                        v-model="form.new_address"
                        label="DIRECCIÓN DE SU VIVIENDA"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.related"
                        :items="relateds"
                        dense
                        clearable
                        small-chips
                        label="USTED PERTENECE A?"
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
                      <v-autocomplete
                        v-model="form.state_id"
                        :items="statesCivil"
                        label="SELECCIONAR ESTADO CIVIL"
                        item-text="title"
                        item-value="id"
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
                        v-model="form.cycle"
                        label="CICLO"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.year"
                        label="AÑO"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-radio-group v-model="form.use_transport"  label="Utilizas Transporte para para trasladarte " row>
                        <v-radio label="Si" value="1"></v-radio>
                        <v-radio label="No" value="0"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-if="form.use_transport === '1' "
                        v-model="form.type_transport"
                        label="TIPO DE TRANSPORTE"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.home_transfer_hours"
                        label="¿TIEMPO ESTIMADO DE TRASLADO DE LA UNIVERSIDAD A SU DOMICILIO EN HORAS?"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.minutes_home_transfer"
                        label="¿TIEMPO ESTIMADO DE TRASLADO DE LA UNIVERSIDAD A SU DOMICILIO EN MINUTOS?"
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
                      <v-radio-group v-model="form.works" row label="¿ACTUALMENTE TRABAJA?">
                        <v-radio label="Si" value="1"></v-radio>
                        <v-radio label="No" value="0"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-if="form.works === '1'"
                        v-model="form.work_hours"
                        label="¿CUANTAS HORAS TRABAJA A LA SEMANA?"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN DE VIVIENDA</h2>
                  <p>indique para la vivienda donde reside:</p>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.housing_tenure_id"
                        :items="housingTenures"
                        label="SELECCIONAR TENENCIA DE VIVIENDA"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.housing_material_id"
                        :items="housingMaterials"
                        label="SELECCIONAR MATERIAL DE LA VIVIENDA"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.type_housing_id"
                        :items="typeHousings"
                        label="SELECCIONAR TIPO DE VIVIENDA"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.number_rooms"
                        :items="rooms"
                        label="NUMERO DE HABITACIONES"
                      />
                    </v-flex>
                  </v-layout>
                  <h5>Servicios con los que cuenta su vivienda:</h5>
                  <v-layout>
                    <v-checkbox v-model="form.electric_light" label="LUZ ELECTRICA" input-value="true" value class="mx-2"></v-checkbox>
                    <v-checkbox v-model="form.water_service" label="RED PÚBLICA AGUA DENTRO DE VIVIENDA" input-value="true" value class="mx-2"></v-checkbox>
                    <v-checkbox v-model="form.drain_service" label="RED PÚBLICA DESAGUE DENTRO DE VIVIENDA" input-value="true" value class="mx-2"></v-checkbox>
                    <v-checkbox v-model="form.internet_connection" label="CONEXION A INTERNET" input-value="true" value class="mx-2"></v-checkbox>
                  </v-layout>
                  <h2>CONTACTO DE EMERGENCIA</h2>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.emergency_contact_name"
                        label="NOMBRES"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.emergency_contact_telephon"
                        label="NÚMERO TELEFONO"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN GENERAL DE SALUD</h2>
                  <p>¿usted tiene una dificultad o limitación permanente?</p>
                  <p>{{ form.limitations }}</p>
                  <v-layout>
                    <v-checkbox v-model="form.limitations" v-for="(limitation) in limitations" :key="limitation.id"  :label="limitation.title" :value="limitation.id" input-value="true"  class="mx-2"></v-checkbox>
                  </v-layout>
                  <p>¿Usted padece de una enfermedad crónica?</p>
                  <v-radio-group v-model="form.chronic_disease" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm12
                      xs12
                    >
                      <v-text-field
                        v-if="form.chronic_disease === '1'"
                        v-model="form.name_chronic_disease"
                        label="ESPECIFIQUE LA ENFERMEDAD CRONICA"
                      />
                    </v-flex>
                  </v-layout>
                  <p v-if="form.chronic_disease === '1'" >¿Recibe un tratamiento para dicha enfermedad?</p>
                  <v-radio-group v-if="form.chronic_disease === '1'" v-model="form.disease_treatment" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <p>¿Usted ha tenido una intervención quirúrgica anteriormente?</p>
                  <v-radio-group v-model="form.surgical_intervention_status" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-if="form.surgical_intervention_status === '1'"
                        v-model="form.surgical_intervention"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="form.surgical_intervention_status === '1'"
                        v-model="form.date_surgical_intervention"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Se realiza anualmente chequeos médicos?</p>
                  <v-radio-group v-model="form.annual_medical_checkup" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="form.annual_medical_checkup === '1'"
                        v-model="form.date_last_medical_checkup"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Usted cuenta con un seguro de salud?</p>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.type_insurance_id"
                        :items="typeInsurances"
                        label="ELEGIR EL SEGURO QUE CUENTA"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.blood_type_id"
                        :items="bloodTypes"
                        label="TIPO DE SANGRE"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN ALIMENTACIÓN</h2>
                  <p>¿Donde Usted Suele consumir sus siguientes comidas?</p>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.breakfast_place"
                        :items="places"
                        label="DESAYUNO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.lunch_place"
                        :items="places"
                        label="ALMUERZO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.dinner_place"
                        :items="places"
                        label="CENA"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.meal_place"
                        :items="places"
                        label="MERIENDAS"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Usted consume con qué frecuencia las siguientes comidas?</p>
                  <v-layout
                    row
                    wrap
                  >
                     <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.breakfastf_recuency"
                        :items="frecuency"
                        label="DESAYUNO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.lunch_frecuency"
                        :items="frecuency"
                        label="ALMUERZO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.dinner_frecuency"
                        :items="frecuency"
                        label="CENA"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN SOBRE LA SALUD MENTAL</h2>
                  <p>EN LOS ULTIMOS 6 MESES, ¿HA TENIDO LAS SIGUIENTES MOLESTIAS?</p>
                  <v-layout row
                    wrap>
                    <v-checkbox v-model="form.problems" v-for="(problem) in problems" :key="problem.id"  :label="problem.title" :value="problem.id" class="mx-2"></v-checkbox>
                  </v-layout>
                    <p>EN LOS ULTIMOS MESES, ¿ USTED HA SUFRIDO ALGUN EVENTO QUE LE SEA DIFICIL DE MANEJAR?</p>
                  <v-layout row
                    wrap>
                    <v-checkbox v-model="form.events" v-for="(event) in events" :key="event.id"  :label="event.title" :value="event.id" class="mx-2"></v-checkbox>
                  </v-layout>
                  <h2>INFORMACIÓN LA FAMILIA</h2>
                  <p>¿Sus Padres Viven?</p>
                  <v-radio-group v-model="form.living_parents" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <p>¿Tiene hermanos?</p>
                  <v-radio-group v-model="form.brethren" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-if="form.brethren === '1'"
                        v-model="form.number_brothers"
                        label="NUMERO DE HERMANOS"
                      />
                  </v-flex>
                  <p>¿Tiene Hijos?</p>
                  <v-radio-group v-model="form.children" row>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                  <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-if="form.children === '1'"
                        v-model="form.number_children"
                        label="NUMERO DE HIJOS"
                      />
                    </v-flex>
                  <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.relation_id"
                        :items="relations"
                        label="¿CON QUIENES VIVE?"
                        item-text="title"
                        item-value="id"
                      />
                    </v-flex>
                  <p>Indique para cada miembro de su familia</p>
                  <div v-for="(familyMember,k) in form.familyMembers" :key="k">
                    <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.full_name"
                        label="NOMBRES"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.address"
                        label="DIRECCION"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.age"
                        label="EDAD"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.relationship"
                        label="PARENTESCO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.profession"
                        label="OCUPACIÓN"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.academic_grade"
                        label="GRADO ACADEMICO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.working_condition"
                        label="CONDICIÓN LABORAL"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-radio-group v-model="familyMember.disability"  label="¿presenta alguna discapacidad?" row>
                        <v-radio label="Si" value="1"></v-radio>
                        <v-radio label="No" value="0"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="familyMember.disability === '1'"
                        v-model="familyMember.disability_name"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-radio-group v-model="familyMember.chronic_health_problem"  label="¿presenta algun problemas de salud cronico?" row>
                        <v-radio label="Si" value="1"></v-radio>
                        <v-radio label="No" value="0"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="familyMember.chronic_health_problem === '1'"
                        v-model="familyMember.chronic_health_name"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-radio-group v-if="familyMember.chronic_health_problem === '1'" v-model="familyMember.treatment"  label="¿Lleva un tratamiento?" row>
                        <v-radio label="Si" value="1"></v-radio>
                        <v-radio label="No" value="0"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    </v-layout>
                    <span>
                      <v-btn class="mx-2" @click="remove(k)" v-show="k || ( !k && form.familyMembers.length > 1)" fab dark small color="error">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" @click="add(k)" v-show="k == form.familyMembers.length-1" fab dark small color="indigo">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </span>
                  </div>
                  <v-btn @click="$router.push({ name: 'estudiantes'})">
                    Cancelar
                  </v-btn>
                  <v-btn
                        type="submit"
                        color="success"
                        :loading="processingForm"
                      >
                        GUARDAR INCRIPCIÓN
                      </v-btn>
                </v-form>
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
    NotPermission: () => import('@/views/errors/NotPermisionAuth')
  },
  data () {
    return {
      selected: [],
      column: null,
      row: null,
      step: 1,
      pdf: '',
      checkbox: false,
      tile: true,
      dialog: false,
      disabled: false,
      imageUrl: '',
      schooles:[],
      panel: [false, true],
      relateds: [
        'Comunidad campesina',
        'Comunidad nativa',
        'No pertenencia a ninguna comunidad campesina o nativa'
      ],
      rooms:[
        '1', '2' ,'3', '4', '5 a mas'
      ],
      formErrors: {},
      formErrores: {},
      targetIssueDate: false,
      items: [
        { header: 'Para confirmar su inscripción siga los siguientes pasos:' },
        {
          avatar: require('@/assets/dos.png'),
          title: 'Imprima su ficha de preinscripción.'
        }
      ],
      places: [ 'Pensión', 'Hogar', 'Universidad', 'Otro' ],
      frecuency: [ 'Diaramente', '4 a más veces por semana', 'Una a dos veces por semana', 'Nunca' ],
      form: {
        id: '',
        name: '',
        dni:null,
        father_surname: '',
        mother_surname: '',
        type_exam: '',
        new_address:'dd',
        related:'Comunidad nativa',
        state_id:1,
        cycle:'',
        year:'',
        use_transport:'',
        home_transfer_hours: 1,
        minutes_home_transfer: 1,
        works: false,
        work_hours: 1,
        emergency_contact_name:'ff',
        emergency_contact_telephon:'9535',
        housing_tenure_id: 1,
        housing_material_id: 1,
        type_housing_id:1,
        number_rooms: '1',
        electric_light: true,
        water_service: false,
        drain_service: false,
        internet_connection: false,
        limitations:[],
        chronic_disease: false,
        name_chronic_disease: 'dd',
        disease_treatment: false,
        surgical_intervention_status: false,
        surgical_intervention: 'dd',
        annual_medical_checkup: false,
        date_last_medical_checkup: '',
        type_insurance_id: 1,
        blood_type_id:1,
        breakfast_place: '',
        lunch_place: '',
        dinner_place: '',
        meal_place: '',
        breakfastf_recuency: '',
        lunch_frecuency: '',
        dinner_frecuency: '',
        events: [],
        problems:[],
        living_parents: 0,
        brethren: false,
        number_brothers: '',
        children: false,
        number_children: '',
        relation_id: '',
        familyMembers: [
          {
            full_name: '',
            address:'',
            chronic_health_problem:false,
            chronic_health_name:'',
            treatment:false,
            disability:false,
            disability_name:'',
            age: 0,
            relationship: '',
            profession: '',
            academic_grade:'',
            working_condition: ''
          }
        ]
      },
      validForm: true,
      processingForm: false,
      processing: false,
      rules: {
        relation_id: [
          v => !!v || 'Seleccionar modalidad de requerido.'
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loadingStatesCivil: state => state.stateCivil.loadingStatesCivil,
      statesCivil: state => state.stateCivil.statesCivil,
      loadingTypeHousings: state => state.typeHousing.loadingTypeHousings,
      typeHousings: state => state.typeHousing.typeHousings,
      loadinsHousingMaterials: state => state.housingMaterials.loadingHousingMaterials,
      housingMaterials: state => state.housingMaterials.housingMaterials,
      loadingHousingTenures: state => state.housingTenures.loadingHousingTenures,
      housingTenures: state => state.housingTenures.housingTenures,
      loadingTypeInsurances: state => state.typeInsurances.loadingTypeInsurances,
      typeInsurances: state => state.typeInsurances.typeInsurances,
      loadingBloodTypes: state => state.bloodTypes.loadingBloodTypes,
      bloodTypes: state => state.bloodTypes.bloodTypes,
      loadingRelations: state => state.relations.loadingRelations,
      relations: state => state.relations.relations,
      loadingLimitations: state => state.limitations.loadingLimitations,
      limitations: state => state.limitations.limitations,
      loadingProblems: state => state.problems.loadingProblems,
      problems: state => state.problems.problems,
      loadingEvents: state => state.events.loadingEvents,
      events: state => state.events.events
    })
  },
  created () {
    this.getStateCivil()
    this.getTypeHousings()
    this.getHousingMaterials()
    this.getHousingTenures()
    this.getTypeInsurances()
    this.getBloodTypes()
    this.getRelations()
    this.getLimitations()
    this.getProblems()
    this.getEvents()
    this.getStudentId({ id: this.$route.params.id })
    .then(response => {
        const userInfo = response.data.data
        this.setForm(userInfo)
    })
  },
  methods: {
    ...mapActions({
      replaceCurrentProduct: 'admision/replaceCurrentProduct',
      getStateCivil: 'stateCivil/getStateCivil',
      getTypeHousings: 'typeHousing/getTypeHousings',
      getHousingMaterials: 'housingMaterials/getHousingMaterials',
      getHousingTenures: 'housingTenures/getHousingTenures',
      getTypeInsurances: 'typeInsurances/getTypeInsurances',
      getBloodTypes: 'bloodTypes/getBloodTypes',
      getRelations: 'relations/getRelations',
      getLimitations: 'limitations/getLimitations',
      getProblems: 'problems/getProblems',
      getEvents: 'events/getEvents',
      getStudentId: 'students/getStudentId',
      patchStudents: 'students/patchStudents',
    }),
     add(index) {
      this.form.familyMembers.push({
            full_name: '',
            address:'',
            chronic_health_problem:false,
            chronic_health_name:'',
            treatment:false,
            disability:false,
            disability_name:'',
            age: 0,
            relationship: '',
            profession: '',
            academic_grade:'',
            working_condition: ''
          });
    },
    remove(index) {
      this.form.familyMembers.splice(index, 1);
    },
    reset () {
      this.$refs.form.reset()
    },
    setForm (user) {
      this.form.id = user.id
      this.form.name = user.name
      this.form.dni= user.dni
      this.form.father_surname = user.father_surname
      this.form.mother_surname = user.mother_surname
      this.form.type_exam = user.type_exam
      this.form.cycle = user.profile.cycle
      this.form.year = user.profile.year
      this.new_address = user.profile.new_address
      this.form.related = user.profile.related
      this.form.state_id = user.profile.state.id
      this.form.use_transport = user.profile.use_transport
      this.form.home_transfer_hours = user.profile.home_transfer_hours
      this.form.minutes_home_transfer = user.profile.minutes_home_transfer
      this.form.works = user.profile.works
      this.form.work_hours = user.profile.work_hours
      this.form.emergency_contact_name = user.profile.emergency_contact_name
      this.form.emergency_contact_telephon = user.profile.emergency_contact_telephon
      this.form.housing_tenure_id = user.profile.housing.housingTenure.id
      this.form.housing_material_id = user.profile.housing.housingMaterial.id
      this.form.type_housing_id = user.profile.housing.typeHousing.id
      this.form.number_rooms = user.profile.housing.number_rooms
      this.form.electric_light = user.profile.housing.electric_light
      this.form.water_service = user.profile.housing.water_service
      this.form.drain_service = user.profile.housing.drain_service
      this.form.internet_connection = user.profile.housing.internet_connection
      this.form.limitations = user.profile.limitations
      this.form.chronic_disease = user.profile.chronic_disease
      this.form.name_chronic_disease = user.profile.name_chronic_disease
      this.form.disease_treatment = user.profile.disease_treatment
      this.form.surgical_intervention_status = user.profile.surgical_intervention_status
      this.form.surgical_intervention = user.profile.surgical_intervention
      this.form.annual_medical_checkup = user.profile.annual_medical_checkup
      this.form.date_last_medical_checkup = user.profile.date_last_medical_checkup
      this.form.type_insurance_id = user.profile.typeInsurance.id
      this.form.blood_type_id = user.profile.bloodType.id
      this.form.breakfast_place = user.profile.breakfast_place
      this.form.lunch_place = user.profile.lunch_place
      this.form.dinner_place = user.profile.dinner_place
      this.form.meal_place = user.profile.meal_place
      this.form.breakfastf_recuency = user.profile.breakfastf_recuency
      this.form.lunch_frecuency = user.profile.lunch_frecuency
      this.form.dinner_frecuency = user.profile.dinner_frecuency
      this.form.events = user.profile.events
      this.form.problems = user.profile.problems
      this.form.living_parents = user.profile.living_parents
      this.form.brethren = user.profile.brethren
      this.form.number_brothers = user.profile.number_brothers
      this.form.children = user.profile.children
      this.form.number_children= user.profile.number_children
      this.form.relation_id = user.profile.relation.id
      this.form.familyMembers = user.profile.familyMembers
    },
    submitStuden () {
      console.log(this.form)
      this.processingForm = true
      this.patchStudents({
        id: this.form.id,
        data: this.form
      })
      .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'estudiantes'})
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
