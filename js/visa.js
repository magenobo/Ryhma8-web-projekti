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
            { text: "Kreikka", correct: false},
            { text: "Portugali", correct: false},
            { text: "Havaijii", correct: true},
        ]  
    }
];

const questionElement = document.getElementById("kysymys");
const vastausnapit = document.getElementById("vastausnapit");
const nextButton = document.getElementById("next-btn");
const laatikko = document.getElementById("kysymyslaatikko");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

//aloitusnäkymä
const startScreen = document.getElementById("startscreen")
const startButton = document.getElementById("start-btn")
const quizContainer = document.getElementById("visa") 

//virheilmoitukset
const errorMessage = document.getElementById("vaara-vastaus");
const correctAnswerSpan = document.getElementById("oikea-vastaus");

let currentQuestionIndex = 0;
let score = 0;


 //päivittää pisteet
 function updateScore(){
 scoreElement.textContent = `Pisteet: ${score}`;
 }


function startQuiz(){
    startScreen.style.display = "none"; //piilottaa aloitusnäytön
    quizContainer.style.display = "block"; // näyttää pelin sisällön
    laatikko.style.display = "block"; //näyttää kysymyslaatikon
    restartButton.style.display = "none"; //piilottaa restart-napin
    currentQuestionIndex = 0; //resettaa kysymyksen
    score = 0; // nollaa scoren
    nextButton.textContent = "Seuraava";
    updateScore(); //Päivittää pisteet alussa
    showQuestion();
}
//näyttää ensimmäisen kysymyksen
function showQuestion(){
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ". " + currentQuestion.question;


  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent= answer.text;
    button.classList.add("btntwo");
    vastausnapit.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    
  });
}


function resetState(){
    nextButton.style.display = "none";
    while(vastausnapit.firstChild){
        vastausnapit.removeChild(vastausnapit.firstChild);
    }
    errorMessage.style.display = "none"; //piiloittaa virheilmoituksen uuden kysymyksen tullessa
}

function selectAnswer(e){    //vastausvaihtoehdot tulee näkyviin
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if(isCorrect){
        selectBtn.classList.add("correct"); //oikein
        score++; //Oikeasta vastauksesta piste
    }else{
        selectBtn.classList.add("incorrect"); //väärin

        
    }

    updateScore();



     Array.from(vastausnapit.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; //estää muiden nappien painamisen
        });
        nextButton.style.display = "block";  
    } 


    //näyttää loppupisteet
    function showScore(){
        resetState();
        questionElement.textContent = `Pisteet ${score}/${questions.length}`; //Pisteet 
        nextButton.textContent = "Yritä uudelleen";
        nextButton.style.display = "block"; 
        restartButton.style.display= "block"; //näytetään "palaa alkuun" nappi
    }

    restartButton.addEventListener("click", () => {
       startScreen.style.display = "block"; // näyttää aloitusnäytön
       quizContainer.style.display = "none";  // Piilottaa pelin
       laatikko.style.display = "none";       // Piilottaa kysymyslaatikon
       restartButton.style.display = "none";  // Piilottaa Palaa alkuun -napin
       score = 0;                             // Nollaa pisteet
       currentQuestionIndex = 0;              // Resetoi kysymys
       nextButton.style.display = "none";
    
    });


//käynnistä peli vasta, kun käyttäjä painaa "aloita"
startButton.addEventListener("click", startQuiz);


    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion(); //jos on toinen kysymys, näyttää sen
        }else{
            showScore(); //jos ei ole kysymyksiä, näyttää scoren, kun painaa seuraava
        }
        }
    

    nextButton.addEventListener("click", ()=>{ //seuraava-napin toiminta
        if(currentQuestionIndex < questions.length){
           handleNextButton();
        }else{
            startQuiz();
        }
        
    });



