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
          { name: 'Reportes' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-divider/>
          <h3>Listado de Reportes</h3>
           <v-divider/>
        </v-toolbar>
         <v-flex xs12 sm8 center>
          <div class="my-2">
            <v-btn  block color="success" @click="DownloadExcel">Listado de Preinscritos</v-btn>
          </div>
          <div class="my-2">
            <v-btn  block color="success" @click="DownloadOrdinary">Listado de Inscritos Modalidad Ordinaria</v-btn>
          </div>
          <div class="my-2">
            <v-btn  block color="success" @click="DownloadExtraordinary">Listado de Inscritos Modalidad Extraordinaria</v-btn>
          </div>
          <div class="my-2">
            <v-btn  block color="success" @click="DownloadReporteTotal">Reportes Total</v-btn>
          </div>
        </v-flex>
      </v-card>
    </template>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Reportes' }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },
  data () {
    return {
      excel_path: '',
      report_path: ''
    }
  },
  computed: {
    ...mapState({
      currentRegistred: state => state.register.replaceCurrentRegistered
    })
  },
  methods: {
    ...mapActions({
      getReportExcel: 'register/getReportExcel',
      getReportOrdinary: 'register/getReportOrdinary',
      getReportExtraordinary: 'register/getReportExtraordinary',
      getReportTotal: 'register/getReportTotal'
    }),
    DownloadExcel(){
      this.getReportExcel()
      .then(response => {
        const Excel = response.data
        this.Download(Excel)
      })
    },
    DownloadOrdinary(){
      this.getReportOrdinary()
      .then(response => {
        const Excel = response.data
        this.Download(Excel)
      })
    },
    DownloadExtraordinary(){
      this.getReportExtraordinary()
      .then(response => {
        const Excel = response.data
        this.Download(Excel)
      })
    },
    DownloadReporteTotal(){
      this.getReportTotal()
      .then(response => {
        const pdf = response.data
        this.DownloadPdf(pdf)
      })
    },
    Download(Excel){
      const url = Excel.excel_path
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'inscritos.xls')
      document.body.appendChild(link)
      link.click()
    },
    DownloadPdf(pdf){
      const url = pdf.report_path
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteTotal.pdf')
      document.body.appendChild(link)
      link.click()
    },
  }
}
</script>
