const questions = [
    {
        question: "Bonjour!", 
        answers: [
            { text: "saksa", correct: false},
            { text: "ranska", correct: true},
            { text: "puola", correct: false},
        ]
    },
    {
        question: "こんにちは (Kon'nichiwa)", 
        answers: [
            { text: "japani", correct: true},
            { text: "kiina", correct: false},
            { text: "vietnam", correct: false},
        ]
    },
    {
        question: "Hola!", 
        answers: [
            { text: "espanja", correct: true},
            { text: "portugali", correct: false},
            { text: "italia", correct: false},
        ] 
    },
    {
        question: "Guten Tag!", 
        answers: [
            { text: "saksa", correct: true},
            { text: "portugali", correct: false},
            { text: "italia", correct: false},
        ]  
    },
    {
        question: "Ciao!", 
        answers: [
            { text: "portugali", correct: false},
            { text: "espanja", correct: false},
            { text: "italia", correct: true},
        ] 
    },
    {
        question: "Merhaba!", 
        answers: [
            { text: "kreikka", correct: false},
            { text: "turkki", correct: true},
            { text: "arabia", correct: false},
        ] 
    },
    {
        question: "Namaste!", 
        answers: [
            { text: "intia", correct: true},
            { text: "nepal", correct: false},
            { text: "kreikka", correct: false},
        ]   
    },
    {
        question: "Aloha!", 
        answers: [
            { text: "kreikka", correct: false},
            { text: "portugali", correct: false},
            { text: "havaijii", correct: true},
        ]  
    }
];

//pelin kokonaisuus
const questionElement = document.getElementById("kysymys");
const vastausnapit = document.getElementById("vastausnapit");
const nextButton = document.getElementById("next-btn");
const laatikko = document.getElementById("kysymyslaatikko");
const pisteet = document.getElementById("pistelasku");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const EndScreen = document.getElementById("endscreen");

//aloitusnäkymä
const startScreen = document.getElementById("startscreen")
const startButton = document.getElementById("start-btn")
const quizContainer = document.getElementById("visa") 

//virheilmoitukset väärästä vastauksesta
const errorMessage = document.getElementById("vaara-vastaus");
const correctAnswerSpan = document.getElementById("oikea-vastaus");

let currentQuestionIndex = 0;
let score = 0;


 //päivittää pisteet
 function updateScore(){
 scoreElement.textContent = `Pisteet: ${score}`;
 pisteet.textContent = `Pisteet: ${score}`;
 }

    //pelin alku
function startQuiz(){
    startScreen.style.display = "none"; //piilottaa aloitusnäytön
    quizContainer.style.display = "block"; // näyttää pelin sisällön
    laatikko.style.display = "block"; //näyttää kysymyslaatikon
    restartButton.style.display = "none"; //piilottaa restart-napin
    scoreElement.style.display = "block"; //näyttää pisteet 
    pisteet.style.display="block";
    currentQuestionIndex = 0; //resettaa kysymyksen
    score = 0; // nollaa pisteet
    nextButton.textContent = "Seuraava"; //asettaa napin tekstin
    nextButton.style.display = "block";
    updateScore(); //Päivittää pistetilanteen
    showQuestion(); //näyttää ensimmäisen kysymyksen
    document.getElementById("endscreen").style.display = "none";
}
//näyttää ensimmäisen kysymyksen
function showQuestion(){
    resetState(); // tyhjentää edelliset vastaukset ja piilottaa napit
  let currentQuestion = questions[currentQuestionIndex]; //hakee nykyisen kysymyksen
  let questionNo = currentQuestionIndex + 1; //näyttää kysymyksen numeron
  questionElement.textContent = questionNo + ". " + currentQuestion.question; // kysymyksen teksti


  currentQuestion.answers.forEach(answer => { //käy kaikki vastaukset läpi
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
    nextButton.style.display = "none"; //piilottaa seuraava-napin
    while(vastausnapit.firstChild){
        vastausnapit.removeChild(vastausnapit.firstChild);
    }
    errorMessage.style.display = "none"; //piiloittaa virheilmoituksen uuden kysymyksen tullessa
}

function selectAnswer(e){    //vastausvaihtoehdot tulee näkyviin
    const selectBtn = e.target; //hakee valitun napin
    const isCorrect = selectBtn.dataset.correct === "true"; //tarkistaa onko vastaus oikein

    if(isCorrect){
        selectBtn.classList.add("correct"); //oikean tyyli
        score++; //Oikeasta vastauksesta piste
    }else{
        selectBtn.classList.add("incorrect"); //väärän tyyli

        
    }

    updateScore(); //päivittää pistetilanteen


    //estää muiden nappien painamisen ja näyttää oikeat vastaukset
     Array.from(vastausnapit.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; //estää muiden nappien painamisen
        });
        nextButton.style.display = "block";  
    } 

    
    function showEndScreen() {
        document.getElementById("endscreen").style.display = "block";
    
    }

    //näyttää loppupisteet
    function showScore(){
        resetState();
        questionElement.textContent = `Pisteet ${score}/${questions.length}`; //Pisteet 
        nextButton.style.display = "none"; 
        restartButton.style.display= "block"; //näytetään "palaa alkuun" nappi
        scoreElement.style.display = "none"; //piilottaa pisteet kun peli loppuu
        pisteet.style.display = "none";
        showEndScreen();
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
            showScore(); 
        }
        
    });



