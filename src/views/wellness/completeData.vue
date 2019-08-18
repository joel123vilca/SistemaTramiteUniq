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
    <template>
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
              <v-stepper-step
                step="2"
                :complete="step > 2"
              >
                DATOS GENERALES
              </v-stepper-step>
              <v-divider />
              <v-stepper-step step="3">
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
                      <v-radio-group v-model="form.use_transport" row>
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.type_transport"
                        label="TIPO DE TRANSPORTE"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cycle"
                        label="cycle"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.year"
                        label="añor "
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
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
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
                    <v-checkbox v-model="form.limitations" v-for="(limitation) in limitations" :key="limitation.id"  :label="limitation.title" :value="limitation.id" class="mx-2"></v-checkbox>
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
                        v-model="form.name_chronic_disease"
                        label="ESPECIFIQUE LA ENFERMEDAD CRONICA"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Recibe un tratamiento para dicha enfermedad?</p>
                  <v-radio-group v-model="form.disease_treatment" row>
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
                        v-model="form.surgical_intervention"
                        label="ESPECIFIQUE "
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.year_surgical_intervention"
                        label="INDIQUE EL AÑO CUÁNDO SE REALIZO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.surgical_intervention_month"
                        label="INDIQUE EL MES CUÁNDO SE REALIZO"
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
                        v-model="form.year_last_medical_checkup"
                        label="INDIQUE EL AÑO CUÁNDO SE REALIZO"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.month_last_medical_checkup"
                        label="INDIQUE EL MES CUÁNDO SE REALIZO"
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
                        v-model="form.number_rooms"
                        :items="places"
                        label="luagares"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.foods"
                        :items="foods"
                        label="foods"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.frecuency"
                        :items="frecuency"
                        label="frecuency"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.mail_meals"
                        :items="meals"
                        label="mail_meals"
                      />
                    </v-flex>
                  </v-layout>
                  <!-- <p>¿Usted consume con qué frecuencia las siguientes comidas?</p>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="DESAYUNO"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="ALMUERZO"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="CENA"
                      />
                    </v-flex>
                  </v-layout> -->
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
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <p>¿Tiene hermanos?</p>
                  <v-radio-group v-model="form.brethren" row>
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                  </v-radio-group>
                  <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
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
                        label="nombre"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.address"
                        label="apellidos"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.chronic_health_problem"
                        label="edad"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.chronic_health_name"
                        label="parentesco"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.treatment"
                        label="ocupación"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.disability"
                        label="grado academico"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="familyMember.disability_name"
                        label="condicion laboral"
                      />
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
                  <v-btn
                        type="submit"
                        color="success"
                        :loading="processingForm"
                      >
                        GUARDAR INCRIPCIÓN
                      </v-btn>
                </v-stepper-content>
                </v-form>
                <v-stepper-content step="2">
                  <v-layout
                    v-model="panel"
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.name"
                        label="NOMBRES"
                        value="name"
                        :rules="rules.name"
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
                        label="APELLIDO PATERNO"
                        :rules="rules.father_surname"
                        :error="!!formErrors.father_surname"
                        :error-messages="formErrors.father_surname"
                        @keyup="() => {
                          formErrors.father_surname = undefined
                          delete formErrors.father_surname
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.mother_surname"
                        label="APELLIDO MATERNO"
                        :rules="rules.mother_surname"
                        :error="!!formErrors.mother_surname"
                        :error-messages="formErrors.mother_surname"
                        @keyup="() => {
                          formErrors.mother_surname = undefined
                          delete formErrors.mother_surname
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                       <v-menu
                          ref="menu"
                          v-model="targetIssueDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :value="formatDate(form.birth_date)"
                            hint="Formato DD/MM/AAAA"
                            label="FECHA DE NACIMIENTO"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                            :rules="rules.birth_date"
                            :error="!!formErrors.birth_date"
                            :error-messages="formErrors.birth_date"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="form.birth_date"
                          min="1970-01-01"
                          max="2005-01-01"
                          @input="targetIssueDate = false"
                        ></v-date-picker>
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
                      dense
                      clearable
                      small-chips
                      label="NOMBRE DE LA INSTITUCIÓN EDUCATIVA"
                      item-text="title"
                      item-value="id"
                      :disabled="form.no_school"
                    />
                     <v-checkbox
                      v-model="form.no_school"
                      :label="`Otros`"
                    ></v-checkbox>
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
                        :disabled="disabled"
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
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.telephone"
                      type="number"
                      label="TELÉFONO o CELULAR"
                      :rules="rules.telephone"
                      :error="!!formErrors.telephone"
                      :error-messages="formErrors.telephone"
                      @keyup="() => {
                        formErrors.telephone = undefined
                        delete formErrors.telephone
                      }"
                    />
                  </v-flex>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.email"
                      label="CORREO ELECTRONICO"
                      :rules="rules.email"
                      :error="!!formErrors.email"
                      :error-messages="formErrors.email"
                      @keyup="() => {
                        formErrors.email = undefined
                        delete formErrors.email
                      }"
                    />
                  </v-flex>

                  <v-btn
                    flat
                    @click="reset"
                    @click.native="step = 1"
                  >
                    CANCELAR
                  </v-btn>
                  <v-dialog
                    v-model="dialog"
                    width="600"
                  >
                    <template v-slot:activator="{ on }">

                    </template>

                    <v-card>
                      <v-toolbar
                        color="teal darken-1"
                        dark
                      >
                        <v-avatar
                          :tile="tile"
                          size="55px"
                        >
                          <v-img
                            :src="require('@/assets/uniq.png')"
                          />
                        </v-avatar>
                        <v-toolbar-title>USTED SE ENCUENTRA PREINSCRITO</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                      <v-divider />
                      <v-list three-line>
                        <template v-for="(item, index) in items">
                          <v-subheader
                            v-if="item.header"
                            :key="item.header"
                          >
                            {{ item.header }}
                          </v-subheader>

                          <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                          />

                          <v-list-tile
                            v-else
                            :key="item.title"
                            avatar
                          >
                            <v-list-tile-avatar>
                              <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                              <v-list-tile-sub-title>
                                {{ item.title }}
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </template>
                      </v-list>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          flat
                          @click="dialog = false"
                        >
                          CANCELAR
                        </v-btn>
                        <v-btn
                          color="successful"
                          @click="dialog = false"
                        >
                          ACEPTAR
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-stepper-content>
              <v-stepper-content step="3">
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    xs12
                    md12
                  >
                    <embed
                      :src="pdf"
                      type="application/pdf"
                      width="1200"
                      height="600"
                    >
                  </v-flex>
                </v-layout>
                <v-btn
                  color="primary"
                  @click="reset"
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
import TecactusApi from 'reniec-sunat-js'

export default {
  metaInfo () {
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
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
      sexo: [
        'Masculino',
        'Femenino'
      ],
      places: [ 'Pensión', 'Hogar', 'Universidad', 'Otro' ],
      foods: [ 'Desayuno', 'Almuerzo', 'Cena', 'Meriendas' ],
      frecuency: [ 'Diaramente', '4 a más veces por semana', 'Una a dos veces por semana', 'Nunca' ],
      meals: [ 'Desayuno', 'Almuerzo', 'Cena' ],
      form: {
        new_address:'dd',
        related:'Comunidad nativa',
        state_id:1,
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
        year_surgical_intervention: 1,
        surgical_intervention_month: 1,
        annual_medical_checkup: false,
        year_last_medical_checkup: 1,
        month_last_medical_checkup: 1,
        type_insurance_id: 1,
        blood_type_id:1,
        places_to_eat: 'pension',
        foods: '',
        frecuency: '',
        mail_meals: '',
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
            disability_name:false
          }
        ],
        dni: '',
        cdni: '',
        name: '',
        father_surname: '',
        mother_surname: '',
        telephone: '',
        email: '',
        no_school:false,
        birth_district_id: 80901,
        birth_province: 76,
        birth_region: 8,
        origin_district_id: 80901,
        origin_province: 76,
        origin_region: 8,
        origin_address: '',
        school_district_id: 0,
        school_province: 76,
        school_region: 8,
        school_id: '',
        career_id: '',
        birth_date: '',
        gender: '',
        type_exam_id: ''
      },
      validForm: true,
      processingForm: false,
      processing: false,

      rules: {
        type_exam_id: [
          v => !!v || 'Seleccionar modalidad de requerido.'
        ],
        career_id: [
          v => !!v || 'Seleccionar carrera es requerido.'
        ],
        dni: [
          v => !!v || 'El dni es requerido.',
          v => /^[0-9]{8}$/.test(v) || 'Ingresar solo numeros y 8 digitos.'
        ],
        cdni: [
          v => !!v || 'Confirmar dni requerido.',
          v => /^[0-9]{8}$/.test(v) || 'Ingresar solo numeros y 8 digitos.'
        ],
        name: [
          v => !!v || 'El nombre es requerido.',
          v => /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(v) || 'Ingresar solo letras.'
        ],
        father_surname: [
          v => !!v || 'El apellido paterno es requerido.',
          v => /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(v) || 'Ingresar solo letras.'
        ],
        mother_surname: [
          v => !!v || 'El apellido paterno es requerido.',
          v => /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(v) || 'Ingresar solo letras.'
        ],
        email: [
          v => !!v || 'El correo es requerido.',
          v => /.+@.+/.test(v) || 'E-mail tiene que ser ejemplo@gmail.com.'
        ],
        telephone: [
          v => !!v || 'El telefono es requerido',
          v => /^[0-9]{9}$/.test(v) || 'Ingresar solo numeros y 9 digitos.'
        ],
        birth_district_id: [
          v => !!v || 'El distrito de nacimiento es  requerido.'
        ],
        birth_date: [
          v => !!v || 'La fecha de nacimiento  requerido.'
        ],
        gender: [
          v => !!v || 'El dato sexo requerido.'
        ],
        birth_province: [
          v => !!v || 'La provincia de requerido.'
        ],
        birth_region: [
          v => !!v || 'La región de nacimiento  requerido.'
        ],
        origin_region: [
          v => !!v || 'La región de procedencia es requerido.'
        ],
        origin_province: [
          v => !!v || 'La provincia de procedencia es requerido.'
        ],
        origin_district_id: [
          v => !!v || 'El distrito de procedencia es requerido.'
        ],
        school_region: [
          v => !!v || 'La region del colegio  requerido.'
        ],
        school_province: [
          v => !!v || 'La provincia del colegio  requerido.'
        ],
        school_district: [
          v => !!v || 'El distrito del colegio  requerido.'
        ],
        origin_address: [
          v => !!v || 'Su direccion de procedencia es requerido.'
        ]
      }
    }
  },
   watch: {
      targetIssueDate (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
  },
  computed: {
    ...mapState({
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
      schools: state => state.schools.schools,
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
    }),
    filteredSchoolProvince () {
      let provinces = this.provinces
      return provinces.filter(o => o.region_id === this.form.school_region)
    },
    filterSchoolDistrict () {
      let districts = this.districts
      return districts.filter(o => o.province_id === this.form.school_province)
    },
    filteredSchool () {
      var schools = this.schools
      return schools
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
    this.getCareers()
    this.getExams()
    this.getRegions()
    this.getProvinces()
    this.getDistricts()
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
      createAdmision: 'admision/createAdmision',
      getCareers: 'careers/getCareers',
      getExams: 'typeExams/getExams',
      getRegions: 'regions/getRegions',
      getProvinces: 'provinces/getProvinces',
      getDistricts: 'districts/getDistricts',
      getSchools: 'schools/getSchools',
      getVerify: 'admision/getVerify',
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
            disability_name:false
          });
    },
    remove(index) {
      this.form.familyMembers.splice(index, 1);
    },

    school () {
      this.getSchools({ id: this.form.school_district_id })
        .then(response => {
          let schools = response.data.data
          return schools
        })
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    reset () {
      this.$refs.form.reset()
    },
    submitStuden () {
      console.log(this.form)
      this.processingForm = true
      this.updateStudents({
        id: 1,
        data: this.form
      })
      .then(response => {
          this.processingForm = false
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
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
