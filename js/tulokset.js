// haetaan sessionStoragesta sinne tallennetut pelien tiedot
// jos pelien tuloksia ei ole tallennettu, palautetaan tyhjä taulukko
let gameResults = JSON.parse(sessionStorage.getItem("pelit")) || []

// kaikille peleille luodaan omat muuttujat
let mathResult  = document.querySelector("#math-result")
let languageResult = document.querySelector("#language-result")
let flagResult = document.querySelector("#flag-result")
let mapResult = document.querySelector("#map-result")
let storyResult = document.querySelector("#story-result")

// luodaan muuttujat yhteispisteille ja papukaijamerkkien määrälle
let points = 0
let bagdecount = 0

showRecords()

// tällä funktiolla tuodaan näkyviin tulossivulle pistemäärät ja papukaijamerkit
function showRecords() {

    // käydään läpi storagesta tuotua taulukkoa indeksi kerrallaan ja tallennetaan yhteispisteisiin jokaisesta indeksistä löytyvät pisteet
    for (let i = 0; i < gameResults.length; i++) {
        points += gameResults[i].tulos

        // tarinan nimen mukaan tarkistetaan, onko käyttäjä saanut kyseisestä pelistä täydet pisteet
        // papukaijamerkkien määrään lisätään yksi, jos täydet pisteet on saanut

        if (gameResults[i].peli == "tarinapeli" || gameResults[i].peli == "matikkapeli") {
            if (gameResults[i].tulos == 10) {
                bagdecount++
            }
        } else if (gameResults[i].peli == "kielipeli") {
            if (gameResults[i].tulos == 8) {
                bagdecount++
            }
        } else if (gameResults[i].peli == "karttapeli") {
            if (gameResults[i].tulos == 32) {
                bagdecount++
            }
        } else if (gameResults[i].peli == "lippupeli") {
            if (gameResults[i].tulos == 6) {
                bagdecount++
            }
        }
    }

    // tuodaan sivulle näytille yhteispisteiden ja papukaijamerkkien määrät
    document.querySelector("#all-results").textContent = "Yhteispisteet " + points + " / 66"
    document.querySelector("#all-parrots").textContent = "Ansaitut papukaijamerkit " + bagdecount + " / 5"

    // silmukan avulla tuodaan sivulle näkyviin niin monta papukaijamerkkiä kuin monestako pelistä käyttäjä on saanut täydet pisteet
    for (let i = 1; i <= bagdecount; i++) {
        let parrotImg = document.querySelector(`#parrot-img-${i}`)
        parrotImg.src = `./img/papukaija${i}.jpg`
        parrotImg.alt = `${i}. ansaittu papukaijakuva`
        parrotImg.classList.add("parrot-img")
    }

    // käydään läpi storagesta tuotu taulukko ja lisätään kustakin pelistä saadut pisteet oikean pelin kohdalle
    for (let i = 0; i < gameResults.length; i++) {
        if (gameResults[i].peli == "matikkapeli") {
            mathResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "kielipeli") {
            languageResult.textContent = gameResults[i].tulos + " / 8"
        } else if (gameResults[i].peli == "karttapeli") {
            mapResult.textContent = gameResults[i].tulos + " / 32"
        } else if (gameResults[i].peli == "lippupeli") {
            flagResult.textContent = gameResults[i].tulos + " / 6"
        } else if (gameResults[i].peli == "tarinapeli") {
            storyResult.textContent = gameResults[i].tulos + " / 10"
        }
    }
}