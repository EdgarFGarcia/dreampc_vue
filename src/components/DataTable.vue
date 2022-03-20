<template>
    <div>
        <div v-if="config.hasbutton" align="end">
            <v-btn
                outlined
                class="mr-2 pa-3"
                @click="removeitem"
            >
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
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
                v-if="!setup.sales"
                v-model="selected"
                :headers="headers"
                :items="items"
                :search="search"
                :single-select="singleSelect"
                show-select
            >
            </v-data-table>
            <v-data-table
                v-else
                :headers="headers"
                :items="items"
                :search="search"
            >
                <template v-slot:item="props">
                    <tr>
                        <td><small>{{ props.item['created_at'] }}</small></td>
                        <td><small>{{ props.item['product_name'] }}</small></td>
                        <td><small>{{ props.item['manufacturer'] }}</small></td>
                        <td><small>{{ props.item['total'] - (props.item['total'] * .12) }}</small></td>
                        <td><small>{{ props.item['total'] * .12 }}</small></td>
                        <td><small>{{ props.item['total'] }}</small></td>
                        <td>
                            <small v-if="props.item['deleted_at'] == null">In Progress</small>
                            <small v-else>Delivered / Sold</small>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: [
    'headers', 'items', 'config', 'setup'
  ],
  data: () => ({
    search: '',
    singleSelect: true,
    selected: []
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
    openmodal(){
      this.$emit('openmodal', true)
    },
    removeitem(){
      this.$emit('removeitem', this.selected)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>