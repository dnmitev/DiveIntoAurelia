import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import 'fetch';

@autoinject
export class Home {
    heading = 'Top 10 Movies';
    movie = null;

    constructor(private http: HttpClient, private router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/data/');
        });
    }

    activate(params) {
        return this.http.fetch('inTheaters.json')
            .then(response => response.json())
            .then(movies => { 
                 movies.map((movie) => {
                    if (movie.id == params.id) {
                        this.movie = movie;
                    }
                });
            });
    }
    
    editMovieDetails(id) {
        console.log(`Movie with ID:${id} is editted`)
        console.log(this.movie.title);
        // this.http.fetch('route', {
        //     method: 'put',
        //     body: json(this.movie)
        // });
        
        this.router.navigate('movies');
    }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
    }
  
  fromView(value) {
      return value.toUpperCase();
  }  
}

export class ToNumberValueConverter {
    toView(value) {
        return value * 1;
    }
}