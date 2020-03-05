var totalSeconds = 90;
var secondsElapsed = 0;
var interval;
var secondsLeft = totalSeconds - secondsElapsed;
var status = "Working";
var playButton = document.querySelector("#Startquiz");
var secondsDisplay = document.querySelector("#Timer");


function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed)
  
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
  }

function startTimer() {
    interval = setInterval(function() {
      secondsElapsed++;
      renderTime();
    }, 1000);
  }

function renderTime() {
    secondsDisplay.textContent = ("Time: " + getFormattedSeconds());

    if (secondsElapsed >= totalSeconds) {
      if (status === "Working") {
        alert("Time for a break!");
      } 
  
      stopTimer();
    }
  }
  function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
  }


  playButton.addEventListener("click", startTimer);