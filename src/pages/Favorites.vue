<template>
  <div class="favorites-list">
    <div class="movie-container">
      <figure v-for="(favorite, i) in favorites" :key="i">
        <button
          class="fav-btn"
          @click="toggleFavorite(favorite.imdbID)"
          v-if="!$favorites.includes(favorite.imdbID)"
        >Favorite</button>
        <button class="fav-btn" @click="toggleFavorite(favorite.imdbID)" v-else>Un-favorite</button>
        <router-link :to=" '/movie/' + favorite.imdbID">
          <img v-if="favorite.Poster != 'N/A'" :src="favorite.Poster" />
          <img v-else src="../assets/img/ph.png" />
        </router-link>
        <figcaption>
          <router-link :to=" '/movie/' + favorite.imdbID">
            <p class="title title-font">{{ favorite.Title }}</p>
            <p class="year">{{ favorite.Year }}</p>
          </router-link>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favorites",
  data() {
    return {
      favorites: [],
      url: "https://www.omdbapi.com/?apikey=53f45466&i="
    };
  },
  created() {
    console.log(this.$favorites);
    this.$favorites.forEach(element => {
      fetch(this.url + element)
        .then(result => {
          console.log(result);
          return result.json();
        })
        .then(data => {
          console.log(data);
          this.favorites.push(data);
        });
    });
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
      array.splice(position,1);
    }
  }
};
</script>