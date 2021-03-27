var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

            /*ey event*/
$(document).keypress(function() {
  if (!started) { //if false
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



//main logic

function nextSequence() {
  userClickedPattern = []; //resetting array.

  level = level + 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //console.log
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};

/*Click event*/
$(".btn").click(function() {
var userChosenColour = $(this).attr("id"); //id : red,green,blue,yellow
userClickedPattern.push(userChosenColour);
//console.log(userClickedPattern);

playSound(userChosenColour);
animatePress(userChosenColour);

console.log("userClickPattern: "+userClickedPattern);
checkAnswer(userClickedPattern.length - 1); //get last index of what user clicked

});

function checkAnswer(currentLevel) {
//console.log(currentLevel);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("true");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}




//$(".btn").fadeOut(100).fadeIn(100);
