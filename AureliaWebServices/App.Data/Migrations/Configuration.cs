namespace App.Data.Migrations
{
    using Models;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using Utils;
    public sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            if (!context.Movies.Any())
            {
                var movies = new List<Movie>();
                var filePath = this.GetFilePath("top10.json");

                using (var reader = new StreamReader(filePath))
                {
                    var json = reader.ReadToEnd();
                    movies = JsonConvert.DeserializeObject<List<Movie>>(json);
                }

                foreach (var movie in movies)
                {
                    context.Movies.Add(movie);
                }

                context.SaveChanges();
            }
        }

        private string GetFilePath(string fileName)
        {
            var dir = AssemblyHelper.GetDirectoryForAssembly(Assembly.GetExecutingAssembly());

            var dirParams = dir.Split('\\');
            var folder = string.Empty;

            for (int i = 0; i < dirParams.Length - 1; i++)
            {
                folder += dirParams[i];
                folder += "\\";
            }

            folder += string.Format("Data\\{0}", fileName);

            return folder;
        }
    }
}
