import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* PÁGINAS */
import { HomeComponent } from './pages/home/home.component';

/* TEST */
import { Test01Component } from './test/test01/test01.component';
import { Test02Component } from './test/test02/test02.component';
import { AuthComponent } from './components/auth/auth.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CatalogoFloresComponent } from './pages/flores/catalogo-flores/catalogo-flores.component';
import { CatalogoAmigurumisComponent } from './pages/amigurumis/catalogo-amigurumis/catalogo-amigurumis.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'categorias', component: CategoriasComponent },

  { path: 'test01', component: Test01Component },
  { path: 'test02', component: Test02Component },

  { path: 'auth', component: AuthComponent },
  { path: 'flores', component: CatalogoFloresComponent },
  { path: 'amigurumis', component: CatalogoAmigurumisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
