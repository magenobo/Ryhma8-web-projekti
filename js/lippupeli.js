

const aloita_peli_nappi = document.getElementById("aloita_peli")
const aloita_alusta_nappi = document.getElementById("aloita_alusta")
const katoa_div = document.getElementById("katoa")
const peli_itse_div = document.getElementById("peli_itse")


//kadottaa aloita peli nappulan ja kuvan
aloita_peli_nappi.addEventListener("click", () => {
    document.querySelector("#katoa").style.display = "none"
    
    //aloittaa pelin ja tuo sen esille
    document.querySelector("peli_itse").style.display = "block"


});
    
//
aloita_alusta_nappi.addEventListener("click", () => {

    document.getElementById("etusivu").querySelector("#katoa").style.display = "block" ;
    document.getElementById("peli_itse").style.display = "none";
});






