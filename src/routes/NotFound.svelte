<script>
  import Layout from "src/routes/Layout.svelte";
  import { link } from 'svelte-spa-router'; 
</script>

<Layout>
  <div slot="main">    
    NotFound
    <br/>
    Start <a href="/home" use:link class="text-primary"> here </a>
  </div>
</Layout>