<template>
  <div class="movie-page">
    <button
      class="movie-fav-btn"
      @click="toggleFavorite(movie.imdbID)"
      v-if="!$favorites.includes(movie.imdbID)"
    >Favorite</button>
    <button class="movie-fav-btn" @click="toggleFavorite(movie.imdbID)" v-else>Un-favorite</button>
    <div class="movie-top">
      <img :src="movie.Poster" />
      <div class="movie-info">
        <p class="title-font">{{ movie.Title }}</p>
        <p class="year">
          <i>{{ movie.Year }}</i>
        </p>
        <p class="cast">
          <u>{{ 'Cast:' }}</u>
          <i>{{ movie.Actors }}</i>
        </p>
        <p class="language">
          <u>{{ 'Language:' }}</u>
          <i>{{ movie.Language }}</i>
        </p>
        <p class="writers">
          <u>{{ 'Writer:' }}</u>
          <i>{{ movie.Writer }}</i>
        </p>
      </div>
    </div>
    <div class="movie-bottom">
      <p class="plot">{{ movie.Plot }}</p>
      <router-link to="/" v-if="$route.name == 'Movie'" class="back-btn">Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  data() {
    return {
      movieID: this.$route.params.id,
      url: "https://www.omdbapi.com/?apikey=53f45466&i=",
      movie: {}
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
    },
    removeFromArray(array, value) {
      var position = array.indexOf(value);
      array.splice(position, 1);
    }
  },
  created() {
    fetch(this.url + this.movieID)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.movie = data;
      });
  }
};
</script>