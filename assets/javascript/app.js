var timer = 15;
var questionCount = 0;
var questionAnswered = false;

var correctAnswers = ["white", "sphere"];

var questions = [
    { q: "What color is a whiteboard?", a1: "blue", a2: "green", a3: "white", a4: "yellow" },
    { q: "What shape is a basketball?", a1: "sphere", a2: "cube", a3: "cylinder", a4: "cone" }
];

function startUpTrivia() {
    $("#question").text("Question: " + questions[questionCount].q);
    $("#answer1").text(questions[questionCount].a1);
    $("#answer2").text(questions[questionCount].a2);
    $("#answer3").text(questions[questionCount].a3);
    $("#answer4").text(questions[questionCount].a4);

}

startUpTrivia();