<script>
  import Button from "../../components/UI/Button.svelte";
  import Question from "./Question.svelte";
  export let data = {};

  const questionsCount = data.questions.length;
  let activeQuestion = 0;

  function nextQuestion() {
    activeQuestion += 1;
  }
  function prevQuestion() {
    activeQuestion -= 1;
  }
</script>

{#each data.questions as question, index}
    {#if index === activeQuestion}      
      <Question {question} {activeQuestion}/>
    {/if}
{/each}
<!-- Controls Prev Next -->
<div class="controls p-4 flex justify-center md:justify-end">
  <Button disabled={activeQuestion === 0} on:click={prevQuestion}>Previous</Button>
  <Button disabled={activeQuestion === questionsCount - 1} on:click={nextQuestion}>Next</Button>
</div>