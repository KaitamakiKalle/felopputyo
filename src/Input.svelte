<script>
  export let type;
  export let id;
  export let name;
  export let tieto;
  export let label;
</script>

{#if type === 'radio'}
  {#each tieto as x}
    <div>
      <input {type} {id} {name} />
      <label for={id}>{x.label}</label>
    </div>
  {/each}
{:else if type === 'checkbox'}
  {#each tieto as x}
    <div>
      <input {type} {id} {name} />
      <label for={id}>{x}</label>
    </div>
  {/each}
{/if}

<style>
  input,
  label {
    display: inline-block;
  }
</style>
