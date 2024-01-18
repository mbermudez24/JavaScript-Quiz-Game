const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const homeButton = document.getElementById("home-btn");

const scoreDisplay = document.getElementById("score");
const timerD = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;

const timeLimit = 15; // Set the time limit for each question in seconds

function goHome() {
    window.location.href = 'index.html';
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    scoreDisplay.style.display = 'none';

    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetTimer();
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(option));
        answerButtons.appendChild(button);
    });
    startTimer(); // Start the timer when a new question is displayed
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    clearTimeout(timer); // Clear the timer when an answer is selected
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

    timerD.style.display = "none";
    scoreDisplay.innerText = `Final Score: ${score}`;
}

function startTimer() {
    let timeRemaining = timeLimit;
    updateTimerDisplay(timeRemaining);

    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearTimeout(timer);
            selectAnswer(); // Automatically select an answer when time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearTimeout(timer);
    updateTimerDisplay(timeLimit);
}

function updateTimerDisplay(timeRemaining) {
    // Display the remaining time
    document.getElementById("timer").innerText = `Time: ${timeRemaining}s`;
}

// Start the quiz when the page loads
startQuiz();

