// Variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];

// Logic
function nextRndmColor() {
  return Math.floor(Math.random() * 4);
}

function playSound(soundColor) {
  var sound = new Audio(`sounds/${soundColor}.mp3`);
  sound.play();
}

function gameStart() {
  $(`#level-title`).text('Level 1');
  var randomChosenColor = buttonColors[nextRndmColor()];
  playSound(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(150).fadeIn(150);
}

$(document).keypress(function (event) {
  gameStart();
});
