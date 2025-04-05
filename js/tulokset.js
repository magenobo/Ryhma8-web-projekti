// haetaan sessionStoragesta sinne tallennetut pelit
// jos pelien tuloksia ei ole tallennettu, palautetaan tyhjä taulukko
let gameResults = JSON.parse(sessionStorage.getItem("pelit")) || []

let mathResult  = document.querySelector("#math-result")
let languageResult = document.querySelector("#language-result")
let flagResult = document.querySelector("#flag-result")
let mapResult = document.querySelector("#map-result")
let storyResult = document.querySelector("#story-result")

showRecords()

function showRecords() {

    for (let i = 0; i < gameResults.length; i++) {
        if (gameResults[i].peli == "matikkapeli") {
            mathResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "kielipeli") {
            languageResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "karttapeli") {
            mapResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "lippupeli") {
            flagResult.textContent = gameResults[i].tulos + " / 10"
        } else if (gameResults[i].peli == "tarinapeli") {
            storyResult.textContent = gameResults[i].tulos + " / 10"
        }
    }
}