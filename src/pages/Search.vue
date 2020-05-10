<template>
  <div class="movie-list">
    <input v-model="searchTerm" placeholder="Insert Movie Name" />
    <transition name="fadeDown">
      <div class="movie-container" v-if="movies.length > 0">
        <figure v-for="(movie, i) in movies" :key="i">
          <button
            class="fav-btn"
            @click="toggleFavorite(movie.imdbID)"
            v-if="!$favorites.includes(movie.imdbID)"
          >Favorite</button>
          <button class="fav-btn" @click="toggleFavorite(movie.imdbID)" v-else>Un-favorite</button>
          <router-link :to=" '/movie/' + movie.imdbID">
            <img v-if="movie.Poster != 'N/A'" :src="movie.Poster" />
            <img v-else src="../assets/img/ph.png" />
          </router-link>
          <figcaption>
            <router-link :to=" '/movie/' + movie.imdbID">
              <p class="title title-font">{{ movie.Title }}</p>
              <p class="year">{{ movie.Year }}</p>
            </router-link>
          </figcaption>
        </figure>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      movies: [],
      searchTerm: "",
      url: "https://www.omdbapi.com/?apikey=53f45466&type=movie&s="
    };
  },

  methods: {
    toggleFavorite(id) {
      var toToggle = this.$favorites;
      if (!toToggle.includes(id)) {
        toToggle = toToggle.push(id);
        event.target.innerHTML = "Un-Favorite";
      } else {
        this.removeFromArray(toToggle, id);
        event.target.innerHTML = "Favorite";
      }
      console.log(this.$favorites);
    },

    removeFromArray(array, value) {
      var position = array.indexOf(value);
      array.splice(position, 1);
    }
  },
  watch: {
    searchTerm() {
      fetch(this.url + this.searchTerm)
        .then(result => {
          return result.json();
        })
        .then(data => {
          if (data.Search) {
            this.movies = data.Search;
            console.log(this.movies);
          } else this.movies = [];
        });
    }
  }
};
</script>
<style scoped>
</style>

