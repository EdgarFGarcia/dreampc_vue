<template>
    <div>
        <div v-if="config.hasbutton" align="end">
            <!--<v-btn
                outlined
                class="mr-2 pa-3"
                @click="removeitem"
            >
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>-->
            <v-btn
                outlined
                class="pa-3"
                @click="openmodal"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <v-card
            elevation="1"
        >
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                v-if="!setup.sales && !setup.orders"
                v-model="selected"
                :headers="headers"
                :items="items"
                :search="search"
            >
                <template v-slot:item="props">
                    <tr :style="props.item['quantity'] < 10 ? 'background: red;' : 'background: white;'">
                        <td>
                            <label :style="props.item['quantity'] < 10 ? 'color: white;' : 'color: black;'">
                                {{ props.item['product_name'] }}
                            </label>
                        </td>
                        <td>
                            <label :style="props.item['quantity'] < 10 ? 'color: white;' : 'color: black;'">
                                {{ props.item['item_no'] }}
                            </label>
                        </td>
                        <td>
                            <label :style="props.item['quantity'] < 10 ? 'color: white;' : 'color: black;'">
                                {{ props.item['condition'].name }}
                            </label>
                        </td>
                        <td>
                            <label :style="props.item['quantity'] < 10 ? 'color: white;' : 'color: black;'">
                                {{ props.item['quantity'] }}
                            </label>
                        </td>
                        <td>
                            <label :style="props.item['quantity'] < 10 ? 'color: white;' : 'color: black;'">
                                {{ props.item['category'].name }}
                            </label>
                        </td>
                        <td>
                            <v-btn
                                color="info"
                                class="pl-4 pr-4 mr-2"
                                @click="edititem(props)"
                            >
                                EDIT
                            </v-btn>
                            <v-btn
                                color="black"
                                class="pl-4 pr-4"
                                dark
                                v-if="props.item['quantity'] == 0"
                                @click="deleteitem(props)"
                            >
                                DELETE
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-data-table
                v-else-if="!setup.sales && setup.orders"
                :headers="headers"
                :items="items"
                :search="search"
            >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item['customer_name'] }}</td>
                        <td>{{ props.item['product_name'] }}</td>
                        <td>{{ props.item['manufacturer'] }}</td>
                        <td>{{ props.item['quantity'] }}</td>
                        <td>{{ props.item['total'] }}</td>
                        <td>{{ props.item['quantity'] * props.item['total'] }}</td>
                        <td>{{ props.item['item_number'] }}</td>
                        <td>{{ props.item['item_number'] }}</td>
                        <td>
                            <v-btn
                                color="primary"
                                class="pl-6 pr-6 mr-2"
                                @click="markpaid(props)"
                            >
                                Paid
                            </v-btn>
                            <v-btn
                                color="red"
                                class="pl-6 pr-6"
                                @click="markcancel(props)"
                            >
                                Cancel
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <div v-else>
                <v-row>
                    <v-col cols="2">
                        <v-select
                            :items="dditems"
                            label="CHOOSE STATUS"
                            v-model="dditem"
                            return-object
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <download-excel
                                :data="sales"
                                worksheet="My Worksheet"
                                name="filename.xls"
                            >
                            <v-btn
                                color="primary"
                            >
                                DOWNLOAD AS EXCEL
                            </v-btn>
                        </download-excel>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="headers"
                    :items="sales"
                    :search="search"
                >
                    <template v-slot:item="props">
                        <tr>
                            <td>{{ props.item['created_at'] }}</td>
                            <td>{{ props.item['product_name'] }}</td>
                            <td>{{ props.item['manufacturer'] }}</td>
                            <td>{{ props.item['quantity'] }}</td>
                            <td>{{ props.item['total'] }}</td>
                            <td>{{ props.item['total'] * .12 }}</td>
                            <td>{{ props.item['total'] * props.item['quantity'] }}</td>
                            <td>
                                <label
                                    v-if="props.item['is_sold']"
                                >
                                    SOLD
                                </label>
                                <label
                                    v-else-if="props.item['is_cancel']"
                                >
                                    CANCELLED
                                </label>
                                <label v-else>IN - PROGRESS</label>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </div>
        </v-card>
    </div>
</template>

<script>
//import { mapGetters } from 'vuex'
export default {
  components: {
  },
  props: [
    'headers', 'items', 'config', 'setup'
  ],
  data: () => ({
    selected: [],
    search: '',
    dditem: null,
    dditems: [
        {
            id:     1,
            text:   'ALL'
        },
        {
            id:     2,
            text:   'SOLD'
        },
        {
            id:     3,
            text:   'CANCELLED'
        },
        {
            id:     4,
            text:   'IN-PROGRESS'
        }
    ]
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    //...mapGetters({
    //  sales:      'admin/getSales'
    //}),
    sales(){
        return this.$store.getters['admin/getSales'](this.dditem)
    }
  },
  methods: {
    openmodal(){
      this.$emit('openmodal', true)
    },
    removeitem(){
      this.$emit('removeitem', this.selected)
    },
    markpaid(data){
      this.$emit('markpaid', data)
    },
    markcancel(data){
      this.$emit('markcancel', data)
    },
    dchosen(){
      this.$emit('dchose', this.dditem)
    },
    edititem(data){
      this.$emit('edititem', data)
    },
    deleteitem(data){
      this.$emit('deleteitem', data)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>