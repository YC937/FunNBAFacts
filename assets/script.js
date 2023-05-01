var playerEl = document.querySelector("#search");
var image = document.querySelector("#image");
var firstNamePlayer = document.querySelector("#first-name");
var lastNamePlayer = document.querySelector("#last-name");
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links")

//Mobile Menu
burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}

// var firstName = firstNamePlayer.value
// var lastName = lastNamePlayer.value
var stats = [];

playerEl.addEventListener("click", function () {
  var firstName = firstNamePlayer.value
  if(firstName === "") {
    location.reload();
  }
  console.log(firstName);
  var lastName = lastNamePlayer.value
  if(lastName === "") {
    location.reload();
  }
  console.log(lastName);
fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}+${lastName}`)
  .then(function (answer) {
    // console.log(answer)
    return answer.json();
  })
  .then(function (data) {
    console.log(data)
    stats.push(data.data[0].id);
    console.log(stats);
    var playerStats = stats[0];
    console.log(playerStats);
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
        console.log(info);
    })
  })
  fetch(`http://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=10`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    console.log(info);
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    // console.log(randomItem.images.original.url);
    var giffy = randomItem.images.original.url;
    console.log(giffy);
    var ghiphy = document.createElement("img");
    ghiphy.src = giffy;
    image.append(ghiphy)
  })
});