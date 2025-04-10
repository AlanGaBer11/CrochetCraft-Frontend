import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  nombre: string | null = null;
  private authSubscription!: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();

    // Suscribirse a los cambios del estado de autenticación
    this.authSubscription = this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        if (this.isLoggedIn) {
          this.nombre = this.authService.getUserName();
        } else {
          this.nombre = null;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.nombre = this.authService.getUserName();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
