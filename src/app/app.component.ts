import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portafolio-abel';

  // Método para hacer scroll suave a una sección
  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      // Desplazamiento suave usando window.scrollTo con 'behavior: smooth'
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  }

  sendEmail(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    console.log('El botón ha sido presionado');

    emailjs
      .sendForm(
        'service_kei7ryw',
        'template_5wmk3mf',
        event.target as HTMLFormElement,
        'i4ah15RDfSQJHtdmX'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          alert('Mensaje enviado exitosamente!');
        },
        (error) => {
          console.error(error.text);
          alert('Error al enviar el mensaje. Inténtalo nuevamente.');
        }
      );
  }
}
