var playerEl = document.querySelector("#search");
var firstNamePlayer = document.querySelector("#first-name");
var lastNamePlayer = document.querySelector("#last-name");

// var firstName = firstNamePlayer.value
// var lastName = lastNamePlayer.value
var stats = [];

playerEl.addEventListener("click", function () {
  var firstName = firstNamePlayer.value
  console.log(firstName);
  var lastName = lastNamePlayer.value
  console.log(lastName);
fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}&search=${lastName}`)
  .then(function (answer) {
    // console.log(answer)
    return answer.json();
  })
  .then(function (data) {
    console.log(data)
    stats.push(data.data[0].id);
    console.log(stats);
    fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${stats}&seasons=2022`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
        console.log(info);
    })
  })
  fetch(`http://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=5`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    console.log(info);
    console.log(info.data[0].images.original.url);
  })
});