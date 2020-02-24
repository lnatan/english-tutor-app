<script>
  import Layout from "./_layout.svelte";
  import Nav from '../components/Nav.svelte';
  const links = [
    ['/home', 'Home tasks'],
    ['/reading', 'Reading']
  ];
</script>

<Layout>
  <div slot="sidebar">
    <Nav {links} />
  </div>
	<div slot="main">
    <h2 class="title">Active</h2>
    <div class="tasks_active">
      Here active cards
    </div>
    <h2 class="title">Completed</h2>
    <div class="tasks_comleted">
      Here done cards
    </div>
  </div>
</Layout>

<style>
.title {
  @apply font-bold text-2xl text-black;
}
</style>

