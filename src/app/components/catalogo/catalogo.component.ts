import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  @Input() categoria: string = '';
  @Input() products: any[] = [];
}
