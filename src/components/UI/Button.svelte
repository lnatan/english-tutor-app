<script>
  export let disabled = false;
  export let type = "primary";
</script>

<button  
  on:click
  class="btn btn-{type}"
  disabled={disabled}>
  <slot/>
</button>

<style>
  .btn {
    @apply px-2 py-1;
    @apply text-white;
    @apply rounded;
  }
  .btn:not(:last-child) {
    @apply mr-5;
  }
  .btn:disabled {
    @apply bg-grey-3 text-grey-6;
    @apply border border-grey-5;
    cursor: initial;
  }
  /* btn types */
  .btn-primary {
    @apply bg-primary;
  }
  .btn-primary:not(:disabled):hover {
    @apply bg-blue-5;
  }
  .btn-secondary {
    @apply border border-grey-5;
    @apply text-textcolor bg-white;
  }
  .btn-secondary:not(:disabled):hover {
    @apply text-primary border-primary;
  }
  .btn-link {
    @apply flex text-textcolor items-center;
    @apply p-0;
  }
</style>