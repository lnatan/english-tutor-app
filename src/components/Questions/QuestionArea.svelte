<script>
  import { onMount } from "svelte"; 
  import { createEventDispatcher } from 'svelte';
  import Button from "components/UI/Button.svelte";
  import { link, push, pop, replace, location, querystring } from "svelte-spa-router";
  export let question = {};
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
  const questionsCount = 14; // questions.length;

  $: selected = answers.get(active);

  function handleInput(variant) {
    dispatch("select", {newAnswers: [active, variant]});
  };
</script>

<div class="container rounded border bg-white p-8">
  {#if active < questionsCount}
    <h1 class="text-black text-xl mb-6">{question.title}</h1>
      <div>
        {#each question.variants as v, i}
          <label for={i} class="custom-label block py-2">
            <span>
              <input id={i} checked={i === selected} value={i} type=radio on:input={() => handleInput(i)}>
              <span class="custom-radio"></span>
            </span>           
            <span>{v.variant}</span>
          </label>
        {/each}
      </div>
    <div class="mt-4">Context</div>
  {:else}  
    <p>Score:</p>
  {/if}
</div>


<style>
   .custom-label {
     cursor: pointer;
   }
</style>