  <script>
    let user = "Name";
  </script>
  
<!-- <div class="sidebar space hidden md:block">
  <div class="mb-4">Welcome, {name}!</div>
  <Nav {links}/>
</div> -->

<slot name="heading">
  <div class="mb-4">Welcome, {user}!</div>
</slot>
<slot name="navigation" />