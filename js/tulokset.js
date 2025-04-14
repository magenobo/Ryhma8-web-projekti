// haetaan sessionStoragesta sinne tallennetut pelit
// jos pelien tuloksia ei ole tallennettu, palautetaan tyhjä taulukko
let gameResults = JSON.parse(sessionStorage.getItem("pelit")) || []

let mathResult  = document.querySelector("#math-result")
let languageResult = document.querySelector("#language-result")
let flagResult = document.querySelector("#flag-result")
let mapResult = document.querySelector("#map-result")
let storyResult = document.querySelector("#story-result")

let points = 0

let bagdecount = 0

showRecords()

function showRecords() {

    for (let i = 0; i < gameResults.length; i++) {
        points += gameResults[i].tulos
        if (gameResults[i].tulos == 10) {
            bagdecount++
        }
    }

    document.querySelector("#all-results").textContent = "Yhteispisteet " + points + " / 70"
    document.querySelector("#all-parrots").textContent = "Ansaitut papukaijamerkit " + bagdecount + " / 5"

    for (let i = 1; i <= bagdecount; i++) {
        let parrotImg = document.querySelector(`#parrot-img-${i}`)
        parrotImg.src = `./img/papukaija${i}.jpg`
        parrotImg.alt = `${i}. ansaittu papukaijakuva`
        parrotImg.classList.add("parrot-img")
    }

    for (let i = 0; i < gameResults.length; i++) {
        if (gameResults[i].peli == "matikkapeli") {
            mathResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "kielipeli") {
            languageResult.textContent = gameResults[i].tulos + " / 8"
        } else if (gameResults[i].peli == "karttapeli") {
            mapResult.textContent = gameResults[i].tulos + " / 32"
        } else if (gameResults[i].peli == "lippupeli") {
            flagResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "tarinapeli") {
            storyResult.textContent = gameResults[i].tulos + " / 10"
        }
    }
}

function countBadges() {

    if (parrotBagdes > 0) {
        document.querySelector("#parrot-img-one").src = "./img/papukaija1"
    } if (parrotBagdes > 1) {
        document.querySelector("#parrot-img-two").src = "./img/papukaija2"
    } if (parrotBagdes > 2) {
        document.querySelector("#parrot-img-three").src = "./img/papukaija3"
    } if (parrotBagdes > 3) {
        document.querySelector("#parrot-img-four").src = "./img/papukaija4"
    } if (parrotBagdes > 4) {
        document.querySelector("#parrot-img-five").src = "./img/papukaija5"
    }
}