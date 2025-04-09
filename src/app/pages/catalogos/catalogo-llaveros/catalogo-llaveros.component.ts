import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
@Component({
  selector: 'app-catalogo-llaveros',
  standalone: false,
  templateUrl: './catalogo-llaveros.component.html',
  styleUrl: './catalogo-llaveros.component.css',
})
export class CatalogoLlaverosComponent {
  llaverosProductos: any[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.cargaProductos();
  }

  // OBTENER PRODUCTOS POR CATEGORÍA
  cargaProductos(): void {
    this.cargando = true;
    this.productService.getProductsByCategory('Llaveros').subscribe({
      next: (respuesta) => {
        if (respuesta.success) {
          this.llaverosProductos = respuesta.products;
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
