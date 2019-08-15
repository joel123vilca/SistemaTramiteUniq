<template>
  <v-dialog
    v-model="showModalAbility"
    width="480px"
    persistent
    lazy
    scrollable
  >
  <v-card>
   <v-form
   ref="form"
   v-model="validForm"
   @submit.prevent="submitAbility"
   >
      <v-container>
        <v-flex
          xs12
          md12
        >
        <v-toolbar
        color="green darken-3"
        dark
        >
        <v-toolbar-title>HABILITAR EDICIÓN</v-toolbar-title>
      </v-toolbar>
      </v-flex>
      <v-layout column>
        <v-flex
          xs12
          md12
        >
          <v-textarea
          v-model="form.reason"
          :disabled="processingForm"
          outline
          name="input-7-4"
          label="MOTIVO PARA HABILITAR EDICIÓN"
          value=""
        ></v-textarea>
        </v-flex>
        <v-flex
          xs12
          md12
        >
        </v-flex>
      </v-layout>
      <v-btn
          @click="replaceShowModalAbility({ status: false })"
      >
        Cancelar
      </v-btn>
      <v-btn
        type="submit"
        color="success"
        :disabled="!validForm || processingForm"
        :loading="processingForm"
      >
      Habilitar
      </v-btn>
    </v-container>
  </v-form>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        reason: '',
        can_edit: true
      },
      validForm: true,
      processingForm: false
    }
  },
  computed: {
    ...mapState({
      showModalAbility: state => state.register.showModalAbility,
      currentRegistered: state => state.register.currentRegistered
    })
  },
  watch: {
    showModalAbility (newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentRegistered({ register: null })
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      replaceShowModalAbility: 'register/replaceShowModalAbility',
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      ability: 'register/ability'
    }),
    submitAbility () {
      this.processingForm = true
      this.ability({
        Id: this.currentRegistered.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalAbility({ status: false })
          this.$router.push({ name: 'inscritos' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }
}
</script>
