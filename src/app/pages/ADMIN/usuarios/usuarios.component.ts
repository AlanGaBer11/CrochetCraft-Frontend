import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  selectedUserId: string = '';
  cargando: boolean = true;
  error: string | null = null;
  editUserForm: FormGroup;
  showEditModal: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder
  ) {
    this.editUserForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  // OBTENER TODOS LOS USUARIOS
  getUsers(): void {
    this.cargando = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.cargando = false;
      },
      error: (err) => {
        this.error =
          'Error Al Cargar Los Usuarios: ' +
          (err.message || 'Error Desconocido');
        this.cargando = false;
        this.toast.showError(this.error);
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }

  // ABRIR MODAL DE EDICIÓN
  openEditModal(user: any): void {
    this.selectedUserId = user._id;
    this.editUserForm.patchValue({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol || 'CLIENTE',
    });
    this.showEditModal = true;
  }

  // CERRAR MODAL
  closeModal(): void {
    this.showEditModal = false;
    this.selectedUserId = '';
    this.editUserForm.reset();
  }

  // CERRAR MODAL AL HACER CLIC EN EL OVERLAY
  closeModalOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // ENVIAR ACTUALIZACIÓN DE USUARIO
  submitUpdate(): void {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }

    this.updateUser(this.selectedUserId);
  }

  // ACTUALIZAR UN USUARIO
  updateUser(id: string): void {
    if (!id) return;

    this.cargando = true;
    const userData = this.editUserForm.value;

    this.userService
      .updateUser(id, userData)
      .pipe(
        this.toast.observe({
          loading: 'Actualizando Usuario...',
          success: 'Usuario Actualizado Con Éxito',
          error: 'Error Al Actualizar El Usuario',
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.getUsers();
            this.closeModal();
          } else {
            this.error = res.message || 'Error Al Actualizar El Usuario';
          }
          this.cargando = false;
        },
        error: (err) => {
          this.error =
            'Error Al Actualizar El Usuario: ' +
            (err.message || 'Error Desconocido');
          this.cargando = false;
        },
      });
  }

  // ELIMINAR UN USUARIO
  deleteUser(id: string, nombre: string): void {
    if (confirm(`¿Estás Seguro De Que Deseas Eliminar Al Usuario ${nombre}?`)) {
      this.cargando = true;

      this.userService
        .deleteUser(id)
        .pipe(
          this.toast.observe({
            loading: 'Eliminando Usuario...',
            success: 'Usuario Eliminado Con Éxito',
            error: 'No Se Pudo Eliminar El Usuario',
            delayMs: 2000,
          })
        )
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.getUsers();
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
