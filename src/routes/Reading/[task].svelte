<!-- <script context="module">
  console.log("script module");
</script> -->

<script>
  import { onMount } from 'svelte';
  export let params = {};

  const URL = `data/tasks/${params.task}.json`;
  let tasks = getTasks();

 	async function getTasks() {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {    
      throw new Error(err);
    }
	}
</script>

<!-- <div class="container border bg-white mt-8 p-4" id="progress">Progress Bar</div> -->
<div class="container border bg-white mt-8 p-4">
  {#await tasks then data}
    <h1 class="text-center text-2xl mt-6">{data.title}</h1>
      <div class="test">
        <div class="test__question">{data.questions[0].title}</div>
        <div class="test__variants">
          Variants
        </div>
        <div class="test__controls">
          Buttons
        </div>
        <div class="test__text">
            <div class="paragraph">
              Paragraph
            </div>
        </div>
      </div>
  {:catch error}
    <p>{error}</p>
  {/await}
</div>