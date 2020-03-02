<script>
  // import { onMount } from "svelte"; 
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import Controls from "./types/index.svelte";
  export let question = {};
  export let questonsCount;
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
  
  $: selected = answers.get(active);
  // $: console.log(answers);

  function selectVariant(variant) {    
    dispatch("select", {newAnswers: [active, variant]});
  };
  function nextQuestion() {
    dispatch("click", {newActive: active + 1});
  };
  function prevQuestion() {
    dispatch("click", {newActive: active - 1});
  };
</script>

<div class="container rounded border bg-white p-8">
  {#if active < questonsCount}
    <h1 class="text-black text-xl mb-6">{question.title}</h1>
    <Controls      
      selected={selected} 
      type={question.type} 
      variants={question.variants} 
      on:select={(e) => selectVariant(e.detail)}/>
    <div class="mt-4">Context</div>
  {:else}  
    <p>Score:</p>
  {/if}
</div>

{#if active < questonsCount}
  <div class="flex p-8 justify-center md:justify-end">
    <Button type="secondary" disabled={active === 0} on:click={prevQuestion}>Previous</Button>
    <Button type="primary" on:click={nextQuestion}>
      {active === (questonsCount - 1) ? "Finish" : "Next"} 
    </Button>   
  </div>
{/if}