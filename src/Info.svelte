<script>
  import TextInput from './TextInput.svelte';
  import Button from './Button.svelte';
  import { scale, slide } from 'svelte/transition';

  export let visible;
  export let CountryInfo;
  export let isSafe;
  export let value;
  export let error;

  //---- Syötteen validointi
  let valid = false;
  const isValid = (x) => {
    return x.trim().length > 0;
  };
  $: valid = isValid(value);
  //----
</script>

{#if visible && !error}
  <div class="info" transition:scale>
    <div>Aktiiviset koronatapaukset: {CountryInfo.Active}</div>
    <div>Päiväleima: {CountryInfo.Date}</div>

    {#if !isSafe}
      <div class="warning">Emme suosittele matkustamista maahan</div>
    {/if}
  </div>
{:else if visible && Object.keys(CountryInfo).length === 0}
  <p>Ladataan tietoja...</p>
{:else if error}
  <div class="warning">
    Ei voitu hakea tietoja. Tarkista että maa on kirjoitettu oikein.
  </div>
{/if}

<div class="box" transition:slide>
  <TextInput
    name="country"
    id="country"
    type="text"
    bind:value
    label="Syötä matkakohteesi englanniksi"
    emessage="Kenttään täytyy antaa syöte"
    {valid}
  />

  <div id="button">
    <Button on:click disabled={!valid}>Hae</Button>
  </div>
</div>

<style>
  .info {
    margin: 1.25%;
    padding: 0.8em;
    border: black 2px solid;
    border-radius: 10px;
    font-size: 1.2em;
  }
  .warning {
    color: red;
  }
  .box {
    margin: 1%;
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #button {
    position: relative;
    top: 1.3em;
  }
</style>
