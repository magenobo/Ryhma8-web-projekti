//Reseptit
const ruoat = [
    {
        kuva: "./img/pasta.jpg",
        maa: "italia",
        kysymys: "120 ml maitoa, kuinka monta kuppia se on?",
        oikeaMuunnos: "0.5",
    },
    {
        kuva: "./img/macarons.jpg",
        maa: "ranska",
        kysymys: "30 ml soijakastiketta, kuinka monta unssia (fl oz) se on?",
        oikeaMuunnos: "1",
    },
    {
        kuva: "./img/lihapullat.jpg",
        maa: "ruotsi",
        kysymys: "1 kupin maitoa, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos: "240",
    },
    {
        kuva: "./img/wieninleike.jpg",
        maa: "itävalta",
        kysymys: "1 kanafileen, joka painaa puolen naulan (lb) verran, montako grammaa (g) se on?",
        oikeaMuunnos: "227",
    },
    {
        kuva: "./img/omenapiiras.jpg",
        maa: ["amerikka", "usa", "yhdysvallat"],
        kysymys: "yksi ja puoli kuppia sokeria, kuinka monta millilitraa (ml) se on?",
        oikeaMuunnos: "360",
    },
];

// Globaali muuttujat
let nykyinenIndeksi = 0;
let pisteet = 0;
let papukaijapisteet = 0;


// Haetaan elementit
const kuvaElementti = document.querySelector(".kuvatahan img");
const maaLomake = document.querySelectorAll("form")[0];
const muunnosLomake = document.querySelectorAll("form")[1];
const maaInput = document.getElementById("tunnistus");
const maaTunnistusNappi = document.getElementById("tunnistusNappi")
const muunnosInput = document.getElementById("muunnos");
const muunnosKysymys = document.getElementById("muunnosKysymys");
const seuraavaKysymysNappi = document.getElementById("seuraavaKysymys");
const pisteetElementti = document.querySelector(".pisteet");
const griddyLaatikot = document.querySelectorAll(".griddy > div");


function paivitaPeli() {
    const ruoka = ruoat[nykyinenIndeksi];
    kuvaElementti.src = ruoka.kuva;
    kuvaElementti.alt = "Kuva ruuasta";
    muunnosKysymys.textContent = ruoka.kysymys;
    maaInput.value = "";
    muunnosInput.value = "";
    muunnosLomake.querySelectorAll("input").forEach(input => input.disabled = false);
    maaInput.disabled = false;
    maaInput.style.backgroundColor = "";
    muunnosInput.style.backgroundColor = "";
    seuraavaKysymysNappi.disabled = true; 
    seuraavaKysymysNappi.style.backgroundColor = "#ccc"; 
}


//vastaa valtiokysymyksestä
maaLomake.addEventListener("submit", function (e) {
    e.preventDefault();
    const vastaus = maaInput.value.trim().toLowerCase();
    const oikeatVastaukset = ruoat[nykyinenIndeksi].maa;

    if (oikeatVastaukset.includes(vastaus)) {
        papukaijapisteet++;
        maaInput.style.backgroundColor = "#bdffbf";
    } else {
        maaInput.style.backgroundColor = "red";
    }

    maaInput.disabled = true;
    maaTunnistusNappi.disabled = true;
});

//vastaa muunnoskysymyksestä
muunnosLomake.addEventListener("submit", function (e) {
    e.preventDefault();
    const vastaus = muunnosInput.value.trim();
    const oikeaVastaus = ruoat[nykyinenIndeksi].oikeaMuunnos;

    if (vastaus === oikeaVastaus) {
        pisteet++;
        muunnosInput.style.backgroundColor = "#bdffbf";
        griddyLaatikot[nykyinenIndeksi].style.backgroundColor = "green";
    } else {
        muunnosInput.style.backgroundColor = "red";
    }

    seuraavaKysymysNappi.disabled = false; 
    seuraavaKysymysNappi.style.backgroundColor = "#cecece"; 

    muunnosLomake.querySelectorAll("input").forEach(input => input.disabled = true);
});

seuraavaKysymysNappi.addEventListener("click", function () {
    if (!seuraavaKysymysNappi.disabled) {
        nykyinenIndeksi++; 
        if (nykyinenIndeksi < ruoat.length) {
            paivitaPeli(); 
        } else {
            alert("Peli loppui! Pisteesi: " + pisteet + "/" + "5");
            sessionStorage.setItem("matikkaTulos", pisteet);
        }
        paivitaPisteet(); 
    }
});

function paivitaPisteet() {
    pisteetElementti.textContent = `${pisteet}/${ruoat.length}`;
}


window.addEventListener("DOMContentLoaded", () => {
    paivitaPeli();
});