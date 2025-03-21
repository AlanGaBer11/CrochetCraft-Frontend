import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo-flores',
  standalone: false,
  templateUrl: './catalogo-flores.component.html',
  styleUrl: './catalogo-flores.component.css',
})
export class CatalogoFloresComponent {
  floresProductos = [
    {
      nombre: 'Flor 1',
      precio: '100',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Flor 2',
      precio: '200',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Flor 3',
      precio: '300',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Flor 4',
      precio: '400',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Flor 5',
      precio: '500',
      urlImagenes: 'assets/img/3.jpeg',
    },
    {
      nombre: 'Flor 6',
      precio: '500',
      urlImagenes: 'assets/img/3.jpeg',
    },
  ];

  constructor() {}
}
