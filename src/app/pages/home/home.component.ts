import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  public resenas = [
    {
      img: '',
      comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia'
    },
    {
      img: '',
      comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia'
    },
    {
      img: '',
      comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem placeat atque natus, expedita consequatur, repellat unde cumque doloremque quo explica',
      nombre: 'Alan Garcia'
    },
  ]
}
