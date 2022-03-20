<template>
    <v-row justify="center">
        <v-dialog
          persistent
          max-width="600px"
          :value="value"
        >
          <v-card
            v-if="data.customer"
          >
            <v-card-title>
              <small>{{data.title}}</small>
            </v-card-title>
            <v-card-text>
                <!-- Customer -->
                <v-row>
                    <v-col
                        cols="6"
                        v-for="(item, index) in data.customer_field"
                        :key="index"
                    >
                        <v-text-field
                            :label="item.label"
                            outlined
                            dense
                            :prepend-icon="item.icon"
                            v-model="topass[index]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="product"
                            :items="getInventory"
                            item-text="product_name"
                            item-velue="id"
                            outlined
                            dense
                            chips
                            small-chips
                            label="Product"
                            prepend-icon="mdi-format-list-checks"
                            return-object
                        >
                            <template slot="selection" slot-scope="{item}">
                                <span>Product: {{item.product_name}} - Manufacturer: {{item.manufacturer}} - Item No. {{item.item_no}}</span>
                            </template>
                            <template slot="item" slot-scope="{item}">
                                <p class='fullName'>Product: {{item.product_name}}, Manufacturer: {{item.manufacturer}}, Item Number: {{item.item_no}}</p>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <!-- End Customer -->
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="closedialog"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                dark
                @click="savedcustomer"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- end -->
          <v-card
            v-else
          >
            <v-card-title>
              <small>{{data.title}}</small>
            </v-card-title>
            <v-card-text>
                <!-- Customer -->

                <v-col 
                    cols="12"
                    v-for="(item, index) in data.customer_field"
                    :key="index"
                >
                    <v-text-field
                        :label="item.label"
                        outlined
                        dense
                        :prepend-icon="item.icon"
                        v-model="topass[index]"
                    >
                    </v-text-field>
                </v-col>

                <!-- End Customer -->
                <v-col cols="12" v-if="data.dd.length > 0">
                    <v-autocomplete
                        v-model="ddvalue"
                        :items="data.dd"
                        item-text="name"
                        item-velue="id"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Choose"
                        prepend-icon="mdi-format-list-checks"
                        @change="selection"
                    ></v-autocomplete>
                    <v-divider></v-divider>
                </v-col>
                <v-col v-if="isCategory" cols="12">
                    <div
                        v-for="(cItem, cIndex) in data.category_fields"
                        :key="cIndex"
                    >
                        <v-text-field
                            :label="cItem.label"
                            outlined
                            dense
                            :prepend-icon="cItem.icon"
                            v-model="topass[cIndex]"
                        >
                        </v-text-field>
                    </div>
                </v-col>
                <v-col v-if="isInventory" cols="12">
                    <div
                        v-for="(iItem, iIndex) in data.inventory_fields"
                        :key="iIndex"
                    >
                        <div v-for="(iiItem, iiIndex) in iItem.text_field" :key="iiIndex">
                            <v-text-field
                                :label="iiItem.label"
                                outlined
                                dense
                                :prepend-icon="iiItem.icon"
                                v-model="topass[iiIndex]"
                            >
                            </v-text-field>
                        </div>
                    </div>
                    <v-autocomplete
                        v-model="condition"
                        :items="getConditions"
                        item-text="name"
                        item-velue="id"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Condition"
                        prepend-icon="mdi-note-check-outline"
                        return-object
                    ></v-autocomplete>
                    <v-autocomplete
                        v-model="category"
                        :items="getCategory"
                        item-text="name"
                        item-velue="id"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Category"
                        prepend-icon="mdi-note-check-outline"
                        return-object
                    ></v-autocomplete>
                </v-col>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="closedialog"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                dark
                @click="savedata"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  props: [
    'value', 'data'
  ],
  data: () => ({
    ddvalue: null,
    category: null,
    condition: null,
    isInventory: false,
    isCategory: false,
    topass: [],
    product: null
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
      getConditions:        'admin/getConditions',
      getCategory:          'admin/getCategory',
      getInventory:         'admin/getInventory'
    })
  },
  methods: {
    closedialog(){
      this.$emit('closedialog', true)
    },
    selection(data){
      if(data == 'Category'){
        this.isCategory = true
        this.isInventory = false
        this.topass = []
      }
      if(data == 'Inventory'){
        this.isInventory = true
        this.isCategory = false
        this.topass = []
      }
    },
    savedata(){
      this.$emit('savedata', {tf: this.topass, category: this.category, condition: this.condition})
    },
    savedcustomer(){
      this.$emit('savedcustomer', {cd: this.topass, product: this.product})
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>