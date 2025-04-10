import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* PÁGINAS */
import { HomeComponent } from './pages/home/home.component';

/* TEST */
import { Test01Component } from './test/test01/test01.component';
import { Test02Component } from './test/test02/test02.component';
import { AuthComponent } from './components/auth/auth.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CatalogoFloresComponent } from './pages/catalogos/catalogo-flores/catalogo-flores.component';
import { CatalogoAmigurumisComponent } from './pages/catalogos/catalogo-amigurumis/catalogo-amigurumis.component';
import { CatalogoLlaverosComponent } from './pages/catalogos/catalogo-llaveros/catalogo-llaveros.component';
import { CatalogoRopaComponent } from './pages/catalogos/catalogo-ropa/catalogo-ropa.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  /* RUTAS NO ENCONTRADAS */
  /* { path: '**', redirectTo: 'inicio' }, */

  { path: 'categorias', component: CategoriasComponent },

  /* PRUEBAS */
  { path: 'test01', component: Test01Component },
  { path: 'test02', component: Test02Component },
  /* { path: 'producto', component: ProductoComponent }, */

  { path: 'auth', component: AuthComponent },
  /* CATALOGOS */
  { path: 'flores', component: CatalogoFloresComponent },
  { path: 'amigurumis', component: CatalogoAmigurumisComponent },
  { path: 'llaveros', component: CatalogoLlaverosComponent },
  { path: 'ropa', component: CatalogoRopaComponent },
  /* PRODUCTOS */
  { path: 'flores/:nombre', component: ProductoComponent },
  { path: 'amigurumis/:nombre', component: ProductoComponent },
  { path: 'llaveros/:nombre', component: ProductoComponent },
  { path: 'ropa/:nombre', component: ProductoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
