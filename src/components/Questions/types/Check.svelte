<script>
  import { createEventDispatcher } from 'svelte';
  export let question; 
  export let selected;
  const dispatch = createEventDispatcher();  
  // const { variants } = question;

  $: isChecked = (index) => { 
    if (selected === undefined) return false;
    return selected.includes(index);
  };

  function handleClick(index){
    if (selected === undefined) {
      dispatch("select", [index]);
      return;
    }
    if (selected.includes(index)) {      
      dispatch("select", selected.filter(selectedIndex => selectedIndex !== index)); 
      return;
    }
    dispatch("select", [...selected, index]);  
  }
</script>

{#each question.variants as {variant}, i}
  <label for={i} class="flex cursor-pointer py-2">
    <span class="custom-checkbox pr-2" class:checked={isChecked(i)}>
      <input class="checkbox-input" id={i} type="checkbox" on:click={() => handleClick(i)}>
      <span class="custom-checkbox-inner"></span>
    </span>           
    <span>{variant}</span>
  </label>
{/each}

<style>
  .checkbox-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
  }
  .custom-checkbox {
    position: relative;
  }
  .custom-checkbox.checked:after {
    @apply border-primary;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #1890ff;
    border-radius: 2px;
    visibility: hidden;
    /* animation: checkboxEffect 0.36s ease-in-out;
    animation-fill-mode: backwards; */
    content: '';
  }
  .custom-checkbox-inner {
    @apply border block border-grey-5 bg-transparent;
    position: relative;
    width: 16px;
    height: 16px;
    margin: 3px;
    transition: all 0.3s;
  }
  .checked > .custom-checkbox-inner {
    @apply bg-primary border-primary;
  }
  .custom-checkbox-inner:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 22%;
    display: table;
    width: 5.71428571px;
    height: 9.14285714px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    opacity: 0;
  }
  .checked > .custom-checkbox-inner:after {
    opacity: 1;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  }

  /* @keyframes checkboxEffect {
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1.6);
              transform: scale(1.6);
      opacity: 0;
    }
  }

  @-webkit-keyframes checkboxEffect {
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1.6);
              transform: scale(1.6);
      opacity: 0;
    }
  } */
</style>