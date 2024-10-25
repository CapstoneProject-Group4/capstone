import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from '@angular/core';
import { User } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../authentication/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  get user(): Observable<User | null> {
    return this.authService.user$;
  }

  signOut(): void {
    this.authService.signOut().then((_) => {
      this.router.navigate(['sign-in']).then(() => {});
    });
  }
}