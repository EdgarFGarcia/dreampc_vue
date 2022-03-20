<template>
    <v-container>
      <v-card
        v-if="role == 1"
      >
        <v-card-text>
          <h3 class="mb-3">Profile</h3>
          <v-row>
            <v-col 
              cols="6"
            >
              <v-text-field
                label="First Name"
                outlined
                dense
                prepend-icon="mdi-account"
                v-model="a.firstname"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="6"
            >
              <v-text-field
                label="Last Name"
                outlined
                dense
                prepend-icon="mdi-account"
                v-model="a.lastname"
              >
              </v-text-field>
            </v-col>
            <v-divider></v-divider>
          </v-row>
          <h3 class="mb-3">Account Registration</h3>
          <v-row>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Email Address"
                outlined
                dense
                prepend-icon="mdi-email"
                v-model="a.email"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Password"
                outlined
                dense
                prepend-icon="mdi-lock"
                v-model="a.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Mobile"
                outlined
                dense
                prepend-icon="mdi-cellphone"
                v-model="a.mobile"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            dark
            @click="saveuser"
            class="pl-16 pr-16"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- worker -->
      <v-card
        v-if="role == 2"
      >
        <v-card-text>
          <h3 class="mb-3">Profile</h3>
          <v-row>
            <v-col 
              cols="6"
            >
              <v-text-field
                label="First Name"
                outlined
                dense
                prepend-icon="mdi-account"
                v-model="a.firstname"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="6"
            >
              <v-text-field
                label="Last Name"
                outlined
                dense
                prepend-icon="mdi-account"
                v-model="a.lastname"
              >
              </v-text-field>
            </v-col>
            <v-divider></v-divider>
          </v-row>
          <h3 class="mb-3">Account Registration</h3>
          <v-row>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Email Address"
                outlined
                dense
                prepend-icon="mdi-email"
                v-model="a.email"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Password"
                outlined
                dense
                prepend-icon="mdi-lock"
                v-model="a.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              >
              </v-text-field>
            </v-col>
            <v-col 
              cols="12"
            >
              <v-text-field
                label="Mobile"
                outlined
                dense
                prepend-icon="mdi-cellphone"
                v-model="a.mobile"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            dark
            @click="updateuser"
            class="pl-16 pr-16"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
    a: {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      mobile: null
    },
    show: false,
    role: null
  }),
  mounted () {
  },
  created () {
    if(localStorage.getItem('token') === null){
      this.$router.push({name: 'index'})
    }
    let ls = JSON.parse(localStorage.getItem('udata'))
    this.role = ls.user_role
    this.a.firstname = ls.firstname
    this.a.lastname = ls.lastname
    this.a.email = ls.email
    this.a.mobile = ls.mobilenumber
    console.log(this.role)
  },
  computed: {
  },
  methods: {
    async saveuser(){
      await this.$axios.post('accounts/register', this.a)
      .then(({data}) => {
        if(data.response){
          this.a = {}
        }
        alert(data.message)
      })
    },
    async updateuser(){
      let ls = JSON.parse(localStorage.getItem('udata'))
      await this.$axios.patch(`accounts/updateuser/${ls.id}`, this.a)
      .then(({data}) => {
        if(data.response){
          alert(data.message)
        }else{
          alert(data.message)
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>