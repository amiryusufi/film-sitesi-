const apiKey = "a0e1e9a955b5969520e6bfb32277c99b";
const baseUrl = "https://api.themoviedb.org/3";
const populerFilm = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const upcomingFilms = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topratedFilms = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const moviesWrapper = document.querySelector(".movies-wrapper");

// Film görsellerine ulaşmak için kullanacağımız URL;
const imageUrl = "https://image.tmdb.org/t/p/w200";

// film kataegorilerii alabilmek icin kullancagmiz url;
    const movieList = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    // kategori bilgilerini icinde tutacak objemiz;
    let genresMap = {};
    // console.log(genresMap);
    // kategoriye gore film listelemek icin elemanlarin secimi;
    const popular = document.querySelector("#popular");
    const upcoming = document.querySelector("#upcoming");
    const toprated = document.querySelector("#toprated");

    const filmkategorileiniListele = () => {
        fetch(movieList)
        .then(Response => Response.json())
        .then((data)=> {
            console.log(data)
            data.genres.forEach((genre)=>{
                genresMap[genre.id] = genre.name;
            })
        })
    }
    filmkategorileiniListele()



// ! ilk olarak en cok oy alan filimleri listeleyelim.
fetch(topratedFilms)
    .then(Response => Response.json())
    .then((data) => {
        // console.log(data)
        filmBilgileriniYazdir(data);
    })

const filmBilgileriniYazdir = (data) => {
    data.results.forEach((veri) => {
        const posterPath = veri.poster_path;
        const genreNames = veri.genre_ids.map((id)=> genresMap[id]).slice(0,2);
        const date = new Date(veri.release_date);
        const formatteDate = date.toLocaleDateString("tr-TR", {
            day : "numeric",
            month :"long",
            year :"numeric",
        })

        // Movie-card olusturalim
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.id = veri.id;

        // movieCard.addEventListener("click", )
        movieCard.addEventListener("click", function(){
            window.location.href = `detay.html?id=${veri.id}`;
        })

        // kart bilgilerini ayarlama
        movieCard.innerHTML = `
        <img src="${imageUrl}${posterPath}" alt="Avengers Movie Poster">
                    <div class="movie-info">
                        <h4>${veri.title}</h4>
                        <p>${genreNames}</p>
                        <p>${formatteDate}</p>
                        <h6><span>IMDB</span> <i class="fa-solid fa-star"></i> 9.6</h6>
                    </div> 
        `;
         
        moviesWrapper.append(movieCard);

    })
}    

// popular filmleri getirmek icin ;
popular.addEventListener("click", function(){
    filmkategorileiniListele();
    popularFilmleriYazdir();
})

const popularFilmleriYazdir = () => {
    fetch(populerFilm)
    .then((response => response.json()))
    .then((data)=> {
        moviesWrapper.innerHTML="";
        filmBilgileriniYazdir(data);
    })
}

// vizyona girecek filmleri getirmek icin;
upcoming.addEventListener("click", function(){
    filmkategorileiniListele();
    yakindaVizyonaGirecekFilmleriYazdir();
})

const yakindaVizyonaGirecekFilmleriYazdir = () => {
    fetch(upcomingFilms)
    .then((response => response.json()))
    .then((data)=> {
        moviesWrapper.innerHTML="";
        filmBilgileriniYazdir(data);
    })
}

// en cok oy alanlar filmeri getirmek icin;
toprated.addEventListener("click", function(){
    filmkategorileiniListele();
    enCokOyAlanFimlmleriYazdir();
})

const enCokOyAlanFimlmleriYazdir = () => {
    fetch(topratedFilms)
    .then((response => response.json()))
    .then((data)=> {
        moviesWrapper.innerHTML="";
        filmBilgileriniYazdir(data);
    })
}