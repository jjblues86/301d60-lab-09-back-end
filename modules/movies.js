'use strict';
const superagent = require('superagent');



//Search Movies
function searchMovie(request, response){
  const moviesDataUrl = `https://api.themoviedb.org/3/search/movie?query=${request.query.data.search_query}&api_key=${process.env.MOVIE_API_KEY}`
  return superagent.get(moviesDataUrl)
    .then(responseData => {
      const movieData = JSON.parse(responseData.text);
      let movie = movieData.results.map(element => new Movies(element));
      response.send(movie);
    }).catch(err => console.error(err));
}



//Movies Constructor
function Movies(movie){
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

module.exports = searchMovie;
