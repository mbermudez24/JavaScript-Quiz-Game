// Get references to HTML elements
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const homeButton = document.getElementById("home-btn");
const scoreDisplay = document.getElementById("score");
const timerD = document.getElementById("timer");

// Initialize quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Set the time limit for each question in seconds
const timeLimit = 15;

// Function to navigate back to the home page
function goHome() {
    window.location.href = 'index.html';
}

// Function to start the quiz
function startQuiz() {
    // Reset current question index and score
    currentQuestionIndex = 0;
    score = 0;

    // Hide the score display initially
    scoreDisplay.style.display = 'none';

    // Display the first question
    showQuestion(questions[currentQuestionIndex]);
}

// Function to display a question
function showQuestion(question) {
    // Reset the timer for each new question
    resetTimer();

    // Display the question text
    questionContainer.innerText = question.question;

    // Clear existing answer buttons
    answerButtons.innerHTML = "";

    // Create buttons for each answer option
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        // Attach an event listener to handle answer selection
        button.addEventListener("click", () => selectAnswer(option));
        answerButtons.appendChild(button);
    });

    // Start the timer for the current question
    startTimer();
}

// Function to handle user's answer selection
function selectAnswer(selectedOption) {
    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // Clear the timer when an answer is selected
    clearTimeout(timer);

    // Check if the selected option is correct and update the score
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }

    // Move to the next question or end the quiz if there are no more questions
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    // Display quiz completion message
    questionContainer.innerText = "Quiz Completed!";
    answerButtons.innerHTML = "";

    // Display the home button
    homeButton.style.display = "block";

    // Hide the timer display
    timerD.style.display = "none";

    // Display the final score
    scoreDisplay.innerText = `Final Score: ${score}`;
}

// Function to start the timer for each question
function startTimer() {
    let timeRemaining = timeLimit;
    updateTimerDisplay(timeRemaining);

    // Update the timer display every second
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        // Automatically select an answer when time runs out
        if (timeRemaining <= 0) {
            clearTimeout(timer);
            selectAnswer();
        }
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    clearTimeout(timer);
    updateTimerDisplay(timeLimit);
}

// Function to update the timer display
function updateTimerDisplay(timeRemaining) {
    // Display the remaining time
    document.getElementById("timer").innerText = `Time: ${timeRemaining}s`;
}

// Start the quiz when the page loads
startQuiz();
