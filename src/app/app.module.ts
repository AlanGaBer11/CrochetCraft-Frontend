import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

/* ANGULAR MATERIAL */
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/* ANIMACIONES */
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/* NOTIFICACIONES TOAST */
import { provideHotToastConfig } from '@ngxpert/hot-toast';

/* FORMULARIOS */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* HTTP Y AUTENTICACIÓN */
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

/* reCAPTCHA */
import { NgxCaptchaModule } from 'ngx-captcha';

/* MÓDULO DE RUTAS Y COMPONENTE PRINCIPAL */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* COMPONENTES COMUNES */
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

/* PÁGINAS PRINCIPALES */
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

/* PÁGINAS DE ERROR */
import { Error404Component } from './pages/error/error404/error404.component';
import { Error403Component } from './pages/error/error403/error403.component';

/* CATÁLOGOS DE PRODUCTOS */
import { CatalogoFloresComponent } from './pages/catalogos/catalogo-flores/catalogo-flores.component';
import { CatalogoAmigurumisComponent } from './pages/catalogos/catalogo-amigurumis/catalogo-amigurumis.component';
import { CatalogoLlaverosComponent } from './pages/catalogos/catalogo-llaveros/catalogo-llaveros.component';
import { CatalogoRopaComponent } from './pages/catalogos/catalogo-ropa/catalogo-ropa.component';

/* COMPONENTES DE ADMINISTRACIÓN */
import { DashboardComponent } from './pages/ADMIN/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/ADMIN/usuarios/usuarios.component';
import { VentasComponent } from './pages/ADMIN/ventas/ventas.component';
import { ResenasComponent } from './pages/ADMIN/resenas/resenas.component';
import { ProductsComponent } from './pages/ADMIN/products/products.component';

@NgModule({
  declarations: [
    /* COMPONENTE PRINCIPAL */
    AppComponent,

    /* COMPONENTES COMUNES */
    NavBarComponent,
    FooterComponent,
    AuthComponent,
    CatalogoComponent,

    /* PÁGINAS PRINCIPALES */
    HomeComponent,
    CategoriasComponent,
    ProductosComponent,
    ContactoComponent,
    PerfilComponent,
    CartComponent,
    CheckoutComponent,

    /* CATÁLOGOS DE PRODUCTOS */
    CatalogoFloresComponent,
    CatalogoAmigurumisComponent,
    CatalogoLlaverosComponent,
    CatalogoRopaComponent,

    /* PÁGINAS DE ERROR */
    Error404Component,
    Error403Component,

    /* COMPONENTES DE ADMINISTRACIÓN */
    DashboardComponent,
    UsuariosComponent,
    VentasComponent,
    ResenasComponent,
    ProductsComponent,
  ],
  imports: [
    /* MÓDULOS CORE */
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

    /* FORMULARIOS */
    FormsModule,
    ReactiveFormsModule,

    /* ANGULAR MATERIAL */
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

    /* OTROS MÓDULOS */
    NgxCaptchaModule,
  ],
  providers: [
    /* ANIMACIONES Y ROUTER */
    provideAnimationsAsync(),
    provideHotToastConfig(),
    provideRouter([], withViewTransitions()),

    /* SERVICIOS E INTERCEPTORES */
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
