<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Smartphone, Eye, EyeOff, Info } from 'lucide-vue-next'
import AppButton from '@/components/common/AppButton.vue'
import AuthLogo from '@/components/common/AuthLogo.vue'
import BrandIcon from '@/components/common/BrandIcon.vue'
import { useAuth } from '@/composables/useAuth'
import { EMAIL_RE } from '@/services/authService'

const router = useRouter()
const { login, loginDemo, emailExists } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const step = ref('email') // email | password | notfound
const emailError = ref('')
const passwordError = ref('')
const loading = ref(false)
const demoProvider = ref(null)

const providers = [
  { id: 'phone', label: 'Continue with phone number', icon: 'phone' },
  { id: 'google', label: 'Continue with Google', icon: 'google' },
  { id: 'facebook', label: 'Continue with Facebook', icon: 'facebook' },
  { id: 'apple', label: 'Continue with Apple', icon: 'apple' },
]

const trimmedEmail = computed(() => email.value.trim())

function submitEmail() {
  emailError.value = ''
  if (!trimmedEmail.value) {
    emailError.value = 'Please enter your email address.'
    return
  }
  if (!EMAIL_RE.test(trimmedEmail.value)) {
    emailError.value = 'This email is invalid. Make sure it’s written like example@email.com.'
    return
  }
  step.value = emailExists(trimmedEmail.value) ? 'password' : 'notfound'
}

async function submitPassword() {
  passwordError.value = ''
  if (!password.value) {
    passwordError.value = 'Please enter your password.'
    return
  }
  loading.value = true
  try {
    await login(trimmedEmail.value, password.value)
  } catch (e) {
    passwordError.value = e.message
  } finally {
    loading.value = false
  }
}

function onSubmit() {
  return step.value === 'password' ? submitPassword() : submitEmail()
}

function editEmail() {
  step.value = 'email'
  password.value = ''
  passwordError.value = ''
}

function goSignup() {
  router.push({ name: 'signup', query: { email: trimmedEmail.value } })
}

function confirmDemo() {
  loginDemo(demoProvider.value.id)
}
</script>

<template>
  <main class="flex min-h-full justify-center bg-spotify-base px-6 py-10">
    <div class="w-full max-w-[400px]">
      <AuthLogo />
      <h1 class="mt-4 mb-8 text-center text-4xl font-black tracking-tight sm:text-5xl">Welcome back</h1>

      <form novalidate class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="mb-2 block text-sm font-bold">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            :readonly="step !== 'email'"
            placeholder="Email"
            :aria-invalid="Boolean(emailError)"
            class="w-full rounded bg-transparent px-3 py-3 text-base ring-1 ring-spotify-border
                   placeholder:text-spotify-muted hover:ring-white focus:ring-2 focus:ring-white
                   focus:outline-none read-only:opacity-70"
            :class="emailError && 'ring-red-400'"
          />
          <p v-if="emailError" class="mt-2 text-sm text-red-400" role="alert">{{ emailError }}</p>
          <button v-if="step !== 'email'" type="button" class="mt-2 text-sm text-spotify-gray underline hover:text-white" @click="editEmail">
            Change email
          </button>
        </div>

        <!-- Étape mot de passe (le compte local existe) -->
        <div v-if="step === 'password'">
          <label for="password" class="mb-2 block text-sm font-bold">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              autofocus
              placeholder="Password"
              class="w-full rounded bg-transparent px-3 py-3 pr-12 ring-1 ring-spotify-border
                     placeholder:text-spotify-muted hover:ring-white focus:ring-2 focus:ring-white focus:outline-none"
              :class="passwordError && 'ring-red-400'"
            />
            <button
              type="button"
              class="absolute top-1/2 right-3 -translate-y-1/2 text-spotify-gray hover:text-white"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="size-5" />
              <Eye v-else class="size-5" />
            </button>
          </div>
          <p v-if="passwordError" class="mt-2 text-sm text-red-400" role="alert">{{ passwordError }}</p>
        </div>

        <!-- Compte introuvable : proposer la création -->
        <div v-if="step === 'notfound'" class="rounded-lg bg-spotify-card-hover p-4 text-sm">
          <p class="mb-3">No account found with <strong>{{ trimmedEmail }}</strong>. Want to create one?</p>
          <AppButton block @click="goSignup">Create account</AppButton>
        </div>

        <AppButton v-if="step !== 'notfound'" type="submit" block :loading="loading">
          {{ step === 'password' ? 'Log in' : 'Continue' }}
        </AppButton>
      </form>

      <div class="my-6 text-center text-sm font-bold">or</div>

      <div class="space-y-2">
        <AppButton
          v-for="p in providers"
          :key="p.id"
          variant="outline"
          block
          class="!justify-start !px-6 !py-3"
          @click="demoProvider = p"
        >
          <Smartphone v-if="p.icon === 'phone'" class="size-6" />
          <BrandIcon v-else :name="p.icon" />
          <span class="flex-1 text-center">{{ p.label }}</span>
          <span class="size-6" aria-hidden="true" />
        </AppButton>
      </div>

      <!-- Panneau démo : annonce clairement qu'il n'y a pas d'authentification réelle -->
      <div v-if="demoProvider" class="mt-4 rounded-lg border border-spotify-border bg-spotify-elevated p-4 text-sm">
        <p class="mb-3 flex gap-2 text-spotify-gray">
          <Info class="mt-0.5 size-4 shrink-0" />
          <span>
            Demo only: no real authentication with {{ demoProvider.id }} is performed.
            A local demo account will be created in your browser.
          </span>
        </p>
        <div class="flex gap-2">
          <AppButton class="!px-5 !py-2" @click="confirmDemo">Continue in demo mode</AppButton>
          <AppButton variant="ghost" class="!px-5 !py-2" @click="demoProvider = null">Cancel</AppButton>
        </div>
      </div>

      <p class="mt-10 text-center text-spotify-gray">Don't have an account?</p>
      <RouterLink to="/signup" class="mt-3 block text-center font-bold hover:underline">Sign up</RouterLink>

      <p class="mt-8 text-center text-xs text-spotify-muted">
        Educational project: local simulation, not a secure production login.
      </p>
    </div>
  </main>
</template>