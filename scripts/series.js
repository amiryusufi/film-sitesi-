const apiKey = "a0e1e9a955b5969520e6bfb32277c99b";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w500/";
const popularSeries = `${baseUrl}/tv/popular?api_key=${apiKey}`;

// kategorileri listelemek icin url;
const seriesList = `${baseUrl}/genre/tv/list?api_key=${apiKey}`; // Hatalı apiKey düzeltildi

// kategorilari saklamak icin obje;
const genresMap = {};

// DOM elemanı tanımı öne alındı
const seriesWrapper = document.querySelector(".series-wrapper");

// Dizi bilgilerini gösterme fonksiyonu yukarı taşındı
const diziBilgileriniGoster = (data) => {
    // console.log(data)
    data.results.forEach((veri) => {
        const serieCard = document.createElement("div");
        serieCard.classList.add("serie-card");
        serieCard.id = veri.id;

        const date = new Date(veri.first_air_date);
        const formattedDate = date.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const genreName = veri.genre_ids.map((id) => genresMap[id]).slice(0, 2);

        serieCard.innerHTML = `
        <img src="${imageUrl}${veri.poster_path}" alt="">
        <div class="serie-info">
            <h4>${veri.name}</h4>
            <p>${genreName}</p>
            <p>${formattedDate}</p>
            <h6><span>IMDB</span><i class="fa-solid fa-star">${(veri.vote_average).toFixed(1)}</i></h6>
        </div>
        `;
        seriesWrapper.append(serieCard);
    });
};

// Dizi kategorileri icin istek atalim;
const diziKategoriliniListele = () => {
    fetch(seriesList)
        .then(response => response.json())
        .then((data) => {
            // console.log(data)
            data.genres.forEach((genre) => {
                genresMap[genre.id] = genre.name;
            });
        });
};

// Kategorileri listeleme fonksiyonu çağrılıyor
diziKategoriliniListele();

// sayfa acildiginda popular diziler karsima gelsin istiyorum.
fetch(popularSeries)
    .then(response => response.json())
    .then((data) => {
        diziBilgileriniGoster(data);
    });
