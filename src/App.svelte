<script>
  import Kauppa from './Kauppa.svelte';
  import Ostoskori from './Ostoskori.svelte';
  import ostoskori from './ostoskori';
  import tuoteVarasto from './tuoteVarasto';
  import orderInfo from './tilaajaTiedot';
  import Button from './Button.svelte';
  import Info from './Info.svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  //---- Haetaan valitun maan korona tiedot objektiin
  let CountryInfo = {};
  /*Virheen käsittely on suoritettu hiukan epäkäytännöllisellä tavalla koska
api josta tiedot haetaan antaa statuksen 200 eli ok vaikka haussa olisi virhe.
*/
  const search = async () => {
    fetch(
      `https://api.covid19api.com/live/country/${whereTravelling.toLowerCase()}`
    )
      .then((response) => {
        //palautetaan responsen data parsittuna json metodilla
        return response.json();
      })
      .then((data) => {
        //katsotaan onko datassa sisältöä ja annettaan virhe jos ei ole
        // error muuttuja muuttaa virheviestin näkyvyyttä käyttäjälle
        if (data.length === 0) {
          error = true;
          throw new Error('Ei voitu hakea tietoja');
        } else {
          error = false;
          CountryInfo = data[data.length - 1];
        }
      })
      .catch((err) => console.log(err));

    // const response = await fetch(
    //   `https://api.covid19api.com/live/country/${whereTravelling.toLowerCase()}`
    // );

    // let covidInfo = await response.json();
    // Koska api palauttaa taulukon täynnä objekteja haluamme ainoastaan maan viimeisimmät tiedot.
    // CountryInfo = covidInfo[covidInfo.length - 1];
  };
  //----

  // mihin matkustetaan
  let whereTravelling = '';

  //Funktio jolla tiedon haku aloitetaan. Tiedot tuodaan näkyville visible muuttujan avulla
  //----
  let visible = false;
  let error = false;
  const searchInfo = () => {
    search();

    visible = true;
  };

  //----

  //---- Määritellään onko maahan turvallista matkustaa tartunta määrän perusteella.
  let isSafe;
  //Tarkistus onko objektissa sisältöä
  $: if (!(Object.keys(CountryInfo).length === 0)) {
    if (CountryInfo.Active > 100) {
      isSafe = false;
    } else {
      isSafe = true;
    }
  }
  //----

  // kokonaishinnan muuttuja
  $: fullPrice = 0;

  //---- funktio tuotteen lisäämiseksi ostoskoriin.
  const addToCart = (e) => {
    // Jos lisätään toinen kappale samaa tuotetta tuotteen määrää kasvatetaan
    if (
      $ostoskori.map((x) => x.tuotenumero).indexOf(e.detail.tuotenumero) !== -1
    ) {
      //ensin lasketaan tuotteen nykyinen määrä ja kasvatetaan sitä yhdellä
      let amount =
        $ostoskori[
          $ostoskori.map((x) => x.tuotenumero).indexOf(e.detail.tuotenumero)
        ].maara;
      amount++;
      //poistetaan tuote
      ostoskori.update(() =>
        $ostoskori.filter((item) => item.tuotenumero !== e.detail.tuotenumero)
      );
      // Lisätään tuote uudelleen päivitetyllä määrällä
      ostoskori.update(() => [
        ...$ostoskori,
        { ...$tuoteVarasto[e.detail.tuotenumero], maara: amount },
      ]);
      //lisätään tuotteen hinta kokonaishintaan
      fullPrice += e.detail.hinta;
    } // Jos taas tuote on uusi lisätään uusi tuote
    else {
      ostoskori.update(() => [
        ...$ostoskori,
        { ...$tuoteVarasto[e.detail.tuotenumero], maara: 1 },
      ]);
      //lisätään tuotteen hinta kokonaishintaan
      fullPrice += e.detail.hinta;
    }
  };
  //----

  //---- Funktio tuotteen poistamiseksi ostoskorista
  const deleteItem = (e) => {
    ostoskori.update(() =>
      $ostoskori.filter((item) => item.tuotenumero !== e.detail.tuotenumero)
    );
    fullPrice = fullPrice - e.detail.hinta * e.detail.maara;
  };
  //----

  // Muuttujat ostoskorin, kaupan ja tilausikkunan näkyyvyden muuttamiseksi
  let storeVisible = false;
  let shoppingKart = false;
  let ordered = false;
  //---- funktiot ostoskorin, kaupan ja tilausikkunan näkyvyyden muuttamiseksi
  const toggleKart = () => {
    shoppingKart = !shoppingKart;
    visible = false;
  };
  const toggleStore = () => {
    storeVisible = !storeVisible;
    visible = false;
  };
  const order = () => {
    ordered = true;
  };

  //----

  //---- Funktio joka resetoi tilaustiedot ja vie käyttäjän alkunäkymään
  const reset = () => {
    ostoskori.set([]);
    orderInfo.set({
      name: '',
      phone: '',
      email: '',
      adress: '',
      moreInfo: '',
    });
    fullPrice = 0;
    toggleKart();
    toggleStore();
  };
  //----
</script>

<main>
  <div id="container">
    <Header {storeVisible}>
      <h1 slot="head">Matkustajien covid-19 app</h1>
      <p>
        Tervetuloa matustajien korona sovellukseen. Sovelluksella voit tarkistaa
        kohdemaan koronatartunta tilanteen ja ostaa tarvittavat suojavälineet.
      </p>
    </Header>
    {#if !storeVisible}
      <Info
        on:click={searchInfo}
        bind:value={whereTravelling}
        {visible}
        {isSafe}
        {CountryInfo}
        {error}
      />

      <div class="box">
        <Button on:click={toggleStore}>Kauppaan</Button>
        <Button on:click={toggleKart}>Näytä ostoskori</Button>
      </div>
    {:else}
      <Kauppa
        on:toShopkart={addToCart}
        on:shoppingKart={toggleKart}
        on:storeVisible={toggleStore}
      />
    {/if}

    {#if shoppingKart}
      <Ostoskori
        {fullPrice}
        on:click={toggleKart}
        on:deleteItem={deleteItem}
        on:ordered={order}
        on:reset={reset}
        {ordered}
      />
    {/if}
  </div>
  <Footer name="Kalle Kaitamäki" year="2021" />
</main>

<style>
  main {
    max-width: 80%;
    margin: auto;
  }
  #container {
    max-width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div {
    margin: 1%;
  }

  .box {
    margin: 1%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
