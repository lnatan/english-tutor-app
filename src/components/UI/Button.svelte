<script>
  export let disabled = false;
  export let type;
</script>

<button
  {disabled}
  on:click
  class="btn {type}"
>
  <slot/>
</button>

<style>
  .btn {
    @apply px-4 py-2;
    @apply text-white;
    @apply rounded;
  }
  .btn:not(:last-child) {
    @apply mr-5;
  }
  .btn:disabled {
    @apply bg-grey-3 text-grey-6;
    @apply border border-grey-5;
  }
  /* btn types */
  .primary {
    @apply bg-primary;
  }
  .primary:not(:disabled):hover {
    @apply bg-blue-5;
  }

  .secondary {
    @apply border border-dashed border-grey-5;
    @apply text-textcolor bg-white;
  }
  .secondary:not(:disabled):hover {
    @apply text-primary border-primary;
  }
</style>