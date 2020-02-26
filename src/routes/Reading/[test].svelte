<script>
  import Layout from "../_layout.svelte";
  import Sidebar from "components/Sidebar.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { pop } from "svelte-spa-router"; 
  import { pathToTests } from "../../config.js";
  export let params = {};
  
  const URL = `${pathToTests}/${params.test}.json`;
  const test = getTest();

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

{#await test then data}
  <Layout>
    <div slot="sidebar">  
      <div class="sidebar-panel px-4 py-2 mb-6">
        <button class="flex items-center" on:click={pop}>
          <span class="icon">
            <i class="icon-arrow-left"/>
          </span>
          Back
        </button>
      </div>
      <div class="sidebar-panel">
        <QuestionsNav questions={data.questions.map(({title}) => title)} title={data.title}/>
      </div>
    </div>
    <div slot="main">
      <QuestionArea {data} /> 
    </div>
</Layout>
{:catch error}
<!-- _error.svelte -->
  <p>{error}</p>
{/await}