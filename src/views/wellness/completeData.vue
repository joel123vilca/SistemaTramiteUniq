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
                @submit.prevent="submitCreateAdmision"
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
                      <v-autocomplete
                        v-model="form.type_exam_id"
                        :items="typeexams"
                        :loading="loadingTypeexams"
                        dense
                        clearable
                        small-chips
                        label="SELECCIONAR MODALIDAD DE EXAMEN"
                        item-text="title"
                        item-value="id"
                        :rules="rules.type_exam_id"
                        :error="!!formErrores.type_exam_id"
                        :error-messages="formErrores.type_exam_id"
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
                        label="SELECCIONAR CARRERA"
                        item-text="title"
                        item-value="id"
                        :rules="rules.career_id"
                        :error="!!formErrores.career_id"
                        :error-messages="formErrores.career_id"
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
                        label="DNI"
                        :rules="rules.dni"
                        :error="!!formErrores.dni"
                        :error-messages="formErrores.dni"
                        :counter="8"
                        maxlength="8"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="CONFIRMAR DNI"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                        :counter="8"
                        maxlength="8"
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
                        label="ESTADO CIVIL"
                        :rules="rules.dni"
                        :error="!!formErrores.dni"
                        :error-messages="formErrores.dni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="¿USTED PERTENECE A?"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
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
                      <v-radio-group v-model="row" row>
                        <v-radio label="Si" value="radio-1"></v-radio>
                        <v-radio label="No" value="radio-2"></v-radio>
                        <v-text-field
                        v-model="form.cdni"
                        label="INDICAR TIPO DE TRANSPORTE:"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="¿TIEMPO ESTIMADO DE TRASLADO DE LA UNIVERSIDAD A SU DOMICILIO?"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
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
                        label="¿USTED ACTUALMENTE TRABAJA?"
                        :rules="rules.dni"
                        :error="!!formErrores.dni"
                        :error-messages="formErrores.dni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="¿CUANTAS HORAS TRABAJA A LA SEMANA?"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
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
                      <v-text-field
                        v-model="form.dni"
                        label="TENENCIA"
                        :rules="rules.dni"
                        :error="!!formErrores.dni"
                        :error-messages="formErrores.dni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="MATERIAL"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.dni"
                        label="TIPO"
                        :rules="rules.dni"
                        :error="!!formErrores.dni"
                        :error-messages="formErrores.dni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="NUMERO DE HABITACIONES"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <h5>Servicios con los que cuenta su vivienda:</h5>
                  <p>{{ selected }}</p>
                  <v-layout>
                    <v-checkbox v-model="selected" label="LUZ ELECTRICA" value="luz" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="RED PÚBLICA AGUA DENTRO DE VIVIENDA" value="agua" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="RED PÚBLICA DESAGUE DENTRO DE VIVIENDA" value="desague" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="CONEXION A INTERNET" value="internet" class="mx-2"></v-checkbox>
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
                        v-model="form.cdni"
                        label="NOMBRE"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="NÚMERO TELEFONO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN GENERAL DE SALUD</h2>
                  <p>¿usted tiene una dificultad o limitación permanente?</p>
                  <v-layout>
                    <v-checkbox v-model="selected" label="PARA VER, AÚN USANDO LENTES" value="luz" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="PARA OIR, AÚN USANDO AUDIFONOS PARA SORDERA" value="agua" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="PARA HABLAR" value="desague" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="PARA USAR BRAZOS Y MANOS/ PIERNAS Y PIES" value="internet" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="ALGUNA OTRA DIFICULTAD O LIMITACIÓN" value="internet" class="mx-2"></v-checkbox>
                    <v-checkbox v-model="selected" label="NO TIENE DISCAPACIDAD" value="internet" class="mx-2"></v-checkbox>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm12
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="ESPECIFIQUE LA ALGUNA OTRA DIFICULTAD O LIMITACIÓN"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Usted padece de una enfermedad crónica?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
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
                        v-model="form.cdni"
                        label="ESPECIFIQUE LA ENFERMEDAD CRONICA"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Recibe un tratamiento para dicha enfermedad?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
                  </v-radio-group>
                  <p>¿Usted ha tenido una intervención quirúrgica anteriormente?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
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
                        v-model="form.cdni"
                        label="ESPECIFIQUE "
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Se realiza anualmente chequeos médicos?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
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
                        v-model="form.cdni"
                        label="INDIQUE LA FECHA CUÁNDO SE REALIZO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
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
                      <v-text-field
                        v-model="form.cdni"
                        label="ELEGIR EL SEGURO QUE CUENTA"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="TIPO DE SANGRE"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
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
                      <v-text-field
                        v-model="form.cdni"
                        label="DESAYUNO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="ALMUERZO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="CENA"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="MERIENDAS"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <p>¿Usted consume con qué frecuencia las siguientes comidas?</p>
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
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="ALMUERZO"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="CENA"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN SOBRE LA FAMILIA</h2>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="EN LOS ULTIMOS 6 MESES, ¿HA TENIDO LAS SIGUIENTES MOLESTIAS?"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.cdni"
                        label="EN LOS ULTIMOS MESES, ¿ USTED HA SUFRIDO ALGUN EVENTO QUE LE SEA DIFICIL DE MANEJAR?"
                        :rules="rules.cdni"
                        :error="!!formErrores.cdni"
                        :error-messages="formErrores.cdni"
                      />
                    </v-flex>
                  </v-layout>
                  <h2>INFORMACIÓN SOBRE SALUD MENTAL</h2>
                  <p>¿Sus Padres Viven?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
                  </v-radio-group>
                  <p>¿Tiene hermanos?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
                  </v-radio-group>
                  <p>¿Tiene Hijos?</p>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Si" value="radio-1"></v-radio>
                    <v-radio label="No" value="radio-2"></v-radio>
                  </v-radio-group>
                  <p>Indique para cada miembro de su familia</p>
                  <div v-for="(input,k) in inputs" :key="k">
                    <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.name"
                        label="nombre"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.lastname"
                        label="apellidos"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.age"
                        label="edad"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.relationship"
                        label="parentesco"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.ocupation"
                        label="ocupación"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.academic"
                        label="grado academico"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="input.work"
                        label="condicion laboral"
                      />
                    </v-flex>
                    </v-layout>
                    <span>
                      <v-btn class="mx-2" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)" fab dark small color="error">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" @click="add(k)" v-show="k == inputs.length-1" fab dark small color="indigo">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </span>
                  </div>
                  <v-btn
                    color="primary"
                    large
                    @click="next"
                  >
                    Continuar
                  </v-btn>
                </v-stepper-content>
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
                      <v-btn
                        type="submit"
                        color="success"
                        :loading="processingForm"
                      >
                        GUARDAR INCRIPCIÓN
                      </v-btn>
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
              </v-form>
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
      inputs: [
        {
          name: '',
          lastname:'',
          age:'',
          relationship:'',
          ocupation:'',
          academic:'',
          work:''
        }
      ],
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
      formErrors: {},
      formErrores: {},
      targetIssueDate: false,
      items: [
        { header: 'Para confirmar su inscripción siga los siguientes pasos:' },
        {
          avatar: require('@/assets/dos.png'),
          title: 'Imprima su ficha de preinscripción.'
        },
        { divider: true, inset: true },
        {
          avatar: require('@/assets/uno.png'),
          title: 'Pague el costo de su postulación  hoy  caja de la UNIQ  y apartir de mañana en  el Banco de la Nación indicando su Nª de DNI.'
        },
        { divider: true, inset: true },
        {
          avatar: require('@/assets/tres.png'),
          title: 'Acerquese a los puntos de inscripción portando su ficha de Preinscripción, su voucher del banco de la Nación y los requisitos.'
        }
      ],
      sexo: [
        'Masculino',
        'Femenino'
      ],
      form: {
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
      getVerify: 'admision/getVerify'
    }),
     add(index) {
      this.inputs.push({ name: '',lastname:'',relationship:'',ocupation:'',age:'',academic:'',work:'' });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    next () {
      this.getVerify({
        dni: this.form.dni,
        examId: this.form.type_exam_id
      })
        .then(response => {
          console.log(response)
        })
        .catch((error) => {
          this.form.dni = this.rules.dni.validForm
          this.step = 1
        })
      var tecactusApi = new TecactusApi('m4XkYiz25N0ZM5m1P028Eu8K69ycO2QhmshdYESU')
      tecactusApi.Reniec.getDni(this.form.dni)
        .then(response => {
          this.form.name = response.data.nombres
          this.form.father_surname = response.data.apellido_paterno
          this.form.mother_surname = response.data.apellido_materno
        })
        .catch((error) => {
          console.log(error)
        })
      if (this.form.dni != null && this.form.dni === this.form.cdni) {
        if( this.form.type_exam_id === 0 && this.form.career_id === 0){
          this.form.type_exam_id = this.rules.type_exam_id.validForm
          this.form.career_id = this.rules.career_id.validFor
        } else {
          this.step = 2
        }
      } else {
        this.form.dni = this.rules.dni.validForm
        this.form.cdni = this.rules.cdni.validForm
      }
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
    submitCreateAdmision () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createAdmision({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ condition: 'sgcProductsList' })
          this.dialog = true
          this.step = 3
          this.pdf = response.data.pdf_path
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
