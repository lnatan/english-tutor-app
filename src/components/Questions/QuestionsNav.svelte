<script>
  import Dropdown from "components/UI/Dropdown.svelte"
  import { link } from "svelte-spa-router";
  export let questions = [];
  export let topic;

  questions = questions.map(q => {
    let qSliced = q.split(" ").slice(0, 6).join(" ");
    qSliced += "&hellip;";
    return qSliced;
  })
</script>


<div class="font-semibold text-black space">
  Lesson plan
</div>
<Dropdown title={topic} menu={questions}/>


<style>
  .space {
    @apply px-4 py-2;
  }
  .q-panel {
    @apply bg-white border rounded;
  }
  .q-nav-title {
    @apply font-semibold text-black;
  }
</style>
