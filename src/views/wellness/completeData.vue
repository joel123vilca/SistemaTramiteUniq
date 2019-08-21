<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-toolbar
      height="65"
      app
      center
      class="baner"
    >
      <v-spacer />
      <v-avatar
        :tile="tile"
        size="60px"
      >
        <v-img
          :src="require('@/assets/uniq.png')"
        />
      </v-avatar>

      <h2 class="center">
        UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA
      </h2>

      <v-spacer />
    </v-toolbar>
    <NotPermission v-if="this.form.dni === null"/>
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
                <span class="success--text font-weight-bold headline align-center justify-center">FICHA DE BIENESTAR UNIVERSITARIO  </span>
              </v-card-title>
            </v-layout>
            <div class="subtitle-2">Nombres: {{this.form.name}} {{this.form.father_surname}} {{this.form.mother_surname}}  Modalidad: {{this.form.type_exam}} ESCUELA PROFESIONAL: {{this.form.career}}</div>
          </v-card>
          <v-divider />
          <br>
          <v-stepper
            v-model="step"
          >
            <v-stepper-header>
              <v-stepper-step
                step="1"
                :complete="step > 1"
              >
                DATOS PRINCIPALES
              </v-stepper-step>
              <v-divider />
              <v-divider />
              <v-stepper-step step="2">
                REPORTE DE FICHA EN  PDF
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitStuden"
              >
                <v-stepper-content step="1">
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
                        :rules="rules.new_address"
                        :error="!!formErrors.new_address"
                        :error-messages="formErrors.new_address"
                        @keyup="() => {
                          formErrors.new_address = undefined
                          delete formErrors.new_address
                        }"
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
                        :rules="rules.related"
                        :error="!!formErrors.related"
                        :error-messages="formErrors.related"
                        @keyup="() => {
                          formErrors.related = undefined
                          delete formErrors.related
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
                      <v-autocomplete
                        v-model="form.state_id"
                        :items="statesCivil"
                        label="SELECCIONAR ESTADO CIVIL"
                        item-text="title"
                        item-value="id"
                        :rules="rules.state_id"
                        :error="!!formErrors.state_id"
                        :error-messages="formErrors.state_id"
                        @keyup="() => {
                          formErrors.state_id = undefined
                          delete formErrors.state_id
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
                        v-model="form.cycle"
                        label="CICLO"
                        :rules="rules.cycle"
                        :error="!!formErrors.cycle"
                        :error-messages="formErrors.cycle"
                        @keyup="() => {
                          formErrors.cycle = undefined
                          delete formErrors.cycle
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.year"
                        label="AÑO"
                        :rules="rules.year"
                        :error="!!formErrors.year"
                        :error-messages="formErrors.year"
                        @keyup="() => {
                          formErrors.year = undefined
                          delete formErrors.year
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-radio-group v-model="form.use_transport"  label="Utilizas Transporte para para trasladarte " row>
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-if="form.use_transport === true"
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
                        :rules="rules.home_transfer_hours"
                        :error="!!formErrors.home_transfer_hours"
                        :error-messages="formErrors.home_transfer_hours"
                        @keyup="() => {
                          formErrors.home_transfer_hours = undefined
                          delete formErrors.home_transfer_hours
                        }"
                        maxlength="2"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.minutes_home_transfer"
                        label="¿TIEMPO ESTIMADO DE TRASLADO DE LA UNIVERSIDAD A SU DOMICILIO EN MINUTOS?"
                        :rules="rules.minutes_home_transfer"
                        :error="!!formErrors.minutes_home_transfer"
                        :error-messages="formErrors.minutes_home_transfer"
                        @keyup="() => {
                          formErrors.minutes_home_transfer = undefined
                          delete formErrors.minutes_home_transfer
                        }"
                        maxlength="2"
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
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-if="form.works === true"
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
                        :rules="rules.housing_tenure_id"
                        :error="!!formErrors.housing_tenure_id"
                        :error-messages="formErrors.housing_tenure_id"
                        @keyup="() => {
                          formErrors.housing_tenure_id = undefined
                          delete formErrors.housing_tenure_id
                        }"
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
                        :rules="rules.housing_material_id"
                        :error="!!formErrors.housing_material_id"
                        :error-messages="formErrors.housing_material_id"
                        @keyup="() => {
                          formErrors.housing_material_id= undefined
                          delete formErrors.housing_material_id
                        }"
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
                        :rules="rules.type_housing_id"
                        :error="!!formErrors.type_housing_id"
                        :error-messages="formErrors.type_housing_id"
                        @keyup="() => {
                          formErrors.type_housing_id= undefined
                          delete formErrors.type_housing_id
                        }"
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
                         :rules="rules.number_rooms"
                        :error="!!formErrors.number_rooms"
                        :error-messages="formErrors.number_rooms"
                        @keyup="() => {
                          formErrors.number_rooms= undefined
                          delete formErrors.number_rooms
                        }"
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
                        :rules="rules.emergency_contact_name"
                        :error="!!formErrors.emergency_contact_name"
                        :error-messages="formErrors.emergency_contact_name"
                        @keyup="() => {
                          formErrors.emergency_contact_name= undefined
                          delete formErrors.emergency_contact_name
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.emergency_contact_telephone"
                        label="NÚMERO TELEFONO"
                        :rules="rules.emergency_contact_telephone"
                        :error="!!formErrors.emergency_contact_telephone"
                        :error-messages="formErrors.emergency_contact_telephone"
                        @keyup="() => {
                          formErrors.emergency_contact_telephone= undefined
                          delete formErrors.emergency_contact_telephone
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN GENERAL DE SALUD</h2>
                  <p>¿usted tiene una dificultad o limitación permanente?</p>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm4
                      xs12
                    >
                    <v-checkbox v-model="form.limitations" v-for="(limitation) in limitations" :key="limitation.id"  :label="limitation.title" :value="limitation.id" class="mx-2"></v-checkbox>
                    </v-flex>
                  </v-layout>
                  <p>¿Usted padece de una enfermedad crónica?</p>
                  <v-radio-group v-model="form.chronic_disease" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
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
                        v-if="form.chronic_disease === true"
                        v-model="form.name_chronic_disease"
                        label="ESPECIFIQUE LA ENFERMEDAD CRONICA"
                      />
                    </v-flex>
                  </v-layout>
                  <p v-if="form.chronic_disease === true" >¿Recibe un tratamiento para dicha enfermedad?</p>
                  <v-radio-group v-if="form.chronic_disease === true" v-model="form.disease_treatment" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <p>¿Usted ha tenido una intervención quirúrgica anteriormente?</p>
                  <v-radio-group v-model="form.surgical_intervention_status" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
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
                        v-if="form.surgical_intervention_status === true"
                        v-model="form.surgical_intervention"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="form.surgical_intervention_status === true"
                        v-model="form.date_surgical_intervention"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Se realiza anualmente chequeos médicos?</p>
                  <v-radio-group v-model="form.annual_medical_checkup" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
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
                        v-if="form.annual_medical_checkup === true"
                        v-model="form.date_last_medical_checkup"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO (2019-07-03)"
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
                        :rules="rules.type_insurance_id"
                        :error="!!formErrors.type_insurance_id"
                        :error-messages="formErrors.type_insurance_id"
                        @keyup="() => {
                          formErrors.type_insurance_id= undefined
                          delete formErrors.type_insurance_id
                        }"
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
                        :rules="rules.blood_type_id"
                        :error="!!formErrors.blood_type_id"
                        :error-messages="formErrors.blood_type_id"
                        @keyup="() => {
                          formErrors.blood_type_id= undefined
                          delete formErrors.blood_type_id
                        }"
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
                        :rules="rules.breakfast_place"
                        :error="!!formErrors.breakfast_place"
                        :error-messages="formErrors.breakfast_place"
                        @keyup="() => {
                          formErrors.breakfast_place= undefined
                          delete formErrors.breakfast_place
                        }"
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
                        :rules="rules.lunch_place"
                        :error="!!formErrors.lunch_place"
                        :error-messages="formErrors.lunch_place"
                        @keyup="() => {
                          formErrors.lunch_place= undefined
                          delete formErrors.lunch_place
                        }"
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
                        :rules="rules.dinner_place"
                        :error="!!formErrors.dinner_place"
                        :error-messages="formErrors.dinner_place"
                        @keyup="() => {
                          formErrors.dinner_place= undefined
                          delete formErrors.dinner_place
                        }"
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
                        :rules="rules.meal_place"
                        :error="!!formErrors.meal_place"
                        :error-messages="formErrors.meal_place"
                        @keyup="() => {
                          formErrors.meal_place= undefined
                          delete formErrors.meal_place
                        }"
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
                        v-model="form.breakfast_frecuency"
                        :items="frecuency"
                        label="DESAYUNO"
                        :rules="rules.breakfast_frecuency"
                        :error="!!formErrors.breakfast_frecuency"
                        :error-messages="formErrors.breakfast_frecuency"
                        @keyup="() => {
                          formErrors.breakfast_frecuency= undefined
                          delete formErrors.breakfast_frecuency
                        }"
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
                        :rules="rules.lunch_frecuency"
                        :error="!!formErrors.lunch_frecuency"
                        :error-messages="formErrors.lunch_frecuency"
                        @keyup="() => {
                          formErrors.lunch_frecuency= undefined
                          delete formErrors.lunch_frecuency
                        }"
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
                        :rules="rules.dinner_frecuency"
                        :error="!!formErrors.dinner_frecuency"
                        :error-messages="formErrors.dinner_frecuency"
                        @keyup="() => {
                          formErrors.dinner_frecuency= undefined
                          delete formErrors.dinner_frecuency
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN SOBRE LA SALUD MENTAL</h2>
                  <p>EN LOS ULTIMOS 6 MESES, ¿HA TENIDO LAS SIGUIENTES MOLESTIAS?</p>
                  <v-layout row
                    wrap>
                    <v-flex
                      sm4
                      xs12
                    >
                    <v-checkbox v-model="form.problems" v-for="(problem) in problems" :key="problem.id"  :label="problem.title" :value="problem.id" class="mx-2"></v-checkbox>
                    </v-flex>
                  </v-layout>
                    <p>EN LOS ULTIMOS MESES, ¿ USTED HA SUFRIDO ALGUN EVENTO QUE LE SEA DIFICIL DE MANEJAR?</p>
                  <v-layout row
                    wrap>
                    <v-flex
                      sm4
                      xs12
                    >
                    <v-checkbox v-model="form.events" v-for="(event) in events" :key="event.id"  :label="event.title" :value="event.id" class="mx-2"></v-checkbox>
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN LA FAMILIA</h2>
                  <p>¿Sus Padres Viven?</p>
                  <v-radio-group v-model="form.living_parents" @change="add(k)" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <p>¿Tiene hermanos?</p>
                  <v-radio-group v-model="form.brethren"  row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-if="form.brethren === true"
                        v-model="form.number_brothers"
                        label="NUMERO DE HERMANOS"
                      />
                  </v-flex>
                  <p>¿Tiene Hijos?</p>
                  <v-radio-group v-model="form.children" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-if="form.children === true"
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
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="familyMember.disability === true"
                        v-model="familyMember.disability_name"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-radio-group v-model="familyMember.chronic_health_problem"  label="¿presenta algun problemas de salud cronico?" row>
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-if="familyMember.chronic_health_problem === true"
                        v-model="familyMember.chronic_health_name"
                        label="ESPECIFIQUE"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-radio-group v-if="familyMember.chronic_health_problem === true" v-model="familyMember.treatment"  label="¿Lleva un tratamiento?" row>
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    </v-layout>
                    <span>
                      <v-btn  @click="remove(k)" v-show="k || ( !k && form.familyMembers.length > 1)"  dark color="error">
                        <v-icon dark>remove</v-icon>
                        Eliminar
                      </v-btn>
                      <v-btn  @click="add(k)" v-show="k == form.familyMembers.length-1"  dark  color="indigo">
                        <v-icon dark>add</v-icon>
                        Agregar mas familiares
                      </v-btn>
                    </span>
                  </div>
                  <v-btn
                        type="submit"
                        color="success"
                        :loading="processingForm"
                      >
                        GUARDAR FICHA
                      </v-btn>
                </v-stepper-content>
                </v-form>
              <v-stepper-content step="2">
                <div class="my-2">
                  <v-btn  block color="success" @click="DownloadPdf">DESCARGAR REPORTE FICHA BIENESTAR</v-btn>
                </div>
                <div class="my-2">
                  <v-btn  block color="success" @click="DownloadPdfReport">DESCARGAR REPORTE FICHA MEDICA</v-btn>
                </div>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    xs12
                    md12
                  >
                    <embed
                      :src="formatPath"
                      type="application/pdf"
                      width="1200"
                      height="600"
                    >
                    <embed
                      :src="reportPath"
                      type="application/pdf"
                      width="1200"
                      height="600"
                    >
                  </v-flex>
                </v-layout>
                <v-btn
                  color="primary"
                  @click.native="step = 1"
                >
                  Salir
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
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
      selected: [],
      column: null,
      row: null,
      step: 1,
      formatPath: '',
      reportPath: '',
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
        career: '',
        cycle:'',
        year: '',
        new_address:'',
        related:'Comunidad nativa',
        state_id:1,
        use_transport:'',
        home_transfer_hours: 1,
        minutes_home_transfer: 1,
        works: false,
        work_hours: 1,
        emergency_contact_name:'',
        emergency_contact_telephone:'',
        housing_tenure_id: 1,
        housing_material_id: 1,
        type_housing_id:1,
        number_rooms: '1',
        electric_light: false,
        water_service: false,
        drain_service: false,
        internet_connection: false,
        limitations:[],
        chronic_disease: false,
        name_chronic_disease: '',
        disease_treatment: false,
        surgical_intervention_status: false,
        surgical_intervention: '',
        annual_medical_checkup: false,
        date_last_medical_checkup: '',
        type_insurance_id: 1,
        blood_type_id:1,
        breakfast_place: '',
        lunch_place: '',
        dinner_place: '',
        meal_place: '',
        breakfast_frecuency: '',
        lunch_frecuency: '',
        dinner_frecuency: '',
        events: [],
        problems:[],
        living_parents: false,
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
        related: [
          v => !!v || 'Seleccionar pertenecia de requerido.'
        ],
        new_address: [
          v => !!v || ' Su dirección es requerido.'
        ],
        cycle: [
          v => !!v || 'Ciclo es requerido.'
        ],
        year: [
          v => !!v || 'Año es requerido.'
        ],
        state_id: [
          v => !!v || 'Su estado civil es requerido.'
        ],
        home_transfer_hours:[
          v => !!v || 'las horas es requerido.'
        ],
        minutes_home_transfer:[
          v => !!v || 'los minutos es requerido.'
        ],
        housing_tenure_id: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        housing_material_id: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        type_housing_id: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        number_rooms: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        emergency_contact_name: [
          v => !!v || 'Nombres  es requerido.'
        ],
        emergency_contact_telephone: [
          v => !!v || 'Numero  es requerido.',
          v => /^[0-9]{9}$/.test(v) || 'Ingresar solo numeros y 9 digitos.'
        ],
        type_insurance_id: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        blood_type_id: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        breakfast_place: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        lunch_place: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        dinner_place: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        meal_place: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        breakfast_frecuency: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        lunch_frecuency: [
          v => !!v || 'Seleccione  es requerido.'
        ],
        dinner_frecuency: [
          v => !!v || 'Seleccione  es requerido.'
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
    this.setForm(this.$route.params.response)
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
      updateStudents: 'students/updateStudents',
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
      this.form.dni = user.dni
      this.form.father_surname = user.father_surname
      this.form.mother_surname = user.mother_surname
      this.form.type_exam = user.type_exam
      this.form.career = user.career.title
    },
    submitStuden () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateStudents({
        id: this.form.id,
        data: this.form
      })
      .then(response => {
          this.processingForm = false
          this.step = 2
          this.formatPath = response.data.formatPath
          this.reportPath = response.data.reportPath
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    },
    DownloadPdf(){
      const url = this.formatPath
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteTotal.pdf')
      document.body.appendChild(link)
      link.click()
    },
    DownloadPdfReport(){
      const url = this.reportPath
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteTotal.pdf')
      document.body.appendChild(link)
      link.click()
    }
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
.baner{
  background-color:teal;
  color:aliceblue;
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
