import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  nombre: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.nombre = this.authService.getUserName();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.nombre = null;
  }
}
