// gifTastic app for exploring APIs

// Variables

var apiKey = "gOFweX8DFJNwBF8oAknmZryJWr6BXO4U";
var requestURL =
  "https://api.giphy.com/v1/gifs/search?lang=en&limit=10&rating=PG&api_key=" +
  apiKey +
  "&q=";
var topics = [
  "broccoli",
  "green-beans",
  "spinach",
  "eggplant",
  "cucumber",
  "onion",
  "squash",
  "celery",
  "asparagus",
  "brussel-sprouts"
];

function getGifs(veggie) {
  requestURL = requestURL + veggie;
  $.ajax({ url: requestURL, method: "GET" }).then(function(response) {
    console.log(response);
    //Look at response
    //Set up Gifs
  });
}

$(document).ready(function() {
  for (var i = 0; i < topics.length; i++) {
    var $newButton = $("<button>").text(topics[i]);
    $newButton.addClass("btn btn-success btn-sm veggie mr-2 my-2");
    $newButton.attr("value", topics[i]);
    $newButton.appendTo($(".button-holder"));
  }
  $(".veggie").on("click", function() {
    getGifs($(this).attr("value"));
  });
});
