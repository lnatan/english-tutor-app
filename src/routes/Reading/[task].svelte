<!-- <script context="module">
  console.log("script module");
</script> -->

<script>
  import { onMount } from 'svelte';
  export let params = {};
  console.log(params);
  // const URL = "./tests/the-moons-of-jupiter.json";
  const URL = `data/tasks/${params.task}.json`;

  let promise = getTest();
  let test;

 	async function getTest() {
    const res = await fetch(URL);
    test = await res.json();

		if (res.ok) {
			return test;
		} else {
      // push to NotFound
			throw new Error(test);
		}
	}
</script>

<!-- <div class="container border bg-white mt-8 p-4" id="progress">Progress Bar</div> -->
<div class="container border bg-white mt-8 p-4">
  {#await promise then test}
    <h1 class="text-center text-2xl mt-6">{test.title}</h1>
      <div class="test">
        <div class="test__question">{test.questions[0].title}</div>
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
    <p>{error.message}</p>
  {/await}
</div>