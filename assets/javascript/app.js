var timer;
var questionCount = 0;
var incorrectQuestions = 0;
var correctQuestions = 0;
var intervalVar;
var answerValue;
var questions = [
    { q: "What is the Attack Power of Blue-Eyes White Dragon", a1: "2500", a2: "3000", a3: "3500", a4: "3250" },
    { q: "What color is a whiteboard?", a1: "blue", a2: "green", a3: "white", a4: "yellow" },
    { q: "What shape is a basketball?", a1: "sphere", a2: "cube", a3: "cylinder", a4: "cone" }
];
var correctAnswers = ["3000","white", "sphere"];
var imageArray = ["blue-eyes-white-dragon"];
var answer1 = questions[questionCount].a1;
var answer2 = questions[questionCount].a2;
var answer3 = questions[questionCount].a3;
var answer4 = questions[questionCount].a4;
var card1 = $("#card1");
var card2 = $("#card2");
var card3 = $("#card3");
var card4 = $("#card4");
var answerChosen = "nothing";
var timerRunning = false;
var questionAnswered = false;

function startUpTrivia() {
    $("#question").text("Question: " + questions[questionCount].q);
    answer1 = questions[questionCount].a1;
    answer2 = questions[questionCount].a2;
    answer3 = questions[questionCount].a3;
    answer4 = questions[questionCount].a4;
    $("#answer1").text(answer1);
    $("#answer2").text(answer2);
    $("#answer3").text(answer3);
    $("#answer4").text(answer4);
    $("#results").text("Results: ");
    card1.css("background-image", "none");
    card2.css("background-image", "none");
    card3.css("background-image", "none");
    card4.css("background-image", "none");
    timer = 16;
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
        questionCount++
        setTimeout(startUpTrivia, 3000);
    }
}

function imageChanger(cardID, index) {
    console.log(cardID);
    console.log(index);
    var imageLink = '("assets/images/' + imageArray[index] + '.jpg")';
    console.log(imageLink);
    cardID.css('background-image', 'url' + imageLink);
    // cardID.css('background-image', 'url("assets/images/blue-eyes-white-dragon.jpg")');
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
    var cardID;
    if (answerChosen === "1") {
        answerChosen = answer1;
        cardID = card1;
    }
    if (answerChosen === "2") {
        answerChosen = answer2;
        cardID = card2;
    }
    if (answerChosen === "3") {
        answerChosen = answer3;
        cardID = card3;
    }
    if (answerChosen === "4") {
        answerChosen = answer4;
        cardID = card4;
    }
    console.log(answerChosen)
    timerRunning = false;
    clearInterval(intervalVar);
    checkingAnswer();
    imageChanger(cardID, questionCount);
    questionCount++
    setTimeout(startUpTrivia, 3000);
})

startUpTrivia();