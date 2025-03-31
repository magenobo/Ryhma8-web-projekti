const questions = [
    {
        question: "Bonjour!", 
        answers: [
            { text: "Saksa", correct: false},
            { text: "Ranska", correct: true},
            { text: "Puola", correct: false},
        ]
    },
    {
        question: "こんにちは (Kon'nichiwa)", 
        answers: [
            { text: "Japani", correct: true},
            { text: "Kiina", correct: false},
            { text: "Vietnam", correct: false},
        ]
    },
    {
        question: "Hola!", 
        answers: [
            { text: "Espanja", correct: true},
            { text: "Portugali", correct: false},
            { text: "Italia", correct: false},
        ] 
    },
    {
        question: "Guten Tag!", 
        answers: [
            { text: "Saksa", correct: true},
            { text: "Portugali", correct: false},
            { text: "Italia", correct: false},
        ]  
    },
    {
        question: "Ciao!", 
        answers: [
            { text: "Portugali", correct: false},
            { text: "Espanja", correct: false},
            { text: "Italia", correct: true},
        ] 
    },
    {
        question: "Merhaba!", 
        answers: [
            { text: "Kreikka", correct: false},
            { text: "turkki", correct: true},
            { text: "Arabiankieli", correct: false},
        ] 
    },
    {
        question: "Namaste!", 
        answers: [
            { text: "Intia", correct: true},
            { text: "Nepal", correct: false},
            { text: "kreikka", correct: false},
        ]   
    },
    {
        question: "Aloha!", 
        answers: [
            { text: "Uusi-Seelanti", correct: true},
            { text: "Portugali", correct: false},
            { text: "Havaijii", correct: false},
        ]  
    }
];

const questionElement = document.getElementById("kysymys");
const vastausnapit = document.getElementById("vastausnapit");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz(){
    currentQuestionIndex = 0; //resettaa kysymyksen
    score = 0; // nollaa scoren
    nextButton.innerHTML = "Seuraava"; //??//
    showQuestion();
}

function showQuestion(){
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML= answer.text;
    button.classList.add("btn");
    vastausnapit.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

}


function resetState(){
    nextButton.setHTMLUnsafe.display = "none";
    while(vastausnapit.firstChild){
        vastausnapit.removeChild(vastausnapit.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
    }else{
        selectBtn.classList.add("incorrect");
        }
    } //vastausvaihtoehdot tulee näkyviin

startQuiz();
