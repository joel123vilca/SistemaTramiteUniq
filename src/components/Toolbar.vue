<template>
  <div>
    <v-toolbar
      height="65"
      :clipped-left="primaryDrawer.clipped"
      app
      dark
      class="toolbar-tramite"
      center
      v-if="authenticated"
    >
      <v-toolbar-side-icon @click.stop="replacePrimaryDrawerModel" v-if="authenticated" />

      <v-spacer />
      <v-toolbar-title class="scoped-toolbar-title ma-0 pa-0">
        <h4>Sistema de tramite de Municipalidad de Pocollay</h4>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="scoped-toolbar-items hidden-sm-and-down">
        <template v-if="authenticated">
          <v-btn
            depressed
            class="transparent scoped-toolbar-item"
            active-class="scoped-btn-active"
            :ripple="false"
            @click="logout({ router: $router })"
          >
            <v-icon left>power_settings_new</v-icon>Cerrar sesión
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  components: {
  },

  data () {
    return {}
  },

  computed: {
    ...mapState({
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
      userIsClient: 'auth/userIsClient'
    })
  },

  methods: {
    ...mapActions({
      replacePrimaryDrawer: 'layout/replacePrimaryDrawer',
      logout: 'auth/logout'
    }),

    replacePrimaryDrawerModel () {
      let primaryDrawer = this.primaryDrawer
      primaryDrawer.model = !primaryDrawer.model

      this.replacePrimaryDrawer({ primaryDrawer })
    }
  }
}
</script>

<style scoped lang="scss">

.toolbar-tramite{

  background: #0F62AC !important;
}
.scoped-toolbar-title {
  display: flex;
  filter: opacity(70%);
  align-items: center;
  padding-right: 1.4rem;
}

.scoped-toolbar-items {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;

  .scoped-toolbar-item {
    height: 100% !important;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 100;
    text-transform: capitalize;
    font-size: 1.25rem;

    &:hover::before{
      background-color: transparent !important;
      // background: lighten(black, 1%) !important;
    }

    &.hover:hover {
      border-radius: 6px;
      background: #0F62AC !important;
      color: white;
    }
  }
}

.scoped-btn-active {
  background: #0F62AC !important;
}

</style>
