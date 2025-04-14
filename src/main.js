import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// plugins
import Toaster from '@meforma/vue-toaster'
import { vfmPlugin } from 'vue-final-modal'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// css
import './index.css'

// ✅ Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaaqz1eUDQt0oQ7qiR9YPpNKGy5CNEvQE",
  authDomain: "jlex-robot.firebaseapp.com",
  projectId: "jlex-robot",
  storageBucket: "jlex-robot.appspot.com",
  messagingSenderId: "806014805235",
  appId: "1:806014805235:web:52b1412ac1f881ee6d0386",
  measurementId: "G-9ZLJCQVYT5"
};

// ✅ Initialisation Firebase
const firebaseApp = initializeApp(firebaseConfig)
getAnalytics(firebaseApp)
getFirestore(firebaseApp)
getStorage(firebaseApp)

// ✅ Initialisation Vue App
const app = createApp(App)

app.use(vfmPlugin)
app.use(Toaster).provide('toast', app.config.globalProperties.$toast)
app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')

