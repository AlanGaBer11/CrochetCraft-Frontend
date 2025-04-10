import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  faqs = [
    {
      pregunta: '¿Qué tipo de productos venden en CrochetCraft?',
      respuesta:
        'En CrochetCraft ofrecemos productos hechos a mano como flores de crochet, amigurumis, llaveros y ropa tejida. Todos están hechos con materiales de alta calidad y mucho amor.',
    },
    {
      pregunta: '¿Los productos están disponibles en diferentes colores?',
      respuesta:
        'Sí, muchos de nuestros productos están disponibles en distintos colores. Puedes seleccionar el color disponible dentro de la página del producto o contactarnos si buscas un color personalizado.',
    },
    {
      pregunta: '¿Cómo sé si un producto está disponible en stock?',
      respuesta:
        'Cada producto muestra su disponibilidad actual. Si un artículo está agotado, no se podrá añadir al carrito. También puedes suscribirte para recibir una alerta cuando vuelva a estar disponible.',
    },
    {
      pregunta: '¿Puedo personalizar un producto?',
      respuesta:
        '¡Claro! Aceptamos pedidos personalizados. Puedes contactarnos directamente por WhatsApp para discutir los detalles de tu diseño.',
    },
    {
      pregunta: '¿Qué materiales utilizan para los productos?',
      respuesta:
        'Utilizamos hilo 100% algodón o acrílico de alta calidad, además de rellenos hipoalergénicos para los amigurumis. Cada pieza está cuidadosamente elaborada para garantizar durabilidad y seguridad.',
    },
    {
      pregunta: '¿Cuánto tiempo tarda en llegar mi pedido?',
      respuesta:
        'El tiempo de entrega varía según tu ubicación. Generalmente, los pedidos se procesan en 1-2 días hábiles y el envío tarda entre 3 a 7 días. Recibirás un número de seguimiento una vez que tu pedido sea enviado.',
    },
    {
      pregunta: '¿Qué hago si mi producto llega dañado o incorrecto?',
      respuesta:
        'Si tu producto llega dañado o no es lo que pediste, contáctanos dentro de las primeras 48 horas. Estaremos encantados de ayudarte con una devolución o reposición sin costo adicional.',
    },
  ];

  toggleFaq(event: MouseEvent): void {
    // Obtener el botón que fue clickeado
    const button = event.currentTarget as HTMLButtonElement;
    // Obtener el elemento faq-item padre
    const faqItem = button.closest('.faq-item') as HTMLElement;

    if (faqItem) {
      // Toggle la clase 'active' en el elemento faq-item
      faqItem.classList.toggle('active');

      // Rotar el icono cuando está activo
      const icon = button.querySelector('i');
      if (icon) {
        if (faqItem.classList.contains('active')) {
          icon.classList.replace(
            'fi-rr-angle-small-down',
            'fi-rr-angle-small-up'
          );
        } else {
          icon.classList.replace(
            'fi-rr-angle-small-up',
            'fi-rr-angle-small-down'
          );
        }
      }
    }
  }
}
