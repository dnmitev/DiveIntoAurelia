import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Theaters {
    heading = 'Now in cinemas';
    movies = [];

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:27765/api/movies/');
        });
    }

    activate() {
        return this.http.fetch('theaters-movies')
            .then(response => response.json())
            .then(movies => this.movies = movies);
    }
}