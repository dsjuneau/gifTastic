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
  var finalURL = requestURL + veggie;
  $.ajax({ url: finalURL, method: "GET" }).then(function(response) {
    console.log(requestURL);
    console.log(response);
    for (var i = 0; i < 10; i++) {
      var $gifHolder = $(".gif-holder");
      var $newDiv = $("<div>").addClass("card col-sm-3 gif" + i);
      var $newImg = $("<img>").addClass("card-img-top");
      var $newDivBody = $("<div>").addClass("card-body");
      var $newP = $("<p>").addClass("card-text");
      $newImg.attr("src", response.data[i].images.downsized_still.url);
      $newP.text(response.data[i].rating);
      $newImg.appendTo($newDiv);
      $newP.appendTo($newDivBody);
      $newDivBody.appendTo($newDiv);
      $newDiv.appendTo($gifHolder);
      //Store URLs in an array.
    }
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
