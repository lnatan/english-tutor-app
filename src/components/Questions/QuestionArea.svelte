<script>
  // import { onMount } from "svelte"; 
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import Controls from "./types/index.svelte";
  import { getNotAnswered } from "src/stores/answersStore";
  import { pop } from "svelte-spa-router";
  export let question = {};
  export let questionsCount;
  export let context;
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();

  $: selected = answers[active];

  let notAnsweredQuestions;
  let ishalfAnswered = false;

  $: if (active === questionsCount) {    
    notAnsweredQuestions = getNotAnswered(questionsCount);
    ishalfAnswered = questionsCount/notAnsweredQuestions.length > 2;
  }  

  function selectVariant(variant) {    
    dispatch("select", {newAnswer: [active, variant]});
  };
  function nextQuestion() {
    dispatch("click", {newActive: active + 1});
  };
  function prevQuestion() {
    dispatch("click", {newActive: active - 1});
  };
  function handleSendClick(){
    dispatch("send");
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
    <h1 class="text-black text-xl mb-6">Finish test</h1>
    <p class="">You are close to finish the test and send rezults. </p>
    {#if notAnsweredQuestions}
      <p>Not answered questions: {notAnsweredQuestions.map(q => q+1).join(" , ")}</p>
    {/if}
    {#if !ishalfAnswered}
      <p>You did not answer more than half.</p>
    {/if}     
  {/if}
</div>

  <div class="flex p-8 justify-center md:justify-end">
    <Button type="secondary" disabled={active === 0} on:click={prevQuestion}>Previous</Button>
    <Button type="primary" disabled={active === questionsCount && !ishalfAnswered} on:click={active === questionsCount ? handleSendClick : nextQuestion}>
      {active === questionsCount ? "Send" : "Next"} 
    </Button>   
  </div>