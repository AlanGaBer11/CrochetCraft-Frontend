import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  public cards = [
    {
      titulo: 'Flores',
      img: 'assets/img/3.jpeg',
      link: '/test01',
    },
    {
      titulo: 'Amigurumis',
      img: 'assets/img/3.jpeg',
      link: '/test02',
    },
    {
      titulo: 'Llaveros',
      img: 'assets/img/3.jpeg',
      link: '/test01',
    },
    {
      titulo: 'Ropa',
      img: 'assets/img/3.jpeg',
      link: '/test02',
    },
  ];
}
