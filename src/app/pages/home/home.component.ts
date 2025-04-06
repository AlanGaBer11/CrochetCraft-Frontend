import { Component } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';
import { ToastService } from '../../services/toast/toast.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isModalOpen = false;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder
  ) {}

  public resenas = [
    {
      img: '',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia',
    },
    {
      img: '',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia',
    },
    {
      img: '',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia',
    },
  ];

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
