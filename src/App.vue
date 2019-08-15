<template>
  <div id="app">
    <Loading ref="loading" />

    <transition
      name="page"
      mode="out-in"
    >
      <component
        :is="layout"
        v-if="layout"
      />
    </transition>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

// Load layout components dynamically.
const requireContext = require.context('@/layouts', false, /.*\.vue$/)

const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  el: '#app',

  metaInfo () {
    const appName = 'Universidad Nacional Intercultural de Quillabamba'

    return {
      title: appName,
      titleTemplate: `%s - ${appName}`
    }
  },

  components: {
    Loading
  },

  data () {
    return {
      layout: null,
      defaultLayout: 'default'
    }
  },

  mounted () {
    this.$loading = this.$refs.loading
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }

      this.layout = layouts[layout]
    }

  }
}
</script>
