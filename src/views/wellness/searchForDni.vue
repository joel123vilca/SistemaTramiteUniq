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
          <v-card class="card-form">
             <v-card
              max-width="344"
              class="mx-auto"
            >
              <v-layout
                align-center
                justify-center
                row
                fill-height
              >
                <v-card-title primary-title>
                  <span class="success--text font-weight-bold headline align-center justify-center">BIENESTAR - UNIQ</span>
                </v-card-title>
              </v-layout>
                <v-form>
                  <v-container>
                      <v-card-text
                        class="pa-0"
                      >
                        <v-text-field
                          v-model="dni"
                          label="ingresar DNI"
                          :counter="8"
                          :rules="dniRules"
                          required
                          placeholder="DNI"
                          outlined
                        ></v-text-field>
                      </v-card-text>
                    <v-card-actions>
                      <v-btn @click="getUser">Ingresar</v-btn>
                    </v-card-actions>
                    </v-container>
                </v-form>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <p>{{this.message}}</p>
    </template>
  </v-container>
</template>

<script>
export default {
  metaInfo () {
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
  },
  data () {
    return {
      dni:'',
      dniRules: [
        v => !!v || 'Dni es Requerido',
        v => /^[0-9]{8}$/.test(v) || 'Ingresar solo numeros y 8 digitos.'
      ],
      message:'hola'
    }
  },
  methods:{
    getUser(){
      console.log(this.dni)
      if(this.dni === '75109922'){
        this.$router.push({ name: 'completar-ficha' })
      }else{
        this.message = 'No se encontro su Dni'
      }
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
.card-form{
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
