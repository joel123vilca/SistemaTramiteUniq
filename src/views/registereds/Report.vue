<template>
    <v-layout
      row
      wrap
    >
    <v-flex
    xs12
    md12
    >
    <embed
      :src="report_path"
      type="application/pdf"
      width="950"
      height="600"
    >
    <embed
      :src="format_path"
      type="application/pdf"
      width="950"
      height="600"
    >
    </v-flex>
    </v-layout>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  metaInfo () {
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
  },
  data () {
    return {
      report_path: '',
      format_path: ''
    }
  },
  computed: {
    ...mapState({
      currentRegistered: state => state.register.currentRegistered
    })
  },
  created () {
    this.getReport({ Id: this.$route.params.id })
      .then(response => {
        const userInfo = response.data
        this.setForm(userInfo)
      })
  },
  methods: {
    ...mapActions({
      replaceCurrentRegistered: 'register/replaceCurrentRegistered',
      getReport: 'register/getReport'
    }),
    setForm (user) {
      this.report_path = user.report_path
      this.format_path = user.format_path
    }
  }
}
</script>
