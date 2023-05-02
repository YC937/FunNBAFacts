var playerEl = document.querySelector("#search");
var image = document.querySelector("#image");
var pict = document.querySelector("#pic")
var firstNamePlayer = document.querySelector("#first-name");
var lastNamePlayer = document.querySelector("#last-name");
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links")
var links = [];
//Mobile Menu
burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}

//Default giffys

fetch(`https://api.giphy.com/v1/gifs/search?q=NBA&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    // console.log(randomItem.images.original.url);
    var giff = randomItem.images.original.url;
    var ghiph = document.createElement("img");
    ghiph.src = giff;
    image.append(ghiph);
    links.push(giff);
  });

var stats = [];

playerEl.addEventListener("click", function () {
  image.innerHTML = "";
  links.length = 0;
  var firstName = firstNamePlayer.value
  if(firstName === "") {
    location.reload();
  }
  var lastName = lastNamePlayer.value
  if(lastName === "") {
    location.reload();
  }
fetch(`http://www.balldontlie.io/api/v1/players?search=${firstName}+${lastName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    stats.push(data.data[0].id);
    var playerStats = stats[0];
    fetch(`http://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
    })
  })
  fetch(`https://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=100`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    // console.log(randomItem.images.original.url);
    var giffy = randomItem.images.original.url;
    links.push(giffy);
    var ghiphy = document.createElement("img");
    ghiphy.src = links;
    image.append(ghiphy);
  })
});
