<template>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card
          class="mx-auto"
          outlined
          style="width: 500px;"
        >
          <v-toolbar dark color="blue">
            <v-card-title>
              Login
            </v-card-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              prepend-icon="person"
              v-model="c.username"
              name="Email or Username"
              label="Email or Username"
              type="text"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="Password"
              label="Password"
              v-model="c.password"
              class="input-group--focused"
              @click:append="show = !show"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="white--text" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
    c: {
      username: null,
      password: null
    },
    show: false
  }),
  mounted () {
  },
  created () {
    if(localStorage.getItem('token') !== null){
      let udata = JSON.parse(localStorage.getItem('udata'))
      if(udata.user_role == 1){
        this.$router.push({name: 'order'})
      }else{
        this.$router.push({name: 'order'})
      }
    }
  },
  computed: {
  },
  methods: {
    async login(){
      await this.$axios.get('/csrf-cookie')
      .then(response => {
        if(response){
          this.$axios.post('login', this.c)
          .then(({data}) => {
            if(data.response){
              localStorage.setItem('token', data.data)
              localStorage.setItem('udata', JSON.stringify(data.udata))
              this.$store.dispatch('auth/setIsLogged', true)
              this.$store.dispatch('auth/setUserData', JSON.stringify(data.udata))
              if(data.udata.user_role == 1){
                this.$router.push({name: 'order'})
              }
              if(data.udata.user_role == 2){
                this.$router.push({name: 'order'})
              }
            }else{
              alert(data.message)
            }
          })
        }
      })
    },
    register(){
      console.log(this.c)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>