
//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions =[
    { src: "./img/papukaija1.jpg", answer: "Italia",
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


//current image number
var currentImage = 0;

//current round
var currentRound = 0;

//current points
var currentPoint = 0;

//current answer tries
var answerTry = 0
//function, current image and answer
function loadImage() {
    const image = questions[currentImage];
    document.getElementById('image').src = image.src; //gets the image
    document.getElementById("feedback").textContent= ""; //clears previous feedback
    document.getElementById("answer").value = ""; //clears previous answer
    document.getElementById("hintList").textContent = ""; //clears hints
    document.getElementById("tries").textContent= ""; //clears the tries
}



//checks if the answer is right
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.toLowerCase();
    const feedback = document.getElementById("feedback");
    const correctAnswer = questions[currentImage].answer.toLowerCase(); //answer from the questions

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer;
    } else {
        feedback.textContent = "Väärin: " + correctAnswer;
    }
    
    answerTry += 1

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
        li.id = `hint-${index}`; // so it doesn’t show again
        hintList.appendChild(li);
      }
}

function updateRound() {
    const currentRound = document.getElementById("kierrokset");
    
}

function updateTries() {
    
}

loadImage()

