import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portafolio-abel';

  isMenuOpen = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.generateParticles();
  }

  // Método para hacer scroll suave a una sección
  scrollToSection(section: string): void {
    console.log('Sección:', section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  generateParticles() {
    const particleContainer = this.renderer.selectRootElement(
      '#particles',
      true
    );
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'particle');
      this.renderer.setStyle(particle, 'top', `${Math.random() * 100}vh`);
      this.renderer.setStyle(particle, 'left', `${Math.random() * 100}vw`);
      this.renderer.setStyle(particle, 'width', `${Math.random() * 5 + 2}px`);
      this.renderer.setStyle(particle, 'height', `${Math.random() * 5 + 2}px`);
      this.renderer.setStyle(
        particle,
        'animationDuration',
        `${Math.random() * 10 + 5}s`
      );
      this.renderer.appendChild(particleContainer, particle);
    }
  }

  // Método para alternar el menú en pantallas pequeñas
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden', !this.isMenuOpen);
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
