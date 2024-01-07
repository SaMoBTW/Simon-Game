buttonColors = ["red", "blue", "green", "yellow"]; // set color array
gamePattern = []; // game pattern
userClickedPattern = []; // user's pattern
level = 0;

// click event listener
$(".btn").on("click", function () {
  // adds clicked color to userClickedPattern array
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  // play sound
  playSound(userChosenColor);

  console.log("User clicked pattern: " + userClickedPattern);

  checkPattern(userClickedPattern.length - 1);
});

function playSound(name) {
  // play sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // play sound
  playSound(randomChosenColor);

  // button animation
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  $("h1").text("Level: " + level);

  level++;

  userClickedPattern = [];
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", nextSequence);

function checkPattern(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    restart();
  }
}

function restart() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
