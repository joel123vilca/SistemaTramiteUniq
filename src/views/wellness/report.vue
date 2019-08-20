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
      :src="formatPath"
      type="application/pdf"
      width="950"
      height="600"
    >
    <embed
      :src="reportPath"
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
      formatPath: '',
      reportPath: ''
    }
  },
  computed: {
    ...mapState({
      currentStudent: state => state.students.currentStudent
    })
  },
  created () {
    this.getReport({ id: this.$route.params.id })
      .then(response => {
        const userInfo = response.data
        this.setForm(userInfo)
      })
  },
  methods: {
    ...mapActions({
      replaceCurrentStudent: 'students/replaceCurrentStudent',
      getReport: 'students/getReport'
    }),
    setForm (user) {
      this.formatPath = user.formatPath
      this.reportPath = user.reportPath
    }
  }
}
</script>
