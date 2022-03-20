<template>
    <v-container class="flex" fluid>
      <Datatable 
        :headers="headers" 
        :items="getOrders" 
        :config="config"
        :setup="setup"
        @openmodal="openmodal"
        @removeitem="removeitem"
      />
      <Dialog 
        v-model="dialogaddorder"
        :value="dialogaddorder"
        :data="dialogconfig"
        @closedialog="closedialog"
        @savedcustomer="savedcustomer"
      />
    </v-container>
</template>

<script>
import Datatable from '../../components/DataTable.vue'
import Dialog from '../../components/MoFields.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Datatable, Dialog
  },
  props: [
  ],
  data: () => ({
    dialogaddorder: false,
    config: {
      hasbutton: true
    },
    setup: {
      sales: false
    },
    headers: [
        {
        text: 'Customer Name',
        align: 'start',
        value: 'customer_name',
        },
        { text: 'Product Name', value: 'product_name' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Item Number', value: 'item_number' },
        { text: 'Category', value: 'item_number' },
    ],
    dialogconfig: {
      title: 'Orders',
      customer: true,
      dd: [],
      customer_field: [
        {
          label:  'First Name',
          icon:   'mdi-account'
        },
        {
          label:  'Last Name',
          icon:   'mdi-account'
        },
        {
          label:  'Quantity',
          icon:   'mdi-plus-thick'
        }
      ]
    }
  }),
  mounted () {
  },
  created () {
    if(localStorage.getItem('token') === null){
      this.$router.push({name: 'index'})
    }
    this.forders()
  },
  computed: {
    ...mapGetters({
      getOrders:            'admin/getOrders'
    })
  },
  methods: {
    openmodal(){
      this.dialogaddorder = true
    },
    closedialog(){
      this.dialogaddorder = false
    },
    async forders(){
      await this.$axios.get('orders/orders')
      .then(({data}) => {
        if(data.response){
          this.$store.dispatch('admin/setOrders', data.data)
        }
      })
    },
    async savedcustomer(data){
      let tp = {
        firstname:  data.cd[0],
        lastname:   data.cd[1],
        product:    data.product,
        quantity:   data.cd[2]
      }
      await this.$axios.post('orders/addorder', tp)
      .then(({data}) => {
        if(data.response){
          this.forders()
          this.closedialog()
        }else{
          alert(data.message)
        }
      })
    },
    async removeitem(data){
      await this.$axios.delete(`orders/deleteorder/${data[0].id}`)
      .then(({data}) => {
        if(data.response){
          this.forders()
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