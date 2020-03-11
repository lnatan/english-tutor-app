<script>
  import { createEventDispatcher } from 'svelte';
  import { showHighlight } from "src/utils/parse.js";
  export let selected;
  export let variants = []; 
  export let context = "";
  export let word = "";
  const dispatch = createEventDispatcher(); 

  function handleClick(index){
    dispatch("select", index);
  }
</script>

{#each variants as {variant}, i }
  <label for={i} class="label py-2">
    <span class="custom-radio pr-2" class:checked={i === selected}>
      <input class="radio-input" id={i} value={i} type="radio" on:click={() => handleClick(i)}>
      <span class="custom-radio-inner" ></span>
    </span>           
    <span>{variant}</span>
  </label>
{/each}
<div class="mt-4 text-xl text-justify">{@html showHighlight(context, word)}</div>

<style> 
  .label {
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
  .custom-radio {
    position: relative;
  }
  .custom-radio-inner {
    @apply border block border-grey-5 bg-transparent;
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 100%;  
  }
  .checked > .custom-radio-inner {
    @apply border-primary;
    transition: all 0.3s;
  }  
  .custom-radio-inner:after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    display: table;
    width: 8px;
    height: 8px;
    border-radius: 8px;   
    opacity: 0;
    transform: scale(0);
    /* transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86); */
  }
  .checked > .custom-radio-inner:after {
    @apply bg-primary;
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  :global(.highlight) {
    @apply bg-primary text-white p-1;
  }
</style>