 <script>
  // const name = "Xiaolin";
</script>

<div class="container flex py-12">
  <!-- Left Sidebar -->
  <div class="sidebar flex-none w-1/4 hidden md:block">   
	  <slot name="sidebar" />
  </div>
  <!-- Main Area -->
  <main class="main flex-1">
    <slot name="main" />  
  </main>
</div>