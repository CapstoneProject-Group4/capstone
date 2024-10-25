import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    cpuUsage: number = 0;
    fps: number = 0;
    temperature: number = 25.5; // Valeur par défaut, car ce n'est pas accessible via l'API standard du navigateur
    ramUsage: number = 0;
    recording: boolean | undefined;
    isSwitchOn: boolean = true;
  
    constructor() {}
  
    ngOnInit(): void {
      this.getCpuUsage();
      this.calculateFPS();
  // Ajoute ici toute la logique nécessaire pour gérer les actions
  // comme activer la caméra, prendre une capture d'écran, etc.
    }
  
    

  toggleRecording() {
    this.recording = !this.recording;
  }

  captureImage() {
    // Ajouter ici la logique pour capturer l'image
    console.log("Image captured!");
  }
  getCpuUsage(): void {
    const numCores = navigator.hardwareConcurrency || 4; // Default to 4 if hardwareConcurrency is not supported
    this.cpuUsage = Math.random() * 100 / numCores; // Just a random simulation of CPU usage based on core count
    this.ramUsage = Math.floor(Math.random() * 100); // Random simulation for RAM usage
    setTimeout(() => this.getCpuUsage(), 2000); // Update every 2 seconds
  }

  // Méthode pour calculer le FPS
  calculateFPS(): void {
    let lastFrameTime = performance.now();
    const updateFPS = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;
      this.fps = Math.round(1000 / deltaTime); // FPS calculation
      lastFrameTime = currentTime;
      requestAnimationFrame(updateFPS); // Call again on next frame
        };
    updateFPS();
    }
}