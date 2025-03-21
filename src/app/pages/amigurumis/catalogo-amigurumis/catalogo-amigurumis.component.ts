import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-catalogo-amigurumis',
  standalone: false,
  templateUrl: './catalogo-amigurumis.component.html',
  styleUrl: './catalogo-amigurumis.component.css',
})
export class CatalogoAmigurumisComponent implements OnInit {
  amigurumisProductos: any[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.cargaProductos();
  }

  // OBTENER PRODUCTOS POR CATEGORÍA
  cargaProductos(): void {
    this.cargando = true;
    this.productService.getProductsByCategory('Amigurumis').subscribe({
      next: (respuesta) => {
        if (respuesta.success) {
          this.amigurumisProductos = respuesta.products;
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
