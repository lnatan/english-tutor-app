<script>
  import { fly } from "svelte/transition";
  // export let type = "";
</script>

<div class="notification" transition:fly="{{ y: -200, duration: 500 }}">
  <slot/>
</div>

<!-- <span class="icon"><i class="icon-loading"></i></span> -->

<style>
.notification {
  @apply p-6 rounded bg-white absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>