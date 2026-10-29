<script setup>
import { RouterView } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import MusicPlayer from '@/components/music/MusicPlayer.vue'
</script>

<template>
  <div class="grid h-screen grid-rows-[1fr_auto] gap-2 overflow-hidden bg-black p-2">

    <!-- Zone principale -->
    <div class="grid min-h-0 grid-cols-1 gap-2 lg:grid-cols-[280px_1fr]">

      <!-- Menu gauche -->
      <div class="hidden min-h-0 lg:block">
        <AppSidebar />
      </div>

      <!-- Pages -->
      <main class="min-h-0 overflow-y-auto rounded-lg bg-gradient-to-b from-[#242424] to-[#121212]">
        <AppHeader />

        <div class="p-5 sm:p-8">
          <RouterView />
        </div>
      </main>

    </div>

    <!-- Lecteur musical : étape 6 -->
    <footer class="flex h-16 items-center justify-center rounded-lg bg-black text-sm text-spotify-gray">
      <MusicPlayer />
    </footer>

  </div>
</template>
