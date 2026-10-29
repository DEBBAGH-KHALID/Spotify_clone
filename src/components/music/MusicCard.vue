<script setup>
import { usePlayer } from '@/composables/usePlayer'

const { playSong } = usePlayer()
defineProps({
  title: String,
  subtitle: String,
  image: String,
  to: String
})
</script>

<template>
  <RouterLink :to="to || '/'" class="group rounded-lg bg-[#181818] p-3 transition hover:bg-[#282828]">
    <div class="relative">
      <img :src="image" :alt="title" class="aspect-square w-full rounded-md object-cover shadow-lg" />

      <button type="button" aria-label="Play"
        class="absolute right-2 bottom-2 grid size-12 place-items-center rounded-full bg-[#1ed760] text-black"
        @click.prevent="playSong(song)">
        ▶
      </button>
    </div>

    <h3 class="mt-3 truncate font-bold">{{ title }}</h3>
    <p class="mt-1 line-clamp-2 text-sm text-spotify-gray">
      {{ subtitle }}
    </p>
  </RouterLink>
</template>
