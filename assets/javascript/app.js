var timer;
var questionCount = 0;
var incorrectQuestions = 0;
var correctQuestions = 0;
var timedOutQuestions = 0;
var intervalVar;
var isShowingAnswer = false;
var questions = [
    { q: "What is the Attack Power of Blue-Eyes White Dragon?", a1: "2500", a2: "3000", a3: "3500", a4: "3250" },
    { q: "What was the name of the puzzle Yugi Moto solved?", a1: "Millenium", a2: "Pyramid", a3: "Monolith", a4: "Egyptian" },
    { q: "Answer Yugi's riddle: What is something you can show, but can't see?", a1: "Boundaries", a2: "Emotions", a3: "Gravity", a4: "Friendship" },
    { q: "Which is Yugi Moto's most iconic monster card?", a1: "Summoned Skull", a2: "Celtic Guardian", a3: "Dark Magician", a4: "Kuriboh" },
    { q: "What type of card is Stardust Dragon?", a1: "Synchro Monster", a2: "Magic Card", a3: "Trap Card", a4: "Fusion Monster" },
    { q: "End of Quiz!"}
];
var correctAnswers = ["3000", "Millenium", "Friendship", "Dark Magician", "Synchro Monster", "done!"];
var imageArray = ["blue-eyes-white-dragon", "millenium-puzzle", "friendship", "dark-magician", "stardust-dragon"];
var idArray = [$("#card2"), $("#card1"), $("#card4"), $("#card3"), $("#card1")];
var answer1 = questions[questionCount].a1;
var answer2 = questions[questionCount].a2;
var answer3 = questions[questionCount].a3;
var answer4 = questions[questionCount].a4;
var cardID = idArray[questionCount];
var answerChosen = "nothing";
var timerRunning = false;
var questionAnswered = false;

function startUpTrivia() {
    if (questions[questionCount].q === "End of Quiz!") {
        isShowingAnswer = false;
        $("#results").html("Results: We have reached the end of the quiz! <br>");
        $("#results").append("Correct Questions: " + correctQuestions + "<br>");
        $("#results").append("Incorrect Questions: " + incorrectQuestions + "<br>");
        $("#results").append("Timed Out Questions: " + timedOutQuestions + "<br>");
        $("#results").append("Hit the reset button to try again!" + "<br>");
        //Have to get button to show here.
    }
    else {
        $("#question").text(questions[questionCount].q);
        answer1 = questions[questionCount].a1;
        answer2 = questions[questionCount].a2;
        answer3 = questions[questionCount].a3;
        answer4 = questions[questionCount].a4;
        isShowingAnswer = false;
        $("#answer1").text(answer1);
        $("#answer2").text(answer2);
        $("#answer3").text(answer3);
        $("#answer4").text(answer4);
        $("#results").text("Results: ");
        $("#card1").css("background-image", "none");
        $("#card2").css("background-image", "none");
        $("#card3").css("background-image", "none");
        $("#card4").css("background-image", "none");
        cardID = idArray[questionCount];
        timer = 16;
        startTimer();
        timeRemaining();
    }
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
    if (timer === 0 && isShowingAnswer === false) {
        timerRunning = false;
        isShowingAnswer = true;
        clearInterval(intervalVar);
        checkingAnswer();
        imageChanger(cardID, questionCount);
        questionCount++;
        timedOutQuestions++;
        setTimeout(startUpTrivia, 3000);
    }
}

function imageChanger(cardID, index) {
    console.log(cardID);
    console.log(index);
    var imageLink = '("assets/images/' + imageArray[index] + '.jpg")';
    console.log(imageLink);
    cardID.css('background-image', 'url' + imageLink);
    cardID.css('background-size', '100% 100%');

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
    if (isShowingAnswer === false) {
        isShowingAnswer = true;
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
        console.log(answerChosen)
        timerRunning = false;
        clearInterval(intervalVar);
        checkingAnswer();
        imageChanger(cardID, questionCount);
        questionCount++
        setTimeout(startUpTrivia, 3000);
    }
})

$("#reset").on("click", function () {
    questionCount = 0;
    incorrectQuestions = 0;
    correctQuestions = 0;
    timedOutQuestions = 0;
    startUpTrivia();
})

startUpTrivia();