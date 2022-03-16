<template>
    <div>
        <div v-if="config.hasbutton" align="end">
            <v-btn
                outlined
                class="mr-2 pa-3"
            >
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn
                outlined
                class="pa-3"
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
                :headers="headers"
                :items="items"
                :search="search"
            ></v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: [
    'headers', 'items', 'config'
  ],
  data: () => ({
    search: ''
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>