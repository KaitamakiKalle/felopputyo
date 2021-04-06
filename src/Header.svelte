<script>
  import { slide } from 'svelte/transition';
  export let storeVisible;
</script>

<header>
  <h1><slot name="head" /></h1>

  {#if !storeVisible}
    <div transition:slide>
      <slot />
    </div>
  {/if}
</header>

<style>
  h1 {
    margin: auto;
    color: rgb(34, 126, 157);
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 400;
  }
  div {
    margin: auto;
    max-width: 50%;
    line-height: normal;
    text-align: left;
  }
</style>
