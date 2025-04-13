import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent implements OnInit {
  orders: any[] = [];
  expandedOrders: string[] = [];

  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private readonly orderService: OrderService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.cargando = true;
    this.error = null;
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.orders;
        this.cargando = false;
      },
      error: (err) => {
        this.error =
          'Error Al Cargar Las Ordenes: ' +
          (err.message || 'Error Desconocido');
        this.cargando = false;
        this.toast.showError(this.error);
      },
      complete: () => {
        this.cargando = false;
      },
    });
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
