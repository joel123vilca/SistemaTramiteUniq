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
          <v-card class="card-form">
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
             <v-card
      max-width="344"
      class="mx-auto"
    >
     <v-form>
      <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card-text
                class="pa-0"
              >
          <v-text-field
            label="ingresar DNI"
            placeholder="DNI"
            outlined
          ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn text>Ingresar</v-btn>
      </v-card-actions>
      </v-container>
     </v-form>
    </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
export default {

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
