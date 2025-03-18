import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isSignUpMode: boolean = false;
  showPassword: boolean = false;

  //! REMPLAZAR POR LA API DE REGISTER
  loginGroup: FormGroup = new FormGroup({});
  registerGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formLogin();
    this.formRegister();
  }

  formLogin() {
    this.loginGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required],
    });
  }

  formRegister() {
    this.registerGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required],
    });
  }

  toggleForm() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
