// ! Sol ve Sağ butonuna tıkladığımda resimleri kaydırmak için;
const leftBtn = document.querySelector("#left_btn");
const rightBtn = document.querySelector("#right_btn");
const cards = document.querySelector(".cards");

leftBtn.addEventListener("click", function () {
    cards.scrollLeft -= 140;
});

rightBtn.addEventListener("click", function () {
    cards.scrollLeft += 140;
});

// ! acilis sayfasindaki oynat durdur islemli;

const videoOynat = () => {
    const video = document.querySelector("video");
    const play = document.querySelector("#play");

    play.addEventListener("click", function () {
        if (video.paused) {
            play.innerHTML = `Play <i class="fa-solid fa-pause"></i>`
            video.play();
        } else {
            play.innerHTML = `Watch <i class="fa-solid fa-play"></i>`
            video.pause()
        }
    })

}
videoOynat();

// !acilis sayfasindaki download olayi icin;
const videoDownload = () => {
    const downloadBtn = document.querySelector("#download_main");
    downloadBtn.addEventListener("click", () => {
        const video = document.querySelector("video");
        const videoSource = video.src;
        const downloadLink = document.createElement("a");
        downloadLink.href = videoSource;
        downloadLink.download = "video.mp4";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    })
};
videoDownload();

// ! Sayfaya json dosyasından verileri getirme işlemi
const url = "movie.json";
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        data.forEach((film) => {
            // console.log(film.name)
            filmBilgileriniEkle(film);
        })
        arkaPlanYap(data);
    });


const filmBilgileriniEkle = (film) => {
    cards.innerHTML += `
    <a href="#" class="card" data-video="video/${film.trailer}">
      <img class="poster" src="${film.sposter}" alt="">
          <div class="rest_card">
              <img src="${film.bposter}" alt="">
              <div class="cont">
                  <h4>${film.name}</h4>
                  <div class="sub">
                      <p>${film.genre},${film.date}</p>
                      <h3><span>IMDB</span><i class="fa-solid fa-star"></i>${film.imdb}</h3>
                  </div>
              </div>
          </div>
      </a>
    `
}

const arkaPlanYap = (data) => {
    const indexVideo = document.querySelector("#index-video");
    const movieCards = document.querySelectorAll(".card");

    movieCards.forEach((movieCard, index) => {
        // console.log(movieCard)
        movieCard.addEventListener("click", function () {
            const trailer = movieCard.getAttribute("data-video");

            if (trailer) {
                indexVideo.src = trailer;
            }
            if (trailer == "video/") {
                indexVideo.src = `video/johnwick.webm`
            }

            selectedMovie = data[index];
            const content = document.querySelector(".content");

            content.innerHTML = `
        <h1 id="title">${selectedMovie.name}</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos delectus dolore quibusdam alias a repellendus vel voluptate unde velit inventore, maiores rerum corporis, sequi soluta omnis aspernatur corrupti voluptatibus maxime!</p>
        <div class="details">
            <h6>A Netflix Original Film</h6>
            <h6 id="gen">${selectedMovie.genre}</h6>
            <h6>${selectedMovie.date}</h6>
            <h6 id="rate"><span>IMDB</span><i class="bi bi-star-fill"></i>${selectedMovie.imdb}</h6>
        </div>
        <div class="btns">
            <a href="#" id="play">Watch<i class="bi bi-play-fill"></i></a>
            <a href="#" id="download_main"><i class="bi bi-cloud-arrow-down-fill"></i></a>
        </div>
        `

            videoOynat();
            videoDownload();
        })
    })
}