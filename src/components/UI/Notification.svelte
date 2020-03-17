<script>
  import { fly } from "svelte/transition";
  // export let visible = false;
</script>

<div class="notification" transition:fly="{{ y: -200, duration: 500 }}">
  <div class="flex items-center">
    <slot/>
  </div>
</div>

<style>
.notification {
  @apply p-6 rounded bg-white absolute text-lg;
  top: 25px;
  right: 25px;
  /* width: 270px; */
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>