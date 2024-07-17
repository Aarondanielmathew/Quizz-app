const questions = [
    {
        question: "How many wings does a bee have ?",
        answers: [
            { text: "Two", correct: false},
            { text: "Four", correct: true},
            { text: "Three", correct: false},
            { text: "one", correct: false},
        ]
    }, 
    {
        question: "What is a series of large waves caused by an underwater earthquake?",
        answers: [
            { text: "Tsunami", correct: true},
            { text: "Tide", correct: false},
            { text: "Waveform", correct: false},
            { text: "None of the above", correct: false},
        ]  
    },
    {
        question: "How many eyes does a spider have?",
        answers: [
            { text: "Six", correct: false},
            { text: "Seven", correct: false},
            { text: "Four", correct: false},
            { text: "Eight", correct: true},
        ]
    },
    {
        question: " What is the only ‘living’ organism that can be viewed from space?",
        answers: [
            { text: "Elephant", correct: false},
            { text: "Blue whale", correct: false},
            { text: "Great Barrier Reef", correct: true},
            { text: "None of the above", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0 ;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}
 function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
 }
 function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

 }
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Made by Aaron Mathew Daniel";
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener('click',  ()=> {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
