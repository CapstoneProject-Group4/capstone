// Fonction pour charger dynamiquement les pages selon l'URL
function loadPage() {
    const route = window.location.hash.substring(1) || "home"; 
    const content = document.getElementById("app-content");

    switch (route) {
        case "sign-in":
            content.innerHTML = renderSignIn();
            break;
        case "sign-up":
            content.innerHTML = renderSignUp();
            break;
        case "password-forgot":
            content.innerHTML = renderPasswordForgot();
            break;
        default:
            content.innerHTML = renderHome();
    }
}

// Charger la page au changement d'URL
window.addEventListener("hashchange", loadPage);
document.addEventListener("DOMContentLoaded", loadPage);
