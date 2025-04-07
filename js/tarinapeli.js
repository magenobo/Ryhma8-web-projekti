// luodaan kuuntelijat nappeihin, joista aloitetaan peli ja tarkastetaan sana
const startButton = document.querySelector("#start-game")
startButton.addEventListener("click", startGame)

const checkButton = document.querySelector("#word-check")
checkButton.addEventListener("click", checkWord)

const againButton = document.querySelector("#start-again")
againButton.addEventListener("click", gameAgain)


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
    "Walesissa", "Norjassa"],

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
    showWords.textContent = wordsArray.join(" ")
    words.textContent = "Sana " + wordCount + "/10"
}


// 
function checkWord() {

    if (checkButton.textContent == "Jatka eteenpäin") {
        nextWords()
        return
    }

    if (givenWord.value == "") {
        response.textContent = "Vastauslaatikko ei voi olla tyhjä!"
        response.classList.add("incorrect")
        return
    }

    if (possibleWords[index].includes(givenWord.value)) {
        
        pointCount++
        tries++

        if (tries == 2) {

            givenWord.disabled = true

            response.textContent = "Sana kelpaa! Ansaitsit 0.5 pistettä. Jatka eteenpäin."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("correct")
            checkButton.textContent = "Jatka eteenpäin"
            points.textContent = "Pisteet " + pointCount + "/10"
            storyWords.push(givenWord.value)
        } else {
            
            givenWord.disabled = true

            response.textContent = "Sana kelpaa! Ansaitsit 1 pisteen. Jatka eteenpäin."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("correct")
            checkButton.textContent = "Jatka eteenpäin"
            points.textContent = "Pisteet " + pointCount + "/10"
            storyWords.push(givenWord.value)
        }


    } else {
        if (pointCount >= 0.5) {
            pointCount-= 0.5
        }
        tries++

        if (tries == 2) {

            givenWord.disabled = true

            response.textContent = "Sana ei kelpaa! Käytit viimeisen yrityksen etkä ansainnut pisteitä. Jatka eteenpäin."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("incorrect")
            checkButton.textContent = "Jatka eteenpäin"

            if (index < 9) {
                storyWords.push(possibleWords[index][index])
            } else {
                storyWords.push(possibleWords[index][index-1])
            }
            
        } else {
            
            document.querySelector("#word-input").value = ""
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

    if (wordCount <= possibleWords.length) {

        givenWord.disabled = false

        document.querySelector("#word-input").value = ""
        checkButton.textContent = "Tarkista sana"
        response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."
        response.classList.remove("answer", "correct", "incorrect")
        response.classList.add("answer")
        changeWords()
    } else {

        document.querySelector("#game-board").style.display = "none"
        document.querySelector("#result-board").style.display = "block"

        document.querySelector("#final-points").textContent = "Yhteispisteet " + pointCount + " / 10"

        let finalStory = document.querySelector("#final-story")
        
        finalStory.textContent = "Olipa kerran " + storyWords[0] + ", joka halusi " + storyWords[1] + " ulkomaille "
        + storyWords[2] + " kanssa. Hän ei kuitenkaan osannut " + storyWords[3] + " paikallista kieltä ja joutui sen vuoksi "
        + storyWords[4] + ". Siellä " + storyWords[0] + " tapasi kokin, joka väitti osaavansa tehdä " + storyWords[5] + ". Päästäkseen maistamaan kokin tekeleitä "
        + storyWords[0] + " seurasi tätä keittiöön, jonka katosta roikkui " + storyWords[6] + " lippu. 'Miksi sinulla on tuo lippu tuossa?' kysyi " + storyWords[0]
        + ". 'Ystäväni vieraili " + storyWords[7] + " ja toi sen minulle', kokki vastasi tuodessaan valmista ruokaa pöytään. " 
        + storyWords[0] + " tuijotti tortilloja ihmeissään, koska ne näyttivät " + storyWords[8] + ". Hän alkoi kuitenkin " 
        + storyWords[9] + " ruokaa lopulta suurella ruokahalulla, kunnes pystyi vatsa pullottaen lysähtämään takaisin tuoliin."

    }
}

function gameAgain() {
    tries = 0
    wordCount = 1
    pointCount = 0
    index = 0

    response.classList.remove("answer", "correct", "incorrect")
    response.classList.add("answer")
    response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."

    checkButton.textContent = "Tarkista sana"
    words.textContent = "Sana " + wordCount + "/10"

    document.querySelector("#game-board").style.display = "block"
    document.querySelector("#result-board").style.display = "none"
}