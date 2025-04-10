import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  isLoggedIn = false;
  nombre: string = '';
  email: string = '';
  orders: any[] = [];
  expandedOrders: string[] = [];
  loadingOrders: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.getOrders();
  }

  // OBTENER ORDENES DEL USUARIO
  getOrders(): void {
    this.loadingOrders = true;
    this.orderService.getOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.orders;
        } else {
          console.error('Error al obtener las ordenes:', res.message);
        }
        this.loadingOrders = false;
      },
      error: (err) => {
        console.error('Error al obtener las ordenes:', err);
        this.loadingOrders = false;
      },
    });
  }

  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const userData = this.authService.getUserData();
      const userDataStr = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userData='));

      if (userDataStr) {
        try {
          const parsedUserData = JSON.parse(
            decodeURIComponent(userDataStr.split('=')[1])
          );
          this.nombre = parsedUserData.nombre || '';
          this.email = parsedUserData.email || '';
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }

  toggleDetails(orderId: string): void {
    const index = this.expandedOrders.indexOf(orderId);
    if (index > -1) {
      this.expandedOrders.splice(index, 1); // Oculta si ya está expandido
    } else {
      this.expandedOrders.push(orderId); // Muestra si no está expandido
    }
  }

  isExpanded(orderId: string): boolean {
    return this.expandedOrders.includes(orderId);
  }
}
