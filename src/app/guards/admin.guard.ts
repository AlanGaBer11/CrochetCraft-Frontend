import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is authenticated and has admin role
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    }

    // If not admin or not authenticated, redirect to login page
    this.router.navigate(['/pagina403'], {
      queryParams: {
        returnUrl: state.url,
        message: 'Acceso restringido - Se requiere permisos de administrador',
      },
    });
    return false;
  }
}
