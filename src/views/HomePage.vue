<template>
  <div class="home-container flex flex-col items-center justify-center text-white text-center px-4 py-20">
    <div class="bg-black bg-opacity-60 p-8 rounded-lg max-w-2xl">
      <h1 class="text-4xl font-bold mb-4">🤖 Bienvenue sur <span class="text-green-400">Jlex Robot</span></h1>
      <p class="text-lg mb-6">
        Une interface intelligente pour contrôler et surveiller en temps réel notre robot de déminage autonome, alimenté par Jetson Nano, caméra live, GPS, batterie et plus.
      </p>
      <router-link to="/login" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
        Connexion
      </router-link>
    </div>
  </div>
</template>

<script setup>
// rien à importer ici
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-image: url('@/assets/military-robot-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
