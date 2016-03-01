import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import 'fetch';

@autoinject
export class Home {
    heading = 'Top 10 Movies';
    movies = [];

    constructor(private http: HttpClient, private router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:27765/api/movies/');
        });
    }

    activate() {
        return this.http.fetch('top-movies')
            .then(response => response.json())
            .then(movies => this.movies = movies);
    }
    
    getMovieDetails(id) {
        this.router.navigateToRoute('movieDetails', { 
            id: id
        });
    }
}