import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-catalogo-ropa',
  standalone: false,
  templateUrl: './catalogo-ropa.component.html',
  styleUrl: './catalogo-ropa.component.css',
})
export class CatalogoRopaComponent {
  ropaProductos: any[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.cargaProductos();
  }

  // OBTENER PRODUCTOS POR CATEGORÍA
  cargaProductos(): void {
    this.cargando = true;
    this.productService.getProductsByCategory('Ropa').subscribe({
      next: (respuesta) => {
        if (respuesta.success) {
          this.ropaProductos = respuesta.products;
        } else {
          this.error = 'No se pudieron cargar los productos';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los productos: ', err);
        this.error = 'Error al conectar con el servidor';
        this.cargando = false;
      },
    });
  }
}
