  <script>
    import Nav from '../components/Nav.svelte';
    export let links = [];
    export let name;
  </script>
  
  <div class="sidebar space hidden md:block">
    <div class="mb-4">Welcome, {name}!</div>
    <Nav {links}/>
  </div>
