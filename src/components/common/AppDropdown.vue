<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

const open = ref(false)
const menu = ref(null)
const { currentUser, logout } = useAuth()

function closeOutside(event) {
  if (menu.value && !menu.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOutside))
onUnmounted(() => document.removeEventListener('click', closeOutside))
</script>

<template>
  <div ref="menu" class="relative">
    <button
      @click.stop="open = !open"
      class="flex items-center gap-2 rounded-full bg-black p-1 pr-3 hover:bg-[#282828]"
    >
      <span class="grid size-8 place-items-center rounded-full bg-purple-600 font-bold">
        {{ (currentUser?.displayName || 'U').charAt(0).toUpperCase() }}
      </span>

      <span class="max-w-28 truncate text-sm font-bold">
        {{ currentUser?.displayName || 'Profile' }}
      </span>

      <ChevronDown class="size-4" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 w-48 rounded-md bg-[#282828] p-2 shadow-xl"
    >
      <RouterLink
        to="/profile"
        @click="open = false"
        class="block rounded p-3 text-sm hover:bg-[#3e3e3e]"
      >
        My profile
      </RouterLink>

      <RouterLink
        to="/settings"
        @click="open = false"
        class="block rounded p-3 text-sm hover:bg-[#3e3e3e]"
      >
        Settings
      </RouterLink>

      <div class="my-1 border-t border-gray-600"></div>

      <button
        @click="logout"
        class="w-full rounded p-3 text-left text-sm hover:bg-[#3e3e3e]"
      >
        Log out
      </button>
    </div>
  </div>
</template>