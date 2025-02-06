function renderPasswordForgot() {
    return `
        <div class="displayTable">
            <div class="displayTableCell">
                <div class="authBlock">
                    <h3>Reset Password</h3>
                    <p class="text-center">Please enter your email address to request a password reset.</p>
                    <div class="formGroup">
                        <input type="email" class="formControl"
                               id="passwordResetEmail"
                               placeholder="Email Address" required>
                    </div>
                    <div class="formGroup">
                        <input type="submit" class="btn btnPrimary" value="Reset Password"
                               onclick="passwordReset()">
                    </div>
                </div>
                <div class="redirectToLogin">
                    <span>Go back to ? <span class="redirect" onclick="navigateToLogin()">Log In</span></span>
                </div>
            </div>
        </div>
    `;
}

// Fonction de réinitialisation de mot de passe (simulation)
function passwordReset() {
    const email = document.getElementById("passwordResetEmail").value;
    if (email) {
        alert(`A password reset link has been sent to ${email}`);
    } else {
        alert("Please enter a valid email address.");
    }
}

// Redirection vers la page de connexion
function navigateToLogin() {
    window.location.hash = "sign-in";
}
 
