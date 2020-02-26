<script>
  import Button from "components/UI/Button.svelte";
  import Question from "./Question.svelte";
  import { link, push, pop, replace, location, querystring } from "svelte-spa-router";
  export let data = {};

  $: console.log($location, $querystring);

  const questionsCount = data.questions.length;
  let activeQuestion = 0;

  function nextQuestion() {
    activeQuestion += 1;
    replace(`${$location}?q=${activeQuestion}`);
  }
  function prevQuestion() {
    activeQuestion -= 1;
    replace(`${$location}?q=${activeQuestion}`);
  }
</script>

<div class="container rounded border bg-white p-8">
  {#each data.questions as question, index}
      {#if index === activeQuestion}      
        <Question {question} {activeQuestion}/>         
      {/if}
  {/each}
</div>
<!-- Controls Prev Next -->
<div class="controls p-8 flex justify-center md:justify-end">
  <Button type="secondary" disabled={activeQuestion === 0} on:click={prevQuestion}>Previous</Button>
  <Button type="primary" on:click={nextQuestion}>
    {activeQuestion === questionsCount-1 ? "Finish" : "Next"}
  </Button>
   <!-- <button on:click={() => replace("/ww")}>Replace current page</button> -->
</div>