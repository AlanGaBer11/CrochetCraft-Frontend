import { Component } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';
import { ToastService } from '../../services/toast/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isModalOpen = false;
  cargando: boolean = true;
  error: string | null = null;
  reviews: any[] = [];
  // FORMULARIO
  reviewForm: FormGroup;
  // PRODUCTOS DISPONIBLES
  products: any[] = [];
  loadingProducts: boolean = false;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly productService: ProductService,
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      nombre: ['', Validators.required],
      comentario: ['', Validators.required],
      calificacion: [
        0,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  ngOnInit(): void {
    this.getReviews();
    this.getProducts();
  }

  // OBTENER REVIEWS
  getReviews(): void {
    this.cargando = true;
    this.reviewService.getReviews().subscribe({
      next: (res) => {
        if (res.success) {
          // Aplanar las reseñas desde `items`
          this.reviews = res.reviews.flatMap((review: any) =>
            review.items.map((item: any) => ({
              nombreUsuario: review.userId?.nombre || 'Anónimo',
              nombreProducto: item.nombre,
              categoria: item.categoria,
              calificacion: item.calificacion,
              comentario: item.comentario,
            }))
          );
        } else {
          this.error = 'No se pudieron cargar las reseñas';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar las reseñas: ', err);
        this.error = 'Error al conectar con el servidor';
        this.cargando = false;
      },
    });
  }

  // OBTENER PRODUCTOS
  getProducts(): void {
    this.loadingProducts = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products;
        } else {
          console.error('Error al cargar productos:', res.message);
        }
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loadingProducts = false;
      },
    });
  }

  // CREAR REVIEW
  createReview() {
    if (this.reviewForm.invalid) {
      this.toastService.showError(
        'Por Favor Completa El Formulario Correctamente'
      );
      return;
    }

    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.toastService.showError('Debes iniciar sesión para crear una reseña');
      this.router.navigate(['/auth']);
      return;
    }

    this.reviewService
      .createReview(this.reviewForm.value)
      .pipe(
        this.toastService.observe({
          loading: 'Creando Reseña...',
          success: 'Reseña Creada Con Éxito',
          error: 'No Se Pudo Crear La Reseña',
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.reviewForm.reset();
            this.closeModal();
            this.getReviews();
          } else {
            this.toastService.showError('No Se Pudo Crear La Reseña');
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

  images = [
    {
      nombre: 'Amigurumi Vaca',
      image: 'assets/img/amigurumis/vaca2.webp',
    },
    {
      nombre: 'Rosa de Crochet',
      image: 'assets/img/flores/rosa2.webp',
    },
    {
      nombre: 'Llavero de Gorra',
      image: 'assets/img/llaveros/llaveroGorra2.jpg',
    },
    {
      nombre: 'Amigurumi Kitty',
      image: 'assets/img/amigurumis/kitty1.webp',
    },
  ];

  openModal() {
    // Verificar si el usuario está autenticado antes de abrir el modal
    if (!this.authService.isAuthenticated()) {
      this.toastService.showError('Debes iniciar sesión para crear una reseña');
      this.router.navigate(['/auth']);
      return;
    }

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
}
