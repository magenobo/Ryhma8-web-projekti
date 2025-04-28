# Pelisivusto

Sivustomme **Papukaija kartalla** on luotu osana Web-projekti-opintojaksoa keväällä 2025. Se on suunniteltu testaamaan ja laajentamaan nuorten tietoutta maista ja maiden kulttuureista mukavilla peleillä.

---

## Käyttöönotto

Sivuston käyttöönottoon on kaksi vaihtoehtoa.

### 1. vaihtoehto: internetiin julkaistu sivusto

Siirry students-palvelimelle julkaistuun sivustoon alla olevasta linkistä.

> https://www.students.oamk.fi/~jranki24/Ryhma8-web-projekti/

### 2. vaihtoehto: kloonaaminen omalle koneelle

Tässä vaihtoehdossa tarvitset tietokoneellesi jonkinlaisen kehitysympäristön, kuten Visual Studio Coden. Avaa valitsemassasi ympäristössä haluamasi kansio ja anna terminaalissa alla oleva käsky.

```
git clone https://github.com/magenobo/Ryhma8-web-projekti
```
Projekti kloonautuu valitsemaasi kansioon ja voit nyt avata index.html tiedoston verkkoon esimerkiksi live serverillä.

---

## Sivuston rakenne
### Etusivu
Index.html tiedosto aukeaa etusivulle, jossa on lyhyt kuvaus sivuston toiminnasta ja josta pääsee helposti navigointipalkin kautta siirtymään muille sivuille.

### Infosivu
Infosivulta löytyy kuva jokaisesta sivuston tekijästä sekä lyhyt kuvaus henkilön osuudesta projektissa.

### Tulossivu
Pelien parhaimmat pistemäärät tallennetaan sivuston sessionStorageen, josta ne tuodaan näkyville tulossivulle sekä yksittäisten pelien tuloksina että kaikista peleistä saatuina yhteispisteinä. Jokaisesta pelistä on mahdollista saada täysillä pisteillä papukaijamerkit, joiden määrä ja kuvat tulevat myös näkyviin tulossivulle.

### Pelit
Sivustolla on viisi erilaista peliä, joiden vaikeustasot vaihtelevat Satuhetken helpoista tehtävistä aina Karttakaijan ja Mittasopan haastavampiin tehtäviin. Vaikka kaikkia vastauksia ei saisikaan oikein, pelit kertovat oikeat vastaukset, minkä takia uuden oppiminen on todennäköistä. Pelejä voi kokeilla niin monta kertaa kuin haluaa eli saatuja pistemääriä on mahdollista parantaa.

#### Mittasoppa
Mittasopassa testataan pelaajan laskutaitoja reseptien mittayksiköiden muunnoksissa. Mukana olevat ruoat ovat joko eri maiden suosittuja ruokalaleja tai niiden kansallisruokia.

#### Karttakaija
Karttakaija on maiden tunnistukseen liittyvä peli, jossa pelaajan tulee tunnistaa maa sijainnin ja valtion muodon mukaan. Tarvittaessa pelaajalle on tarjolla kolme vinkkiä, jotka auttavat tunnistamisessa.

#### Lippuhulina
Lippuhulina on perinteinen muistipeli, jossa pelaajan on tarkoitus löytää maan nimi ja oikea lippu.

#### Satuhetki
Satuhetkessä pelaaja pääsee muodostamaan hauskan tarinan iloisesta matkaajasta valitsemillaan sanoilla.

#### Kielikoulu
Kielikoulu testaa pelaajan tietämystä eri maiden tervehdyksistä, kun tehtävänä on tunnistaa, millä kielellä tervehdys on kirjoitettu.

---

## Tekijät

|        Nimi         |  GitHub käyttäjätunnus  |
| ------------------- | ----------------------- |
|  Johannes Manninen  |        Magenobo         |
|   Mici Strandman    |     TheStrandman04      |
|    Johanna Ranki    |      johannaranki       |
|  Noomi Ylä-Ilomäki  |         nuum1           |
|   Nella Mustonen    |      nellamustonen      |

---

## Käytetyt teknologiat

- HTML5
- CSS3
- Javascript
- Bootstrap
- SessionStorage

