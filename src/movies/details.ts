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
                .withBaseUrl('/data/');
        });
    }

    activate(params, routeConfig) {
        return this.http.fetch('top10.json')
            .then(response => response.json())
            .then(movies => {
                movies.map((movie) => {
                    if (movie.id == params.id) {
                        this.movie = movie;
                    }
                });
            });
    }
}

export class UpperValueConverter {
    toView(value) {
        return value && value.toUpperCase();
    }
}