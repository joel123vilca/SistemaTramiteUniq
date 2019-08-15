<template>
  <div>
    <v-toolbar
      v-if="authenticated"
      height="65"
      :clipped-left="primaryDrawer.clipped"
      app
      class="teal darken-1"
      center
    >
      <v-toolbar-side-icon
        v-if="authenticated && primaryDrawer.type !== 'permanent'"
        @click.stop="replacePrimaryDrawerModel"
      />

      <v-spacer />
      <img
        style="max-height:50px;width:50px;"
        :src="require('@/assets/uniq.png')"
      >
      <v-toolbar-title class="scoped-toolbar-title ma-0 pa-0">
        <h4>Universidad Nacional Intercultural de Quillabamba</h4>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="scoped-toolbar-items hidden-sm-and-down">
        <template v-if="authenticated">
          <v-btn
            depressed
            class=" transparent scoped-toolbar-item"
            active-class="scoped-btn-active"
            :ripple="false"
            @click="logout({ router: $router })"
          >
            <v-icon left>
              power_settings_new
            </v-icon>Cerrar sesión
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
// .v-toolbar {
//   font-weight: 300;
//   background-color: rgba(0, 0, 0, 0.86);
//   box-shadow: 0px 9px 31px 0px rgba(0, 0, 0, 0.7);
//   background-repeat: repeat-x;
//   background-image: url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/ironpatern.png);
// }

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
      background: #74ba1a !important;
      color: white;
    }
  }
}

.scoped-btn-active {
  background: #74ba1a !important;
}

</style>
