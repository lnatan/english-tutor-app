<!-- <script context="module">
  console.log("script module");
</script> -->

<script>
  import Layout from "../_layout.svelte";
  import Question from "../../components/Questions/Question.svelte";
  import { link, push, pop, replace, location, querystring } from 'svelte-spa-router'; 
  import { onMount } from "svelte";
  export let params = {};
  
  const URL = `data/quiz/${params.quiz}.json`;
  const activeQuestion = 0;

  let quiz = getQuiz();
 	async function getQuiz() {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {  
      // not found or ?  
      throw new Error(err);
    }
	}
</script>

<Layout>
  <div slot="sidebar">
    <a href="/reading" use:link class="underline">Back</a>
    <br/>
    Sidebar for Quiz
  </div>
  <div slot="main">
    <div class="container border bg-white p-8">
      {#await quiz then data}
        {#each data.questions as question, index}
            {#if index === activeQuestion}
              <Question {question} />
            {/if}
        {/each}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
    <div class="controls float-right">
      Prev Next
    </div>
  </div>
</Layout>