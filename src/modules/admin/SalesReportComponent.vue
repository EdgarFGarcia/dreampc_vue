<template>
    <v-container class="flex" fluid>
      <Datatable 
        :headers="headers" 
        :items="sales" 
        :config="config"
        :setup="setup"
      />
    </v-container>
</template>

<script>
import Datatable from '../../components/DataTable.vue'
export default {
  components: {
    Datatable
  },
  props: [
  ],
  data: () => ({
    config: {
      hasbutton: false
    },
    setup: {
      sales: true
    },
    headers: [
        {
        text: 'Date',
        align: 'start',
        value: 'created_at',
        },
        { text: 'Product Name', value: 'product_name' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Product Cost', value: 'total' },
        { text: 'Product Tax', value: 'total' },
        { text: 'Total Cost', value: 'total' },
        { text: 'Status' },
    ],
  }),
  mounted () {
  },
  created () {
    if(localStorage.getItem('token') === null){
      this.$router.push({name: 'index'})
    }
    this.fsales()
  },
  computed: {
    
  },
  methods: {
    async fsales(){
      await this.$axios.get('/reports/sales')
      .then(({data}) => {
        this.$store.dispatch('admin/setSales', data.data)
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>