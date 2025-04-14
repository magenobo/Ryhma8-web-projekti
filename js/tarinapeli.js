// luodaan kuuntelijat nappeihin, joista aloitetaan peli ja tarkastetaan sana
const startButton = document.querySelector("#start-game")
startButton.addEventListener("click", startGame)

const checkButton = document.querySelector("#word-check")
checkButton.addEventListener("click", checkWord)

const againButton = document.querySelector("#start-again")
againButton.addEventListener("click", gameAgain)

let gameResults = JSON.parse(sessionStorage.getItem("pelit")) || []

// taulukko, joka sisältää sanat, joiden joukosta käyttäjä valitsee haluamansa
const possibleWords = [
    ["suomalainen", "japanilainen", "brasilialainen", "kanadalainen", 
    "egyptiläinen", "australialainen", "meksikolainen", "intialainen", "indonesialainen"],

    ["matkustaa", "paeta", "lentää", "lähteä", "kävellä", "ajaa", "kadota", "hyppiä", "rynnätä"],

    ["kissansa", "hevosensa", "kaninsa", "aasinsa", "papukaijansa", "hiirensä",
    "karhunsa", "mehiläisensä", "possunsa"],

    ["supista", "puhua", "kuiskata", "huutaa", "mutista", "kiljua", "jaaritella", "pölöttää", "selittää"],

    ["vankilaan", "juustokellariin", "kauppaan", "teatteriin", "museoon",
    "kirjastoon", "puistoon", "hotelliin", "sairaalaan"],

    ["tortilloja", "papuja", "sushia", "sämpylöitä", "piiraita", "hampurilaisia",
    "pannukakkuja", "nuudeleita", "jauhelihapihvejä"],

    ["ranskan", "kreikan", "kiinan",  "argentiinan", "suomen", "australian", "meksikon", "intian", "thaimaan"],

    ["Portugalissa", "Puolassa", "Tanskassa", "Unkarissa", "Sveitsissä", "Itävallassa", "Irlannissa", "Skotlannissa",
    "Norjassa"],

    ["oudoilta", "hyviltä", "kauniilta", "hassuilta", "mielenkiintoisilta", "pelottavilta", "hirveiltä",
    "surullisilta", "tahmaisilta"],

    ["ahmia", "syödä", "tökkiä", "heitellä", "sekoittaa", "koskea", "haistella", "potkia", "paiskoa"]
]

let storyWords = []

// 
let words = document.querySelector("#words")
let points = document.querySelector("#points")
let response = document.querySelector("#answer")

let givenWord = document.querySelector("#word-input")

let showWords = document.querySelector("#possible-words")

// koodissa lasketaan pyydettyjen sanojen määrää, pisteitä, yrityksiä ja kohtaa, jossa ollaan menossa taulussa (indeksi)
let wordCount = 1
let pointCount = 0
let tries = 0
let index = 0

// "aloita peli" -nappia painamalla nappi katoaa ja pelialusta tulee näkyviin
function startGame() {

    document.querySelector("#game-board").style.display = "block"
    startButton.style.display = "none"

    changeWords()
}

// funktio tuo taulukosta oikeat sanat käyttäjän näkyville
function changeWords() {
    
    let wordsArray = possibleWords[index]
    showWords.textContent = ""

    wordsArray.forEach (word => {
        const wordElement = document.createElement("p")
        wordElement.textContent = word
        showWords.appendChild(wordElement)
        wordElement.classList.add("listed-words")
    })

    words.textContent = "Sana " + wordCount + " / " + possibleWords.length
    points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length
}


// 
function checkWord() {

    if (checkButton.textContent == "Jatka eteenpäin") {
        nextWords()
        return
    }

    if (checkButton.textContent == "Lue tarina") {
        showStory()
        return
    }

    if (givenWord.value == "") {
        response.textContent = "Vastauslaatikko ei voi olla tyhjä!"
        response.classList.add("incorrect")
        return
    }

    if (possibleWords[index].includes(givenWord.value)) {
        
        tries++

        if (tries == 2) {

            givenWord.disabled = true
            pointCount += 1

            alert("tuletko tänne")

            if (wordCount == possibleWords.length) {
                pointCount-= 0.5
                
                response.textContent = "Sana kelpaa ja ansaitsit 0.5 pistettä! Tämä oli viimeisen sana. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Lue tarina"
            } else {
                pointCount-= 0.5

                response.textContent = "Sana kelpaa ja ansaitsit 0.5 pistettä! Jatka eteenpäin."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Jatka eteenpäin"
            }

        } else {
            
            givenWord.disabled = true
            pointCount++

            if (wordCount == possibleWords.length) {
                response.textContent = "Sana kelpaa ja ansaitsit 1 pisteen! Annoit viimeisen sanon. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Lue tarina"
            } else {
                response.textContent = "Sana kelpaa ja ansaitsit 1 pisteen. Jatka eteenpäin."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Jatka eteenpäin"
            }
        }

        points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length
        storyWords.push(givenWord.value)

    } else {
        
        tries++

        if (tries == 2) {

            givenWord.disabled = true

            if (wordCount == possibleWords.length) {
                response.textContent = "Sana ei kelpaa! Käytit viimeisen yrityksen etkä ansainnut pisteitä. Tämä oli viimeinen sana. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("incorrect")
                checkButton.textContent = "Lue tarina"

                if (index < 9) {
                    storyWords.push(possibleWords[index][index])
                } else {
                    storyWords.push(possibleWords[index][index-1])
                }
            } else {

            response.textContent = "Sana ei kelpaa! Käytit viimeisen yrityksen etkä ansainnut pisteitä. Jatka eteenpäin."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("incorrect")
            checkButton.textContent = "Jatka eteenpäin"

            if (index < 9) {
                storyWords.push(possibleWords[index][index])
            } else {
                storyWords.push(possibleWords[index][index-1])
            }
            }
            
        } else {
            
            givenWord.value = ""
            response.textContent = "Sana ei kelpaa! Yksi yritys jäljellä. Oikealla sanalla voit ansaita 0.5 pistettä."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("incorrect")

        }
    }
}

function nextWords() {
    tries = 0
    wordCount++
    index++

    givenWord.disabled = false

    givenWord.value = ""
    checkButton.textContent = "Tarkista sana"
    response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."
    response.classList.remove("answer", "correct", "incorrect")
    response.classList.add("answer")
    changeWords()
}

function showStory() {
    document.querySelector("#game-board").style.display = "none"
    document.querySelector("#result-board").style.display = "block"

    document.querySelector("#final-points").textContent = "Yhteispisteet " + pointCount + " / " + possibleWords.length

    let finalStory = document.querySelector("#final-story")
    
    finalStory.textContent = "Olipa kerran " + storyWords[0] + ", joka halusi " + storyWords[1] + " ulkomaille "
    + storyWords[2] + " kanssa. Hän ei kuitenkaan osannut " + storyWords[3] + " paikallista kieltä ja joutui sen vuoksi "
    + storyWords[4] + ". Siellä " + storyWords[0] + " tapasi kokin, joka väitti osaavansa tehdä " + storyWords[5] + ". Päästäkseen maistamaan kokin tekeleitä "
    + storyWords[0] + " seurasi tätä keittiöön, jonka katosta roikkui " + storyWords[6] + " lippu. 'Miksi sinulla on tuo lippu tuossa?' kysyi " + storyWords[0]
    + ". 'Ystäväni vieraili " + storyWords[7] + " ja toi sen minulle', kokki vastasi tuodessaan valmista ruokaa pöytään. " 
    + storyWords[0] + " tuijotti " + storyWords[5] + " ihmeissään, koska ne näyttivät " + storyWords[8] + ". Hän alkoi kuitenkin " 
    + storyWords[9] + " ruokaa lopulta suurella ruokahalulla, kunnes pystyi vatsa pullottaen lysähtämään takaisin tuoliin."

    for (let index = 0; index < 5; index++) {
        if (gameResults[index] === undefined) {
            gameResults.push({peli: "tarinapeli", tulos: pointCount});
            sessionStorage.setItem("pelit", JSON.stringify(gameResults));
            break
        } else {
            if (peliData[index].peli == "tarina")
                if (pointCount>= gameResults[index].tulos) {
                    gameResults[index].tulos = pointCount;
                    sessionStorage.setItem("pelit", JSON.stringify(gameResults));
                    break
            } else {
                alert("ENNÄTYKSESI ON JO SUUREMPI!")
                break
            }
        }
    }   
}


function gameAgain() {
    tries = 0
    wordCount = 1
    pointCount = 0
    index = 0

    changeWords()

    response.classList.remove("answer", "correct", "incorrect", "ready")
    response.classList.add("answer")
    response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."

    points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length

    checkButton.textContent = "Tarkista sana"
    words.textContent = "Sana " + wordCount + " / " + possibleWords.length

    document.querySelector("#game-board").style.display = "block"
    document.querySelector("#result-board").style.display = "none"

    givenWord.value = ""
    givenWord.disabled = false
}