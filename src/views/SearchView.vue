<script setup>
import { Search } from 'lucide-vue-next'
import { useSearch } from '@/composables/useSearch'
import { useLibrary } from '@/composables/useLibrary'

const { isLiked, toggleLike } = useLibrary()
const { query, results } = useSearch()
</script>

<template>
    <section class="min-h-screen text-white">
        <h1 class="mb-6 text-3xl font-bold">Search</h1>

        <div class="mb-8 flex max-w-xl items-center gap-3 rounded-full bg-white px-4 py-3 text-black">
            <Search class="size-5" />

            <input v-model="query" type="search" placeholder="What do you want to play?"
                class="w-full bg-transparent outline-none" />
        </div>

        <h2 v-if="query.trim()" class="mb-4 text-xl font-bold">
            Search results
        </h2>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div v-for="song in results" :key="song.id" class="rounded-lg bg-[#181818] p-4 hover:bg-[#282828]">
                <img :src="song.cover" :alt="song.album" class="mb-4 aspect-square w-full rounded-md object-cover" />

                <h3 class="truncate font-bold">{{ song.title }}</h3>
                <p class="mt-1 truncate text-sm text-gray-400">
                    {{ song.artist }}
                </p>

                <button class="mt-4 rounded-full bg-[#1ed760] px-4 py-2 font-bold text-black"
                    @click="$emit('play', song)">
                    ▶ Play
                </button>
                <button @click="toggleLike(track)" class="rounded-full px-3 py-2 text-sm font-bold">
                    {{ isLiked(track) ? '♥ Liked' : '♡ Like' }}
                </button>
            </div>
        </div>

        <p v-if="query.trim() && results.length === 0" class="mt-6 text-gray-400">
            Aucun morceau trouvé.
        </p>

        <p v-if="!query.trim()" class="text-gray-400">
            Search for your favorite songs and artists.
        </p>
    </section>
</template>
