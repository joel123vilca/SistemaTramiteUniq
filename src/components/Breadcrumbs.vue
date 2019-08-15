<template>
  <v-breadcrumbs :items="routes">
    <v-icon slot="divider">
      chevron_right
    </v-icon>
    <v-breadcrumbs-item
      slot="item"
      slot-scope="props"
      :to="(props.item.to ? props.item.to : '')"
    >
      {{ props.item.name }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
