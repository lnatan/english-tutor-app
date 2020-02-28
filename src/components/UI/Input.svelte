<script>
  export let id;
  export let label;
  export let type = 'text';
  export let value = '';
  export let checked;

	const handleInput = (event) => {
		value = event.target.value;
	}
</script>

<style>
  button:focus {
    outline: 0 !important;
  }
</style>

<!-- <label class="block mb-2" for="{id}">{label}</label>
<div class="flex mb-4">
	<input {id} {type} {value} placeholder="{label}" on:input="{handleInput}">
</div> -->

<input {id} {type} {checked} {value} placeholder={label} on:input={handleInput}>