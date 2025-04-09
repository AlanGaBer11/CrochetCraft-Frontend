import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  @Input() categoria: string = '';
  @Input() products: any[] = [];
  @Input() cargando: boolean = false;
  @Input() error: string | null = null;
  @Output() productCreated = new EventEmitter<void>();

  isModalOpen = false;
  productForm: FormGroup;

  constructor(
    private readonly productService: ProductService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      urlImagen: ['', Validators.required],
    });
  }

  // CREAR UN PRODUCTO
  createProduct() {
    if (this.productForm.invalid) {
      this.toastService.showError(
        'Por Favor Completa Todos Los Campos Del Formulario'
      );
      return; // Agregamos un return para evitar continuar con la ejecución
    }

    this.productService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showSuccess('Producto Creado Con Éxito');
          this.productForm.reset();
          this.closeModal();
          // Emitir evento para que el padre recargue los productos
          this.productCreated.emit();
        } else {
          this.toastService.showError('Error AL Crear El Producto');
        }
      },
      error: (err) => {
        console.error('Error al crear la reseña: ', err);
        // Verificar si es un error de autenticación
        if (err.status === 401) {
          this.toastService.showError(
            'Tu sesión ha expirado, por favor inicia sesión nuevamente'
          );
          this.authService.logout(); // Limpiar los datos de sesión expirados
          this.router.navigate(['/auth']);
        } else {
          this.toastService.showError('Error al conectar con el servidor');
        }
      },
    });
  }

  // OBTENER LOS PRODUCTOS

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    this.productForm.reset(); //Limpiar el formulario al cerrar
  }

  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
  formatPrice(price: number): string {
    return `$${price} MXN`;
  }
}
