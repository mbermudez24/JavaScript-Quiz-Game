const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const homeButton = document.getElementById("home-btn");
const restartButton = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function goHome() {
    window.location.href = 'index.html';
}
function startGame() {
    window.location.href = 'quiz.html';
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    homeButton.style.display = "none";
    restartButton.style.display = "none";
    scoreDisplay.innerText = "Score: 0";
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(option));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionContainer.innerText = "Quiz Completed!";
    answerButtons.innerHTML = "";
    homeButton.style.display = "block";
    restartButton.style.display = "block";
    scoreDisplay.innerText = `Final Score: ${score}`;
}

// Start the quiz when the page loads
startQuiz();

