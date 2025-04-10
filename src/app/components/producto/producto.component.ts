import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { ReviewService } from '../../services/review/review.service'; // Agregar esta importación

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  isModalOpen = false;
  reviewForm: FormGroup;
  isLoading = true;
  error = '';
  reviews: any[] = [];

  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() precio: number = 0;
  @Input() stock: number = 0;
  @Input() categoria: string = '';
  @Input() urlImagen: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      comentario: ['', Validators.required],
      calificacion: [
        0,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  ngOnInit(): void {
    // Obtener el nombre del producto desde la URL
    this.route.params.subscribe((params) => {
      const nombreProducto = params['nombre'];
      if (nombreProducto) {
        this.loadProductByName(nombreProducto);
      }
    });
  }

  loadProductByName(nombre: string): void {
    this.isLoading = true;

    this.productService.getProductByName(nombre).subscribe({
      next: (response) => {
        if (response.success && response.product) {
          const producto = response.product;

          // Actualizar propiedades
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.precio = producto.precio;
          this.stock = producto.stock;
          this.categoria = producto.categoria;
          this.urlImagen = producto.urlImagen;
          this.error = '';

          // Cargar las reseñas del producto
          this.loadReviewsByProductName(this.nombre);
        } else {
          this.error = 'Producto no encontrado';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el producto: ' + err.message;
        this.isLoading = false;
        console.error('Error cargando producto:', err);
      },
    });
  }

  // Método para cargar las reseñas por nombre de producto
  loadReviewsByProductName(nombreProducto: string): void {
    this.reviewService.getReviewsByProductName(nombreProducto).subscribe({
      next: (response) => {
        if (response.success && response.reviews) {
          this.reviews = response.reviews;
        } else {
          console.log('No se encontraron reseñas para este producto');
        }
      },
      error: (err) => {
        console.error('Error al cargar las reseñas:', err);
      },
    });
  }

  // MÉTODO PARA CREAR UNA RESEÑA DE UN PRODUCTO EN ESPECIFICO!
  createReview(): void {
    if (this.reviewForm.invalid) {
      this.toastService.showError('Por Favor Completa Todos Los Campos');
      return;
    }

    const reviewData = {
      nombre: this.nombre,
      calificacion: this.reviewForm.get('calificacion')?.value,
      comentario: this.reviewForm.get('comentario')?.value,
    };

    this.reviewService
      .createReview(reviewData)
      .pipe(
        this.toastService.observe({
          loading: 'Creando Reseña...',
          success: 'Reseña Creada Exitosamente',
          error: 'No Se Pudo Crear La Reseña',
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.closeModal();
            // Recargar las reseñas para mostrar la nueva
            this.loadReviewsByProductName(this.nombre);
          }
        },
        error: (err) => {
          console.error('Error Al Crear La Reseña:', err);
        },
      });
  }
  openModal() {
    // Verificar si el usuario está autenticado antes de abrir el modal
    if (!this.authService.isAuthenticated()) {
      this.toastService.showError('Debes iniciar sesión para crear una reseña');
      this.router.navigate(['/auth']);
      return;
    }

    // Precargar el nombre del producto en el formulario (ya no es necesario en el formulario)
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    this.reviewForm.reset(); // Limpiar el formulario al cerrar
  }

  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // Método público para verificar autenticación (para usar en el template)
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getStars(rating: number): number[] {
    // Redondear el rating a un entero
    const roundedRating = Math.floor(rating);
    return Array(roundedRating).fill(0);
  }

  // Método para calcular el promedio de calificaciones
  calculateAverageRating(): number {
    if (this.reviews.length === 0) {
      return 0;
    }

    // Sumar todas las calificaciones
    const sum = this.reviews.reduce((total, review) => {
      // Asegúrate de acceder correctamente a la calificación según tu estructura de datos
      return total + (review.items[0].calificacion || 0);
    }, 0);

    // Calcular el promedio y redondear a 1 decimal
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }
}
