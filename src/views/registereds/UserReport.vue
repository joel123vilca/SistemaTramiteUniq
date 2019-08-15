<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Registereds')" />

    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'preinscritos' } },
          { name: 'Reporte' },
          { name: 'inscritos' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Reporte de inscritos</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-form
          ref="form"
          v-model="validForm"
          lazy-validation
          @submit.prevent="generateReport"
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
              sm6
              xs12
            >
              <v-menu
                v-model="targetExpirationDate"
                :close-on-content-click="false"
                lazy
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :value="formatDate(form.from)"
                  readonly
                  box
                  hint="Formato DD/MM/AAAA"
                  persistent-hint
                  label="Fecha Inicio"
                  append-icon="event"
                  :disabled="processingForm"
                  :rules="rules.from"
                />
                <v-date-picker
                  v-model="form.from"
                  locale="es-pe"
                  @input="targetExpirationDate = false"
                />
              </v-menu>
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <v-menu
                v-model="targetIssueDate"
                :close-on-content-click="false"
                lazy
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :value="formatDate(form.to)"
                  readonly
                  box
                  hint="Formato DD/MM/AAAA"
                  persistent-hint
                  label="Fecha final"
                  append-icon="event"
                  :disabled="processingForm"
                  :rules="rules.to"

                />
                <v-date-picker
                  v-model="form.to"
                  locale="es-pe"
                  @input="targetIssueDate = false"
                />
              </v-menu>
            </v-flex>
          </v-layout>
          <v-btn
            type="submit"
            color="primary"
            :disabled="!validForm || processingForm"
            :loading="processingForm"
          >Generar Reporte</v-btn>
        </v-container>
        </v-form>
      </v-card>
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
            width="900"
            height="600"
          >
          </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Reporte de inscritos' }
  },
  data () {
    return {
      targetIssueDate: false,
      targetExpirationDate: false,
      formErrors: {},
      pdf: '',
      form: {
        from: '',
        to: '',
      },
      validForm: false,
      processingForm: false,
      rules: {
        from: [
          v => !!v || 'la fecha de inicio es requerido'
        ],
        to: [
          v => !!v || 'la fecha final es requerido'
        ],
      }

    }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },
   methods: {
      ...mapActions({
      getReportExcel: 'users/getReportExcel'
    }),
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${year}/${month}/${day}`
      },
      generateReport(){
        this.getReportExcel({
        from: this.form.from,
        to: this.form.to
      })
        .then(response => {
          this.pdf = response.data.pdfPath
        })
        .catch((error) => {
        })
      }
    }
}
</script>
