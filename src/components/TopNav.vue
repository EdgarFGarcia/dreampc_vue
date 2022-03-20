<template>
    <div>
      <v-app-bar
        app
        color="primary"
        dark
        v-if="Object.entries(getUserData).length !== 0 && isLogged"
      >
        <div v-if="JSON.parse(getUserData).user_role == 1">
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'order'})"
            >
                <v-icon class="mr-2">mdi-folder-star-multiple-outline</v-icon>Orders
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'inventory'})"
            >
                <v-icon class="mr-2">mdi-sitemap</v-icon>Inventory
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'salesreport'})"
            >
                <v-icon class="mr-2">mdi-chart-bar</v-icon>Reports
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'settings'})"
            >
                <v-icon class="mr-2">mdi-account-cog</v-icon>Settings
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="logout"
            >
                <v-icon class="mr-2">mdi-logout</v-icon>Logout
            </v-btn>
        </div>

        <div v-if="JSON.parse(getUserData).user_role == 2">
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'order'})"
            >
                <v-icon class="mr-2">mdi-folder-star-multiple-outline</v-icon>Orders
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="$router.push({name: 'settings'})"
            >
                <v-icon class="mr-2">mdi-account-cog</v-icon>Settings
            </v-btn>
            <v-btn outlined 
                class="mr-2"
                @click="logout"
            >
                <v-icon class="mr-2">mdi-logout</v-icon>Logout
            </v-btn>
        </div>

        <v-spacer></v-spacer>

        <label v-if="Object.entries(getUserData).length !== 0">
            Hi {{JSON.parse(getUserData).name}}
        </label>

        </v-app-bar>
        <v-app-bar
          v-else
          app
          color="primary"
          dark
         >
          Dream PC Build Inventory System
        </v-app-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
      getUserData:  'auth/getUserData',
      isLogged:     'auth/getIsLogged'
    })
  },
  methods: {
    logout(){
      localStorage.removeItem('udata')
      localStorage.removeItem('token')
      localStorage.removeItem('vuex')
      this.$store.dispatch('auth/setIsLogged', false)
      this.$router.push({name: 'index'})
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>

