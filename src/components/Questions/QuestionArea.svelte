<script>
  import Button from "components/UI/Button.svelte";
  import { link, push, pop, replace, location, querystring } from "svelte-spa-router";
  import { store, updateActive, updateAnswers } from "./store.js";
  export let test = {};

  const { title, questions, context } = test;
  const questionsCount = questions.length;

  $: active = $store.active;
  // $: answers = $store.answers;
  // $: console.log("store", $store);

  let selected;

  const controls = {
    select: "radio",
    check: "checkbox",
    word: "radio",
    insert: "button"
  };

  // const types = questions.map(({type}) => controls[type]);
  //console.log(types);

  function nextQuestion() {
    if (selected !== undefined) {
      updateAnswers(questions[active].variants[selected].answer);
    }
    updateActive(active+1);
  }
  function prevQuestion() {
    updateActive(active-1);
  }
</script>

<div class="container rounded border bg-white p-8">
  <h1 class="text-black text-xl mb-6">{questions[active].title}</h1>
  <div class="variants">
    {#each questions[active].variants as v, i}
      <label for={i} class="custom-label block py-2">
        <span>
            <input id={i} type=radio bind:group={selected} value={i}>
            <span class="custom-radio"></span>
        </span>           
        <span>{v.variant}</span>
      </label>
    {/each}
  </div>
  <div class="mt-4">Context</div>
</div>

{#if active < questionsCount}
  <div class="flex p-8 justify-center md:justify-end">
    <Button type="secondary" disabled={active === 0} on:click={prevQuestion}>Previous</Button>
    <Button type="primary" on:click={nextQuestion}>
      {active === questionsCount-1 ? "Finish" : "Next"} 
    </Button>   
  </div>
{/if}

<style>
   .custom-label {
     cursor: pointer;
   }
</style>