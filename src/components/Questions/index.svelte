<script>
  // import { onMount } from "svelte"; 
  import Button from "components/UI/Button.svelte";
  import Layout from "src/routes/_layout.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { pop } from 'svelte-spa-router';
  export let params = {};

  const URL = `./data/tests/${params.test}.json`;
  const promise = getTest();

 	async function getTest(){
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {   
      throw new Error(err);
    }
  }
</script>

{#await promise then test}
  <Layout>
    <div slot="sidebar">  
      <div class="sidebar-panel px-4 py-2 mb-6">
        <Button type="link" on:click={pop}>
          <span class="icon">
            <i class="icon-arrow-left"/>
          </span>  
          Back
        </Button>        
       </div>
      <div class="sidebar-panel">
        {params.lesson}
        <!-- <QuestionsNav nav={test.questions} title={test.title} on/> -->
      </div>
    </div>    
    <div slot="main">
      <!-- <Question {question} />
      <Controls on:next={} on:prev={} /> -->
      <!-- <QuestionArea {test} /> -->
    </div>
  </Layout>
{:catch error}
<!-- _error.svelte -->
  <p>{error}</p>
{/await}