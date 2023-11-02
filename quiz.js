const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "javascript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.querySelector('#question');
const a_text = document.querySelector('#a_text');
const b_text = document.querySelector('#b_text');
const c_text = document.querySelector('#c_text');
const d_text = document.querySelector('#d_text');
const submitBtn = document.querySelector('#Next');

let currentQuiz = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            correctAnswers++;
        } else {
            wrongAnswers--;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            let totalScore = correctAnswers + wrongAnswers;
            let resultMessage;
            let resultMessageColor;

            if (totalScore === 4) {
                resultMessage = "You win!";
                resultMessageColor = "green";
            } else if (totalScore >= 1 && totalScore <= 3) {
                resultMessage = "Better luck next time.";
                resultMessageColor = "blue";
            } else {
                resultMessage = "Sorry, you lose the game.";
                resultMessageColor = "red";
            }

            const resultContainer = document.createElement("div");
            resultContainer.style.textAlign = "center";

            const resultMessageElement = document.createElement("p");
            resultMessageElement.textContent = resultMessage;
            resultMessageElement.style.color = resultMessageColor;
            resultMessageElement.style.fontSize = "18px";
            resultMessageElement.style.marginTop = "20px";

            resultContainer.appendChild(resultMessageElement);

            quiz.innerHTML = `
                <h2>Correct Answers: ${correctAnswers}</h2>
                <h2>Wrong Answers: ${wrongAnswers}</h2>
                <h2>Total Score: ${totalScore}</h2>
            `;
            quiz.appendChild(resultContainer);

            const reloadButton = document.createElement("button");
            reloadButton.textContent = "Reload";
            reloadButton.onclick = function () {
                location.reload();
            };

            quiz.appendChild(reloadButton);
        }
    }
});
