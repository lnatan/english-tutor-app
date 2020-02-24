<script>
  export let params = {} 
</script>

<div class="container border bg-white mt-8 p-4">
  <h2 class="routetitle">Hi there!</h2>
  <p id="nameparams">Your name is: <b>{params.first}</b> <b>{#if params.last}{params.last}{/if}</b></p>
  <p><em>Hint:</em> Try changing the URL and add your name, e.g. <code>/hello/jane/doe</code></p>
  <div class="container center m-6 p-4">
  <p>Form</p>
    <form action="">
      <input type="text" class="border"/>
      <br>
      <input type="text" class="border mt-4"/>
      <br>
      <button type="submit" class="bg-primary mt-4 px-6 py-1">submit</button>
    </form>
  </div>
</div>