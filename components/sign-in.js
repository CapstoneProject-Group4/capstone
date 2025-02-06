function renderSignIn() {
    return `
        <div class="container">
            <div class="displayTable">
                <div class="displayTableCell">
                    <div class="authBlock pt-5">
                        <h3>Sign In</h3>
                        <div class="formGroup">
                            <input type="text" class="formControl" id="email" placeholder="Email" required>
                        </div>
                        <div class="formGroup">
                            <input type="password" class="formControl" id="userPassword" placeholder="Password" required>
                        </div>
                        <div class="formGroup">
                            <input type="button" class="btn btn-outline-primary" value="Log in" onclick="signIn()">
                        </div>
                        <div class="forgotPassword">
                            <span onclick="navigateToForgotPassword()">Forgot Password?</span>
                        </div>
                    </div>
                    <div class="redirectToLogin">
                        <span>
                            Don't have an account?
                            <span class="redirect" onclick="navigateToSignUp()"> Sign Up</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour la connexion (simulation)
function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("userPassword").value;
    
    if (email && password) {
        alert(`Welcome, ${email}! You are now logged in.`);
    } else {
        alert("Please enter a valid email and password.");
    }
}

// Redirection vers mot de passe oublié
function navigateToForgotPassword() {
    window.location.hash = "password-forgot";
}

// Redirection vers l'inscription
function navigateToSignUp() {
    window.location.hash = "sign-up";
}
 
