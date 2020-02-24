 <script>
  // const name = "Xiaolin";
</script>

<div class="container flex py-12">
  <!-- Left Sidebar -->
  <div class="sidebar hidden md:block">   
	  <slot name="sidebar" />
  </div>
  <!-- Main Area -->
  <main class="main flex-grow">
    <slot name="main" />  
  </main>
</div>