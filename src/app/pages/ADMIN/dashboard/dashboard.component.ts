import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isLoggedIn = false;
  nombre: string = '';
  seccionActiva = 'usuarios'; // por defecto

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }
  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const userDataStr = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userData='));

      if (userDataStr) {
        try {
          const parsedUserData = JSON.parse(
            decodeURIComponent(userDataStr.split('=')[1])
          );
          this.nombre = parsedUserData.nombre || '';
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}
