import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Details {
    movie = null;

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:27765/api/movies/');
        });
    }

    activate(params, routeConfig) {
        return this.http.fetch(`get-movie/${params.id}`)
                    .then(response => response.json())
                    .then(movie => this.movie = movie);
    });
}