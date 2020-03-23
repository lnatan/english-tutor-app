<script>
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import Controls from "./controls/index.svelte";
  import Default from "./controls/Default.svelte"
  import { userStore } from "src/stores/userStore.js";
  export let question = {}; 
  export let context; 
  export let active;
  export let answers;
  const dispatch = createEventDispatcher(); 

  $: selected = answers[active]; 

  function toggleContext(){
    dispatch("toggle");
  };
  function selectVariant(variant) {    
    dispatch("select", {newAnswer: [active, variant]});
  };
  function nextQuestion() {
    dispatch("click", {newActive: active + 1});
  };
  function prevQuestion() {
    dispatch("click", {newActive: active - 1});
  };
</script>

<div class="relative container rounded border bg-white p-10">
  <button class="absolute top-0 right-0 p-3" on:click={toggleContext}>
    <span class="icon"><i class="icon-book"></i></span>
  </button>
  <h1 class="text-black text-xl mb-6">{question.title}</h1>  
  {#if $userStore.role === "teacher"}
    <Default
      {question}
      {context}
      {selected}
    />
  {:else}
    <Controls      
      {question}
      {context}
      {selected}     
      on:select={(e) => selectVariant(e.detail)}
    />
  {/if}
</div>

<!-- Buttons -->
<div class="flex p-8 justify-center md:justify-end">
  <Button type="secondary" disabled={active === 0} on:click={prevQuestion}>Previous</Button>
  <Button type="primary" on:click={nextQuestion}>Next</Button> 
</div>