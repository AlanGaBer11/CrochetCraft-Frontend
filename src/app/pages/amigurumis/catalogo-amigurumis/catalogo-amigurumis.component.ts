import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo-amigurumis',
  standalone: false,
  templateUrl: './catalogo-amigurumis.component.html',
  styleUrl: './catalogo-amigurumis.component.css',
})
export class CatalogoAmigurumisComponent {
  amigurumisProductos = [
    {
      nombre: 'Amigurumi 1',
      precio: '100',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Amigurumi 2',
      precio: '200',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Amigurumi 3',
      precio: '300',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Amigurumi 4',
      precio: '400',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Amigurumi 5',
      precio: '500',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Amigurumi 6',
      precio: '500',
      urlImagenes: 'assets/img/3.jpeg',
    },
  ];
}
