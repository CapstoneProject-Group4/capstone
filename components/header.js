function renderHeader() {
    const currentUser = authService.getCurrentUser(); // Vérifie si un utilisateur est connecté

    return `
    <header class="header-container">
        <div class="container d-flex align-items-center">
            <!-- Logo du site -->
            <a href="#home" class="header-logo">
                <img src="assets/images/couverture.png" alt="JLEX Robot" class="header-image">
            </a>
            <!-- Nom de l'application -->
            <h1 class="header-title">JLEX ROBOT</h1>
        </div>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item"><a class="nav-link" href="#home">Accueil</a></li>
                        <li class="nav-item"><a class="nav-link" href="#sign-in">Connexion</a></li>
                        <li class="nav-item"><a class="nav-link" href="#sign-up">Inscription</a></li>
                    </ul>
                    <ul class="navbar-nav">
                        ${currentUser ? `
                            <li class="nav-item">
                                <span class="navbar-text">Bonjour, ${currentUser.name} 👋</span>
                            </li>
                            <li class="nav-item">
                                <button class="btn btn-danger ms-3" id="signOutBtn">Déconnexion</button>
                            </li>
                        ` : ''}
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    `;
}

// Fonction pour gérer la déconnexion
function handleSignOut() {
    authService.signOut();
    window.location.hash = "sign-in"; // Redirige vers la page de connexion
    location.reload(); // Recharge la page pour mettre à jour le header
}

// Injecte le header dans la page
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("app-header").innerHTML = renderHeader();

    // Attache l'événement de déconnexion si l'utilisateur est connecté
    const signOutBtn = document.getElementById("signOutBtn");
    if (signOutBtn) {
        signOutBtn.addEventListener("click", handleSignOut);
    }
});
