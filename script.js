const apiKey = "4bc2a20a";

/* MOBILE MENU */

function toggleMenu() {
let menu = document.getElementById("menu");
menu.classList.toggle("show");
}

/* SEARCH MOVIE */

function searchMovie(){

let movie = document.getElementById("searchInput").value;

if(movie === "") return;

fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`)
.then(res => res.json())
.then(data => {

const container = document.getElementById("popularMovies");
container.innerHTML = "";

if(data.Response === "False"){
container.innerHTML = "<p>No movies found</p>";
return;
}

data.Search.forEach(movie => {

let poster = movie.Poster !== "N/A"
? movie.Poster
: "https://dummyimage.com/300x450/000/fff&text=No+Image";

container.innerHTML += `
<div class="movie-item">
<img src="${poster}">
<h3>${movie.Title}</h3>
<p>${movie.Year}</p>
</div>
`;

});

/* FIRST MOVIE DETAILS */

let firstMovie = data.Search[0].Title;

fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${firstMovie}`)
.then(res => res.json())
.then(movieData => {

document.getElementById("title").innerText = movieData.Title;
document.getElementById("rating").innerText = "⭐ " + movieData.imdbRating + " / 10";
document.getElementById("director").innerHTML = "<b>Director:</b> " + movieData.Director;
document.getElementById("genre").innerHTML = "<b>Genre:</b> " + movieData.Genre;
document.getElementById("plot").innerText = movieData.Plot;

let poster = movieData.Poster !== "N/A"
? movieData.Poster
: "https://dummyimage.com/300x450/000/fff&text=No+Image";

document.querySelector(".poster").src = poster;

/* TRAILER */

let trailerLink =
"https://www.youtube.com/results?search_query=" +
movieData.Title + "+trailer";

document.getElementById("trailer").href = trailerLink;

});

});

}

/* ENTER KEY SEARCH */

document.getElementById("searchInput")
.addEventListener("keydown",function(e){

if(e.key==="Enter"){
searchMovie();
}

});

/* SEARCH SUGGESTIONS */

const movies = [
"Deadpool",
"Deadpool 2",
"Interstellar",
"Avengers Endgame",
"Avatar",
"Inception",
"Joker"
];

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", function(){

let value = this.value.toLowerCase();

suggestions.innerHTML = "";

if(value === "") return;

movies.forEach(function(movie){

if(movie.toLowerCase().includes(value)){

let li = document.createElement("li");
li.textContent = movie;

li.addEventListener("click", function(){

searchInput.value = movie;
suggestions.innerHTML = "";

searchMovie();

});

suggestions.appendChild(li);

}

});

});