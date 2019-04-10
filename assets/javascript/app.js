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
var gifUrlArray = [];
var toggleSwitch = true;
var ext = 0;

// Pull gifs, populate page, store urls in an array for later use
function getGifs(veggie) {
  var finalURL = requestURL + veggie;
  $.ajax({ url: finalURL, method: "GET" }).then(function(response) {
    console.log(response);
    for (var i = 0; i < 10; i++) {
      var $gifHolder = $(".gif-holder");
      var $newDiv = $("<div>").addClass("card col-sm-3");
      $newDiv.attr("value", i + ext);
      var $newImg = $("<img>").addClass("card-img-top");
      $newImg.attr("data-id", i + ext);
      var $newDivBody = $("<div>").addClass("card-body");
      var $newP = $("<p>").addClass("card-text");
      var $newP1 = $("<p>").addClass("card-text");
      var $newP2 = $("<p>").addClass("card-text");
      $newImg.attr("src", response.data[i].images.downsized_still.url);
      $newP.text("Rating: " + response.data[i].rating);
      $newP1.text("Title: " + response.data[i].title);
      if (response.data[i].username === "") {
        $newP2.text("Username: Unknown");
      } else {
        $newP2.text("Username: " + response.data[i].username);
      }
      $newImg.appendTo($newDiv);
      $newP.appendTo($newDivBody);
      $newP1.appendTo($newDivBody);
      $newP2.appendTo($newDivBody);
      $newDivBody.appendTo($newDiv);
      $gifHolder.prepend($newDiv);
      gifUrlArray[i + ext] = [
        response.data[i].images.downsized_still.url,
        response.data[i].images.original.webp
      ];
    }
    ext += 10;
  });
}

// Toggle between gif and still image
function toggleGif(gifId) {
  var currentUrl = $("[data-id=" + gifId + "]").attr("src");

  if (currentUrl.includes("s.gif")) {
    $("[data-id=" + gifId + "]").attr("src", gifUrlArray[parseInt(gifId)][1]);
  } else {
    $("[data-id=" + gifId + "]").attr("src", gifUrlArray[parseInt(gifId)][0]);
  }
}

function populateButtons() {
  for (var i = 0; i < topics.length; i++) {
    var $newButton = $("<button>").text(topics[i]);
    $newButton.addClass("btn btn-success btn-sm veggie mr-2 my-2");
    $newButton.attr("value", topics[i]);
    $newButton.appendTo($(".button-holder"));
  }
}

// Main Program

$(document).ready(function() {
  populateButtons();
  $(document.body).on("click", ".veggie", function() {
    getGifs($(this).attr("value"));
  });

  $("#addVeggie").click(function(e) {
    e.preventDefault();
    var veggie = $("input")
      .val()
      .trim();

    if (veggie !== "") {
      topics.push(veggie);
      $(".button-holder").empty();
      populateButtons();
      $("input").val("");
    }
  });

  $(document.body).on("click", ".card", function() {
    toggleGif($(this).attr("value"));
  });
});
