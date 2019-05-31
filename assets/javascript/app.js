var timer = 6;
var questionCount = 0;
var incorrectQuestions = 0;
var correctQuestions = 0;
var intervalVar;
var answerValue;
var questions = [
    { q: "What color is a whiteboard?", a1: "blue", a2: "green", a3: "white", a4: "yellow" },
    { q: "What shape is a basketball?", a1: "sphere", a2: "cube", a3: "cylinder", a4: "cone" }
];
var correctAnswers = ["white", "sphere"];
var answer1 = questions[questionCount].a1;
var answer2 = questions[questionCount].a2;
var answer3 = questions[questionCount].a3;
var answer4 = questions[questionCount].a4;
var answerChosen = "nothing";
var timerRunning = false;
var questionAnswered = false;

function startUpTrivia() {
    $("#question").text("Question: " + questions[questionCount].q);
    $("#answer1").text(answer1);
    $("#answer2").text(answer2);
    $("#answer3").text(answer3);
    $("#answer4").text(answer4);
    startTimer();
    timeRemaining();
}

function startTimer() {
    if (!timerRunning) {

        timerRunning = true;

        intervalVar = setInterval(timeRemaining, 1000);

    }

}

function timeRemaining() {
    timer--;
    $("#timer").html("Time remaining: " + timer);
    if (timer === 0) {
        timerRunning = false;
        clearInterval(intervalVar);
        checkingAnswer();
    }
}

function checkingAnswer() {
    if (answerChosen === correctAnswers[questionCount]) {
        $("#results").html("Results: You are correct! <br>");
        correctQuestions++;
    }
    else {
        if (answerChosen === "nothing") {
            $("#results").html("Results: Time's up! <br>");
            $("#results").append("The correct answer is " + correctAnswers[questionCount] + ".");
            
        }
        else {
            $("#results").html("Results: You are incorrect! <br>");
            $("#results").append("The correct answer is " + correctAnswers[questionCount] + ".");
            incorrectQuestions++;
        }
    }
}

$(".answer").on("click", function () {
    answerChosen = this.value;
    if (answerChosen === "1") {
        answerChosen = answer1;
    }
    if (answerChosen === "2") {
        answerChosen = answer2;
    }
    if (answerChosen === "3") {
        answerChosen = answer3;
    }
    if (answerChosen === "4") {
        answerChosen = answer4;
    }
    timerRunning = false;
    clearInterval(intervalVar);
    checkingAnswer();
})

startUpTrivia();
