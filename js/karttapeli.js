
//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions =[
    { src: "./img/NOOMITESTI_1.png", answer: "Italia",
    hints: ["Cappuccino", "Romulus ja Remus", "Pasta sekä pizza"]},
    { src: "./img/papukaija2.jpg", answer: "Thaimaa",
    hints: ["Suosittu matkailukohde Aasiassa", "Valuutta: baht ฿ (บาท)", "Suurimmat kaupungit pääkaupungin lisäksi: Samut Prakan, Udon Thani ja Chon Buri"]},

    { src: "./img/papukaija3.jpg", answer: "Algeria",
    hints: ["Jotai vois keksii viel tähän", "Pinta-alaltaan Afrikan suurin", "Pääkaupunki: Alger"]},

    { src: "./img/papukaija4.jpg", answer: "Meksiko",
    hints: ["Tulivuori Popocatépetl", "Perhe on hyvin tärkeä", "Kuolleiden päivä (Día de los muertos)"]},

    { src: "./img/papukaija5.jpg", answer: "Liettua",
    hints: ["Suosituin urheilulaji: koripallo", "Yksi Euroopan vanhimmista puhuituista kielistä", "Pääkaupunki: Vilna"]},

    { src: "./img/papukaija1.jpg", answer: "Brasilia",
    hints: ["Kansallislaji: capoeira", "Suosituin sukunimi: Silva", "Valtava Kristus-patsas"]},

    { src: "./img/papukaija2.jpg", answer: "Papua-Uusi-Guinea",
    hints: ["Tyynenmeren suurin saari", "yli 850 kotimaista kieltä", "Pääkaupunki: Port Moresby"]},

    { src: "./img/papukaija3.jpg", answer: "Portugali",
    hints: ["Joku hyvä tähä viel", "Euroopan pisin silta Vasco da Gama", "Cristiano Ronaldo"]},



];

//the number of questions
let questionNumber = 9
//current image number
let currentImage = 0;

//current round
let currentRound = 0;

//current points
let currentPoint = 0;

//current answer tries
let answerTry = 3
//function, current image and answer
function loadImage() {
    document.querySelector(".ohjeet_ja_peli").style.display = "block"
 
    const image = questions[currentImage];
    document.getElementById('image').src = image.src; //gets the image
    document.getElementById("feedback").textContent= ""; //clears previous feedback
    document.getElementById("answer").value = ""; //clears previous answer
    document.getElementById("hintList").textContent = ""; //clears hints
    answerTry = 3
    questionNumber --
    
    //ends the game when all the images are guessed
    if (questionNumber === 0) {
        document.querySelector(".ohjeet_ja_peli").style.display = "none"
        document.querySelector(".pelin_tulokset").style.display = "block"
    }
}


//checks if the answer is right
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.toUpperCase();
    const feedback = document.getElementById("feedback");
    const correctAnswer = questions[currentImage].answer.toUpperCase(); //answer from the questions

    //FIGURE THIS OUT_____________________
    if (userAnswer === " ") {
        feedback.textContent = "Vastaus ei voi olla tyhjä."
    }
    //____________________________________

    //the answer is right
    if (userAnswer === correctAnswer) { 
        feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer + ". Sait " + "tosimonta" //TÄHÄN KUINKA MONTA PISTETTÄ
        + ' pistettä/pisteen. Voit nyt jatkaa seuraavaan painamalla "Seuraava".';
    }
    
    //the answer is wrong
    if (userAnswer !== correctAnswer) {

        //-1 tries
        answerTry--
    
        //answer is wrong AND you still have guesses left
        if (answerTry === 2) {
            feedback.textContent = "Väärä vastaus. Sinulla on 2 (kaksi) yritystä jäljellä.";
        }
        if (answerTry === 1) {
            feedback.textContent = "Väärä vastaus. Sinulla on 1 (yksi) yritys jäljellä.";
        }

        //answer is wrong AND your guesses are done
        if (answerTry < 1) {
            feedback.textContent = "Väärä vastaus. Oikea vastaus olisi ollut  " + correctAnswer + '. Et saanut tältä kierrokselta pisteitä. Voit nyt mennä seuraavaan kysymykseen painamalla "Seuraava"';

        }       
    }
}

//goes to the next question
function nextImage() {
    currentImage = (currentImage + 1) % questions.length
    loadImage();  // reloads next image
}



function showHint(index) {
    const q=questions[currentImage];
    const hintList = document.getElementById("hintList");

    if (!document.getElementById(`hint-${index}`)) {
        const li = document.createElement('li');
        li.textContent = q.hints[index];
        li.id = `hint-${index}`; //doesn't show the hint again
        hintList.appendChild(li); 
      }
}

//updates the round number after every round
function updateRound() {
    const currentRound = document.getElementById("kierrokset");

}

loadImage()

