<script setup>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simule un petit chargement (tu peux retirer le timeout plus tard)
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-slate-800 dark:text-white">
    <Navbar />

    <div v-if="isLoading" class="flex items-center justify-center h-[calc(100vh-80px)]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
    </div>

    <!-- Wrapper global avec la classe container définie dans index.css -->
    <div v-else class="container mx-auto py-10">
      <transition mode="out-in">
        <keep-alive>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Vous pouvez ajouter ici d'autres styles ou effets de transition */
</style>