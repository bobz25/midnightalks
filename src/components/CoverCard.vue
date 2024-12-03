<script setup lang="ts">
import { fixedCoverUrl } from '../utils'

const { title, created, itunes_image, goTo } = defineProps<{
  title: string
  created: number
  itunes_image: {
    href: string
  }
  goTo: Function
}>()
</script>

<template>
  <div
    flex justify-center items-center text-2xl rounded-lg
    absolute w-full h-full shadow-lg
  >
    <img
      v-lazy="fixedCoverUrl(itunes_image?.href)"
      inline-block :alt="created.toString()"
      cursor-pointer
      rd-2
    >
  </div>
  <div
    flex justify-center items-center text-2xl rounded-l
    absolute w-full h-full z-1
    text-transparent @click="goTo(created)"
  >
    {{ title }}
  </div>
</template>
