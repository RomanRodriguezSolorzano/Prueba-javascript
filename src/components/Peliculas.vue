<script setup>
import Lista from './Lista.vue'
</script>

<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="data" class="name">{{ name }}</div>
    <Lista v-if="data" v-for="(pelicula, index) in data">
        <template #icon>
            {{ index + 1 }}
        </template>
        <template #heading>{{ pelicula.title }}</template>
        <strong>Episodio: </strong><span>{{ pelicula.episode_id }}</span>
        <br>
        <strong>Director: </strong><span>{{ pelicula.director }}</span>
        <br>
        <strong>Fecha de Lanzamiento: </strong><span>{{ pelicula.release_date }}</span>
    </Lista>
    <div class="d-flex justify-content-center ">
        <RouterLink @click="decremento" :to="'/personajes/' + (this.$route.params.page)" class="btn btn-outline-warning block">Volver</RouterLink>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            loading: false,
            data: null,
            error: null,
            name: null,
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
                const peliculas = [];
                
                const id = (this.$route.params.id ? this.$route.params.id : 1) - 1;
                const page = this.$route.params.page ? this.$route.params.page : 1;
                const { data } = await axios.get(`${"https://swapi.dev/api/people/?page=" + page}`);
                this.name = data.results[id].name;;
                const films = data.results[id].films;
                for (const result of films) {
                    const { data } = await axios.get(result);
                    peliculas.push(data)
                }
                this.data = peliculas;
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
    font-size: 1.5em;
    color: red;
}

.name{
    margin: 10px;
    font-size: 1.5em;
    color: rgb(255, 225, 0);
}
</style>