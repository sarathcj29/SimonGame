// Variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var randomNumber;
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Logic
function playSound(color) {
  var colorAudio = new Audio(`sounds/${color}.mp3`);
  colorAudio.play();
}

function checkAnswer(index) {
  console.log(gamePattern, userClickedPattern);
  if (gamePattern[index] === userClickedPattern[index]) {
    userClickedPattern = [];
    nextSequence();
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text(`Game Over, Press any key to Restart`);
  }
}

function nextSequence() {
  level++;
  $('h1').text(`Level ${level}`);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
}

function restartGame() {}

function animatePress(color) {
  $(`#${color}`).addClass('pressed');
  setTimeout(() => {
    $(`#${color}`).removeClass('pressed');
  }, 100);
}

$('.btn').click(function (event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (gamePattern.length == userClickedPattern.length)
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function (event) {
  console.log(event);
  if (level == 0) nextSequence();
  else restartGame();
});
