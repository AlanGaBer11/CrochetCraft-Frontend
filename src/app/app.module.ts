import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

/* ANGULAR MATERIAL */
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// ANIMACIONES
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/* NOTIFICACIONES TOAST */
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

/* reCAPTCHA */
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* COMPONENTES */
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';

/* PÁGINAS */
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

/* TEST */
import { Test01Component } from './test/test01/test01.component';
import { Test02Component } from './test/test02/test02.component';

/* CATALOGOS */
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CatalogoFloresComponent } from './pages/catalogos/catalogo-flores/catalogo-flores.component';
import { CatalogoAmigurumisComponent } from './pages/catalogos/catalogo-amigurumis/catalogo-amigurumis.component';
import { CatalogoLlaverosComponent } from './pages/catalogos/catalogo-llaveros/catalogo-llaveros.component';
import { CatalogoRopaComponent } from './pages/catalogos/catalogo-ropa/catalogo-ropa.component';
import { ProductoComponent } from './components/producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    Test01Component,
    Test02Component,
    HomeComponent,
    AuthComponent,
    CategoriasComponent,
    CatalogoComponent,
    CatalogoFloresComponent,
    CatalogoAmigurumisComponent,
    CatalogoLlaverosComponent,
    CatalogoRopaComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxCaptchaModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHotToastConfig(),
    provideRouter([], withViewTransitions()),
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
