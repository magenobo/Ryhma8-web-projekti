//Reseptit
const ruoat = [
    {
        kuva: "./img/pasta.jpg",
        maa: "Italia",
        lore: "pasta",
        kysymys: "120 millimitraa maitoa, kuinka monta kuppia se on?",
        oikeaMuunnos: ["0,5", "1/2", "0.5"],
    },
    {
        kuva: "./img/macarons.jpg",
        maa: "Ranska",
        lore: "macarons",
        kysymys: "30 millilitraa soijakastiketta, kuinka monta unssia (fl oz) se on?",
        oikeaMuunnos: "1",
    },
    {
        kuva: "./img/lihapullat.jpg",
        maa: "Ruotsi",
        lore: "lihapullat",
        kysymys: "kolme neljäsosaa kuppia maitoa, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos: "180",
    },
    {
        kuva: "./img/wieninleike.jpg",
        maa: "Itävalta",
        lore: "wieninleike",
        kysymys: "1 kanafileen, joka painaa puolen naulan (lb) verran, montako grammaa (g) se on?",
        oikeaMuunnos: "227",
    },
    {
        kuva: "./img/omenapiiras.jpg",
        maa: "Yhdysvallat",
        lore: "omenapiiras",
        kysymys: "300 millilitraa sokeria, kuinka monta kuppia se on?",
        oikeaMuunnos: ["1,25", "1.25"],
    },
    {
        kuva:"./img/paella.jpg",
        maa:"Espanja",
        lore:"paella",
        kysymys:"kaksitoista ja puoli millilitraa (ml) paprikaa, kuinka monta teelusikallista (tsp) se on?",
        oikeaMuunnos:["2,5", "2.5"],
    },
    {
        kuva:"./img/suvlaki.jpg",
        maa:"Kypros",
        lore:"suvlaki",
        kysymys:"kolme ruokalusikallista (tbsp) kuivattua oreganoa, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos:"45",
    },
    {
        kuva:"./img/padThai.jpg",
        maa:"Thaimaa",
        lore:"Pad thai",
        kysymys:"8 unssia (oz) riisinuudeleita, montako grammaa (g) se on?",
        oikeaMuunnos:["226,8", "226.8"],
    },
    {
        kuva:"./img/kothuRoti.jpg",
        maa:"Sri lanka",
        lore:"Kothu roti",
        kysymys:"puoli teelusikallista (tsp) cayanne pippuria, montako millilitraa (ml) se on?",
        oikeaMuunnos:["2,5", "2.5"],
    },
    {
        kuva:"./img/pavlova.jpg",
        maa:"Australia",
        lore:"pavlova",
        kysymys:"kaksi viidesosa naulaa (lb) mansikoita, montako grammaa (g) se on?",
        oikeaMuunnos:["181,6", "181.6"],
    }
];

// Globaali muuttujat
let nykyinenIndeksi = 0;
let pisteet = 0;
let peliData = JSON.parse(sessionStorage.getItem("pelit"))|| []


// Haetaan elementit
const alota = document.getElementById("aloitus");
const peli = document.getElementById("matematiikka");
const kuvaElementti = document.querySelector(".kuvatahan img");
const tunnistaMaa = document.getElementById("tunnistaMaa");
const muunnosLomake = document.getElementById("muunnos");
const valtio = document.getElementById("mikamikamaa");
const maaInput = document.getElementById("tunnistus");
const maaTunnistusNappi = document.getElementById("tunnistusNappi");
const muunnosLaatikko = document.getElementById("muunnistaMaa");
const muunnosInput = document.getElementById("muunnosSubmit");
const muunnosKysymys = document.getElementById("muunnosKysymys");
const seuraavaKysymysNappi = document.getElementById("seuraavaKysymys");
const voititPelin = document.getElementById("voititPelin");
const lopputulos = document.getElementById("lopputulos");
const ennatys = document.getElementById("ennatys")
const aloitaAlusta = document.getElementById("lopetus");
const griddyLaatikot = document.querySelectorAll(".griddy > div");
const oikeinvaarin = document.getElementById("griddy");
const loredump = document.getElementById("loredump");
const korjattuVastaus = document.getElementById("korjattuVastaus")

function paivitaPeli() {
    const ruoka = ruoat[nykyinenIndeksi];
    kuvaElementti.src = ruoka.kuva;
    kuvaElementti.alt = "Kuva ruuasta";
    muunnosKysymys.textContent = ruoka.kysymys;
    valtio.textContent = ruoka.maa;
    loredump.textContent = ruoka.lore;
    muunnosLomake.value = "";
    muunnosLomake.disabled = false;
    muunnosInput.disabled = false;
    muunnosLomake.style.backgroundColor = "white";
    muunnosInput.style.backgroundColor = "";
    seuraavaKysymysNappi.disabled = true; 
    seuraavaKysymysNappi.style.backgroundColor = "#ccc";
    korjattuVastaus.style.visibility = "hidden"; 
}

//aloitusnappi
alota.addEventListener("click", function (e){
    e.preventDefault();
    paivitaPeli()
    alota.style.display = "none";
    peli.style.display = "initial";
    oikeinvaarin.style.display = "grid";
    kuvaElementti.style.display = "initial";
    tunnistaMaa.style.display = "";
    muunnosLaatikko.style.display = "";
    seuraavaKysymysNappi.style.display = "initial";
    aloitaAlusta.style.display = "none";
    lopputulos.textContent = "";
    ennatys.textContent = "";
});

//aloitaalusta
aloitaAlusta.addEventListener("click", function (e){
    e.preventDefault();
    
    alota.style.display = "initial";
    peli.style.display = "none";
    nykyinenIndeksi = 0;
    pisteet = 0;
    for (let index = 0; index < 10; index++) {
        const element = index;
        griddyLaatikot[element].style.backgroundColor = "";
        griddyLaatikot[element].style.backgroundColor = "white";
        griddyLaatikot[element].querySelector("img").setAttribute("src", "");
    }
    oikeinvaarin.style.display = "none";
});

//toivottavasti korjattu muunnoskysymys
muunnosInput.addEventListener("click", function (e){
    e.preventDefault();
    const vastaus = muunnosLomake.value.trim();
    const oikeaVastaus = ruoat[nykyinenIndeksi].oikeaMuunnos;
    korjattuVastaus.style.visibility = "visible"; 
    if(vastaus !== "" && oikeaVastaus.includes(vastaus)){
        pisteet++;
        muunnosLomake.style.backgroundColor = "#bdffbf";
        griddyLaatikot[nykyinenIndeksi].style.backgroundColor = "green";
        griddyLaatikot[nykyinenIndeksi].querySelector("img").setAttribute("src", "./img/oikein.png");
        korjattuVastaus.textContent ="OIKEIN!"
        
    } else {
        muunnosLomake.style.backgroundColor = "red";
        griddyLaatikot[nykyinenIndeksi].style.backgroundColor = "red";
        griddyLaatikot[nykyinenIndeksi].querySelector("img").setAttribute("src", "./img/vaarin.png");
        
        if (oikeaVastaus[0].includes(",")){
            korjattuVastaus.textContent = "Oikea vastaus oli: " + ruoat[nykyinenIndeksi].oikeaMuunnos[0]
        } else {
            korjattuVastaus.textContent = "Oikea vastaus oli: " + oikeaVastaus;
        }

        
        
        
    }
    seuraavaKysymysNappi.disabled = false; 
    seuraavaKysymysNappi.style.backgroundColor = "#cecece"; 
    muunnosInput.disabled = true;

});




//nappi seuraavaan tehtävään
seuraavaKysymysNappi.addEventListener("click", function () {
    if (!seuraavaKysymysNappi.disabled) {
        nykyinenIndeksi++; 
        if (nykyinenIndeksi < ruoat.length) {
            paivitaPeli(); 
        } else {
            kuvaElementti.style.display = "none";
            tunnistaMaa.style.display = "none";
            muunnosLaatikko.style.display = "none";
            seuraavaKysymysNappi.style.display = "none";
            voititPelin.style.display = "initial"
            aloitaAlusta.style.display = "initial"
            lopputulos.textContent = "Peli loppui! Pisteesi: " + pisteet + "/10";
            if (pisteet == "10"){
                ennatys.textContent = "Ansaitsit papukaijamerkin!";
            }
        

            for (let index = 0; index < 5; index++) {
                if (peliData[index] === undefined) {
                    peliData.push({peli: "matikkapeli", tulos: pisteet});
                    sessionStorage.setItem("pelit", JSON.stringify(peliData));
                    break
                } else {
                    if (peliData[index].peli == "matikkapeli")
                        if (pisteet>= peliData[index].tulos) {
                            peliData[index].tulos = pisteet;
                            sessionStorage.setItem("pelit", JSON.stringify(peliData));
                            break
                        } else {
                            ennatys.textContent = "Ennatyksesi oli jo suurempi! Parempi onni ensi kerralla!";
                            break

                    }
            }
            
                
                
            }
        }
    }
});




window.addEventListener("DOMContentLoaded", () => {
    paivitaPeli();
});