var totalSeconds = 60;
var secondsElapsed = 0;
var interval;
var score = [0];
var userName = document.getElementById("userName");
var userScoreEl = document.getElementById("user-score");
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var secondsLeft;
var startButton = document.querySelector("#startQuiz");
var submitBtn = document.querySelector("#submitBtn");
var resetButton = document.querySelector("#restartBtn");
var clearButton = document.querySelector("clearBtn");
var secondsDisplay = document.querySelector("#Timer");
var quizArea = document.querySelector(".container");
var scoreArea = document.querySelector("#score-list");
var questions = [
  {
    title: "Which tag would you use to code in Javascript?",
    choices: ["<java>", "<body>", "<script>", "<img>"],
    answer: "<script>"
  },
  {
    title: "What would you use to enclose a function?",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "curly brackets"
  },
  {
    title: "Which Library would be used exclusivly to style an object",
    choices: ["bootstrap", "Jquery", "Java", "Richmond public"],
    answer: "bootstrap"
  },
  {
    title: "What identifier is used on a Class?",
    choices: ["#", ".", "*", "&"],
    answer: "."
  },
  {
    title: "What is a DOM in JavaScript?",
    choices: ["Data of Mine", "Document of Master", "Data Object Modal", "Document Object Model"],
    answer: "Document Object Model"
  },

];

//starts timer and displays question/answer feild when user clicks start button
function startTimer() {
  document.getElementById("home").classList.add('d-none');
  document.getElementById("quiz").classList.remove('d-none');
  document.getElementById("highScoresheet").classList.add('d-none')
  interval = setInterval(function () {
    secondsElapsed++;
    secondsLeft = (totalSeconds - secondsElapsed);
    secondsDisplay.innerHTML = ("Time: " + secondsLeft);
    if (secondsLeft === 0) {
      stopTimer()
      return;
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(interval)
  displayScore()
}

//runs question/answer array when user clicks start button
function questionroll() {
  questionNumber++;

  answer = questions[questionNumber].answer;

  questionHead.textContent = questions[questionNumber].title;
  answerChoices.innerHTML = "";
  if (questionNumber >= 4) {
    stopTimer();
    displayScore();
  }

  var choices = questions[questionNumber].choices;

  for (var i = 0; i < choices.length; i++) {
    var nextChoice = document.createElement("button");

    nextChoice.textContent = choices[i]
    answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");

  }

}
answerChoices.addEventListener("click", function (event) {
  var pEl = document.getElementsByClassName("feedback")[0]


  if (answer === event.target.textContent) {
    pEl.innerHTML = "Correct!";
    score++;
    showFeedback();
  } else {
    pEl.innerHTML = "Sorry, that's incorrect.";
    showFeedback();
  }
  questionroll();

});

//subtle alert for user based on a correct/incorrect answer choice 
function hideFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0]
  pEl.style.display = 'none'
}
function showFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0]
  pEl.removeAttribute('style');
}

//displays user score and displays input for username to be stored on highscore list
function displayScore() {
  document.getElementById("quiz").classList.add('d-none');
  document.getElementById("submit-score").classList.remove('d-none');
  userScoreEl.textContent = "Your final score is " + score + "/4 in " + secondsElapsed + " seconds";
  var recScore = userScoreEl.textContent;
  document.getElementById("highScoresheet").classList.remove('d-none')
  myJSON = JSON.parse(recScore)
  localStorage.setItem("scoreJSON", recScore);
}
function addScore() {
  var text = localStorage.getItem("scoreJSON");
  var obj = JSON.parse(text);
  document.getElementById("score-list").innerHTML = obj.text;
}
function reset() {
  document.getElementById("home").classList.add('d-none');
  document.getElementById("quiz").classList.remove('d-none');
  document.getElementById("highScoresheet").classList.add('d-none')
}



startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", questionroll);
submitBtn.addEventListener("click", addScore);
clearButton.addEventListener("click", clearscores);
resetButton.addEventListener("click", reset);


