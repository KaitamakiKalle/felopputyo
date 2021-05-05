<script>
  // Tuntiesimerkkien Modal komponenttia on hyödynnetty työssä.
  import Modal from './Modal.svelte';
  import shopkartStore from './shopkartStore';
  import Button from './Button.svelte';
  import Order from './Order.svelte';
  import { flip } from 'svelte/animate';
  import { scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let fullPrice;
  export let ordered;
  export let pay = false;
  const showOrder = () => {
    pay = true;
  };
</script>

{#if !pay}
  <Modal on:click>
    <h2 slot="header">Ostoskori</h2>

    {#each $shopkartStore as x (x.tuotenumero)}
      <div id="tuote" animate:flip transition:scale>
        <span>{x.tuote}, määrä: {x.maara}</span>
        <span>{x.hinta}€/kpl</span>
        <!-- Tapahtuman dispatchaaminen on toteutettu suoraan buttonista jotta 
        saadaan kätevästi tuotteen tiedot mukaan. -->
        <Button
          on:click={() => {
            dispatch('deleteItem', x);
          }}
          >Poista tuote
        </Button>
      </div>
    {/each}
    <p>Hinta: {fullPrice}€</p>
    <div>
      <Button on:click={showOrder} disabled={$shopkartStore.length === 0}
        >Tilaa</Button
      >
    </div>
  </Modal>
{:else}
  <Order on:ordered {ordered} {fullPrice} on:reset />
{/if}

<style>
  #tuote {
    padding: 0.8em;
    margin: 1%;
    width: 50%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: center;

    border: 3px black solid;
    border-radius: 10px;
  }
</style>
