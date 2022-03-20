<template>
    <v-container fluid>
      Choose a page on top to get started
    </v-container>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
  }),
  mounted () {
  },
  created () {
    if(localStorage.getItem('token') === null){
      this.$router.push({name: 'index'})
    }
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