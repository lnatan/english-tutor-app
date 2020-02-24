<script>
  import Layout from "./_layout.svelte";
  import Nav from  "../components/Nav.svelte";
  export let params = {};
  const links = [
    ["/home", "Home tasks"],
    ["/reading", "Reading"],
  ]
</script>

<Layout>
  <div slot="sidebar">
    <div class="mb-6">Welcome, {params.name ? params.name : "Xiao"}!</div>
    <Nav {links} />
  </div>
  <div slot="main">
    <h2 class="title">Active</h2>
    <div class="tasks_active">Here active cards</div>
    <h2 class="title">Completed</h2>
    <div class="tasks_comleted">Here done cards</div>
  </div>
</Layout>
