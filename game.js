// Variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var randomNumber;
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Logic
function playSound(color) {
  var colorAudio = new Audio(`sounds/${color}.mp3`);
  colorAudio.play();
}

function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text(`Game Over, Press any key to Restart`);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text(`Level ${level}`);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $('.startBtn').show();
}

function animatePress(color) {
  $(`#${color}`).addClass('pressed');
  setTimeout(() => {
    $(`#${color}`).removeClass('pressed');
  }, 100);
}

function startGame() {
  if (!started) {
    if (level == 0) nextSequence();
    started = true;
    $('.startBtn').hide();
  }
}

$('.startBtn').click(() => {
  startGame();
});

$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function (event) {
  startGame();
});
