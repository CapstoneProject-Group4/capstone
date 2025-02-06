function renderSignUp() {
    return `
        <div class="displayTable">
            <div class="displayTableCell">
                <div class="authBlock">
                    <h3>Sign Up</h3>
                    <form id="signupForm" onsubmit="register(event)">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="text" class="form-control" id="email">
                            <div id="emailError" class="alert alert-danger" style="display: none;">
                                Well formatted email is required.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" class="form-control" id="name">
                            <div id="nameError" class="alert alert-danger" style="display: none;">
                                A name must be provided.
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" id="password" required>
                                <div id="passwordError" class="alert alert-danger" style="display: none;">
                                    A Password is required.
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="pwconfirm">Confirm Password:</label>
                                <input type="password" class="form-control" id="pwconfirm" required>
                                <div id="confirmPasswordError" class="alert alert-danger" style="display: none;">
                                    A Confirmation Password is required.
                                </div>
                            </div>
                            <div id="passwordMismatch" class="alert alert-danger" style="display: none;">
                                The passwords do not match.
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success">Register</button>
                    </form>
                </div>
                <div class="redirectToLogin">
                    <span>Already have an account? 
                        <span class="redirect" onclick="navigateToSignIn()">Log In</span>
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Fonction de validation et d'inscription
function register(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("pwconfirm").value;

    let emailError = document.getElementById("emailError");
    let nameError = document.getElementById("nameError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");
    let passwordMismatch = document.getElementById("passwordMismatch");

    // Reset errors
    emailError.style.display = "none";
    nameError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    passwordMismatch.style.display = "none";

    let valid = true;

    if (!email.includes("@")) {
        emailError.style.display = "block";
        valid = false;
    }

    if (name.trim() === "") {
        nameError.style.display = "block";
        valid = false;
    }

    if (password === "") {
        passwordError.style.display = "block";
        valid = false;
    }

    if (confirmPassword === "") {
        confirmPasswordError.style.display = "block";
        valid = false;
    }

    if (password !== confirmPassword) {
        passwordMismatch.style.display = "block";
        valid = false;
    }

    if (valid) {
        alert(`Account created successfully for ${name} with email: ${email}`);
        window.location.hash = "sign-in";
    }
}

// Redirection vers la connexion
function navigateToSignIn() {
    window.location.hash = "sign-in";
}
 
