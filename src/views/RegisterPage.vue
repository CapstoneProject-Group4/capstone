<script setup>
import { computed } from 'vue'
import RegisterForm from '@/components/form/RegisterForm.vue'
import GoogleLogin from '@/components/form/GoogleLogin.vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from '@/stores/auth'

const auth = useFirebaseAuth()
const router = useRouter()

const isLoading = computed(() => auth.isLoading)

const register = async (payload) => {
  await auth.register(payload.email, payload.password)
  router.push('/dashboard')
}
</script>

<template>
  <div class="container">
    <div class="flex flex-col">
      <h1 class="mb-2 text-lg">Create an account</h1>
      <RegisterForm :loading="isLoading" @submit="register" />
      <GoogleLogin />
    </div>
  </div>
</template>
