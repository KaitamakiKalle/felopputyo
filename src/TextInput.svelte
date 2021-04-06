<script>
  export let type = 'text';
  export let label;
  export let name;
  export let cols = 50;
  export let rows = 10;
  export let id;
  export let valid = false;
  export let emessage = '';
  export let value;

  export let visited = false;
  // Yksi suuntainen syötteen forwardointi jottan input elementin tyyppi voi olla dynaaminen
  const exportValue = (e) => {
    value = e.target.value;
  };
</script>

<div>
  {#if type === 'textarea'}
    <label for={id}>{label}</label>
    <textarea
      {name}
      {id}
      {cols}
      {rows}
      {value}
      on:blur={() => (visited = true)}
      on:input={exportValue}
    />
  {:else}
    <label for={id}>{label}</label>
    <input
      {type}
      {name}
      {id}
      {value}
      on:blur={() => (visited = true)}
      on:input={exportValue}
    />
  {/if}

  {#if !valid && visited}
    <p class="error">{emessage}</p>
  {/if}
</div>

<style>
  textarea {
    margin: auto;
    max-width: 100%;
  }
  input {
    max-width: 100%;
    margin-top: 0.8%;
  }
  label {
    margin-top: 1%;
  }
  div {
    display: block;
  }

  .error {
    color: red;
    font-size: 0.75em;
  }
</style>
