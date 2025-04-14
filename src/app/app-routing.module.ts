import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* COMPONENTES */
import { AuthComponent } from './components/auth/auth.component';

/* PÁGINAS PRINCIPALES */
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductosComponent } from '../app/pages/productos/productos.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

/* CATALOGOS */
import { CatalogoFloresComponent } from './pages/catalogos/catalogo-flores/catalogo-flores.component';
import { CatalogoAmigurumisComponent } from './pages/catalogos/catalogo-amigurumis/catalogo-amigurumis.component';
import { CatalogoLlaverosComponent } from './pages/catalogos/catalogo-llaveros/catalogo-llaveros.component';
import { CatalogoRopaComponent } from './pages/catalogos/catalogo-ropa/catalogo-ropa.component';

/* ADMIN DASHBOARD Y COMPONENTES */
import { DashboardComponent } from './pages/ADMIN/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/ADMIN/usuarios/usuarios.component';
import { ProductsComponent } from './pages/ADMIN/products/products.component';
import { VentasComponent } from './pages/ADMIN/ventas/ventas.component';
import { ResenasComponent } from './pages/ADMIN/resenas/resenas.component';

/* GUARDS */
import { AdminGuard } from './guards/admin.guard';

/* PÁGINAS DE ERROR */
import { Error404Component } from './pages/error/error404/error404.component';
import { Error403Component } from './pages/error/error403/error403.component';

const routes: Routes = [
  /* RUTAS PRINCIPALES */
  { path: 'inicio', component: HomeComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },

  /* AUTENTICACIÓN */
  { path: 'auth', component: AuthComponent },

  /* CATALOGOS DE PRODUCTOS */
  { path: 'flores', component: CatalogoFloresComponent },
  { path: 'amigurumis', component: CatalogoAmigurumisComponent },
  { path: 'llaveros', component: CatalogoLlaverosComponent },
  { path: 'ropa', component: CatalogoRopaComponent },

  /* DETALLES DE PRODUCTOS */
  { path: 'flores/:nombre', component: ProductosComponent },
  { path: 'amigurumis/:nombre', component: ProductosComponent },
  { path: 'llaveros/:nombre', component: ProductosComponent },
  { path: 'ropa/:nombre', component: ProductosComponent },

  /* PÁGINAS DE ERROR */
  { path: 'pagina404', component: Error404Component },
  { path: 'pagina403', component: Error403Component },

  /* DASHBOARD DE ADMINISTRACIÓN */
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'reseñas', component: ResenasComponent },
    ],
  },

  /* RUTAS NO ENCONTRADAS */
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      errorHandler: (error: any) => {
        console.error('Router error:', error);
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
