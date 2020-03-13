<script>
  import { createEventDispatcher } from "svelte";    
  export let options;
  export let placeholder = "Select..."
  export let selected = "";
  const dispatch = createEventDispatcher();

  function handleChange(){
    dispatch("select", {selected});
  }
</script>

<div class="pb-4">
  <select class="custom-select" bind:value={selected} on:change={handleChange}>
   <option value="">{placeholder}</option>
   {#each options as option}
      <option value={option}>
        {option}
      </option>
    {/each}
  </select>
</div>

<style>
  .custom-select {
    @apply px-3 py-2 bg-white border rounded;
    width: 256px;
  }
</style>