// luodaan kuuntelija buttoniin, josta peli alkaa ja tulee näkyviin
const startButton = document.querySelector("#start-game")
startButton.addEventListener("click", startGame)

const possibleWords = [
    ["suomalainen", "japanilainen", "brasilialainen", "kanadalainen", 
    "egyptiläinen", "australialainen", "meksikolainen", "intialainen", "indonesialainen"],

    ["matkustaa", "paeta", "lentää", "lähteä", "kävellä", "ajaa", "kadota", "hyppiä", "rynnätä"],

    ["kissansa", "hevosensa", "kaninsa", "aasinsa", "papukaijansa", "hiirensä",
    "karhunsa", "mehiläisensä", "possunsa"],

    ["supista", "puhua", "kuiskata", "huutaa", "mutista", "kiljua", "jaaritella", "pölöttää", "selittää"],

    ["vankilaan", "juustokellariin", "kauppaan", "teatteriin", "museoon",
    "kirjastoon", "puistoon", "kotelliin", "sairaalaan"],

    ["tortilloja", "papuja", "sushia", "sämpylöitä", "piiraita", "hampurilaisia",
    "pannukakkuja", "nuudeleita", "jauhelihapihvejä"],

    ["ranskan", "kreikan", "kiinan",  "argentiinan", "suomen", "australian", "meksikon", "intian", "thaimaan"],

    ["Portugalissa", "Puolassa", "Tanskassa", "Unkarissa", "Sveitsissä", "Itävallassa", "Irlannissa", "Skotlannissa",
    "Walesissa", "Norjassa"],

    ["oudoilta", "hyviltä", "kauniilta", "hassuilta", "mielenkiintoisilta", "pelottavilta", "hirveiltä",
    "surullisilta", "tahmaisilta"],

    ["ahmia", "syödä", "tökkiä", "heitellä", "sekoittaa", "koskea", "haistella", "potkia", "paiskoa"]
]

const checkButton = document.querySelector("#word-check")
checkButton.addEventListener("click", checkWord)

let words = document.querySelector("#words")
let points = document.querySelector("#points")

// lasketaan pyydettyjen sanojen määrää ja pisteitä
wordCount = 1
pointCount = 0
tries = 0

index = 0


/**
 * @param {Event} event
 */


// nappia painamalla nappi katoaa ja pelialusta tulee näkyviin
function startGame() {

    const gameBoard = document.querySelector("#game-board").style.display = "block"
    startButton.style.display = "none"

    changeWords()
}

function changeWords() {
    
    let showWords = document.querySelector("#possible-words")
    let words = possibleWords[index].toString().replace(/,/g, " ").split(" ")
    showWords.textContent = words.join(" ")
    
    words.textContent = "Sana" + wordCount + "/10"
}

// 
function checkWord() {
    
    let givenWord = document.querySelector("#word-input").value
    let answer = document.querySelector("#answer")

    if (possibleWords[index].includes(givenWord)) {
        console.log("täällä");
        
        wordCount++
        pointCount++
        index++
        answer.textContent = "Sana kelpaa! Ansaitsit 1 pisteen. Jatka eteenpäin."
        answer.classList.add("correct")
        checkButton.textContent = "Jatka eteenpäin"
        points.textContent = "Pisteet " + pointCount + "/10"

        changeWords()
    } else {
        pointCount-= 0.5
        tries++
        
        if (tries == 2) {
            answer.textContent = "Sana ei kelpaa! Käytit viimeisen yrityksen etkä ansainnut pisteitä. Jatka eteenpäin."
            answer.classList.add("incorrect")
            checkButton.textContent = "Jatka eteenpäin"

            changeWords()
            
        } else {
            document.querySelector("#word-input").value = ""
            answer.textContent = "Sana ei kelpaa! Yksi yritys jäljellä. Oikealla sanalla voit ansaita 0.5 pistettä."
            answer.classList.add("incorrect")
        }
    }
}
