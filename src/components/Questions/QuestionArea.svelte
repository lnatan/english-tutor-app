<script>
  // import { onMount } from "svelte"; 
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import Context from "./QuestionContext.svelte";
  import Controls from "./types/index.svelte";
  export let question = {};
  export let questionsCount;
  export let context;
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
  
  $: selected = answers.get(active);

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
  {#if active < questionsCount}
    <h1 class="text-black text-xl mb-6">{question.title}</h1>
    <Controls      
      {selected} 
      {question} 
      on:select={(e) => selectVariant(e.detail)}
    />
    {#if context}
      <Context
        {active}
        {selected} 
        {context}
        type={question.type}
      />
    {/if}
  {:else}  
    <p class="p-8 text-xl">That`s all! This test has been finished.</p>
  {/if}
</div>

{#if active < questionsCount}
  <div class="flex p-8 justify-center md:justify-end">
    <Button type="secondary" disabled={active === 0} on:click={prevQuestion}>Previous</Button>
    <Button type="primary" on:click={nextQuestion}>
      {active === (questionsCount - 1) ? "Finish" : "Next"} 
    </Button>   
  </div>
{/if}