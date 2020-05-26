<template>
  <v-app :dark="dark">
    <Toolbar />
    <NavigationDrawer />
    <v-content>
      <transition name="page" mode="out-in">
        <slot>
          <router-view :key="$route.fullPath" />
        </slot>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    Toolbar: () => import('@/components/Toolbar.vue'),
    NavigationDrawer: () => import('@/components/NavigationDrawer.vue')
  },
  data: () => ({
    title: 'Bienvenido a la UNIQ!'
  }),

  computed: {
    ...mapState({
      dark: state => state.layout.dark
    }),

    ...mapGetters({
      authenticated: 'auth/check',
      userIsTramitador: 'auth/userIsTramitador',
      userIsClient: 'auth/userIsClient'
    })
  },

  created () {
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss">
.v-btn__content {
  height: auto !important;
  width: auto !important;
}

// upload images
.avatar-uploader{
  background: white;
    padding: 15px 0px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
// end upload images

  .scoped-list-tile {
    a, .v-list__tile {
      padding-left: 1.5rem !important;
    }
  }

  .scoped-sidebar-list-group {
    &:before, &:after {
      background: transparent !important;
    }

    .v-list__group__header {
      border-radius: 8px !important;
      overflow: hidden !important;

      &:hover {
        color: white !important;
        background: #74ba1a !important;
      }
    }
  }

</style>
