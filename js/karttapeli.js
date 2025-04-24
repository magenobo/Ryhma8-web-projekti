//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions = [
    { src: "./img/karttapeli_italia.png", answer: "Italia", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Ranska ja Itävalta",
    hints: ["Aamupala: Cappuccino", "Romulus ja Remus", "Pasta sekä pizza"]},

    //https://en.wikipedia.org/wiki/Italy#/media/File:EU-Italy_(orthographic_projection).svg


    { src: "./img/karttapeli_thaimaa.png", answer: "Thaimaa", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Malesia ja Laos",
    hints: ["Suosittu matkailukohde Aasiassa", "Valuutta: baht ฿ (บาท)", "Suurimmat kaupungit pääkaupungin lisäksi: Samut Prakan, Udon Thani ja Chon Buri"]},

    //https://en.wikipedia.org/wiki/Thailand#/media/File:Thailand_(orthographic_projection).svg


    { src: "./img/karttapeli_algeria.png", answer: "Algeria", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Marokko ja Libya",
    hints: ["Saharan autiomaa peittää valtiosta suuren osan", "Pinta-alaltaan Afrikan suurin", "Pääkaupunki: Alger"]},

    //https://en.wikipedia.org/wiki/Algeria#/media/File:Algeria_(centered_orthographic_projection).svg


    { src: "./img/karttapeli_meksiko.png", answer: "Meksiko", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Guatemala ja Yhdysvallat",
    hints: ["Tulivuori Popocatépetl", "Perhe on hyvin tärkeä", "Kuolleiden päivä (Día de los muertos)"]},

    //https://fi.wikipedia.org/wiki/Meksiko#/media/Tiedosto:Mexico_(orthographic_projection).svg


    { src: "./img/karttapeli_puola.png", answer: "Puola", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Saksa ja Valko-Venäjä",
    hints: ["Tunnetuimmat kaupungit: Gdnask ja Krakova", "Valuutta: Złoty zł", "Pääkaupunki Varsova on Itä-Euroopan vanhimpia"]},

    //https://en.wikipedia.org/wiki/Poland#/media/File:EU-Poland_(orthographic_projection).svg

    { src: "./img/karttapeli_brasilia.png", answer: "Brasilia", alt: "Kuva, jossa tummalla merkitty valtio. Viereisiä maita: Bolivia ja Kolumbia",
    hints: ["Kansallislaji: capoeira", "Suosituin sukunimi: Silva", "Valtava Kristus-patsas"]},

    //https://fi.wikipedia.org/wiki/Brasilia#/media/Tiedosto:BRA_orthographic.svg 

    { src: "./img/karttapeli_pug.png", answer: "Papua-Uusi-Guinea", alt: "Kuva, jossa tummalla merkitty valtio. Viereinen maa: Indonesia",
    hints: ["Tyynenmeren suurin saari", "yli 850 kotimaista kieltä", "Pääkaupunki: Port Moresby"]},

    //https://en.wikipedia.org/wiki/Papua_New_Guinea#/media/File:PNG_orthographic.svg

    { src: "./img/karttapeli_portugal.png", answer: "Portugali", alt: "Kuva, jossa tummalla merkitty valtio. Viereinen maa: Espanja.",
    hints: ["Euroopan pisin silta Vasco da Gama", "Jalkapallotähti Cristiano Ronaldo", "Vain yksi naapurimaa: Espanja"]},

    //https://en.wikipedia.org/wiki/Portugal#/media/File:EU-Portugal_(orthographic_projection).svg
];
//-----------------------------------

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
    allPoints.textContent = "Läpäisit pelin pistein: " + points + "/32";
    
    
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
