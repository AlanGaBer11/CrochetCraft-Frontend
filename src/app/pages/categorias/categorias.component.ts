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
      img: 'assets/img/flores/kit3.webp',
      link: '/flores',
    },
    {
      titulo: 'Amigurumis',
      img: 'assets/img/amigurumis/vaca1.webp',
      link: '/amigurumis',
    },
    {
      titulo: 'Llaveros',
      img: 'assets/img/llaveros/llaveroGorra2.jpg',
      link: '/llaveros',
    },
    {
      titulo: 'Ropa',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpc_Xb1qsbCyf9zqSAhdr1-CxVij8o1XVjpQ&s',
      link: '/ropa',
    },
  ];
}
