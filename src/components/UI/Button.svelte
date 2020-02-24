<script>
  export let disabled = false;
</script>

<style>
  .space {
    @apply px-4 py-2 mx-4;
  }
  .color {
    @apply text-white;
  }
</style>

<button
  {disabled}
  on:click
  class="color bg-primary disabled:opacity-25 space hover:bg-blue-400 rounded"
>
  <slot/>
</button>
