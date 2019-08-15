<template>
  <v-dialog
    v-model="showModalDeleteInscribed"
    width="480px"
    persistent
    lazy
    scrollable
  >
    <v-card>
      <v-toolbar
        color="error"
        card
        dark
      >
        <v-toolbar-title>Anular Inscrito</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalDeleteInscribed({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Anular al Inscrito?</p>

        <template v-if="currentRegistered">
          <ul>
            <li><strong>Nombre: </strong>{{ currentRegistered.name }}</li>
            <li><strong>DNI: </strong>{{ currentRegistered.dni }}</li>
          </ul>
        </template>
      </v-card-text>
      <v-divider />
      <div class="my-3 text-xs-center">
        <v-btn
          :disabled="processingDelete"
          :loading="processingDelete"
          color="error"
          @click="launchDelete"
        >
          Anular
        </v-btn>
        <v-btn
          :disabled="processingDelete"
          @click="replaceShowModalDeleteInscribed({ status: false })"
        >
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      processingDelete: false
    }
  },

  computed: {
    ...mapState({
      showModalDeleteInscribed: state => state.register.showModalDeleteInscribed,
      currentRegistered: state => state.register.currentRegistered
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalDeleteInscribed: 'register/replaceShowModalDeleteInscribed',
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      deleteInscribed: 'register/deleteInscribed'
    }),

    launchDelete () {
      this.processingDelete = true
      console.log(this.currentRegistered.id)
      this.deleteInscribed({ id: this.currentRegistered.id })
        .then(response => {
          this.processingDelete = false
          this.replaceShowModalDeleteInscribed({ status: false })
          this.$router.push({ name: 'inscritos' })
        })
        .catch(() => {
          this.processingDelete = false
        })
    }
  }
}
</script>
