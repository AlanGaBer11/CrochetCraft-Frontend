import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-catalogo-flores',
  standalone: false,
  templateUrl: './catalogo-flores.component.html',
  styleUrl: './catalogo-flores.component.css',
})
export class CatalogoFloresComponent implements OnInit {
  floresProductos: any[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.cargaProductos();
  }

  // OBTENER PRODUCTOS POR CATEGORÍA
  cargaProductos(): void {
    this.cargando = true;
    this.productService.getProductsByCategory('Flores').subscribe({
      next: (respuesta) => {
        if (respuesta.success) {
          this.floresProductos = respuesta.products;
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
