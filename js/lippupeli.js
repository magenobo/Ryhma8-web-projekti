

document.addEventListener("DOMContentLoaded", () => {

    const aloita_peli_nappi = document.getElementById("aloita_peli")
    const aloita_alusta_nappi = document.getElementById("aloita_alusta")
    const katoa_div = document.getElementById("katoa")
    const peli_itse_div = document.getElementById("peli_itse")
    const kortin_taka_puoli = document.getElementById("taka_puoli")
    const kortin_etu_puoli = document.getElementById("etu_puoli")
    const kortti = document.getElementById("kortti_kuvat");

    peli_itse_div.style.display = "none";


    //kadottaa aloita peli nappulan ja kuvan
    aloita_peli_nappi.addEventListener("click", () => {
        document.querySelector("#katoa").style.display = "none"
        
        //aloittaa pelin ja tuo sen esille
        peli_itse_div.style.display = "block";

    });
        
    //Aloita alusta napin toiminto
    aloita_alusta_nappi.addEventListener("click", () => {

        location.reload();
    });



    const card = document.querySelectorAll('.kortti')

    card.forEach(kortti => {
        kortti.addEventListener('click', () => {
            kortti.classList.toggle('active')
        });
    });

    

    





});