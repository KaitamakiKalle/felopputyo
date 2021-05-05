<script>
  // Tuntiesimerkkien Modal komponenttia on hyödynnetty työssä.
  import Modal from './Modal.svelte';
  import TextInput from './TextInput.svelte';
  import Button from './Button.svelte';
  import shopkartStore from './shopkartStore';
  import orderInfo from './orderInfo.js';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Muuttujat joihin syötteet tallennetaan
  let name = '';
  let phone = '';
  let adress = '';
  let moreInfo = '';
  let email = '';

  //---- Simuloidaan tilauksen lähteminen asettamalla tiedot tilaajaTiedot storeen
  const sendOrder = () => {
    orderInfo.set({
      name: name,
      phone: phone,
      email: email,
      adress: adress,
      moreInfo: moreInfo,
    });
    dispatch('ordered');
  };
  //----

  const reset = () => {
    dispatch('reset');
  };

  export let ordered = false;

  export let fullPrice = 0;

  //---- Syötteiden validointi
  let valid = false;

  const isValid = (x) => {
    return x.trim().length > 0;
  };

  $: validName = isValid(name);
  $: validPhone = isValid(phone);
  $: validEmail = isValid(email);
  $: validAdress = isValid(adress);

  $: valid = validName && validPhone && validEmail && validAdress;
  //----
</script>

{#if !ordered}
  <Modal>
    <h2 slot="header">Täytä tilaaja tiedot</h2>
    <div>
      <TextInput
        valid={validName}
        name="name"
        label="Nimi"
        id="name"
        emessage="Kenttä ei voi olla tyhjä"
        bind:value={name}
      />
      <TextInput
        valid={validPhone}
        type="number"
        name="phone"
        label="Puhelin"
        id="phone"
        emessage="Kenttä ei voi olla tyhjä"
        bind:value={phone}
      />
      <TextInput
        valid={validEmail}
        type="email"
        name="email"
        label="Sähköposti"
        id="email"
        emessage="Kenttä ei voi olla tyhjä"
        bind:value={email}
      />
      <TextInput
        valid={validEmail}
        name="adress"
        label="Osoite"
        id="adress"
        emessage="Kenttä ei voi olla tyhjä"
        bind:value={adress}
      />
      <TextInput
        valid="true"
        type="textarea"
        name="moreinfo"
        label="Lisätiedot"
        id="moreinfo"
        emessage="Kenttä ei voi olla tyhjä"
        bind:value={moreInfo}
      />
    </div>
    <div slot="footer">
      <Button on:click={sendOrder} disabled={!valid}>Lähetä tilaus</Button>
      <Button on:click={reset}>Peruuta</Button>
    </div>
  </Modal>
{:else}
  <Modal>
    <h2 slot="header">Tilaus on otettu vastaan</h2>
    <div class="box">
      <p>
        Tilaus on otettu vastaan. Saat kohta vahvistuksen ja laskun
        sähköpostiisi tilauksen maksamista varten.
      </p>
      <h3>Tilauksen tiedot</h3>
      <span>Nimi: {$orderInfo.name}</span>
      <span>Puhelin: {$orderInfo.phone}</span>
      <span>Sähköposti: {$orderInfo.email}</span>
      <span>Osoite: {$orderInfo.adress}</span>
      <h3>Tuotteet</h3>
      {#each $shopkartStore as product}
        <span>{product.tuote}, {product.maara}/kpl: {product.hinta}€</span>
      {/each}
      <h3>Lisätiedot</h3>
      <span>{$orderInfo.moreInfo}</span>
    </div>
    <footer slot="footer">
      <span>Tilauksen hinta: {fullPrice}€</span>
      <Button on:click={reset}>Sulje</Button>
    </footer>
  </Modal>
{/if}

<style>
  .box {
    margin: 1%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
  }
  span {
    margin: 1%;
  }
</style>
