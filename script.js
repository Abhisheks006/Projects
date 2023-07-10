const questions = [
  {
    question: "Patanjali is well known for the compilation of",
    answers: [
      { text: "Yoga Sutra", correct: true },
      { text: "Panchatantra", correct: false },
      { text: "Brahma Sutra", correct: false },
      { text: "Ayurveda", correct: false },
    ],
  },
  {
    question: "The World Largest desert is ?",
    answers: [
      { text: "Thar", correct: false },
      { text: "Kalahari", correct: false },
      { text: "Sahara", correct: true },
      { text: "Sonoran", correct: false },
    ],
  },
  {
    question: "Which of the given devices is used for counting blood cells?",
    answers: [
      { text: "Hmelethometer", correct: false },
      { text: "Spyscometer", correct: false },
      { text: "Hemocytometer", correct: true },
      { text: "Hamosytometer", correct: false },
    ],
  },
  {
    question: "Which of the given vitamin is a water-soluble vitamin?",
    answers: [
      { text: "Vitamin A", correct: true },
      { text: "Vitamin B", correct: false },
      { text: "Vitamin K", correct: false },
      { text: "Vitamin D", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ", " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";
  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you score ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
