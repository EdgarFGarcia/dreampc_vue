<template>
    <v-container class="flex" fluid>
      <Datatable 
        :headers="headers" 
        :items="getInventory" 
        :config="config"
        :setup="setup"
        @openmodal="openmodal"
        @removeitem="removeitem"
        @edititem="edititem"
        @deleteitem="deleteitem"
      />
      <Dialog 
        v-model="dialoginventory"
        :value="dialoginventory"
        :data="dialogconfig"
        @closedialog="closedialog"
        @savedata="savedata"
      />

      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Quantity To: {{itemtoedit.product_name}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Quantity"
                    prepend-icon="mdi-note-check-outline"
                    v-model="qty"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Price"
                    prepend-icon="mdi-note-check-outline"
                    v-model="price"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saveitem"
            >
              Save
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
    Datatable,
    Dialog
  },
  props: [
  ],
  data: () => ({
    dialoginventory: false,
    dialog: false,
    itemtoedit: {},
    qty: null,
    price: null,
    config: {
      hasbutton: true
    },
    setup: {
      sales: false,
      orders: false
    },
    headers: [
        {
        text: 'Product Name',
        align: 'start',
        value: 'product_name',
        },
        { text: 'Item No.', value: 'item_no' },
        { text: 'Price', value: 'price' },
        { text: 'Condition', value: 'condition.name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Category', value: 'category.name' },
        { text: 'Action' }
    ],
    dialogconfig: {
      title: 'Add Invetory / Category',
      dd: [
        {
          id: 1,
          name: 'Inventory'
        },
        {
          id: 2,
          name: 'Category'
        }
      ],
      category_fields: [
        {
          label:  'Category',
          icon:   'mdi-note-check-outline'
        }
      ],
      inventory_fields: [
        {
          text_field: [
            {
              label:  'Product Name',
              icon:   'mdi-note-check-outline'
            },
            {
              label:  'Item Number',
              icon:   'mdi-note-check-outline'
            },
            {
              label:  'Manufacturer',
              icon:   'mdi-note-check-outline'
            },
            {
              label:  'Price',
              icon:   'mdi-note-check-outline'
            },
            {
              label:  'Quantity',
              icon:   'mdi-note-check-outline'
            }
          ]
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
    this.finventory()
    this.fcategory()
  },
  computed: {
    ...mapGetters({
      getInventory:         'admin/getInventory'
    })
  },
  methods: {
    openmodal(){
      this.dialoginventory = true
    },
    closedialog(){
      this.dialoginventory = false
    },
    async finventory(){
      await this.$axios.get('/inventory/get')
      .then(({data}) => {
        this.$store.dispatch('admin/setInventory', data.data)
        this.$store.dispatch('admin/setConditions', data.condition)
      })
    },
    async fcategory(){
      await this.$axios.get('/category/get')
      .then(({data}) => {
        this.$store.dispatch('admin/setCategory', data.data)
      })
    },
    async savedata(data){
      if(data.category === null){
        let tp = {
          name:     data.tf[0]
        }
        await this.$axios.post('/category/addcategory', tp)
        .then(({data}) => {
          if(data.response){
            this.fcategory()
            this.closedialog()
          }else{
            alert(data.message)
          }
        })
      }else{
        let tp = {
          product_name:   data.tf[0],
          item_no:        data.tf[1],
          manufacturer:   data.tf[2],
          price:          data.tf[3],
          category_id:    data.category.id,
          condition_id:   data.condition.id,
          quantity:       data.tf[4]
        }
        await this.$axios.post('/inventory/addinventory', tp)
        .then(({data}) => {
          if(data.response){
            this.finventory()
            this.closedialog()
          }else{
            alert(data.message)
          }
        })
      }
    },
    async removeitem(data){
      await this.$axios.delete(`/inventory/deleteinventory/${data[0].id}`)
      .then(({data}) => {
        if(data.response){
          this.finventory()
        }
      })
    },
    async deleteitem(item){
      await this.$axios.delete(`inventory/deleteinventory/${item.item.id}`)
      .then(({data}) => {
        if(data.response){
          this.finventory()
        }
      })
    },
    edititem(item){
      //console.log(item.item)
      this.itemtoedit = item.item
      this.dialog = true
    },
    async saveitem(){
      console.log(this.itemtoedit)
      console.log(this.qty)
      await this.$axios.patch(`/inventory/addqty/${this.itemtoedit.id}`, {qty: this.qty, price: this.price})
      .then(({data}) => {
        if(data.response){
          this.finventory()
          this.dialog = false
          this.qty = null
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