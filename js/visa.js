
// Lähde: How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript
// Linkki: https://www.youtube.com/watch?v=PBcqGxrr9g8&ab_channel=GreatStack




const kysymykset = [
    {
        kysymys: "Bonjour!", 
        vastaukset: [
            { text: "saksa", correct: false},
            { text: "ranska", correct: true},
            { text: "puola", correct: false},
        ]
    },
    {
        kysymys: "こんにちは (Kon'nichiwa)", 
        vastaukset: [
            { text: "japani", correct: true},
            { text: "kiina", correct: false},
            { text: "vietnam", correct: false},
        ]
    },
    {
        kysymys: "Hola!", 
        vastaukset: [
            { text: "espanja", correct: true},
            { text: "portugali", correct: false},
            { text: "italia", correct: false},
        ] 
    },
    {
        kysymys: "Guten Tag!", 
        vastaukset: [
            { text: "saksa", correct: true},
            { text: "portugali", correct: false},
            { text: "italia", correct: false},
        ]  
    },
    {
        kysymys: "Ciao!", 
        vastaukset: [
            { text: "portugali", correct: false},
            { text: "espanja", correct: false},
            { text: "italia", correct: true},
        ] 
    },
    {
        kysymys: "Merhaba!", 
        vastaukset: [
            { text: "kreikka", correct: false},
            { text: "turkki", correct: true},
            { text: "arabia", correct: false},
        ] 
    },
    {
        kysymys: "Namaste!", 
        vastaukset: [
            { text: "intia", correct: true},
            { text: "nepali", correct: false},
            { text: "kreikka", correct: false},
        ]   
    },
    {
        kysymys: "Aloha!", 
        vastaukset: [
            { text: "kreikka", correct: false},
            { text: "portugali", correct: false},
            { text: "havaiji", correct: true},
        ]  
    }
];


//pelin kokonaisuus
const questionElement = document.getElementById("kysymys");
const vastausnapit = document.getElementById("vastausnapit");
const SeuraavaNappi = document.getElementById("next-btn");
const laatikko = document.getElementById("kysymyslaatikko");
const pisteet = document.getElementById("pistelasku");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const EndScreen = document.getElementById("endscreen");


//aloitusnäkymä
const aloitusNakyma = document.getElementById("startscreen")
const startButton = document.getElementById("start-btn")
const quizContainer = document.getElementById("visa") 


//virheilmoitukset väärästä vastauksesta
const virheIlmoitus = document.getElementById("vaara-vastaus");
const correctAnswerSpan = document.getElementById("oikea-vastaus");

let nykyinenKysymysIndex = 0;
let score = 0;
let peliData = JSON.parse(sessionStorage.getItem("pelit"))|| []


 //päivittää pisteet
 function paivitaPisteet(){
 scoreElement.textContent = `Pisteet: ${score}`;
 pisteet.textContent = `Pisteet: ${score}`;
 }


//pelin alku, jossa näkyy pelin aloitusnäkymä ennen kysymyksiä
function Kaynnistapeli(){
    aloitusNakyma.style.display = "none"; 
    quizContainer.style.display = "block";
    laatikko.style.display = "block"; 
    restartButton.style.display = "none";
    scoreElement.style.display = "block";  
    pisteet.style.display="block";
    SeuraavaNappi.textContent = "Seuraava"; 
    SeuraavaNappi.style.display = "block";
    paivitaPisteet(); 
    naytakysymys(); 
    nykyinenKysymysIndex = 0; 
    score = 0; 
    
    document.getElementById("endscreen").style.display = "none";
}


//näyttää ensimmäisen kysymyksen, tyhjentää edelliset vastaukset, hakee nykyisen kysymyksen ja näyttää kysymyksen numeron ja tekstin. 
function naytakysymys(){
    nollaus(); 


  let nykyinenkysymys = kysymykset[nykyinenKysymysIndex]; 
  let kysymysnumero = nykyinenKysymysIndex + 1; 
  questionElement.textContent = kysymysnumero + ". " + nykyinenkysymys.kysymys; 


//käy kaikki nykyisen kysymyksen vastaukset läpi. Luo uuden buttonin jokaiselle vastausvaihtoehdolle.
function luoVastausnappi(text, correct) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("btntwo");
    button.dataset.correct = correct;
    button.addEventListener("click", selectAnswer);
    return button;
}

  nykyinenkysymys.vastaukset.forEach(({text, correct}) => { 
    const button = luoVastausnappi(text, correct);
    vastausnapit.appendChild(button);
  });
}


//tyhjentää vastausnapit ja piilottaa seuraava-painikkeen.
function nollaus(){ 

    SeuraavaNappi.style.display = "none"; 
    Array.from(vastausnapit.children).forEach(child => {
        vastausnapit.removeChild(child);
    });

    virheIlmoitus.style.display = "none"; 
}


function selectAnswer(e){  
    const selectBtn = e.target;
    const onkoOikein = selectBtn.dataset.correct === "true";


//oikean sekä väärän vastauksen tyylin lisäys ja mahdollinen pisteenlisäys
    if(onkoOikein){
        selectBtn.classList.add("correct"); 
        score++; 
    }else{
        selectBtn.classList.add("incorrect"); 

        
    }

    paivitaPisteet(); 


//Käy läpi kaikki vastausnapit. Jos napin dataset.correct=true, merkitään se oikeaksi. 
// button.disabled estää muiden nappien painamisen. 
     Array.from(vastausnapit.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
        });
        SeuraavaNappi.style.display = "block";  
    } 


//loppunäkymä tulee esiin.
function showEndScreen() {
    EndScreen.style.display = "block";
    
}


//näyttää loppupisteet sekä "aloita alusta" -napin.
    function naytaPisteet(){
        nollaus();
        questionElement.textContent = `Pisteet ${score}/${kysymykset.length}`; 
        SeuraavaNappi.style.display = "none"; 
        restartButton.style.display= "block";
        scoreElement.style.display = "none";
        pisteet.style.display = "none";
        showEndScreen();


//Pisteet sessionstorageen.
        for (let index = 0; index < 5; index++) {
            if (peliData[index] === undefined) {
                peliData.push({peli: "kielipeli", tulos: score});
                sessionStorage.setItem("pelit", JSON.stringify(peliData));
                break
            } else {
                if (peliData[index].peli == "kielipeli")
                    if (score>= peliData[index].tulos) {
                        peliData[index].tulos = score;
                        sessionStorage.setItem("pelit", JSON.stringify(peliData));
                        break
                } else {
                    alert("ENNÄTYKSESI ON JO SUUREMPI!")
                    break

                }
        }
    }}


//Kun klikataan "aloita alusta" -nappia, esiin tulee aloitusnäkymä ja pisteet nollaantuu ja kysymykset alkaa alusta.
    restartButton.addEventListener("click", () => {
       aloitusNakyma.style.display = "block"; 
       quizContainer.style.display = "none";  
       laatikko.style.display = "none";       
       restartButton.style.display = "none";  
       score = 0;                            
       nykyinenKysymysIndex = 0;              
       SeuraavaNappi.style.display = "none";
    
    });


//käynnistää pelin vasta, kun käyttäjä painaa "aloita"
startButton.addEventListener("click", Kaynnistapeli);


//siirtyy seuraavaan kysymykseen, jos kysymyksiä ei enää ole, näytetään lopputulos.
    function siirrySeuraavaan(){
        nykyinenKysymysIndex++;
        if(nykyinenKysymysIndex < kysymykset.length){
            naytakysymys(); 
        }else{
            naytaPisteet(); 
        }
        }
   
        
//seuraava-napin toiminta
    SeuraavaNappi.addEventListener("click", ()=>{ 
        siirrySeuraavaan();
        
    });



