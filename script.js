document.addEventListener("DOMContentLoaded", function () {
    // Charger le header dynamiquement
    document.getElementById("app-header").innerHTML = renderHeader();
    
    // Charger la page correspondant à l'URL actuelle
    loadPage();
});
 
