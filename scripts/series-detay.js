const apiKey = "def95e063c28b4c1f0b98de2c46f88a8";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w400";
const creditsUrl = "https://image.tmdb.org/t/p/w200";

const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get("id");
console.log(serieId);

// ! Dizi Detayları URL'i;
const seriesUrl = `${baseUrl}/tv/${serieId}?api_key=${apiKey}`;

// ! Dizi Oyuncuları Detay URL'i;
const seriesCreditsUrl = `${baseUrl}/tv/${serieId}/credits?api_key=${apiKey}`;

fetch(seriesUrl)
.then(response=>response.json())
.then((data)=>{
    diziBilgileriniGoster(data);
    console.log(data)
})

const diziBilgileriniGoster = (data) => {
    const serieDetayWrapper = document.querySelector(".serie-detay-wrapper");

    const seriesDate = new Date(data.first_air_date).toLocaleDateString("tr-TR",{
        year : "numeric",
        month : "long",
        day : "numeric",
    });

    const genreNames = data.genres.map((genre)=> genre.name);

    serieDetayWrapper.innerHTML = `
        <div class="serie-detay">
            <img class="datay-foto" src="${imageUrl}${data.poster_path}" alt="">
            <div class="serie-bilgileri">
                <h2>${data.name}</h2>
                <p><strong>Kategoriler:</strong>${genreNames}</p>
                <p><strong>Çıkış Tarihi:</strong>${seriesDate}</p>
                <p><strong>IMDB Puanı:</strong>${(data.vote_average).toFixed(1)}</p>
                <p><strong>Özet:</strong>${data.overview}</p>
            </div>
        </div>
    `
}


// Oyuncu Bilgileri İçin;
fetch(seriesCreditsUrl)
.then(response=>response.json())
.then((data)=>{
    console.log(data.cast)
    oyuncuBilgileriniGöster(data.cast);
})


const oyuncuBilgileriniGöster = (cast) => {
    cast.slice(0,8).forEach((oyuncu) => {
        const oyuncularWrapper = document.querySelector(".oyuncular-wrapper");

        let castPicture;
        if (oyuncu.profile_path) {
            castPicture = `${creditsUrl}${oyuncu.profile_path}`;
        } else {
            castPicture = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
        }

        oyuncularWrapper.innerHTML += `
        <div class="oyuncu-card">
                <img src="${castPicture}" alt="">
                <h4>${oyuncu.name}</h4>
                <p><strong>Karakter:</strong>${oyuncu.character}</p>
        </div>
        `
    })
}