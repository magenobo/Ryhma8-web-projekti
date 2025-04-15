//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions = [
    { src: "./noomitestaa.png", answer: "Italia", alt: "image, country in Europe, between France and ",
    hints: ["Cappuccino", "Romulus ja Remus", "Pasta sekä pizza"]}, //https://commons.wikimedia.org/wiki/File:LocationItaly.svg#mw-jump-to-license

    { src: "./noomitestaa2.png", answer: "Thaimaa", alt: "",
    hints: ["Suosittu matkailukohde Aasiassa", "Valuutta: baht ฿ (บาท)", "Suurimmat kaupungit pääkaupungin lisäksi: Samut Prakan, Udon Thani ja Chon Buri"]},

    { src: "./img/papukaija3.jpg", answer: "Algeria", alt: "",
    hints: ["Jotai vois keksii viel tähän", "Pinta-alaltaan Afrikan suurin", "Pääkaupunki: Alger"]},

    { src: "./img/papukaija4.jpg", answer: "Meksiko", alt: "",
    hints: ["Tulivuori Popocatépetl", "Perhe on hyvin tärkeä", "Kuolleiden päivä (Día de los muertos)"]},

    { src: "./img/papukaija5.jpg", answer: "Liettua", alt: "",
    hints: ["Suosituin urheilulaji: koripallo", "Yksi Euroopan vanhimmista puhuituista kielistä", "Pääkaupunki: Vilna"]},

    { src: "./img/papukaija1.jpg", answer: "Brasilia", alt: "",
    hints: ["Kansallislaji: capoeira", "Suosituin sukunimi: Silva", "Valtava Kristus-patsas"]},

    { src: "./img/papukaija2.jpg", answer: "Papua-Uusi-Guinea", alt: "",
    hints: ["Tyynenmeren suurin saari", "yli 850 kotimaista kieltä", "Pääkaupunki: Port Moresby"]},

    { src: "./img/papukaija3.jpg", answer: "Portugali", alt: "",
    hints: ["Joku hyvä tähä viel", "Euroopan pisin silta Vasco da Gama", "Cristiano Ronaldo"]},
];
//-----------------------------------

//ADD WHERE DID YOU GET THE IMAGES



//
let questionNumber = 9

//current image number
let currentImage = 0;

//current round
let round = 1;

//current points
let points = 0;

//current answer tries
let answerTry = 3

//counts the clues used
let usedClue = 0

//gets data from session storage
let peliData = JSON.parse(sessionStorage.getItem("pelit"))|| []
//-----------------------------------


//links rounds and points 
let currentRound = document.getElementById("kierrokset");
let currentPoints = document.getElementById("pisteet");
let allPoints = document.getElementById("kaikkipisteet");
//-----------------------------------



//THE GAME
function loadImage() {
    document.querySelector(".ohjeet_ja_peli").style.display = "block" //shows the game
 
    
    const image = questions[currentImage];                  //takes the image wanted
    document.getElementById('karttakuva').src = image.src;  //gets the image

  img.alt = `Image related to ${q.answer}`; // or use hints to generate a richer description

    document.getElementById("feedback").textContent= "";    //clears previous feedback
    document.getElementById("answer").value = "";           //clears previous answer
    document.getElementById("hintList").textContent = "";   //clears hints
    document.getElementById("pisteet").value = 0;           //clears points back to zero
    
    document.getElementById('next_btn').disabled = true;    //you can't go to the next question
    document.getElementById('send_btn').disabled = false;   //you can submit the answer

    
    document.getElementById('answer').style.backgroundColor = ""; //clears the colour from last round


    //you can use the buttons
    document.getElementById('vihjeBtn0').disabled = false; 
    document.getElementById('vihjeBtn1').disabled = false;
    document.getElementById('vihjeBtn2').disabled = false;


    //shows round and points every round
    showRounds()
    showPoints()
    

    answerTry = 3
    usedClue = 0
    questionNumber --
    round++
    
    //ends the game when all the images are guessed
    if (questionNumber === 0) {
        document.querySelector(".ohjeet_ja_peli").style.display = "none"
        document.querySelector(".pelin_tulokset").style.display = "block"
        showAllPoints()
    }
}
//-----------------------------------


//checks the answer
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.toUpperCase();
    const feedback = document.getElementById("feedback");
    const correctAnswer = questions[currentImage].answer.toUpperCase(); //answer from the questions

    //you can't submit empty
    if (userAnswer === '') {
        feedback.textContent = 'Vastaus ei voi olla tyhjä.';
        return;
      }
   
    //____________________________________

    //the answer is right
    if (userAnswer === correctAnswer) { 
        //the answer is right but used 0 clues
        if (usedClue === 0) {
            feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer + '. Sait 4 (neljä) pistettä. Voit nyt jatkaa seuraavaan painamalla "Seuraava".';
            //gets 4 points and shows points right away
            points++
            points++
            points++
            points++
            showPoints()

        }

        //the answer is right but used 1 clue
        if (usedClue === 1) {
            feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer + '. Sait 3 (kolme) pistettä, koska käytit 1 (yhden) vihjeen. Voit nyt jatkaa seuraavaan painamalla "Seuraava".';
            points++
            points++
            points++
            showPoints()
        }

        //the answer is right but used 2 clues
        if (usedClue === 2) {
            feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer + '. Sait 2 (kaksi) pistettä, koska käytit 2 (kaksi) vihjettä. Voit nyt jatkaa seuraavaan painamalla "Seuraava".';
            points++
            points++
            showPoints()
        }

        //the answer is right but used all 3 clues
        if (usedClue === 3) {
            feedback.textContent = "Oikein! Oikea vastaus oli " + correctAnswer + '. Sait vain 1 (yhden) pisteen, koska käytit kaikki vihjeet. Voit nyt jatkaa seuraavaan painamalla "Seuraava".';
            points++
            showPoints()
            

        }

        //you can't submit it again
        document.getElementById('send_btn').disabled = true;
        //you can go to the next question
        document.getElementById('next_btn').disabled = false;
        //you cant use the vihje buttons when you already answered
        document.getElementById('vihjeBtn0').disabled = true;
        document.getElementById('vihjeBtn1').disabled = true;
        document.getElementById('vihjeBtn2').disabled = true;


        document.getElementById('answer').style.backgroundColor = "#7CFC00";
        
    }
    
    //the answer is wrong
    if (userAnswer !== correctAnswer) {

        //-1 tries
        answerTry--
        document.getElementById('answer').style.backgroundColor = "rgb(255, 125, 125)";
    
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
            
            //you can go to the next question
            document.getElementById('next_btn').disabled = false;
            //you can't submit it again
            document.getElementById('send_btn').disabled = true;
            //you cant use the vihje buttons when you already answered
            document.getElementById('vihjeBtn0').disabled = true;
            document.getElementById('vihjeBtn1').disabled = true;
            document.getElementById('vihjeBtn2').disabled = true;
        }       
    }
}
//-----------------------------------



//goes to the next question
function nextImage() {
    currentImage = (currentImage + 1) % questions.length
    loadImage();  // reloads next image
}
//-----------------------------------


//shows the hint list
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
//-----------------------------------





//notices when clue buttons are pressed and counts them
const vihje1_btn = document.getElementById("vihjeBtn0")
const vihje2_btn = document.getElementById("vihjeBtn1")
const vihje3_btn = document.getElementById("vihjeBtn2")

vihje1_btn.addEventListener("click", countHints1);
vihje2_btn.addEventListener("click", countHints2);
vihje3_btn.addEventListener("click", countHints3);


function countHints1() {
    usedClue++
    document.getElementById('vihjeBtn0').disabled = true;

}
function countHints2() {
    usedClue++
    document.getElementById('vihjeBtn1').disabled = true;

}
function countHints3() {
    usedClue++
    document.getElementById('vihjeBtn2').disabled = true;

}
//-----------------------------------






//shows the round number
function showRounds() {
    currentRound.textContent = 'Kierros: ' + round + '/8'; 
}
//-----------------------------------



//shows points
function showPoints () {
    currentPoints.textContent = "Pisteet: " + points + '/32';
}
//-----------------------------------


//-----------------------------------
//shows the final score
function showAllPoints() {
    let allPoints = document.getElementById("kaikkipisteet");
    allPoints.textContent = "Läpäisit pelin pistein: " + points;
    
    
    for (let index = 0; index < 5; index++) {
        if (peliData[index] === undefined) {
            peliData.push({peli: "karttapeli", tulos: points});
            sessionStorage.setItem("pelit", JSON.stringify(peliData));
            break
        } else {
            if (peliData[index].peli == "karttapeli")
                if (points>= peliData[index].tulos) {
                    peliData[index].tulos = points;
                    sessionStorage.setItem("pelit", JSON.stringify(peliData));
                    break
        }
    }}
}
    



//shows the whole game
loadImage()
//-----------------------------------
