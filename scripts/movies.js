const apiKey = "a0e1e9a955b5969520e6bfb32277c99b";
const baseUrl = "https://api.themoviedb.org/3";
const populerFilm = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const upcomingFilms = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topratedFilms = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const moviesWrapper = document.querySelector(".movies-wrapper");

// ! ilk olarak en cok oy alan filimleri listeleyelim.
fetch(topratedFilms)
    .then(Response => Response.json())
    .then((data) => {
        console.log(data)
        filmBilgileriniYazdir(data);
    })

const filmBilgileriniYazdir = (data) => {
    data.results.forEach((veri) => {

        // Movie-card olusturalim
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // kart bilgilerini ayarlama
        movieCard.innerHTML = `
        <img src="img/avengers.jpg" alt="Avengers Movie Poster">
                    <div class="movie-info">
                        <h4>${veri.original_title}</h4>
                        <p>Action, Drama</p>
                        <p>20 Temmuz 2024</p>
                        <h6><span>IMDB</span> <i class="fa-solid fa-star"></i> 9.6</h6>
                    </div> 
        `;
         
        moviesWrapper.append(movieCard);

    })
}    