import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* ANGULAR MATERIAL */
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

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
import { RosasComponent } from './pages/flores/rosas/rosas.component';
import { TulipanesComponent } from './pages/flores/tulipanes/tulipanes.component';
import { GirasolComponent } from './pages/flores/girasol/girasol.component';
import { CatalogoFloresComponent } from './pages/flores/catalogo-flores/catalogo-flores.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CatalogoAmigurumisComponent } from './pages/amigurumis/catalogo-amigurumis/catalogo-amigurumis.component';

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
    RosasComponent,
    TulipanesComponent,
    GirasolComponent,
    CatalogoFloresComponent,
    CatalogoComponent,
    CatalogoAmigurumisComponent,
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
  providers: [provideAnimationsAsync(), provideHotToastConfig()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
