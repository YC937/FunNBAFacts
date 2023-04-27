var firtName = "Joel"
var lastName = "Embiid"
var stats = []
fetch(`https://www.balldontlie.io/api/v1/players?search=${firtName}&search=${lastName}`)
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
  });