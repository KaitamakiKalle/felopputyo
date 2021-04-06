<script>
  export let disabled = false;
</script>

<button on:click {disabled}><slot /></button>

<style>
  button {
    font-size: 1rem;
    background-color: lightblue;
    border-radius: 20px;
    max-width: fit-content;
    margin: 1%;
  }
  button:disabled {
    background-color: grey;
  }
</style>
