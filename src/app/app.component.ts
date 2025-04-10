import { Component, OnInit } from '@angular/core';
/* SWIPER js (CARRUSEL) */
import { register } from 'swiper/element/bundle';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAuthRoute = false;
  title = 'interface';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Verifica si la URL actual es la de autenticación
        this.isAuthRoute = event.url.includes('/auth');
      });
  }
}
