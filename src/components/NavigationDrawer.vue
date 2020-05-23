<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    fixed
    app
    class="pa-4"
  >
    <v-list class="mb-4">
      <v-list-tile
        v-if="primaryDrawer.mini"
        color="yellow"
        class="pa-0"
        @click.stop="replacePrimaryDrawerMini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <template v-if="user && user.image_path">
            <v-img :src="user.image_path" :lazy-src="user.image_path" contain>
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-layout>
            </v-img>
          </template>

          <template v-else>
            <v-icon>person</v-icon>
          </template>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action />
      </v-list-tile>
    </v-list>

    <v-list class="pt-0">
      <template v-if="user">
        <v-list-tile
          v-for="(item, i) in sidebarItems"
          :key="i"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
          :to="item.to"
          :disabled="!item.to"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <template>
        <v-list-tile
          v-if="authenticated"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
          @click="logout({ router: $router })"
        >
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerrar sesión</v-list-tile-content>
        </v-list-tile>
      </template>
      <v-img
        :src="require('@/assets/uniq.png')"
        :lazy-src="require('@/assets/uniq.png')"
        contain
        max-height="31"
        class="mt-5"
      >
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-layout>
      </v-img>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
      sidebarItems: 'layout/sidebarItems'
    })
  },

  methods: {
    ...mapActions({
      replacePrimaryDrawer: 'layout/replacePrimaryDrawer',
      logout: 'auth/logout'
    }),

    replacePrimaryDrawerMini () {
      let primaryDrawer = this.primaryDrawer
      primaryDrawer.mini = !primaryDrawer.mini

      this.replacePrimaryDrawer({ primaryDrawer })
    }
  }
}
</script>

<style lang="scss" scoped>
.scoped-list-tile {
  border-radius: 8px !important;
  overflow: hidden !important;

  &:hover {
    color: white !important;
    background: #74ba1a !important;
  }
}

</style>
