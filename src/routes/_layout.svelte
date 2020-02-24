 <script>
  // const name = "Xiaolin";
</script>

<div class="container flex py-12">
  <!-- Left Sidebar -->
  <div class="sidebar hidden md:block">   
	  <slot name="sidebar"></slot>
  </div>
  <!-- Main Area -->
  <main class="main flex-auto">
    <slot name="main"></slot>    
  </main>
</div>