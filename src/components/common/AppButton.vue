<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | outline | ghost
  type: { type: String, default: 'button' },
  loading: Boolean,
  disabled: Boolean,
  block: Boolean,
})

const styles = {
  primary: 'bg-spotify-green text-black hover:bg-spotify-green-hover hover:scale-[1.02] font-bold',
  outline: 'border border-spotify-border text-white hover:border-white hover:scale-[1.02] font-bold',
  ghost: 'text-spotify-gray hover:text-white font-bold',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5
           text-base transition duration-150 disabled:opacity-60 disabled:hover:scale-100"
    :class="[styles[variant], block && 'w-full']"
  >
    <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>