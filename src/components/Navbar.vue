<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { LogoutIcon } from '@heroicons/vue/solid'
import ToggleTheme from './ToggleTheme.vue'

const router = useRouter()
const loggedIn = ref(false)

let auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    loggedIn.value = !!user
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<template>
  <nav class="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900 shadow">
    <!-- Logo -->
    <router-link to="/" class="text-2xl font-bold text-green-600 dark:text-green-400">
      🤖 Jlex Robot
    </router-link>

    <!-- Nav Links -->
    <ul class="flex items-center space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200">
      <li v-if="loggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
      <li v-if="loggedIn"><router-link to="/profile">Profil</router-link></li>
      <li v-if="!loggedIn"><router-link to="/login">Connexion</router-link></li>
      <li v-if="!loggedIn"><router-link to="/register">Inscription</router-link></li>

      <li v-if="loggedIn">
        <button @click="handleSignOut" class="flex items-center space-x-2 rounded border px-3 py-1 text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900">
          <LogoutIcon class="h-4 w-4" />
          <span>Déconnexion</span>
        </button>
      </li>

      <li><ToggleTheme /></li>
    </ul>
  </nav>
</template>
