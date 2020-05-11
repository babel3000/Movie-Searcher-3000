<template>
  <div id="app">
    <router-link class='home-link title-font' to="/">Search</router-link>
    <router-link class='fav-link title-font' to="/favorites">Favorites</router-link>
    <transition name='fade'>
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './assets/style/main.css'

export default {
  name: "App",

  mounted() {
    console.log(this.$favorites)
  }
};
</script>

<style>

</style>
