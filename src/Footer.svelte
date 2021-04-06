<script>
  export let name;
  export let year;
</script>

<footer>
  <span>{name}</span>

  <span>{year}</span>
  <slot />
</footer>

<style>
  footer {
    background-color: lightblue;
    position: static;
    bottom: 0%;
    display: flex;
    flex-direction: row;

    justify-content: center;
    margin-top: 20%;
  }
  span {
    font-weight: bold;
    margin-right: 1%;
  }
</style>
