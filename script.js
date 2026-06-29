const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Tool Machine Language", correct: false },
    ],
  },

  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "Python", correct: false },
    ],
  },

  {
    question: "Which language is used for website functionality?",
    answers: [
      { text: "CSS", correct: false },
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: true },
      { text: "SQL", correct: false },
    ],
  },

  {
    question: "Which method selects an element by ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "getId()", correct: false },
      { text: "queryClass()", correct: false },
      { text: "selectId()", correct: false },
    ],
  },

  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "constant", correct: false },
    ],
  },
  {
    question: "Which keyword is block scoped in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: true },
      { text: "function", correct: false },
      { text: "None of the above", correct: false },
    ],
  },

  {
    question:
      "What is the default value of a 'var' variable before initialization?",
    answers: [
      { text: "null", correct: false },
      { text: "0", correct: false },
      { text: "undefined", correct: true },
      { text: "ReferenceError", correct: false },
    ],
  },

  {
    question: "Accessing a 'let' variable before its declaration results in?",
    answers: [
      { text: "undefined", correct: false },
      { text: "null", correct: false },
      { text: "ReferenceError", correct: true },
      { text: "SyntaxError", correct: false },
    ],
  },

  {
    question: "Which keyword must be initialized at the time of declaration?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "All of the above", correct: false },
    ],
  },

  {
    question: "What does TDZ stand for in JavaScript?",
    answers: [
      { text: "Temporary Data Zone", correct: false },
      { text: "Temporal Dead Zone", correct: true },
      { text: "Temporary Declaration Zone", correct: false },
      { text: "Type Definition Zone", correct: false },
    ],
  },
];

let qNo = 0;
let marks = 0;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const qCount = document.getElementById("qCount");

const studentInfo = document.getElementById("studentInfo");
const quizContent = document.getElementById("quizContent");
const welcome = document.getElementById("welcome");

function startStudentQuiz() {
  let name = document.getElementById("studentName").value.trim();
  let roll = document.getElementById("rollNo").value.trim();

  if (name === "" || roll === "") {
    alert("Please Enter Student Name and Roll Number");
    return;
  }

  studentInfo.style.display = "none";
  quizContent.style.display = "block";

  welcome.innerHTML = "Hii " + name + " (Roll No: " + roll + ")";

  startQuiz();
}

function startQuiz() {
  qNo = 0;
  marks = 0;

  nextBtn.innerHTML = "Next";

  showQuestion();
}

function showQuestion() {
  resetData();

  let current = questions[qNo];

  qCount.innerHTML = "Question " + (qNo + 1) + " of " + questions.length;

  question.innerHTML = current.question;

  current.answers.forEach(function (ans) {
    let btn = document.createElement("button");

    btn.innerHTML = ans.text;

    btn.classList.add("option");

    if (ans.correct) {
      btn.dataset.correct = ans.correct;
    }

    btn.addEventListener("click", checkAnswer);

    answers.appendChild(btn);
  });
}

function resetData() {
  nextBtn.style.display = "none";

  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
}

function checkAnswer(e) {
  let selected = e.target;

  if (selected.dataset.correct === "true") {
    selected.classList.add("correct");

    marks++;
  } else {
    selected.classList.add("wrong");
  }

  Array.from(answers.children).forEach(function (btn) {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }

    btn.disabled = true;
  });

  nextBtn.style.display = "block";
}

function grade(percent) {
  if (percent >= 80) {
    return "A";
  } else if (percent >= 60) {
    return "B";
  } else if (percent >= 40) {
    return "C";
  } else {
    return "Fail";
  }
}

function showResult() {
  resetData();

  let percent = (marks / questions.length) * 100;

  question.innerHTML =
    "<div class='result'>" +
    "<h2>Quiz Completed Successfully</h2>" +
    "<p><b>Score:</b> " +
    marks +
    "/" +
    questions.length +
    "</p>" +
    "<p><b>Percentage:</b> " +
    percent.toFixed(2) +
    "%</p>" +
    "<p><b>Grade:</b> " +
    grade(percent) +
    "</p>" +
    "<p>Thank You For Attempting The Quiz.</p>" +
    "</div>";

  qCount.innerHTML = "";

  nextBtn.innerHTML = "Restart Quiz";

  nextBtn.style.display = "block";
}

function nextQuestion() {
  qNo++;

  if (qNo < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextBtn.addEventListener("click", function () {
  if (qNo < questions.length) {
    nextQuestion();
  } else {
    studentInfo.style.display = "block";
    quizContent.style.display = "none";

    document.getElementById("studentName").value = "";
    document.getElementById("rollNo").value = "";
  }
});
