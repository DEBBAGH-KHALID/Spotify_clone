<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import AppButton from '@/components/common/AppButton.vue'
import AuthLogo from '@/components/common/AuthLogo.vue'
import { useAuth } from '@/composables/useAuth'
import { EMAIL_RE } from '@/services/authService'

const route = useRoute()
const { register, emailExists } = useAuth()

const form = reactive({
  username: '',
  email: typeof route.query.email === 'string' ? route.query.email : '',
  password: '',
  confirm: '',
  birthDate: '',
})
const errors = reactive({})
const submitError = ref('')
const showPassword = ref(false)
const loading = ref(false)

const today = new Date().toISOString().slice(0, 10)

function age(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  let a = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--
  return a
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  const u = form.username.trim()
  if (!u) errors.username = 'Please enter a username.'
  else if (u.length < 2 || u.length > 30) errors.username = 'Username must be 2 to 30 characters.'

  const e = form.email.trim()
  if (!e) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(e)) errors.email = 'This email is invalid.'
  else if (emailExists(e)) errors.email = 'An account with this email already exists.'

  if (!form.password) errors.password = 'Please choose a password.'
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  else if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password))
    errors.password = 'Password must contain at least one letter and one number.'

  if (!form.confirm) errors.confirm = 'Please confirm your password.'
  else if (form.confirm !== form.password) errors.confirm = 'Passwords do not match.'

  if (!form.birthDate) errors.birthDate = 'Please enter your date of birth.'
  else if (form.birthDate > today) errors.birthDate = 'Date of birth cannot be in the future.'
  else if (age(form.birthDate) < 13) errors.birthDate = 'You must be at least 13 years old.'

  return Object.keys(errors).length === 0
}

async function onSubmit() {
  submitError.value = ''
  if (!validate()) return
  loading.value = true
  try {
    await register({
      username: form.username,
      email: form.email,
      password: form.password,
      birthDate: form.birthDate,
    })
  } catch (e) {
    submitError.value = e.message
  } finally {
    loading.value = false
  }
}

const inputClass = (field) => [
  'w-full rounded bg-transparent px-3 py-3 ring-1 placeholder:text-spotify-muted',
  'hover:ring-white focus:ring-2 focus:ring-white focus:outline-none',
  errors[field] ? 'ring-red-400' : 'ring-spotify-border',
]
</script>

<template>
  <main class="flex min-h-full justify-center bg-spotify-base px-6 py-10">
    <div class="w-full max-w-[400px]">
      <AuthLogo />
      <h1 class="mt-4 mb-8 text-center text-4xl font-black tracking-tight">Sign up to start listening</h1>

      <form novalidate class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="username" class="mb-2 block text-sm font-bold">Username</label>
          <input id="username" v-model="form.username" autocomplete="username" placeholder="Username" :class="inputClass('username')" />
          <p v-if="errors.username" class="mt-1 text-sm text-red-400" role="alert">{{ errors.username }}</p>
        </div>

        <div>
          <label for="email" class="mb-2 block text-sm font-bold">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" placeholder="name@domain.com" :class="inputClass('email')" />
          <p v-if="errors.email" class="mt-1 text-sm text-red-400" role="alert">
            {{ errors.email }}
            <RouterLink v-if="errors.email.includes('already')" to="/login" class="underline">Log in</RouterLink>
          </p>
        </div>

        <div>
          <label for="password" class="mb-2 block text-sm font-bold">Password</label>
          <div class="relative">
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" placeholder="Password" :class="inputClass('password')" class="pr-12" />
            <button type="button" class="absolute top-1/2 right-3 -translate-y-1/2 text-spotify-gray hover:text-white" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
              <EyeOff v-if="showPassword" class="size-5" />
              <Eye v-else class="size-5" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-red-400" role="alert">{{ errors.password }}</p>
        </div>

        <div>
          <label for="confirm" class="mb-2 block text-sm font-bold">Confirm password</label>
          <input id="confirm" v-model="form.confirm" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" placeholder="Confirm password" :class="inputClass('confirm')" />
          <p v-if="errors.confirm" class="mt-1 text-sm text-red-400" role="alert">{{ errors.confirm }}</p>
        </div>

        <div>
          <label for="birth" class="mb-2 block text-sm font-bold">Date of birth</label>
          <input id="birth" v-model="form.birthDate" type="date" :max="today" :class="inputClass('birthDate')" style="color-scheme: dark" />
          <p v-if="errors.birthDate" class="mt-1 text-sm text-red-400" role="alert">{{ errors.birthDate }}</p>
        </div>

        <p v-if="submitError" class="text-sm text-red-400" role="alert">{{ submitError }}</p>

        <AppButton type="submit" block :loading="loading">Create account</AppButton>
      </form>

      <p class="mt-8 text-center text-spotify-gray">
        Already have an account?
        <RouterLink to="/login" class="font-bold text-white underline hover:text-spotify-green">Log in here</RouterLink>
      </p>
      <p class="mt-6 text-center text-xs text-spotify-muted">
        Educational project: the account stays in your browser (hashed password), not on a server.
      </p>
    </div>
  </main>
</template>