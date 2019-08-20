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
    <NotPermission v-if="this.formatPath === null"/>
    <template v-else>
      <div class="my-2">
        <v-btn  block color="success" @click="DownloadPdf">DESCARGAR REPORTE FICHA BIENESTAR</v-btn>
      </div>
      <div class="my-2">
        <v-btn  block color="success" @click="DownloadPdfReport">DESCARGAR REPORTE FICHA MEDICA</v-btn>
      </div>
    <v-layout
      row
      wrap
    >
    <v-flex
      xs12
      md12
    >
      <embed
        :src="formatPath"
        type="application/pdf"
        width="1200"
        height="600"
      >
      <embed
        :src="reportPath"
        type="application/pdf"
        width="1200"
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
  metaInfo () {
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
  },
  components: {
    NotPermission: () => import('@/views/errors/NotPermission')
  },
  data () {
    return {
      formatPath:'',
      reportPath:''
    }
  },
  created () {
    this.setForm(this.$route.params.response)
  },
  methods: {
    setForm (user) {
      this.formatPath = user.formatPath
      this.reportPath = user.reportPath
    },
    DownloadPdf(){
      const url = this.formatPath
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteTotal.pdf')
      document.body.appendChild(link)
      link.click()
    },
    DownloadPdfReport(){
      const url = this.reportPath
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteTotal.pdf')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

