<script>
  import { onMount, onDestroy } from "svelte";
  import { createEventDispatcher } from 'svelte'; 
  export let selected = {};
  export let variants;
  export let columns;
  const dispatch = createEventDispatcher();

  function handleClick(variantIndex, radioIndex){
    selected[variantIndex] = radioIndex;
    dispatch("select", selected);
  }
</script>

{#each variants as item, i}
  <div class="lg:flex justify-between pb-4">
    <span class="pr-4">{i+1}. {item.variant}</span>
    <div class="flex">
      {#each columns as { column }, k}
        <label class="label" for="{i}-{k}" class:checked={selected[i] === k}>
          {#if item.answer === k}
            <span class="correct-variant"></span>
          {/if} 
          <span class="custom-radio-button" >
            <input class="radio-input" id="{i}-{k}" type="radio" on:click={() => handleClick(i,k)}>
            <span>{column}</span>
          </span>         
        </label>   
      {/each}
      <!-- <label class="label" for="{i}-0">
        <span class="custom-radio-button rounded rounded-r-none border-r-0" class:checked={selected[i] === 0}>
          <input class="radio-input" id="{i}-0" type="radio" on:click={() => handleClick(i,0)}>
          <span>{columns[0].column}</span>
        </span>        
      </label>      
       <label class="label" for="{i}-1">
        <span class="custom-radio-button rounded rounded-l-none rounded-r-none" class:checked={selected[i] === 1}>
          <input class="radio-input" id="{i}-1" type="radio" on:click={() => handleClick(i,1)}>
          <span>{columns[1].column}</span>
        </span>        
      </label>
      <label class="label" for="{i}-2">
        <span class="custom-radio-button rounded rounded-l-none" class:checked={selected[i] === 2}>
          <input class="radio-input" id="{i}-2" type="radio" on:click={() => handleClick(i,2)}>
          <span>{columns[2].column}</span>
        </span>        
      </label> -->
    </div>
  </div>
{/each}

<style> 
  .label {
    position: relative;
    cursor: pointer;  
    display: flex;
    align-items: center;  
    @apply px-2 border border-grey-5;
  }
  .label.checked {
    @apply px-2 border border-blue-6 text-blue-6;
  }
  .label:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .label:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
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
    z-index: 1;
  }
  .correct-variant {
    z-index: 1;
    left: 0;
  }
  /*.custom-radio-button.border-r-0 {
    @apply border-r-0;
  } */

</style>