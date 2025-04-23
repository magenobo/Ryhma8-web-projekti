

document.addEventListener("DOMContentLoaded", () => {

    const aloita_peli_nappi = document.getElementById("aloita_peli")
    const aloita_alusta_nappi = document.getElementById("aloita_alusta")
    const peli_itse_div = document.getElementById("peli_itse")
    const laatikko = document.getElementById("laatikko")
    let firstCard = null
    let secondCard = null
    let matches = 0
    let lockBoard = false
    const totalPairs = 6
    let peliData = JSON.parse(sessionStorage.getItem("pelit")) || []

    peli_itse_div.style.display = "none"


    //kadottaa aloita peli nappulan ja kuvan
    aloita_peli_nappi.addEventListener("click", () => {
        document.querySelector("#katoa").style.display = "none"
        
        //aloittaa pelin ja tuo sen esille
        peli_itse_div.style.display = "block";
        SekoitaKortit(); // Korttien sekoitus

    });
        
    //Aloita alusta napin toiminto
    aloita_alusta_nappi.addEventListener("click", () => {

        location.reload(); // päivittää sivun
    });

    
    function SekoitaKortit() { // korttien sekoitus funktio
        const kortit = Array.from(document.querySelectorAll('.kortti'));

        kortit.forEach(kortti => { //haetaan kortit
            kortti.classList.remove('active', 'matched') //Poistetaan aktiivisuus ja löydetyt parit
            kortti.style.visibility = 'visible' //korttien näkyvyys
        });

        
        for (let i = kortit.length - 1; i > 0; i--) { //sekoitus algoritmi
            const sekoitus = Math.floor(Math.random() * (i + 1))
            laatikko.appendChild(kortit[sekoitus])
        }

        firstCard = null // pelitilan nollaus
        secondCard = null
        lockBoard = false
        matches = 0
        
    }


    

    const card = document.querySelectorAll('.kortti')
    card.forEach(kortti => {
        kortti.addEventListener('click', function () {
            if (lockBoard || this === firstCard || this.classList.contains('matched')) { //estetöön toimintoja jos kortti on jo käännetty tai klikataan samaa korttia kahdesti
                return;
            }

            this.classList.add('active') //kortin kääntö

            if (!firstCard) { 
                firstCard = this //tallennetaan kortti
                return;
            }

            secondCard = this
            lockBoard = true //lukitaan peli jos tarkistetaan paria

            tarkistaPari(); //Parien tarkastusfunktio
            
        });
    });
    
    


    function tarkistaPari() {
        const kortti1Alt = firstCard.querySelector('.taka img').alt
        const kortti2Alt = secondCard.querySelector('.taka img').alt
        
        if (kortti1Alt === kortti2Alt) {
            // pari
            firstCard.classList.add('matched') 
            secondCard.classList.add('matched')
            matches++;
                
            if (matches === totalPairs) {
                setTimeout(() => {
                    alert("Hyvin pelattu! Löysit kaikki parit");
                }, 500);
            }
        
            firstCard = null
            secondCard = null
            lockBoard = false
        } else {
                
            setTimeout(() => {
                firstCard.classList.remove('active')
                secondCard.classList.remove('active')
                    
                firstCard = null
                secondCard = null
                lockBoard = false
            }, 1000);
        }
    }

    for (let index = 0; index < 5; index++) {
        if (peliData[index] === undefined) {
            peliData.push({peli: "lippupeli", tulos: matches});
            sessionStorage.setItem("pelit", JSON.stringify(peliData));
            break
        } else {
            if (peliData[index].peli == "lippupeli")
                if (matches>= peliData[index].tulos) {
                    peliData[index].tulos = matches;
                    sessionStorage.setItem("pelit", JSON.stringify(peliData));
                    break
            } else {
                alert("ENNÄTYKSESI ON JO SUUREMPI!")
                break

            }
        }
    }
    

});

