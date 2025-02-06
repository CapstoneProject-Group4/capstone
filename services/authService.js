const authService = {
    // Simule une base de données utilisateurs
    users: JSON.parse(localStorage.getItem("users")) || [],

    // Fonction d'inscription
    signUp: function (email, name, password) {
        if (this.users.some(user => user.email === email)) {
            alert("L'email est déjà utilisé.");
            return false;
        }

        const newUser = { email, name, password };
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));

        alert("Inscription réussie !");
        return true;
    },

    // Fonction de connexion
    signIn: function (email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);

        if (user) {
            alert(`Bienvenue, ${user.name} !`);
            localStorage.setItem("currentUser", JSON.stringify(user));
            return true;
        } else {
            alert("Email ou mot de passe incorrect.");
            return false;
        }
    },

    // Fonction de déconnexion
    signOut: function () {
        localStorage.removeItem("currentUser");
        alert("Déconnexion réussie.");
    },

    // Vérifie si un utilisateur est connecté
    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem("currentUser"));
    }
};

// Exemples d'utilisation :
// authService.signUp("test@example.com", "Test User", "password123");
// authService.signIn("test@example.com", "password123");
 
