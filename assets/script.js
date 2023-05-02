var playerEl = document.querySelector("#search");
var image = document.querySelector("#image");
var pict = document.querySelector("#pic")
var firstNamePlayer = document.querySelector("#first-name");
var lastNamePlayer = document.querySelector("#last-name");
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links");
var team = document.querySelector('#team');
var conference = document.querySelector('#conference');
var division = document.querySelector('#division');
var position = document.querySelector('#position');
var height = document.querySelector('#height');
var inches = document.querySelector('#inches');
var weight = document.querySelector('#weight');
var points = document.querySelector('#points');
var assists = document.querySelector('#assists');
var rebounds = document.querySelector('#rebounds');
var steals = document.querySelector('#steals');
var turnovers = document.querySelector('#turnovers');
var links = [];
//Mobile Menu
burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}

//Default giffys

fetch(`https://api.giphy.com/v1/gifs/search?q=NBA}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
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

var profile = [];


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
fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}+${lastName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    console.log(data)
    team.textContent = data.data[0].team.full_name
    conference.textContent = data.data[0].team.conference
    division.textContent = data.data[0].team.division
    position.textContent = data.data[0].position
    height.textContent = data.data[0].height_feet
    inches.textContent = data.data[0].height_inches
    weight.textContent = data.data[0].weight_pounds
    profile.push(data.data[0].id);
    for(var i = 0; i < profile.length; i++){
     playerStats = profile[i];
    }
    
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
      console.log(info)
      points.textContent = info.data[0].pts
      assists.textContent = info.data[0].ast
      rebounds.textContent = info.data[0].reb
      steals.textContent = info.data[0].stl
      turnovers.textContent = info.data[0].turnover

    })
  })
  fetch(`https://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=100`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    console.log(info)
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    // console.log(randomItem.images.original.url);
    var giffy = randomItem.images.original.url;
    links.push(giffy);
    var ghiphy = document.createElement("img");
    ghiphy.src = links;
    image.append(ghiphy);
  })
  localStorage.setItem("favorite", saved)

});
