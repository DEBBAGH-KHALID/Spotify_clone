
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Bell, Users } from 'lucide-vue-next'
import AppDropdown from '@/components/common/AppDropdown.vue'

const router = useRouter()
const query = ref('')

function searchMusic() {
  router.push({
    name: 'search',
    query: query.value.trim()
      ? { q: query.value.trim() }
      : {}
  })
}
</script>

<template>
  <header class="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 bg-[#181818]/95 p-4 backdrop-blur">
    <form @submit.prevent="searchMusic" class="flex min-w-48 flex-1 items-center gap-2 rounded-full bg-white px-4 py-2 text-black sm:max-w-md">
      <Search class="size-5 shrink-0" />

      <input
        v-model="query"
        type="search"
        placeholder="What do you want to play?"
        class="w-full bg-transparent outline-none"
      />
    </form>

    <div class="flex items-center gap-3">
      <button
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:scale-105"
      >
        Explore Premium
      </button>

      <button
        title="Notifications (demo)"
        class="rounded-full p-2 hover:bg-[#282828]"
      >
        <Bell class="size-5" />
      </button>

      <button
        title="Friend activity (demo)"
        class="rounded-full p-2 hover:bg-[#282828]"
      >
        <Users class="size-5" />
      </button>

      <AppDropdown />
    </div>
  </header>
</template>
