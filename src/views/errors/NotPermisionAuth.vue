<template>
  <v-container
    fluid
    class="text-xs-center"
  >
    <h2 class="font-weight-thin display-1 mb-4">
      Usted no tiene permisos suficientes para estar en esta sección
    </h2>
    <v-btn
      :to="{ name: 'login' }"
      color="primary"
    >
      <v-icon
        left
        dark
      >
        home
      </v-icon>
      login
    </v-btn>
  </v-container>
</template>
