<template>
    <v-container class="flex" fluid>
      <Datatable 
        :headers="headers" 
        :items="getOrders" 
        :config="config"
        :setup="setup"
        @openmodal="openmodal"
        @removeitem="removeitem"
        @markpaid="markpaid"
        @markcancel="markcancel"
      />
      <Dialog 
        v-model="dialogaddorder"
        :value="dialogaddorder"
        :data="dialogconfig"
        @closedialog="closedialog"
        @savedcustomer="savedcustomer"
      />

      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">
              Receipt
            </v-card-title>
            <v-card-text>
              <v-col cols="12">
                <strong>Client Name: {{receipt.customer_name}}</strong>
              </v-col>
              <v-col cols="12">
                <strong>Product: {{receipt.product_name}}</strong>
              </v-col>
              <v-col cols="12">
                <strong>Quantity: {{receipt.quantity}}</strong>
              </v-col>
              <v-col cols="12">
                <strong>Price Per Piece: {{receipt.total}}</strong>
              </v-col>
              <v-col cols="12">
                <strong>Total: {{receipt.total * receipt.quantity}}</strong>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

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
    dialog: false,
    receipt: {},
    dialogaddorder: false,
    config: {
      hasbutton: true
    },
    setup: {
      sales: false,
      orders: true
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
        { text: 'Price' },
        { text: 'Total'},
        { text: 'Item Number', value: 'item_number' },
        { text: 'Category', value: 'item_number' },
        { text: 'Action' } 
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
          this.receipt = data.data
          this.dialog = true
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
    },
    async markpaid(item){
      await this.$axios.patch(`orders/marksold/${item.item.id}`)
      .then(({data}) => {
        if(data.response){
          this.forders()
        }
      })
    },
    async markcancel(item){
      await this.$axios.patch(`orders/markcancel/${item.item.id}/${item.item.product_name}`)
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