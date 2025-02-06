function renderHome() {
    return `
        <!-- Image de couverture -->
        <div class="cover-container">
            <img src="assets/images/cover.png" alt="Robot détecteur de mines" class="cover-image">
            <div class="cover-text">
                <h1>JLEX ROBOT</h1>
                <p>Votre solution avancée pour la détection et la manipulation d'objets.</p>
            </div>
        </div>

        <!-- Vue caméra -->
        <div class="camera-view">
            <div class="camera-status">
                <span class="status-info" id="cpu-usage">CPU: Loading...</span> 
                <span class="status-info" id="battery-status">Battery: <span id="battery-level">Loading...</span>%</span>
                <span class="status-info" id="fps-status">FPS: Loading...</span>
            </div>
            <div class="camera-display">
                <video class="camera-feed" controls autoplay>
                    <source src="rtsp://172.20.10.3:8554/live" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="camera-controls">
                <button class="record-btn">Recording</button>
                <button class="capture-btn">📷</button>
            </div>
        </div>

        <!-- Dashboard du robot -->
        <div class="robot-dashboard">
            <h3>Robot Status</h3>
            <div class="battery-container">
                <label>Batterie: </label>
                <progress id="battery-bar" value="0" max="100"></progress>
                <span id="battery-percentage">0%</span>
            </div>
            <div class="map-container">
                <h4>Position du Robot</h4>
                <div id="robot-map"></div>
                <button class="btn btn-primary mt-2" onclick="getRobotLocation()">Mettre à jour la position</button>
            </div>
        </div>

        <!-- Contrôle du robot -->
        <div class="robot-controller">
            <div class="controller-header">
                <label for="switch">Switch controller</label>
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" aria-checked="true" checked>
            </div>
            
            <div class="controller-pad">
                <button class="control-btn">⬆</button>
                <div class="side-controls">
                    <button class="control-btn">⬅</button>
                    <button class="center-btn">CUT/GRAB</button>
                    <button class="control-btn">➡</button>
                </div>
                <button class="control-btn">⬇</button>
            </div>
        </div>
    `;
}

// 🔋 Mise à jour du niveau réel de la batterie
function updateBatteryStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            let batteryLevel = Math.round(battery.level * 100); // Convertir en pourcentage
            document.getElementById("battery-bar").value = batteryLevel;
            document.getElementById("battery-percentage").innerText = batteryLevel + "%";
        });
    } else {
        console.warn("L'API Battery Status n'est pas supportée sur ce navigateur.");
        document.getElementById("battery-percentage").innerText = "Non disponible";
    }
}

// 📍 Mise à jour de la position GPS du robot
function getRobotLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                document.getElementById("robot-map").innerHTML = `
                    <iframe 
                        width="100%" height="300" 
                        src="https://www.google.com/maps?q=${lat},${lon}&output=embed">
                    </iframe>
                `;
            },
            function (error) {
                alert("Impossible d'obtenir la position : " + error.message);
            }
        );
    } else {
        alert("Géolocalisation non supportée par votre navigateur.");
    }
}

// 🔄 Met à jour la batterie toutes les 10 secondes
setInterval(updateBatteryStatus, 10000);
document.addEventListener("DOMContentLoaded", updateBatteryStatus);
