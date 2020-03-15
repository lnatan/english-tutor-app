<script>
  // import { onMount } from "svelte"; 
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import Controls from "./types/index.svelte";
  export let question = {};
  export let questionsCount;
  export let context;
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
  
  $: selected = answers[active];

  // const score = [];
  // let finish = false;
  // $: if (active === questionsCount && !finish) {
  //   finish = true;
  //   for (let [key, value] of answers) {
  //     score.push([key + 1]);
  //   }
  // }

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

<div class="container rounded border bg-white p-8">
  {#if active < questionsCount}
    <h1 class="text-black text-xl mb-6">{question.title}</h1>
    <Controls      
      {selected} 
      {question}
      {context}
      on:select={(e) => selectVariant(e.detail)}
    />
  {:else}  
    <p class="p-8 text-xl">You are going to finish the test.</p>
    <p>You did not answer questions: </p>
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