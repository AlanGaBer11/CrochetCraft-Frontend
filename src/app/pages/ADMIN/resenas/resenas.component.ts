import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review/review.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-resenas',
  standalone: false,
  templateUrl: './resenas.component.html',
  styleUrl: './resenas.component.css',
})
export class ResenasComponent implements OnInit {
  categorias: string[] = ['Flores', 'Amigurumis', 'Llaveros', 'Ropa'];
  resenasPorCategoria: { [categoria: string]: any[] } = {};
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly toast: ToastService
  ) {
    // Initialize resenasPorCategoria with empty arrays for each category
    this.categorias.forEach((categoria) => {
      this.resenasPorCategoria[categoria] = [];
    });
  }

  ngOnInit(): void {
    this.getAllReviewsByCategory();
  }

  getAllReviewsByCategory(): void {
    this.cargando = true;
    this.error = null;

    const peticiones = this.categorias.map((categoria) =>
      this.reviewService.getReviewsByProductCategory(categoria).toPromise()
    );

    Promise.allSettled(peticiones).then((resultados) => {
      resultados.forEach((resultado, index) => {
        const categoria = this.categorias[index];

        if (resultado.status === 'fulfilled') {
          const reseñas = resultado.value.reviews;
          const formateadas: any[] = [];

          reseñas.forEach((review: any) => {
            review.items.forEach((item: any) => {
              formateadas.push({
                userId: review.userId,
                item: {
                  ...item,
                  _id: item._id || review._id,
                },
              });
            });
          });

          this.resenasPorCategoria[categoria] = formateadas;
        } else {
          this.toast.showError(`Error en la categoría "${categoria}"`);
        }
      });

      this.cargando = false;
    });
  }

  // ELIMINAR UNA RESEÑA
  deleteResena(id: string): void {
    if (!id) {
      this.toast.showError('ID de reseña no válido');
      return;
    }

    if (confirm('¿Estás Seguro De Que Deseas Eliminar La Reseña?')) {
      this.cargando = true;
      console.log('Intentando eliminar reseña con ID:', id);

      this.reviewService
        .deleteReview(id)
        .pipe(
          this.toast.observe({
            loading: 'Eliminando Reseña...',
            success: 'Reseña Eliminada Con Éxito',
            error: 'No Se Pudo Eliminar la Reseña',
            delayMs: 2000,
          })
        )
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.getAllReviewsByCategory();
            } else {
              this.error = res.message || 'Error al eliminar la reseña';
              console.error('Error en la respuesta:', res);
            }
            this.cargando = false;
          },
          error: (err) => {
            console.error('Error completo:', err);

            // Check if this is a 404 error, which indicates wrong endpoint
            if (err.status === 404) {
              // Try an alternative deletion method by modifying the review structure
              this.tryAlternativeDelete(id);
            } else {
              this.error = `Error: ${err.status} - ${
                err.message || 'Error desconocido'
              }`;
              this.cargando = false;
            }
          },
        });
    }
  }

  // Alternative method to try a different approach if the first one fails
  tryAlternativeDelete(itemId: string): void {
    // First, find which review contains this item
    let reviewId: string | null = null;
    let foundCategory: string | null = null;

    // Search through all categories to find the review containing this item
    for (const categoria of this.categorias) {
      const review = this.resenasPorCategoria[categoria].find(
        (r) => r.item._id === itemId
      );

      if (review) {
        // If we found a review with this item ID, try using the parent review ID
        reviewId = review.userId?._id;
        foundCategory = categoria;
        break;
      }
    }

    if (reviewId) {
      console.log('Intentando eliminar con ID de review principal:', reviewId);

      // Try with the parent review ID instead of the item ID
      this.reviewService.deleteReview(reviewId).subscribe({
        next: (res) => {
          if (res.success) {
            this.getAllReviewsByCategory();
            this.toast.showSuccess('Reseña Eliminada Con Éxito');
          } else {
            this.error = res.message || 'Error al eliminar la reseña';
            this.toast.showError('No Se Pudo Eliminar la Reseña');
          }
          this.cargando = false;
        },
        error: (err) => {
          this.error = `Error: ${err.status} - ${
            err.message || 'Error desconocido'
          }`;
          this.toast.showError('No Se Pudo Eliminar la Reseña');
          this.cargando = false;
        },
      });
    } else {
      this.error = 'No se pudo encontrar la reseña principal para este ítem';
      this.toast.showError('No Se Pudo Eliminar la Reseña');
      this.cargando = false;
    }
  }
}
