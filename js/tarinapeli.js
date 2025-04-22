// luodaan kuuntelijat nappeihin, joista aloitetaan peli, tarkastetaan sana ja käynnistetään peli uudestaan
const startButton = document.querySelector("#start-game")
startButton.addEventListener("click", startGame)

const checkButton = document.querySelector("#word-check")
checkButton.addEventListener("click", checkWord)

const againButton = document.querySelector("#start-again")
againButton.addEventListener("click", gameAgain)

// tuodaan sessionStoragessa valmiina olevat tiedot
// jos tietoja ei löydy, palautetaan tyhjä taulukko
let gameResults = JSON.parse(sessionStorage.getItem("pelit")) || []

// taulukko, joka sisältää sanat, joiden joukosta käyttäjä valitsee haluamansa sanan
const possibleWords = [
    ["suomalainen", "japanilainen", "brasilialainen", "kanadalainen", 
    "egyptiläinen", "australialainen", "meksikolainen", "intialainen", "indonesialainen"],

    ["matkustaa", "paeta", "lentää", "lähteä", "kävellä", "ajaa", "kadota", "hyppiä", "rynnätä"],

    ["kissansa", "hevosensa", "kaninsa", "aasinsa", "papukaijansa", "hiirensä",
    "karhunsa", "mehiläisensä", "possunsa"],

    ["supista", "puhua", "kuiskata", "huutaa", "mutista", "kiljua", "jaaritella", "pölöttää", "selittää"],

    ["vankilaan", "juustokellariin", "kauppaan", "teatteriin", "museoon",
    "kirjastoon", "puistoon", "hotelliin", "sairaalaan"],

    ["tortilloja", "papuja", "kananmunia", "sämpylöitä", "lihapullia", "hampurilaisia",
    "pannukakkuja", "nuudeleita", "pihvejä"],

    ["ranskan", "kreikan", "kiinan",  "argentiinan", "ruotsin", "yhdysvaltojen", "meksikon", "venäjän", "thaimaan"],

    ["Portugalissa", "Puolassa", "Tanskassa", "Unkarissa", "Sveitsissä", "Itävallassa", "Irlannissa", "Englannissa",
    "Norjassa"],

    ["oudoilta", "hyviltä", "kauniilta", "hassuilta", "mielenkiintoisilta", "pelottavilta", "hirveiltä",
    "surullisilta", "tahmaisilta"],

    ["ahmia", "syödä", "tökkiä", "heitellä", "sekoittaa", "koskea", "haistella", "potkia", "paiskoa"]
]


// luodaan tyhjä taulukko käyttäjän antamia sanoja varten
let storyWords = []

let response = document.querySelector("#answer")
let givenWord = document.querySelector("#word-input")
let showWords = document.querySelector("#possible-words")

// koodissa lasketaan pyydettyjen sanojen määrää, pisteitä, yrityksiä ja kohtaa, jossa ollaan menossa taulussa (indeksi)
let words = document.querySelector("#words")
let wordCount = 1

let points = document.querySelector("#points")
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

    // jokaiselle sanalle luodaan oma p-elementti
    wordsArray.forEach (word => {
        const wordElement = document.createElement("p")
        wordElement.textContent = word
        showWords.appendChild(wordElement)
        wordElement.classList.add("listed-words")
    })

    // sanojen päivittyessä päivitetään sivulle myös kysyttyjen sanojen määrä ja pisteet
    words.textContent = "Sana " + wordCount + " / " + possibleWords.length
    points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length
}


// funktiolla tarkistetaan, onko käyttään antama sana oikein
function checkWord() {

    // jos oikea sana ollaan jo saatu, siirrytään uuteen funktioon
    if (checkButton.textContent == "Jatka eteenpäin") {
        nextWords()
        return
    }

    // jos kaikki sanat on jo annettu, siirrytään myös uuteen funktioon 
    if (checkButton.textContent == "Lue tarina") {
        showStory()
        return
    }

    // estetään tyhjän vastauslaatikon tarkistaminen
    if (givenWord.value == "") {
        response.textContent = "Vastauslaatikko ei voi olla tyhjä!"
        response.classList.add("incorrect")
        return
    }

    // tarkistetaan, onko annettu sana taulukon oikeassa indeksissä
    if (possibleWords[index].includes(givenWord.value)) {
        
        tries++

        // joka kerta lisätään yksi yritys ja jos yritysten määrä on kaksi, mennään tähän lauseeseen
        if (tries == 2) {

            // estetään vastauksen muuttaminen ja lisätään yksi piste
            givenWord.disabled = true
            pointCount += 1

            // jos ollaan pyydetty viimeinen sana
            if (wordCount == possibleWords.length) {
                
                // vähennetään puoli pistettä, koska ensimmäinen vastaus ei ole ollut oikein
                pointCount-= 0.5
                
                // kerrotaan ansaitut pisteet ja muutetaan teksti oikean väriseksi (vihreä). Nappi muuttuu "lue tarina" -napiksi
                response.textContent = "Sana kelpaa ja ansaitsit 0.5 pistettä! Tämä oli viimeisen sana. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Lue tarina"
            } else {

                // tänne mennään, jos sanoja pyydetään vielä lisää

                pointCount-= 0.5

                // kerrotaan ansaitut pisteet ja muutetaan teksi oikean väriseksi (vihreä). Naappi muuttuu "jatka eteenpäin" -napiksi
                response.textContent = "Sana kelpaa ja ansaitsit 0.5 pistettä! Jatka eteenpäin."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Jatka eteenpäin"
            }

        } else {

            // tänne tullaan, jos yritys on ensimmäinen
            
            givenWord.disabled = true
            pointCount++

            // jos kysyttävä sana on viimeinen
            if (wordCount == possibleWords.length) {

                // muutetaan teksi, tekstin väri ja nappi oikeaan muotoon

                response.textContent = "Sana kelpaa ja ansaitsit 1 pisteen! Annoit viimeisen sanan. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Lue tarina"
            } else {

                // jos kysyttävä sana ei ole viimeinen

                // muutetaan teksi, tekstin väri ja nappi oikeaan muotoon
                response.textContent = "Sana kelpaa ja ansaitsit 1 pisteen. Jatka eteenpäin."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("correct")
                checkButton.textContent = "Jatka eteenpäin"
            }
        }

        points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length

        // lisätään annettu sana taulukkoon, joka luotiin käyttäjän antamille sanoille
        storyWords.push(givenWord.value)

    } else {

        // jos sana ei ole oikeiden sanojen joukossa, yrityksiä lisätään silti
        
        tries++

        // jos yritys oli jo toinen
        if (tries == 2) {

            givenWord.disabled = true

            // jos pyydetty sana oli viimeinen
            // muutetaan teksti, tekstin väri (punainen) ja nappi oikeaan muotoon
            if (wordCount == possibleWords.length) {
                response.textContent = "Sana ei kelpaa! Käytit viimeisen yrityksen etkä ansainnut pisteitä. Tämä oli viimeinen sana. Jatka eteenpäin nähdäksesi tarinan."
                response.classList.remove("answer", "correct", "incorrect")
                response.classList.add("incorrect")
                checkButton.textContent = "Lue tarina"

                // peli valitsee tässä tapauksessa indeksin mukaan tarvittavan sanan mukaan
                if (index < 9) {
                    storyWords.push(possibleWords[index][index])
                } else {
                    storyWords.push(possibleWords[index][index-1])
                }
            } else {

                // tänne tullaa, jos vielä kysytään lisää sanoja
                // muutetaan teksti, tekstin väri (punainen) ja nappi oikeaan muotoon
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
            
            // tänne tullaan, jos yritys oli vasta ensimmäinen

            // tyhjennetään vastauslaatikko uutta yritystä varten ja muutetaan teksti ja tekstin väri (punainen) oikeaan muotoon
            givenWord.value = ""
            response.textContent = "Sana ei kelpaa! Yksi yritys jäljellä. Oikealla sanalla voit ansaita 0.5 pistettä."
            response.classList.remove("answer", "correct", "incorrect")
            response.classList.add("incorrect")

        }
    }
}

// tähän funktioon tullaan, kun laatikkoon vaihdetaan uudet sanat
function nextWords() {
    
    // yritykset nollataan, kysyttyjen sanojen määrää sekä indeksiä kasvatetaan
    tries = 0
    wordCount++
    index++

    // käyttäjälle annetaan mahdollisuus kirjoittaa vastauslaatikkoon
    givenWord.disabled = false

    // vastaualaatikko tyhjennetään ja näkyviin laitetaan normaalit ohjeet
    givenWord.value = ""
    checkButton.textContent = "Tarkista sana"
    response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."
    response.classList.remove("answer", "correct", "incorrect")
    response.classList.add("answer")

    // kutsutaan sanat vaihtavaa funktiota
    changeWords()
}

// tähän funktioon tullaan, kun painetaan "lue tarina" -painiketta
function showStory() {

    // pelilauta poistetaan näkyvistä ja tuloslauta tuodaan esiin
    document.querySelector("#game-board").style.display = "none"
    document.querySelector("#result-board").style.display = "block"

    document.querySelector("#final-points").textContent = "Yhteispisteet " + pointCount + " / " + possibleWords.length

    let finalStory = document.querySelector("#final-story")
    
    // taulukkoon tallennetut käyttäjän antamat sanat sijoitetaan tarinaan
    finalStory.textContent = "Olipa kerran " + storyWords[0] + ", joka halusi " + storyWords[1] + " ulkomaille "
    + storyWords[2] + " kanssa. Hän ei kuitenkaan osannut " + storyWords[3] + " paikallista kieltä ja joutui sen vuoksi "
    + storyWords[4] + ". Siellä " + storyWords[0] + " tapasi kokin, joka väitti osaavansa tehdä " + storyWords[5] + ". Päästäkseen maistamaan kokin tekeleitä "
    + storyWords[0] + " seurasi tätä keittiöön, jonka katosta roikkui " + storyWords[6] + " lippu. 'Miksi sinulla on tuo lippu tuossa?' kysyi " + storyWords[0]
    + ". 'Ystäväni vieraili " + storyWords[7] + " ja toi sen minulle', kokki vastasi tuodessaan valmista ruokaa pöytään. Ihmeissään " 
    + storyWords[0] + " tuijotti " + storyWords[5] + ", koska ne näyttivät " + storyWords[8] + ". Hän alkoi kuitenkin " 
    + storyWords[9] + " ruokaa lopulta suurella ruokahalulla, kunnes pystyi vatsa pullottaen lysähtämään takaisin tuoliin."

    // käyttäjän saama tulos tallennetaan sessionStorageen
    for (let index = 0; index < 5; index++) {
        if (gameResults[index] === undefined) {
            gameResults.push({peli: "tarinapeli", tulos: pointCount});
            sessionStorage.setItem("pelit", JSON.stringify(gameResults));
            break
        } else {

            // jos aikaisempi tulos löytyy, aikaisempi tulos korvataan vain, jos uusi tulos on parempi
            if (gameResults[index].peli == "tarinapeli")
                if (pointCount>= gameResults[index].tulos) {
                    gameResults[index].tulos = pointCount;
                    sessionStorage.setItem("pelit", JSON.stringify(gameResults));
                    break
                } else {
                    break
            }
        }
    }   
}

// tähän funktioon tullaan, jos painetaan "aloita alusta" -painiketta
function gameAgain() {

    // kaikki numeroita laskevat muuttujat palautetaan alkuarvoon
    tries = 0
    wordCount = 1
    pointCount = 0
    index = 0

    // tuodaan näkyville oikeat sanat
    changeWords()

    // tuodaan nkäyville oikea ohjeteksti oikealla värillä (musta)
    response.classList.remove("answer", "correct", "incorrect", "ready")
    response.classList.add("answer")
    response.textContent = "Oikealla sanalla voit ansaita 1 pisteen."

    // päivitetty piste- ja sanatilanne tuodaan näkyville
    points.textContent = "Pisteet " + pointCount + " / " + possibleWords.length
    checkButton.textContent = "Tarkista sana"
    words.textContent = "Sana " + wordCount + " / " + possibleWords.length

    // pelialusta palautetaan näkyviin ja tulosalusta piilotetaan
    document.querySelector("#game-board").style.display = "block"
    document.querySelector("#result-board").style.display = "none"

    givenWord.value = ""
    givenWord.disabled = false
}