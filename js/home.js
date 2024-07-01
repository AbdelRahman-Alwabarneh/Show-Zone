if (sessionStorage.getItem("issuccess") === "true") {
  let alert1 = document.getElementById("alert");
  const alert_message = document.getElementById("alert_message");
  alert1.style.display = "flex";
  alert_message.textContent = "Account creation succeeded";
  sessionStorage.setItem("issuccess", false);
  setTimeout(function () {
    alert1.style.display = "none";
  }, 5000);
}
if (sessionStorage.getItem("issuccess2") === "true") {
  let alert1 = document.getElementById("alert");
  const alert_message = document.getElementById("alert_message");
  alert1.style.display = "flex";
  alert_message.textContent = "Login succeeded";
  sessionStorage.setItem("issuccess2", false);
  setTimeout(function () {
    alert1.style.display = "none";
  }, 5000);
}
const firstName = sessionStorage.getItem("firstName");
if (sessionStorage.getItem("issuccess") === "true") {
  let alert1 = document.getElementById("alert");
  alert1.style.display = "flex";

  sessionStorage.setItem("issuccess", false);
  setTimeout(function () {
    alert1.style.display = "none";
  }, 5000);
}

function Series(
  name,
  genres,
  summary,
  image,
  image2,
  rating,
  id,
  premiered,
  schedule
) {
  this.name = name;
  this.genres = genres;
  this.summary = summary;
  this.image = image.medium;
  this.image2 = image.original;
  this.rating = rating.average;
  this.id = id;
  this.premiered = premiered;
  this.schedule = schedule.time;
}

const url = "https://api.tvmaze.com/shows";
fetch(url)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    const seriesArray = json.map(
      item =>
        new Series(
          item.name,
          item.genres,
          item.summary,
          item.image,
          item.image2,
          item.rating,
          item.id,
          item.premiered,
          item.schedule
        )
    );

    const checkboxes = document.querySelectorAll(".checkbox");

    const getSelectedGenres = () => {
      const selectedGenres = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

      return selectedGenres.length > 0 ? selectedGenres : null;
    };

    let arrayyys = [
      "Trending",
      "Upcoming",
      "TV Series",
      "Popular movies in September",
    ];

    const filterMoviesByGenre = (movies, selectedGenres) => {
      if (!selectedGenres) {
        return movies;
      }
      return movies.filter(movie =>
        movie.genres.some(genre => selectedGenres.includes(genre))
      );
    };

    const filterMoviesBySearch = (movies, searchQuery) => {
      if (!searchQuery) {
        return movies;
      }
      return movies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const displayMovies = (movies, limit = 18) => {
      let container = document.getElementById("mo");
      container.innerHTML = "";

      let i = 0;

      movies.slice(0, limit).forEach((ele, index) => {
        if (index % 6 === 0) {
          const cardGrid = document.createElement("div");
          const batata = document.createElement("div");

          batata.innerHTML = arrayyys[i] ?? "";
          cardGrid.className = "card-grid";
          container.appendChild(batata);
          cardGrid.setAttribute("data-aos", "fade-up");
          cardGrid.setAttribute("data-aos-duration", "1000");

          container.appendChild(cardGrid);
          if (i < 6) {
            i++;
          }
        }

        const card = document.createElement("div");
        card.className = "card";

        const content = `
        <div style = "margin:0; position:relative">
          <a href="pages/movieDetails.html">
          <img src="${ele.image}" alt="${
          ele.name
        }" style="width:100%; height:100%;">
          </a>
          <div class="container" style="position: absolute; bottom:0; left:0; color:#fff; cursor:pointer; opacity:0; transition:.5s">

          <p style="font-size: 20px; font-weight: bold; margin: 0; padding: 0;">${
            ele.name
          }</p>
          <p style="font-size: 15px; margin: 0; padding: 0;">${ele.genres.join(
            ", "
          )}</p>
            
          </div>
        `;
        card.innerHTML = content;
        card.onclick = function () {
          location.href = "pages/movieDetails.html";
        };
        container.lastElementChild.appendChild(card);
        card.addEventListener("click", () => {
          sessionStorage.setItem("movie", JSON.stringify(ele));
        });
        card.addEventListener("mouseover", () => {
          sessionStorage.setItem("movieOver", JSON.stringify(ele));
          card.querySelector(".container").style.opacity = 1;
        });
        card.addEventListener("mouseout", () => {
          card.querySelector(".container").style.opacity = 0;
        });
      });
    };

    const updateDisplay = () => {
      const selectedGenres = getSelectedGenres();
      const searchQuery = document.querySelector(".inputbar").value;

      // Reset arrayyys based on filters
      if (selectedGenres || searchQuery) {
        arrayyys = "";
      } else {
        arrayyys = [
          "Trending",
          "Upcoming",
          "TV Series",
          "Popular movies in September",
        ];
      }

      let filteredMovies = filterMoviesByGenre(seriesArray, selectedGenres);
      filteredMovies = filterMoviesBySearch(filteredMovies, searchQuery);

      // Display all filtered movies if filters are applied, otherwise display only 16
      if (selectedGenres || searchQuery) {
        displayMovies(filteredMovies, filteredMovies.length);
      } else {
        displayMovies(filteredMovies, 18);
      }
    };

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", updateDisplay);
    });

    document
      .querySelector(".inputbar")
      .addEventListener("input", updateDisplay);

    // Initial display of all series
    displayMovies(seriesArray, 18);
  })
  .catch(err => {
    console.error("error:" + err);
  });
document.addEventListener("DOMContentLoaded", function () {
  const welcome_Website = document.getElementById("welcome_Website");
  const Name_User = document.getElementById("icon");
  const Image_logo_user = document.getElementById("Image_logo_user");
  const Log_In_js = document.getElementById("Log_In");
  const Logo_user_2 = document.getElementById("Logo_user_2");
  if (firstName) {
    if (welcome_Website) welcome_Website.style.display = "none";
    if (Log_In_js) Log_In_js.style.display = "none";
    if (Logo_user_2) Logo_user_2.style.display = "inline";

    const welcomeMessage = document.getElementById("welcome_message");
    if (welcomeMessage) welcomeMessage.textContent = `Welcome ${firstName}`;
    if (Name_User) Name_User.innerHTML = `${firstName}`;
  }

  if (Log_Out_user) {
    Log_Out_user.addEventListener("click", function () {
      // إزالة بيانات المستخدم من sessionStorage
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("issuccess");
      sessionStorage.removeItem("issuccess2");
      sessionStorage.removeItem("movie");

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = "pages/login.html";
    });
  }
});
