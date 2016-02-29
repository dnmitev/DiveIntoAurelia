import {Router, RouterConfiguration} from 'aurelia-router'

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Movies';
        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: 'home/home',
                nav: true,
                title: 'Home'
            },
            {
                route: 'movie/:id',
                name: 'movieDetails',
                moduleId: 'movies/details',
                nav: false, // this route won't be included in the UI nav tree
                title: 'Movie Details'
            },
            {
                route: 'movies',
                name: 'moviesInTheaters',
                moduleId: 'movies/theaters/theaters',
                nav: true,
                title: 'In Theaters'
            },
            {
                route: 'movie/edit/:id',
                name: 'editMovie',
                moduleId: 'movies/editor/editor',
                nav: false,
                title: 'Movie Editor'
            }
        ]);

        this.router = router;
    }
}
