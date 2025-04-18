//Reseptit
const ruoat = [
    {
        kuva: "./img/pasta.jpg",
        maa: "italia",
        lore: "PASTA ON IHAN TÖRKEEN HYVÄÄ!",
        kysymys: "120 ml maitoa, kuinka monta kuppia se on?",
        oikeaMuunnos: ["0.5", "1/2", "0,5"],
    },
    {
        kuva: "./img/macarons.jpg",
        maa: "ranska",
        lore: "PASTA ON IHAN TÖRKEEN HYVÄÄ!",
        kysymys: "30 ml soijakastiketta, kuinka monta unssia (fl oz) se on?",
        oikeaMuunnos: "1",
    },
    {
        kuva: "./img/lihapullat.jpg",
        maa: "ruotsi",
        lore: "PASTA ON IHAN TÖRKEEN HYVÄÄ!",
        kysymys: "1 kupin maitoa, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos: "240",
    },
    {
        kuva: "./img/wieninleike.jpg",
        maa: "itävalta",
        lore: "PASTA ON IHAN TÖRKEEN HYVÄÄ!",
        kysymys: "1 kanafileen, joka painaa puolen naulan (lb) verran, montako grammaa (g) se on?",
        oikeaMuunnos: "227",
    },
    {
        kuva: "./img/omenapiiras.jpg",
        maa: "pohjois-amerikka",
        lore: "PASTA ON IHAN TÖRKEEN HYVÄÄ!",
        kysymys: "yksi ja puoli kuppia sokeria, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos: "360",
    },
    {
        kuva:"./img/paella.jpg",
        maa:"espanja",
        lore:"PAELLA",
        kysymys:"kaksitoista ja puoli millilitraa paprikaa, kuinka monta teelusikallista (tsp) se on?",
        oikeaMuunnos:["2.5", "2,5"],
    },
    {
        kuva:"./img/suvlaki.jpg",
        maa:"kypros",
        lore:"JIIRO",
        kysymys:"Montako suvlakia on olemassa?",
        oikeaMuunnos:"kymmenentuhattaloputonta",
    },
    /* {
        kuva:,
        maa:,
        lore:,
        kysymys:,
        oikeaMuunnos:,
    },
    {
        kuva:,
        maa:,
        lore:,
        kysymys:,
        oikeaMuunnos:,
    },
    {
        kuva:,
        maa:,
        lore:,
        kysymys:,
        oikeaMuunnos:,
    } */
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
const aloitaAlusta = document.getElementById("lopetus");
const griddyLaatikot = document.querySelectorAll(".griddy > div");
const oikeinvaarin = document.getElementById("griddy");

function paivitaPeli() {
    const ruoka = ruoat[nykyinenIndeksi];
    kuvaElementti.src = ruoka.kuva;
    kuvaElementti.alt = "Kuva ruuasta";
    muunnosKysymys.textContent = ruoka.kysymys;
    valtio.textContent = ruoka.maa;
    muunnosLomake.value = "";
    muunnosLomake.disabled = false;
    muunnosInput.disabled = false;
    muunnosLomake.style.backgroundColor = "white";
    muunnosInput.style.backgroundColor = "";
    seuraavaKysymysNappi.disabled = true; 
    seuraavaKysymysNappi.style.backgroundColor = "#ccc"; 
}

//aloitusnappi
alota.addEventListener("click", function (e){
    e.preventDefault();
    alota.style.display = "none";
    peli.style.display = "initial";
    oikeinvaarin.style.display = "grid";
    kuvaElementti.style.display = "initial";
    tunnistaMaa.style.display = "";
    muunnosLaatikko.style.display = "";
    seuraavaKysymysNappi.style.display = "initial";
});

//aloitaalusta
aloitaAlusta.addEventListener("click", function (e){
    e.preventDefault();
    oikeinvaarin.style.display = "none";
    alota.style.display = "initial";
    peli.style.display = "none";
    nykyinenIndeksi = 0;
    pisteet = 0;
});

//toivottavasti korjattu muunnoskysymys
muunnosInput.addEventListener("click", function (e){
    e.preventDefault();
    const vastaus = muunnosLomake.value.trim();
    const oikeaVastaus = ruoat[nykyinenIndeksi].oikeaMuunnos;

    if(oikeaVastaus.includes(vastaus)){
        pisteet++;
        muunnosLomake.style.backgroundColor = "#bdffbf";
        griddyLaatikot[nykyinenIndeksi].style.backgroundColor = "green";
        griddyLaatikot[nykyinenIndeksi].querySelector("img").setAttribute("src", "./img/oikein.png");
    } else {
        muunnosLomake.style.backgroundColor = "red";
        griddyLaatikot[nykyinenIndeksi].style.backgroundColor = "red";
        griddyLaatikot[nykyinenIndeksi].querySelector("img").setAttribute("src", "./img/vaarin.png");
    
    }
    seuraavaKysymysNappi.disabled = false; 
    seuraavaKysymysNappi.style.backgroundColor = "#cecece"; 
    muunnosLomake.disabled = true;

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
            lopputulos.textContent = "Peli loppui! Pisteesi: " + pisteet + "/10";
        

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
                            alert("ENNÄTYKSESI ON JO SUUREMPI!")
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