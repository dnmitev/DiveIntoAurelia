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
                .withBaseUrl('/data/');
        });
    }

    activate() {
        return this.http.fetch('inTheaters.json')
            .then(response => response.json())
            .then(movies => this.movies = movies);
    }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}