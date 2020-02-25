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
</div>