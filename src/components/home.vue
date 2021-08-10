<template>
  <div>
    <v-app-bar dark>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-navigation-drawer v-model="sidebar" class="hidden-lg-and-up"  app hide-overlay >
        <v-list>
          <v-list-item  to="/">Home</v-list-item>
          <v-list-item  to="/users">Users</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>

      <v-navigation-drawer  class="hidden-lg-and-down" app hide-overlay>
        <v-list>
          <v-list-item class="px-2 text-h4">
            Users Page
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title ><router-link class="list-group" to="/users">Users</router-link></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-spacer></v-spacer>
  </div>
</template>
<script>
export default {
  data: () => ({
    sidebar: false,
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>