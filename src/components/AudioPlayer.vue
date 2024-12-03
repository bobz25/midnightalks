<script setup lang="ts">
defineProps({
  src: String,
})
</script>

<template>
  <div class="w-full md:w-60%">
    <audio class="w-full" controls preload="metadata" :src="src">Your browser does not support HTML5 <code>audio</code>.</audio>
  </div>
</template>
