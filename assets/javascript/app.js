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
    { q: "Which of the following is not an Egyptian God card?", a1: "Obelisk The Tormentor", a2: "Mystical Beast of Serket", a3: "Winged Dragon of Ra", a4: "Slifer The Sky Dragon"},
    { q: "Who is Kaiba's little brother?", a1: "Mokuba", a2: "Madara", a3: "Minato", a4: "Makoto"},
    { q: "What is Pegasus' card that lets him summon his monsters?", a1: "Malefic World", a2: "Zombie World", a3: "Toon World", a4: "Clear World"},
    { q: "What is Mai Valentine's deck archetype in the first season?", a1: "Fiends", a2: "Warriors", a3: "Spellcasters", a4: "Harpies"},
    { q: "What is the name of the monster that a player can win with if he/she has five specific cards in their hand?", a1: "The Creator", a2: "Gate Guardian", a3: "Black Luster Soldier", a4: "Exodia The Forbidden One" },
    { q: "End of Quiz!"}
];
var correctAnswers = ["3000", "Millenium", "Friendship", "Dark Magician", "Synchro Monster", "Mystical Beast of Serket", "Mokuba", "Toon World", "Harpies", "Exodia The Forbidden One", "done!"];
var imageArray = ["blue-eyes-white-dragon", "millenium-puzzle", "friendship", "dark-magician", "stardust-dragon", "mysticalbeastofserket", "mokuba", "toon-world", "harpie", "exodia"];
var idArray = [$("#card2"), $("#card1"), $("#card4"), $("#card3"), $("#card1"), $("#card2"), $("#card1"), $("#card3"), $("#card4"), $("#card4")];
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
        $("#reset").removeClass("d-none");
        $(".cards").addClass("d-none");
        $("#question-card").addClass("d-none");
        $("#timer-card").addClass("d-none");
        $(".line").addClass("d-none");
    }
    else {
        $("#question").text(questions[questionCount].q);
        answerChosen = "nothing";
        answer1 = questions[questionCount].a1;
        answer2 = questions[questionCount].a2;
        answer3 = questions[questionCount].a3;
        answer4 = questions[questionCount].a4;
        isShowingAnswer = false;
        $("#reset").addClass("d-none");
        $(".cards").removeClass("d-none");
        $("#question-card").removeClass("d-none");
        $("#timer-card").removeClass("d-none");
        $(".line").removeClass("d-none");
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
        timer = 2;
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
            timedOutQuestions++;
            console.log(timedOutQuestions);
        }
        else {
            $("#results").html("Results: You are incorrect! <br>");
            $("#results").append("The correct answer is " + correctAnswers[questionCount] + ".");
            incorrectQuestions++;
            console.log(incorrectQuestions);
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