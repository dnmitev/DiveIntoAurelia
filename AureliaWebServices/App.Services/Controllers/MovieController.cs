namespace App.Services.Controllers
{
    using App.Data;
    using App.Data.Contracts;

    using Models;

    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Cors;

    [RoutePrefix("api/movies")]
    [EnableCors("*", "*", "*")]
    public class MovieController : BaseApiController
    {
        // An empty constructor is needed to work properly.
        // The Poor man's DI can be switched with the use of Ninject or other IoC Container
        public MovieController()
            : this(new AppData())
        {
        }

        public MovieController(IAppData data)
            : base(data)
        {
        }
        
        [HttpGet]
        [Route("top-movies")]
        public IHttpActionResult GetTopMovies()
        {
            var data = this.Data.Movies
                                .All()
                                .Where(m => m.Ranking != null)
                                .ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("theaters-movies")]
        public IHttpActionResult GetMoviesInTheaters()
        {
            var data = this.Data.Movies
                                .All()
                                .Where(m => m.Ranking == null)
                                .ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("get-movie/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            var data = this.Data.Movies
                                .All()
                                .FirstOrDefault(m => m.Id == id);

            return Ok(data);
        }

        [HttpPut]
        [HttpOptions]
        [Route("edit-movie")]
        public IHttpActionResult EditMovie([FromBody]Movie movie)
        {
            if (movie == null)
            {
                return this.BadRequest();
            }

            var movieToEdit = this.Data.Movies
                                        .All()
                                        .FirstOrDefault(m => m.Id == movie.Id);

            if (movieToEdit == null)
            {
                return this.BadRequest();
            }

            movieToEdit.Title = movie.Title;
            movieToEdit.UrlPoster = movie.UrlPoster;
            movieToEdit.Year = movie.Year;
            movieToEdit.Rating = movie.Rating;

            this.Data.Movies.Update(movieToEdit);
            this.Data.SaveChanges();

            return Ok("Movie editted!");
        }

        [HttpPost]
        [HttpOptions]
        [Route("create-movie")]
        public IHttpActionResult CreateMovie([FromBody]Movie movie)
        {
            this.Data.Movies.Add(movie);
            this.Data.SaveChanges();

            return Ok("Movie created!");
        }
    }
}