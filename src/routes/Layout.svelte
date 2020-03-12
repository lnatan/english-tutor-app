<div class="container flex py-12">
  <div class="sidebar flex-none w-1/4 hidden xl:block px-4">   
	  <slot name="sidebar" />
  </div>
  <main class="main flex-1 px-4">
    <slot name="main" />  
  </main>
</div>