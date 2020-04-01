<script>
  import { onDestroy, afterUpdate } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import { showSlot } from "src/utils/parseTest.js";
  export let selected;
  export let variants;
  export let sentence;
  export let context = "";
  const dispatch = createEventDispatcher();  

  let slots = [];
  let slotSentence = [];

  onDestroy(() => {
    slots.forEach(slot => slot.removeEventListener("click", handleSlotClick));
  });

  afterUpdate(() => {
    slots = document.querySelectorAll(".slot");
    slotSentence = document.querySelectorAll(".slot-sentence");

    slotSentence.forEach(el => el.innerHTML = sentence);
    slots.forEach(el => el.addEventListener("click", handleSlotClick));

    if (selected !== undefined) {
      slots[selected].classList.add("active");
      slotSentence[selected].classList.remove("hidden");
      slotSentence[selected].style.opacity = "1";
    }
  });

  function showActiveSlot(activeIndex){
    slots.forEach((slot, index) => {
      if (activeIndex === index) {
        slot.classList.add("active");
        slotSentence[index].classList.remove("hidden");
        setTimeout(() => {
          slotSentence[index].style.opacity = "1";
        }, 0);        
      } else {
        slot.classList.remove("active");
        slotSentence[index].classList.add("hidden");
        slotSentence[index].style.opacity = "0"; 
      }
    })
  };

  function handleRadioClick(index){
    showActiveSlot(index);
    dispatch("select", index);
  }

  function handleSlotClick(e){
    const index = parseInt(e.target.dataset.index);
    showActiveSlot(index);
    dispatch("select", index);   
  }
</script>

<div class="sentence p-2">{sentence}</div>
<div class="flex flex-col mt-6">
  {#each variants as item, i}
    <label for={i} class="label py-2">
      <span class="custom-radio pr-2" class:selected={i === selected}>
        <input class="radio-input" id={i} value={i} type="radio" on:click={() => handleRadioClick(i)}>
        <span class="custom-radio-inner" ></span>
      </span>   
      <span class="variant">{item.variant}</span>        
    </label>
  {/each}
</div>
<div class="context">{@html showSlot(context)}</div>

<style> 
  .label {
    cursor: pointer;  
    display: inline-flex;
    align-items: center;
    width: 50px; 
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
  .selected > .custom-radio-inner {
    @apply border-primary;
    transition: all 0.3s linear;
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
  .selected > .custom-radio-inner:after {
    @apply bg-primary;
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  :global(.slot) {
    @apply rounded border border-grey-7 text-grey-7 text-sm leading-7;
    width: 32px;
    height: 32px;
    text-align: center;
    display: inline-block;
    cursor: pointer; 
    pointer-events: auto;
    z-index: 1;
    position: relative;
    top: -3px;
    text-indent: 0;
  }
  :global(.slot.active) {
    @apply bg-blue-1 border-blue-6 text-blue-6;
    transition: all 0.3s linear;
  }
  :global(.sentence, .slot-sentence) {
    @apply bg-primary text-xl text-white rounded;
  }
  :global(.slot-sentence) {
    @apply rounded-l-none;
    height: 32px;   
    position: relative;
    top: 0px; 
    left: -2px;
    padding: 4px 0 4px 10px;   
    z-index: 0;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  :global(.slot.hidden,.slot-sentence.hidden) {
    @apply hidden;
  }
</style>