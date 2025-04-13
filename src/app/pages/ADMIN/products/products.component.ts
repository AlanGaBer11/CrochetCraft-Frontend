import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast/toast.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  selectedProductId: string = '';
  cargando: boolean = true;
  error: string | null = null;
  editProductForm: FormGroup;
  showEditModal: boolean = false;

  constructor(
    private readonly productService: ProductService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder
  ) {
    this.editProductForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      urlImagen: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  // OBTENER TODOS LOS PRODUCTOS
  getProducts(): void {
    this.cargando = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.cargando = false;
      },
      error: (err) => {
        this.error =
          'Error al cargar los productos: ' +
          (err.message || 'Error desconocido');
        this.cargando = false;
        this.toast.showError(this.error);
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }

  // ABRIR MODAL DE EDICIÓN
  openEditModal(product: any): void {
    this.selectedProductId = product._id;
    this.editProductForm.patchValue({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoria: product.categoria,
      urlImagen: product.urlImagen,
    });
    this.showEditModal = true;
  }

  // CERRAR MODAL
  closeModal(): void {
    this.showEditModal = false;
    this.selectedProductId = '';
    this.editProductForm.reset();
  }

  // CERRAR MODAL AL HACER CLIC EN EL OVERLAY
  closeModalOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // ENVIAR ACTUALIZACIÓN DE PRODUCTO
  submitUpdate(): void {
    if (this.editProductForm.invalid) {
      this.editProductForm.markAllAsTouched();
      return;
    }

    this.updateProduct(this.selectedProductId);
  }

  // ACTUALIZAR UN PRODUCTO
  updateProduct(id: string): void {
    if (!id) return;

    this.cargando = true;
    const productData = this.editProductForm.value;

    this.productService
      .updateProduct(id, productData)
      .pipe(
        this.toast.observe({
          loading: 'Actualizando Producto...',
          success: 'Producto Actualizado Con Éxito',
          error: 'Error Al Actualizar El Producto',
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.getProducts();
            this.closeModal();
          } else {
            this.error = res.message || 'Error Al Actualizar El Producto';
          }
          this.cargando = false;
        },
        error: (err) => {
          this.error =
            'Error Al Actualizar El Producto: ' +
            (err.message || 'Error Desconocido');
          this.cargando = false;
        },
      });
  }

  // ELIMINAR UN PRODUCTO
  deleteProduct(id: string, nombre: string): void {
    if (
      confirm(`¿Estás Seguro De Que Deseas Eliminar El Producto ${nombre}?`)
    ) {
      this.cargando = true;

      this.productService
        .deleteProduct(id)
        .pipe(
          this.toast.observe({
            loading: 'Eliminando Producto...',
            success: 'Producto Eliminado Con Éxito',
            error: 'No Se Pudo Eliminar El Producto',
            delayMs: 2000,
          })
        )
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.getProducts();
            } else {
              this.error = res.message;
            }
            this.cargando = false;
          },
          error: (err) => {
            this.error = err.message;
            this.cargando = false;
          },
        });
    }
  }
}
