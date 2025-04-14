<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4">
    <header class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-gray-800">🤖 Jlex Robot Dashboard</h1>
      <!-- Toggle Switch pour Clavier/Gamepad -->
      <div class="mt-4 flex justify-center items-center space-x-2">
        <span class="text-sm font-medium">Mode de contrôle:</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="keyboardControlMode" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span class="ml-2 text-sm font-medium">
            {{ keyboardControlMode ? 'Gamepad' : 'Clavier' }}
          </span>
        </label>
      </div>
      <!-- collision avoidance -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">🛡️ Collision Avoidance</h2>
        <button @click="toggleCollisionAvoidance" 
                :class="['px-4 py-2 rounded', collisionAvoidanceActive ? 'bg-green-600 text-white' : 'bg-gray-200']">
          {{ collisionAvoidanceActive ? 'Disable' : 'Enable' }}
        </button>
        <div class="mt-2 flex items-center gap-2">
          <span>Status:</span>
          <span :class="['w-3 h-3 rounded-full', collisionAvoidanceActive ? 'bg-green-500' : 'bg-gray-400']"></span>
          <span>{{ collisionAvoidanceActive ? 'Active' : 'Inactive' }}</span>
        </div>
        <div v-if="collisionWarning" class="mt-2 text-yellow-600 text-sm">
          ⚠️ Collision detected - movement blocked
        </div>
</div>

    </header>

    <div class="max-w-screen-xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Flux vidéo -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">🎥 Flux Vidéo (Live)</h2>
          <div class="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden flex items-center justify-center">
            <img
              src="http://172.20.10.8:8081/video_feed"
              alt="Live stream"
              class="object-contain max-h-full max-w-full"
              @error="handleVideoError"
            />
          </div>
          <div v-if="videoError" class="mt-2 text-red-600 text-sm">
            Erreur de connexion à la caméra
          </div>
        </div>

        <!-- Données du Robot -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">📊 Données du Robot</h2>
          <ul class="space-y-3 text-gray-700">
            <li><span class="font-semibold">🔋 Batterie :</span> {{ batteryLevel }}%</li>
            <li><span class="font-semibold">🌡 Température :</span> {{ temperature }}°C</li>
            <li><span class="font-semibold">📍 GPS :</span> {{ gpsCoordinates }}</li>
            <li class="flex items-center gap-2">
              <span class="font-semibold">⚙ Statut :</span>
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              {{ robotStatus }}
            </li>
            <li class="flex items-center gap-2">
              <span class="font-semibold">🎮 Mode :</span>
              <span :class="['px-2 py-1 rounded text-xs font-medium', 
                keyboardControlMode ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800']">
                {{ keyboardControlMode ? 'Clavier' : 'Gamepad' }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Suivi de Couleur -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">🎯 Suivi de Couleur</h2>
          <div class="flex flex-wrap gap-4 items-center">
            <select v-model="selectedColor" class="p-2 border border-gray-300 rounded">
              <option value="yellow">🟡 Jaune</option>
              <option value="red">🔴 Rouge</option>
              <option value="green">🟢 Vert</option>
              <option value="blue">🔵 Bleu</option>
            </select>
            <button @click="sendColor" class="px-4 py-2 bg-blue-600 text-white rounded">
              Activer
            </button>
            <button @click="stopTracking" class="px-4 py-2 bg-red-600 text-white rounded">
              Désactiver
            </button>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span>Statut:</span>
            <span :class="['w-3 h-3 rounded-full', isTracking ? 'bg-green-500' : 'bg-gray-400']"></span>
            <span>{{ isTracking ? 'Actif' : 'Inactif' }}</span>
          </div>
        </div>

        <!-- Détection de Mouvement -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">🔄 Détection de Mouvement</h2>
          <button @click="toggleMotionDetection" 
                  :class="['px-4 py-2 rounded', motionDetectionActive ? 'bg-green-600 text-white' : 'bg-gray-200']">
            {{ motionDetectionActive ? 'Désactiver' : 'Activer' }}
          </button>
          <div class="mt-2 flex items-center gap-2">
            <span>Statut:</span>
            <span :class="['w-3 h-3 rounded-full', motionDetectionActive ? 'bg-green-500' : 'bg-gray-400']"></span>
            <span>{{ motionDetectionActive ? 'Actif' : 'Inactif' }}</span>
          </div>
        </div>

        <!-- Aide Clavier -->
        <div class="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">⌨️ Aide Clavier (QWERTY)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="font-medium mb-2">Robot:</h3>
              <ul class="space-y-1 text-sm">
                <li>W - Avancer (maintenir)</li>
                <li>S - Reculer (maintenir)</li>
                <li>A - Gauche (maintenir)</li>
                <li>D - Droite (maintenir)</li>
                <li>Espace - Arrêt immédiat</li>
              </ul>
            </div>
            <div>
              <h3 class="font-medium mb-2">Camera/Pince:</h3>
              <ul class="space-y-1 text-sm">
                <li>C - Caméra gauche (maintenir)</li>
                <li>V - Caméra haut (maintenir)</li>
                <li>B - Caméra bas (maintenir)</li>
                <li>N - Caméra droite (maintenir)</li>
                <li>I - Bras vers le haut (maintenir)</li>
                <li>K - Bras vers le bas (maintenir)</li>
                <li>J - Bras vers la gauche (maintenir)</li>
                <li>L - Bras vers la droite (maintenir)</li>
                <li>U - Ouvrir pince (maintenir)</li>
                <li>O - Fermer pince (maintenir)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Données utilisateur
const user = ref(getAuth().currentUser)
const router = useRouter()
const logout = () => {
  signOut(getAuth()).then(() => router.push('/'))
}

// Mode de contrôle
const keyboardControlMode = ref(true)

// États des touches
const keysPressed = ref({
  w: false, // Avancer
  s: false, // Reculer
  a: false, // Gauche
  d: false, // Droite
  c: false, // Caméra gauche
  v: false, // Caméra haut
  b: false, // Caméra bas
  n: false, // Caméra droite
  i: false, // Bras haut
  j: false, // Bras gauche
  k: false, // Bras bas
  l: false,  // Bras droite
  u: false, // Ouvrir pince
  o: false  // Fermer pince
})

// Données robot
const batteryLevel = ref(97)
const temperature = ref(25)
const gpsCoordinates = ref("48.8566, 2.3522")
const robotStatus = ref("En mission")

// Vidéo
const videoError = ref(false)
const handleVideoError = () => videoError.value = true

// Contrôles Robot
const moveRobot = async (direction) => {
  try {
    await fetch(`http://172.20.10.8:8081/control/robot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: direction })
    })
    const data = await res.json()
    collisionWarning.value = data.status === 'blocked'
  } catch (error) {
    console.error("Erreur contrôle robot:", error)
  }
}

const stopRobot = async () => {
  try {
    await fetch(`http://172.20.10.8:8081/control/robot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop' })
    })
  } catch (error) {
    console.error("Erreur arrêt robot:", error)
  }
}

// Contrôles Caméra
const moveCamera = async (direction) => {
  try {
    await fetch(`http://172.20.10.8:8081/control/camera`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction })
    })
  } catch (error) {
    console.error("Erreur contrôle caméra:", error)
  }
}

const stopCamera = async () => {
  try {
    await fetch(`http://172.20.10.8:8081/control/camera`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction: 'stop' })
    })
  } catch (error) {
    console.error("Erreur arrêt caméra:", error)
  }
}

// Contrôles Pince
const moveArm = async (action) => {
  try {
    await fetch(`http://172.20.10.8:8081/control/arm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
  } catch (error) {
    console.error("Erreur contrôle pince:", error)
  }
}

// Suivi de couleur
const selectedColor = ref('yellow')
const isTracking = ref(false)

const sendColor = async () => {
  try {
    const res = await fetch('http://172.20.10.8:8081/set-color', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: selectedColor.value })
    })
    isTracking.value = res.ok
  } catch (error) {
    console.error("Erreur suivi couleur:", error)
  }
}

const stopTracking = async () => {
  try {
    await fetch('http://172.20.10.8:8081/stop-tracking', { method: 'POST' })
    isTracking.value = false
  } catch (error) {
    console.error("Erreur arrêt suivi:", error)
  }
}

// Détection mouvement
const motionDetectionActive = ref(false)

const toggleMotionDetection = async () => {
  try {
    const res = await fetch('http://172.20.10.8:8081/toggle-motion-detection', {
      method: 'POST'
    })
    motionDetectionActive.value = res.ok ? !motionDetectionActive.value : motionDetectionActive.value
  } catch (error) {
    console.error("Erreur détection mouvement:", error)
  }
}

// Gestion clavier QWERTY
const handleKeyDown = (e) => {
  if (!keyboardControlMode.value) return
  
  const key = e.key.toLowerCase()
  
  // Robot
  if (['w', 's', 'a', 'd', 'c', 'v', 'b', 'n', 'i', 'j', 'k', 'l', 'u', 'o'].includes(key)) {
    keysPressed.value[key] = true
    e.preventDefault() // Empêche le comportement par défaut
  }
  
  // Espace = arrêt d'urgence
  if (key === ' ') {
    stopRobot()
    stopCamera()
  }
}

const handleKeyUp = (e) => {
  const key = e.key.toLowerCase()
  if (Object.keys(keysPressed.value).includes(key)) {
    keysPressed.value[key] = false
  }
}

// Boucle d'envoi des commandes
let commandInterval = null

const startCommandLoop = () => {
  if (commandInterval) clearInterval(commandInterval)
  
  commandInterval = setInterval(() => {
    if (!keyboardControlMode.value) return
    
    // Robot
    if (keysPressed.value.w) moveRobot('forward')
    else if (keysPressed.value.s) moveRobot('backward')
    else if (keysPressed.value.a) moveRobot('left')
    else if (keysPressed.value.d) moveRobot('right')
    else stopRobot()
    
    // Caméra
    if (keysPressed.value.v) moveCamera('up')
    else if (keysPressed.value.b) moveCamera('down')
    else if (keysPressed.value.c) moveCamera('left')
    else if (keysPressed.value.n) moveCamera('right')
    else stopCamera()

  // Bras robotique
  if (keysPressed.value.i) moveArm('y_increase')   // Haut
    else if (keysPressed.value.k) moveArm('y_decrease') // Bas
    else if (keysPressed.value.j) moveArm('x_decrease') // Gauche
    else if (keysPressed.value.l) moveArm('x_increase') // Droite
    
    // Pince
    if (keysPressed.value.u) moveArm('release')  // Ouvrir
    else if (keysPressed.value.o) moveArm('grab')  // Fermer
  }, 50)
}

const stopCommandLoop = () => {
  if (commandInterval) {
    clearInterval(commandInterval)
    commandInterval = null
  }
}

// Détection Gamepad
let gamepadInterval = null

const checkGamepad = () => {
  if (keyboardControlMode.value) return
  
  const gamepads = navigator.getGamepads()
  if (!gamepads[0]) return

  const gamepad = gamepads[0]
  
  // Contrôles Robot avec stick gauche
  const leftStickX = gamepad.axes[0]
  const leftStickY = gamepad.axes[1]
  
  if (leftStickY < -0.5) {
    moveRobot('forward')
  } else if (leftStickY > 0.5) {
    moveRobot('backward')
  } else if (leftStickX < -0.5) {
    moveRobot('left')
  } else if (leftStickX > 0.5) {
    moveRobot('right')
  } else {
    stopRobot()
  }
  
  // Contrôles Caméra avec stick droit
  const rightStickX = gamepad.axes[2]
  const rightStickY = gamepad.axes[3]
  
  if (rightStickY < -0.5) {
    moveCamera('up')
  } else if (rightStickY > 0.5) {
    moveCamera('down')
  } else if (rightStickX < -0.5) {
    moveCamera('left')
  } else if (rightStickX > 0.5) {
    moveCamera('right')
  } else {
    stopCamera()
  }
  
  // Contrôles Pince avec boutons
  if (gamepad.buttons[0].pressed) { // Bouton A
    moveArm('grab')
  }
  if (gamepad.buttons[1].pressed) { // Bouton B
    moveArm('release')
  }
}

// Initialisation
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  startCommandLoop()
  
  // Démarrer la détection du gamepad
  gamepadInterval = setInterval(checkGamepad, 100)
  
  // Détection initiale des gamepads
  window.addEventListener('gamepadconnected', (e) => {
    console.log('Gamepad connected:', e.gamepad)
    if (!keyboardControlMode.value) {
      startCommandLoop()
    }
  })
})

// Nettoyage
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  stopCommandLoop()
  
  if (gamepadInterval) {
    clearInterval(gamepadInterval)
  }
})

const collisionAvoidanceActive = ref(false)
const collisionWarning = ref(false)

const toggleCollisionAvoidance = async () => {
  try {
    const res = await fetch('http://172.20.10.8:8081/toggle-collision-avoidance', {
      method: 'POST'
    })
    const data = await res.json()
    collisionAvoidanceActive.value = data.active
  } catch (error) {
    console.error("Error toggling collision avoidance:", error)
  }
}
</script>

<style>
button {
  transition: all 0.2s ease;
}

/* Style pour le toggle switch */
input:checked ~ .dot {
  transform: translateX(100%);
}
</style>