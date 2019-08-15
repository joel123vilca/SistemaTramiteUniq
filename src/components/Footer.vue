
<template>
  <v-footer
    dark
    height="auto"
    class="black"
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
          sm4
          offset-sm1
        >
          <h3 class="title">
            Acerca de uniq
          </h3>
          <div class="underline" />
          <p>Términos y condiciones</p>
          <p>Normativas</p>
        </v-flex>

        <v-flex
          sm3
        >
          <h3 class="title">
            Atención al Cliente
          </h3>
          <div class="underline" />
          <p>Cómo Comenzar</p>
          <p>Contacto</p>
          <p>Preguntas frecuentes</p>
        </v-flex>
        <v-flex
          sm3
          class="text-xs-center"
        >
          <v-layout
            align-center
            justify-space-around
            column
            fill-height
          >
            <div>
              <img :src="require('@/assets/uniq.png')">
            </div>
            <div>
              <p class="caption">
                Síguenos
              </p>
              <img
                src="@/assets/facebook-icon.png"
                style="margin-right: 10px"
              >
              <img src="@/assets/instagram-icon.png">
              <p class="py-2 text-xs-center caption">
                © 2019 UNIQ | Todos los derechos reservados.
              </p>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
}
</script>

<style scoped>
  .underline {
    width: 20px;
    height: 3px;
    background: white;
    margin: 20px 0;
  }
</style>
