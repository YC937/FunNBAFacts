// All the variables.
var playerEl = document.querySelector("#search");
var clear = document.querySelector("#clear");
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
var resultsBox = document.querySelector("#results-box");
var feedback = document.querySelector("#feedback");
var modal = document.querySelector(".modal");
var submit = document.querySelector("#submit");


var links = [];

//Initial function.
function init() {

//Modal for season's year
feedback.addEventListener("click", function () {
  modal.classList.add("is-active");
})

submit.addEventListener("click", function () {
  modal.classList.add("is-active");
})

//Clear button function
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})
// Ghiphy fetch
  fetch(`https://api.giphy.com/v1/gifs/search?q=NBA&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    var giff = randomItem.images.original.url;
    // Creating image.
    var ghiph = document.createElement("img");
    // Adding the source to the image.
    ghiph.src = giff;
    // Apending the image
    image.append(ghiph);
    links.push(giff);
  })
  // Getting player's info from local storage
  var basketballPlayerList = [];
  basketballPlayerList = JSON.parse(localStorage.getItem("searchedPlayers"));
if(basketballPlayerList !== null) {
  for(var i = 0; i < basketballPlayerList.length; i++) {
    // Creating buttons for prebious serached players
    var listEl = document.createElement("button");
    // Adding attributes to buttons
    listEl.textContent = basketballPlayerList[i];
    listEl.setAttribute("class", "columns is-vcentered button mt-2 mx-2 is-primary has-text-info-dark has-text-weight-bold");
    // Apending buttons
    resultsBox.append(listEl);

    listEl.addEventListener("click", searchHistoryBtn);
  }
  
}
};

//Function when we click previous searched players and we display data on the website
function searchHistoryBtn () {
  image.innerHTML = " ";
var basketballName = (this.textContent);
// Fetching giphy.
fetch(`https://api.giphy.com/v1/gifs/search?q=${basketballName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
.then(function (response) {
  return response.json();
})
.then(function (info) {
  var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
  // Selecting random giphy
  var giffi = randomItem.images.original.url;
  links.push(giffi);
  // Creating image
  var ghiphi = document.createElement("img");
  for(var i = 0; i < links.length; i++) {
  // Adding the source to the image
  ghiphi.src = links[i];
  }
  // Appending the image.
  image.append(ghiphi);
})

//Fetching player's info from API.
fetch(`https://www.balldontlie.io/api/v1/players?search=${basketballName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    // Appending the player's info from the API to our website
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
    // Fetching player's stats from the API
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
      // Appending player's stats from the API to our website
      points.textContent = info.data[0].pts
      assists.textContent = info.data[0].ast
      rebounds.textContent = info.data[0].reb
      steals.textContent = info.data[0].stl
      turnovers.textContent = info.data[0].turnover

    })
  })
  
};


//Mobile Menu
burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}


// Adding search button function
var profile = [];

playerEl.addEventListener("click", function () {
  image.innerHTML = "";
  links.length = 0;
  var firstName = firstNamePlayer.value
  if(firstName === "") {
    location.reload();
    list.remove();
  }
  var lastName = lastNamePlayer.value
  if(lastName === "") {
    location.reload();
    list.remove();
  }
  // Fetching the player's info from the API to our website
fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}+${lastName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    // Appending the info from the API to our website
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
    // Fetching player's stats from the API to our website
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
      //Appending player's stats from the API to our website
      points.textContent = info.data[0].pts
      assists.textContent = info.data[0].ast
      rebounds.textContent = info.data[0].reb
      steals.textContent = info.data[0].stl
      turnovers.textContent = info.data[0].turnover

    })
  })
  // Fetching giphy from the APi
  fetch(`https://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
  // Selecting random giphy
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    var giffy = randomItem.images.original.url;
    links.push(giffy);
    // Create image 
    var ghiphy = document.createElement("img");
    // Add source to the image 
    ghiphy.src = links;
    // Append the image
    image.append(ghiphy);
  })
  // Getting data from local storage
  var playerList = JSON.parse(localStorage.getItem("searchedPlayers")) || [];
playerList.push(firstNamePlayer.value + " " + lastNamePlayer.value);
// Creating local storage
localStorage.setItem("searchedPlayers",JSON.stringify(playerList));
//Displaying the cities in the local storage into the website.
for(var i = 0; i < playerList.length; i++) {
  var playerList = [];
  playerList.push(firstNamePlayer.value + " " + lastNamePlayer.value);
  //Creating buttons.
  var list = document.createElement("button");
  list.textContent = playerList[i];
  //Setting attributes to those buttons.
  list.setAttribute("class", "columns is-vcentered button mt-2 mx-2 is-primary has-text-info-dark has-text-weight-bold");
  //Appending these buttons.
  resultsBox.append(list);

  // Previous searched players buttons function

  list.addEventListener("click", searchBtn);

  function searchBtn () {

    image.innerHTML = " ";
    console.log(this.textContent);
    var basketballName = (this.textContent);
    // Fetching giphy from the API
    fetch(`https://api.giphy.com/v1/gifs/search?q=${basketballName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      // Selecting random giphy
      var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
      var giffi = randomItem.images.original.url;
      links.push(giffi);
      // Creating image
      var ghiphi = document.createElement("img");
      for(var i = 0; i < links.length; i++) {
        // Adding source to the image
      ghiphi.src = links[i];
      }
      // Appending the image
      image.append(ghiphi);
    })
    
    //Fetching player's info from API.
    fetch(`https://www.balldontlie.io/api/v1/players?search=${basketballName}`)
      .then(function (answer) {
        return answer.json();
      })
      .then(function (data) {
        // Appending player's info from the API to our website
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
        // Fetching the player's stats from the API to our website
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (info) {
          // Appending player's stats from the API to our website
          points.textContent = info.data[0].pts
          assists.textContent = info.data[0].ast
          rebounds.textContent = info.data[0].reb
          steals.textContent = info.data[0].stl
          turnovers.textContent = info.data[0].turnover
    
        })
      })

  }


}});


init();