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
    }
    this.authService
      .register(this.registerForm.value)
      .pipe(
        this.toastService.observe({
          loading: 'Registrando...',
          success: () =>
            'Bienvenido A CrochetCraft, Te Acabas de Registrar Con Exito',
          error: (err) => {
            if (err.status === 409)
              return 'El Correo Electrónico Ya Está Registrado';
            return 'Error En El Servidor. Inténtalo Más Tarde.';
          },
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.registerForm.reset();
            // CAMBIA AL FORMULARIO DE LOGIN
            this.isSignUpMode = false;
            // LLENAR EL EMAIL EN LOGIN
            this.loginForm.patchValue({ email: this.registerForm.value });
          }
        },
        error: (err) => {
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
    this.authService
      .login(this.loginForm.value)
      .pipe(
        this.toastService.observe({
          loading: 'Iniciando sesión...',
          success: (response) => `Bienvenido de nuevo, ${response.user.nombre}`,
          error: (err) => {
            if (err.status === 401)
              return 'Correo Electrónico O Contraseña Incorrectos';
            if (err.status === 404) return 'El Usuario No Existe';
            return 'Error En El Servidor. Inténtalo Más Tarde.';
          },
          delayMs: 2000,
        })
      )
      .subscribe({
        next: (res) => {
          if (res?.token && res?.user) {
            this.authService.saveToken(res.token, res.user);
            this.loginForm.reset();
            this.router.navigate(['/inicio']);
          }
        },
        error: (err) => {
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
