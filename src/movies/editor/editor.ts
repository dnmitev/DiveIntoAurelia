import 'fetch';
import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@autoinject
export class Home {
    heading = 'Top 10 Movies';
    movie = null;

    constructor(private http: HttpClient, private router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:27765/api/movies/')
                .withInterceptor({
                    request(request) {
                        if (request.method == 'POST') {
                            request.headers.set('Content-Type', 'application/json');
                            console.log(request.headers.has('Content-Length'));
                        }
                        return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                    },
                    response(response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response; // you can return a modified Response
                    }
                });
        });
    }

    activate(params) {
        return this.http.fetch(`get-movie/${params.id}`)
                        .then(response => response.json())
                        .then(movie => this.movie = movie);
    }

    editMovieDetails(movie) {
        console.log(movie);
        this.http.fetch('edit-movie', {
            method: 'post',
            body: json(movie),
            mode: 'no-cors'
        });

        this.router.navigate('movies');
    }
}

export class ToNumberValueConverter {
    toView(value) {
        return value * 1;
    }
}