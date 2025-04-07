import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isSignUpMode: boolean = false;
  showPassword: boolean = false;
  isFormValid: boolean = false;
  isLoading: boolean = false;
  //FORMULARIOS
  registerForm: FormGroup;
  loginForm: FormGroup;

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        recaptcha: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      /* recaptcha: ['', Validators.required], */
    });
  }

  ngOnInit() {
    // Monitor login form validity
    this.loginForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }

  // Método para registrar usuario
  register() {
    if (this.registerForm.invalid) {
      this.toastService.showError(
        'Por Favor, Completa El Formulario Correctamente.'
      );
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastService.showSuccess(
          'Bienvenido A CrochetCraft, Te Acabas de Registrar Con Exito'
        );
        console.log(res); // QUITAR EN PROD
        this.registerForm.reset();
      },
      error: (err) => {
        this.toastService.showError('Error En El Registro');
        console.error('Error' + err.error.message); // QUITAR EN PROD
      },
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastService.showError(
        'Por Favor, Ingresa Un Correo Y Contraseña Válidos.'
      );
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res?.token && res?.user) {
          this.authService.saveToken(res.token, res.user);
          this.loginForm.reset();
          this.toastService.showSuccess(
            `Bienvenido de nuevo, ${res.user.nombre}`
          );
          this.router.navigate(['/inicio']);
        } else {
          this.toastService.showError('Respuesta Del Servidor Inválida');
        }
      },
      error: (err) => {
        // El resto del código de manejo de errores permanece igual
        if (err.status === 401) {
          this.toastService.showError(
            'Correo Electrónico O Contraseña Incorrectos'
          );
        } else if (err.status === 404) {
          this.toastService.showError('El Usuario No Existe');
        } else {
          const errorMessage =
            err.error?.message || 'Error Desconocido El Iniciar Sesión';
          this.toastService.showError(
            `Error Al Iniciar Sesión: ${errorMessage}`
          );
        }
        // Reset password field on error
        this.loginForm.get('password')?.reset();
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  toggleForm() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
