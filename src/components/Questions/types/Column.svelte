<script>
  import { onMount, onDestroy } from "svelte";
  import { createEventDispatcher } from 'svelte'; 
  export let selected;
  export let variants;
  export let columns;
  const dispatch = createEventDispatcher();

  $:  if (selected === undefined) {
      selected = new Map();
    }

  function handleClick(variantIndex, radioIndex){
    if (selected.get(variantIndex) !== radioIndex) {
     selected.delete(variantIndex);
     selected = selected.set(variantIndex, radioIndex);
    }
    dispatch("select", selected);
  }

</script>

{#each variants as {variant}, i}
  <div class="lg:flex justify-between pb-4">
    <span class="pr-4">{i+1}. {variant}</span>
    <div class="flex">
      <label class="label" for="{i}-0">
        <span class="custom-radio-button rounded rounded-r-none border-r-0" class:checked={selected.get(i) === 0}>
          <input class="radio-input" id="{i}-0" type="radio" on:click={() => handleClick(i,0)}>
          <span>{columns[0].column}</span>
        </span>        
      </label>      
       <label class="label" for="{i}-1">
        <span class="custom-radio-button rounded rounded-l-none rounded-r-none" class:checked={selected.get(i) === 1}>
          <input class="radio-input" id="{i}-1" type="radio" on:click={() => handleClick(i,1)}>
          <span>{columns[1].column}</span>
        </span>        
      </label>
      <label class="label" for="{i}-2">
        <span class="custom-radio-button rounded rounded-l-none" class:checked={selected.get(i) === 2}>
          <input class="radio-input" id="{i}-2" type="radio" on:click={() => handleClick(i,2)}>
          <span>{columns[2].column}</span>
        </span>        
      </label>
    </div>
  </div>
{/each}

<style> 
  .label {
    position: relative;
    cursor: pointer;  
    display: flex;
    align-items: center  
  }
  .radio-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
  }
  .custom-radio-button {
    @apply px-2 border border-grey-5;
  }
  .custom-radio-button.border-r-0 {
    @apply border-r-0;
  }
  .custom-radio-button.checked {
    @apply px-2 border border-blue-6 text-blue-6;
  }
</style>