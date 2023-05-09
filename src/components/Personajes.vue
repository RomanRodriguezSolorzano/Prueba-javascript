<script setup>
import Lista from './Lista.vue'
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{ error }}</div>
  <Lista v-if="data" v-for="(personajes, index) in data">
    <template #icon>
      {{ index + 1 + 10 * ((this.$route.params.id ? this.$route.params.id : 1) - 1) }}
    </template>
    <template #heading>{{ personajes.name }}</template>
    <strong>Año de Nacimiento: </strong><span>{{ personajes.birth_year }}</span>
    <br>
    <strong>Genero: </strong><span>{{ personajes.gender }}</span>
    <template #button>
      <RouterLink
      :to="'/peliculas/' + (this.$route.params.id?this.$route.params.id:1) +'/'+(index+1)">Ver Films</RouterLink>
    </template>
  </Lista>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      data: null,
      error: null
    }
  },
  created() {

    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      this.error = this.data = null
      this.loading = true
      try {
        const id = this.$route.params.id ? this.$route.params.id : 1;

        const { data } = await axios.get(`${"https://swapi.dev/api/people/?page=" + id}`);
        this.data = data.results;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = "Error al intentar cargar la informacion, intente mas tarde"
      }
    },
  },
}
</script>

<style>
.loading {
  font-size: 2em;
}

.error {
  color: red;
}
</style>