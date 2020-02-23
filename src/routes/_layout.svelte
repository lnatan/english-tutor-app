 <script>
	import Sidebar from '../components/Sidebar.svelte';
	const links = [
    ['/', 'Profile'],
    ['/reading', 'Home Tasks']
  ];
  const name = "Xiaolin";
</script>

<div class="container flex py-12">
  <Sidebar {links} {name} />
  <main>
    <div class="container border bg-white p-4">
      <slot></slot>
    </div>
  </main>
</div>