import 'fetch';
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

let baseUrl = 'http://localhost:27765/api/movies/';

@autoinject
export class Home {
    heading = 'Top 10 Movies';
    movie = null;

    constructor(private http: HttpClient, private router: Router) {
        // http.configure(config => {
        //     config
        //         .useStandardConfiguration()
        //         .withBaseUrl('http://localhost:27765/api/movies/')
        //         .withInterceptor({
        //             request(request) {
        //                 if (request.method == 'POST') {
        //                     request.headers.set('Content-Type', 'application/json');
        //                     console.log(request.headers.has('Content-Length'));
        //                 }
        //                 return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
        //             },
        //             response(response) {
        //                 console.log(`Received ${response.status} ${response.url}`);
        //                 return response; // you can return a modified Response
        //             }
        //         });
        // });
        
        
    }

    activate(params) {
        return this.http.get(`${baseUrl}get-movie/${params.id}`)
                        .then(response => this.movie = response.content)
                        .catch(err => console.log(err));
    }           

    editMovieDetails(movie) {
        // console.log(movie);
        // var request = this.http.
        //     this.http.fetch('edit-movie', {
        //         method: 'post',
        //         body: json(movie),
        //         mode: 'no-cors'
        //     });
        
        var request = this.http.createRequest('http://localhost:27765/api/movies/edit-movie');
            
        request.asPut()
                .withHeader("Accept", "application/json")
                .withHeader("Content-Type", "application/json")
                .withContent(json(this.movie));
                
        return request.send()
                        .then(response => this.router.navigate('movies'))
                        .catch(err => console.log(err));
    }
}

export class ToNumberValueConverter {
    toView(value) {
        return value * 1;
    }
}