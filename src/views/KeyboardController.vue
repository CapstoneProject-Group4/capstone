<template>
  <div class="keyboard-controls">
    <div class="control-grid">
      <!-- Contrôles robot -->
      <div class="control-group">
        <h3>Robot Controls</h3>
        <div class="control-row">
          <button @mousedown="sendCommand('robot', 'forward')" @mouseup="sendCommand('robot', 'stop')" 
                  :class="{active: activeControls.robot === 'forward'}">↑ Avancer</button>
        </div>
        <div class="control-row">
          <button @mousedown="sendCommand('robot', 'left')" @mouseup="sendCommand('robot', 'stop')" 
                  :class="{active: activeControls.robot === 'left'}">← Gauche</button>
          <button @click="sendCommand('robot', 'stop')" class="stop">Stop</button>
          <button @mousedown="sendCommand('robot', 'right')" @mouseup="sendCommand('robot', 'stop')" 
                  :class="{active: activeControls.robot === 'right'}">→ Droite</button>
        </div>
        <div class="control-row">
          <button @mousedown="sendCommand('robot', 'backward')" @mouseup="sendCommand('robot', 'stop')" 
                  :class="{active: activeControls.robot === 'backward'}">↓ Reculer</button>
        </div>
      </div>

      <!-- Contrôles caméra -->
      <div class="control-group">
        <h3>Camera Controls</h3>
        <div class="control-row">
          <button @mousedown="sendCommand('camera', 'up')" @mouseup="sendCommand('camera', 'stop')" 
                  :class="{active: activeControls.camera === 'up'}">↑ Haut</button>
        </div>
        <div class="control-row">
          <button @mousedown="sendCommand('camera', 'left')" @mouseup="sendCommand('camera', 'stop')" 
                  :class="{active: activeControls.camera === 'left'}">← Gauche</button>
          <button @click="sendCommand('camera', 'stop')" class="stop">Stop</button>
          <button @mousedown="sendCommand('camera', 'right')" @mouseup="sendCommand('camera', 'stop')" 
                  :class="{active: activeControls.camera === 'right'}">→ Droite</button>
        </div>
        <div class="control-row">
          <button @mousedown="sendCommand('camera', 'down')" @mouseup="sendCommand('camera', 'stop')" 
                  :class="{active: activeControls.camera === 'down'}">↓ Bas</button>
        </div>
      </div>

      <!-- Contrôles bras -->
      <div class="control-group">
        <h3>Bras Robotique</h3>
        <div class="control-row">
          <button @click="sendCommand('arm', 'x_increase')">X+</button>
          <button @click="sendCommand('arm', 'y_increase')">Y+</button>
        </div>
        <div class="control-row">
          <button @click="sendCommand('arm', 'x_decrease')">X-</button>
          <button @click="sendCommand('arm', 'y_decrease')">Y-</button>
        </div>
        <div class="control-row">
          <button @click="sendCommand('arm', 'grab')">Attraper</button>
          <button @click="sendCommand('arm', 'release')">Relâcher</button>
        </div>
      </div>
    </div>

    <div class="keyboard-hint">
      <p>Contrôles clavier :</p>
      <ul>
        <li>Z/S/Q/D : Déplacement robot</li>
        <li>Flèches : Contrôle caméra</li>
        <li>Espace : Arrêt d'urgence</li>
        <li>I/J/K/L : Bras robotique</li>
        <li>G/H : Attraper/Relâcher</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const activeControls = ref({
  robot: null,
  camera: null,
  arm: null
})

const sendCommand = async (controlType, action) => {
  try {
    let endpoint = ''
    const payload = {}
    
    switch(controlType) {
      case 'robot':
        endpoint = '/control/robot'
        payload.action = action
        if (action !== 'stop') payload.speed = 0.4
        activeControls.value.robot = action === 'stop' ? null : action
        break
      case 'camera':
        endpoint = '/control/camera'
        payload.direction = action
        activeControls.value.camera = action === 'stop' ? null : action
        break
      case 'arm':
        endpoint = '/control/arm'
        payload.action = action
        break
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    return await response.json()
  } catch (error) {
    console.error('Command error:', error)
  }
}

// Gestion du clavier
const handleKeyDown = (e) => {
  const key = e.key.toLowerCase()
  
  // Contrôles robot
  if (key === 'z') sendCommand('robot', 'forward')
  if (key === 's') sendCommand('robot', 'backward')
  if (key === 'q') sendCommand('robot', 'left')
  if (key === 'd') sendCommand('robot', 'right')
  
  // Contrôles caméra
  if (key === 'arrowup') sendCommand('camera', 'up')
  if (key === 'arrowdown') sendCommand('camera', 'down')
  if (key === 'arrowleft') sendCommand('camera', 'left')
  if (key === 'arrowright') sendCommand('camera', 'right')
  
  // Contrôles bras
  if (key === 'i') sendCommand('arm', 'y_increase')
  if (key === 'k') sendCommand('arm', 'y_decrease')
  if (key === 'j') sendCommand('arm', 'x_decrease')
  if (key === 'l') sendCommand('arm', 'x_increase')
  if (key === 'g') sendCommand('arm', 'grab')
  if (key === 'h') sendCommand('arm', 'release')
  
  // Arrêt d'urgence
  if (key === ' ') {
    sendCommand('robot', 'stop')
    sendCommand('camera', 'stop')
  }
}

const handleKeyUp = (e) => {
  const key = e.key.toLowerCase()
  
  // Arrêt des mouvements continus
  if (['z', 's', 'q', 'd'].includes(key)) {
    sendCommand('robot', 'stop')
  }
  
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    sendCommand('camera', 'stop')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
.keyboard-controls {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.control-group {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.control-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background: #e0e0e0;
  cursor: pointer;
  min-width: 80px;
  transition: all 0.2s;
}

button:hover {
  background: #d0d0d0;
}

button.active {
  background: #4CAF50;
  color: white;
}

button.stop {
  background: #f44336;
  color: white;
}

.keyboard-hint {
  margin-top: 30px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
  font-size: 14px;
}
</style>