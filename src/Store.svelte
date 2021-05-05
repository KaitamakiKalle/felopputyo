<script>
  import productStore from './productStore';
  import Button from './Button.svelte';
  import { scale, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  //---- Ponnahdusikkunan koodit
  let added = false;

  const add = () => {
    added = true;
    setTimeout(() => {
      added = false;
    }, 1000);
  };
  //----

  //---- Dispatchataan nakyvyytta muuttavat tapahtumat
  const storeVisible = () => {
    dispatch('storeVisible');
  };
  const shoppingKart = () => {
    dispatch('shoppingKart');
  };
  //----
</script>

{#each $productStore as x}
  <div id="tuote" transition:scale>
    <span class="background" id="nimi">{x.tuote}</span>
    <span class="background">{x.hinta}€</span>
    <span>
      <Button
        on:click={() => {
          dispatch('addToKart', x);
          add();
        }}>Lisää ostoskoriin</Button
      >
    </span>
  </div>
{/each}

{#if added}
  <div
    class="pop-up"
    transition:fly={{ y: -500, easing: elasticOut, duration: 1000 }}
  >
    <p>Tuote lisättiin ostoskoriin</p>
  </div>
{/if}

<div class="box">
  <Button on:click={storeVisible}>Poistu kaupasta</Button>
  <Button on:click={shoppingKart}>Näytä ostoskori</Button>
</div>

<style>
  #tuote {
    padding: 0.8em;
    margin: 1%;
    width: 50%;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    align-items: center;

    border: 3px black solid;
    border-radius: 10px;
  }
  #nimi {
    font-size: 1.2em;
  }
  .background {
    padding: 2%;
    font-size: 1.2em;
    background-color: lightblue;
    width: fit-content;
    border-radius: 20px;
  }
  .pop-up {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 25%;
    left: 75%;

    background-color: lightblue;
    border-radius: 20px;
    width: 200px;
    height: 50px;
  }
  .box {
    margin: 1%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
