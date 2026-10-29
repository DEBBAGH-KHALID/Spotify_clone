
<script setup>
import { usePlayer } from '@/composables/usePlayer'
import { Play, Pause, Volume2 } from 'lucide-vue-next'

const {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  progress,
  togglePlay,
  seek,
  setVolume,
  formatTime
} = usePlayer()
</script>

<template>
  <footer
    class="grid h-20 grid-cols-3 items-center gap-4 bg-black px-4 text-white"
  >
    <!-- Morceau actuel -->
    <div class="flex min-w-0 items-center gap-3">
      <img
        v-if="currentSong?.cover"
        :src="currentSong.cover"
        :alt="currentSong.title"
        class="size-14 rounded object-cover"
      />

      <div class="min-w-0">
        <p class="truncate font-semibold">
          {{ currentSong?.title || 'Aucun morceau sélectionné' }}
        </p>

        <p class="truncate text-sm text-gray-400">
          {{ currentSong?.artist || 'Choisis une musique' }}
        </p>
      </div>
    </div>

    <!-- Commandes et progression -->
    <div class="flex flex-col items-center gap-1">
      <button
        @click="togglePlay"
        :disabled="!currentSong"
        class="grid size-9 place-items-center rounded-full bg-white text-black disabled:opacity-40"
        aria-label="Lecture ou pause"
      >
        <Pause v-if="isPlaying" class="size-5" />
        <Play v-else class="size-5" />
      </button>

      <div class="flex w-full items-center gap-2 text-xs text-gray-400">
        <span>{{ formatTime(currentTime) }}</span>

        <input
          type="range"
          min="0"
          :max="duration || 0"
          step="0.1"
          :value="currentTime"
          @input="seek(Number($event.target.value))"
          class="w-full accent-[#1ed760]"
        />

        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Volume -->
    <div class="flex items-center justify-end gap-2">
      <Volume2 class="size-5" />

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        :value="volume"
        @input="setVolume($event.target.value)"
        aria-label="Volume"
        class="w-24 accent-[#1ed760]"
      />
    </div>
  </footer>
</template>
