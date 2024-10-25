import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  user
} from "@angular/fire/auth";
import { Router } from '@angular/router'; // Import du Router
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afAuth: Auth = inject(Auth);
  private loggedUser: User | null = null;
  user$ = user(this.afAuth);
  userSubscription: Subscription;

  constructor(private router: Router) {  // Injecter le router ici
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.loggedUser = aUser;
    });
  }

  get userid(): string {
    if (this.loggedUser) return this.loggedUser.uid;
    return '';
  }

  signIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((credential) => {
        this.loggedUser = credential.user;
        this.router.navigate(['/home']); // Rediriger vers la page home après connexion
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
        throw error;
      });
  }

  signUp(email: string, password: string, name: string): Promise<void> {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((credential) => {
        const user = credential.user;
        this.loggedUser = credential.user;
        if (user) {
          return updateProfile(user, { displayName: name })
            .then(() => {
              this.router.navigate(['/home']); // Rediriger après inscription
            })
            .catch((error) => {
              console.error("Error updating profile: ", error);
              throw error;
            });
        } else {
          return Promise.resolve();
        }
      })
      .catch((error) => {
        console.error("Error during sign up: ", error);
        throw error;
      });
  }


  passwordReset(passwordResetEmail: string): Promise<void> {
    return sendPasswordResetEmail(this.afAuth, passwordResetEmail)
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        throw error; // Renvoyer l'erreur si nécessaire
      });
  }


  signOut(): Promise<void> {
    return signOut(this.afAuth)
      .then((_) => {
        this.loggedUser = null;
        this.router.navigate(['/login']); // Rediriger vers la page de login après déconnexion
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        throw error;
      });
  }
}