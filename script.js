var totalSeconds = 60;
var secondsElapsed = 0;
var interval;
var score = [0];
var userScoreEl = document.getElementById("user-score");
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var answer;
var secondsLeft = (totalSeconds - secondsElapsed);
var startButton = document.querySelector("#startQuiz");
var submitBtn = document.querySelector("#submitBtn");
var secondsDisplay = document.querySelector("#Timer");
var quizArea = document.querySelector(".container")
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


function startTimer() {
  document.getElementById("home").classList.add('d-none');
  document.getElementById("quiz").classList.remove('d-none');
  document.getElementById("highScoresheet").classList.remove('d-none')
  interval = setInterval(function () {
    secondsElapsed++;
    renderTime();
  }, 1000);
}
function renderTime() {
  var secondsLeft = (totalSeconds - secondsElapsed);
  secondsDisplay.textContent = ("Time: " + secondsLeft);
  if (secondsLeft === 0 || questionNumber === questions.length) {
    clearInterval(interval);
    setTimeout(displayScore, 500);
    questionroll();
  }
}

function stopTimer() {
  secondsElapsed = 0;
  renderTime();
}

function questionroll() {
  questionNumber++;
  answer = questions[questionNumber].answer

  questionHead.textContent = questions[questionNumber].title;
  answerChoices.innerHTML = "";

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
    score ++;
    showFeedback();
  } else {
    pEl.innerHTML = "Sorry, that's incorrect.";
    score --;
    showFeedback();
  }
  questionroll();
});
function hideFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0]
  pEl.style.display = 'none'
}

function showFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0]
  pEl.removeAttribute('style');
}

function displayScore() {
  document.getElementById("quiz").classList.add('d-none');
  document.getElementById("submit-score").classList.remove('d-none');
  userScoreEl.textContent = "Your final score is " + score + "/5 in " + secondsElapsed + " seconds";
}

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", questionroll);
submitBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  addScore();

  window.location.href = './highscores.html'
});

