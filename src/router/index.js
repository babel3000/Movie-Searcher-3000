import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/pages/Search'
import Movie from '@/pages/Movie'
import Favorites from '@/pages/Favorites'
Vue.config.productionTip = false
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Search
        },
        {
            path: '/movie/:id',
            name: 'Movie',
            component: Movie
        },
        {
            path: '/favorites',
            name: 'Favorites',
            component: Favorites
        },
    ]
})