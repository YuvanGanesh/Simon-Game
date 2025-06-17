//Create a new pattern
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","green","blue","yellow"];
var started=false;
var level=0;

//check which button is pressed
  $(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

  function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //show the sequence to the user with animation and sounds
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//add sound to buttons clicks
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add animation to user clicks
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
}, 100);
}

//start the Game
$(document).keypress(function () {
  if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

//check the user's Answer against the Game Sequence
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("sucess");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    //game over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    startOver();
  }
}

//restart game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

