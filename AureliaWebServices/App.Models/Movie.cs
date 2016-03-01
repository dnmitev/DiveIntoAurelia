namespace App.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Movie
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public string Director { get; set; }

        public string Writer { get; set; }

        public string UrlPoster { get; set; }

        public string Country { get; set; }

        public string Genre { get; set; }

        public string Plot { get; set; }

        public string UrlIMDB { get; set; }

        public double Rating { get; set; }

        public int? Ranking { get; set; }
    }
}