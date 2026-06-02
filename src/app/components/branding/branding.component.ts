import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ColorItem {
  hex: string;
  name: string;
  desc: string;
  textColor: string;
}

interface FontItem {
  name: string;
  role: string;
  sample: string;
  desc: string;
  fontClass: string;
}

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-[#F2ECE0] relative z-10 px-6 md:px-16 overflow-hidden border-t border-brand-sage/20">
      <!-- Decorative background blur -->
      <div class="absolute -right-24 top-1/4 w-96 h-96 rounded-full bg-brand-green-light/5 blur-3xl -z-10"></div>
      <div class="absolute -left-24 bottom-1/4 w-96 h-96 rounded-full bg-brand-sage/10 blur-3xl -z-10"></div>

      <div class="max-w-6xl w-full mx-auto space-y-20">
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto space-y-4">
          <span class="text-brand-green-light font-sans font-bold text-sm uppercase tracking-widest">Identidad del Proyecto</span>
          <h2 class="font-serif text-4xl md:text-5xl font-black text-brand-green-dark">
            Nuestra Identidad Visual
          </h2>
          <div class="h-[3px] w-24 bg-brand-green-light mx-auto rounded-full"></div>
          <p class="font-sans text-brand-brown/70 text-base md:text-lg">
            Conoce los fundamentos detrás de las decisiones de diseño de EcoRuta. Cada color y tipografía ha sido seleccionado minuciosamente para transmitir el mensaje y los valores de la conservación ecológica.
          </p>
        </div>

        <!-- Color Palette Grid -->
        <div class="space-y-8">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🎨</span>
            <h3 class="font-serif text-2xl md:text-3xl font-bold text-brand-green-dark">Paleta de Colores</h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (color of colors(); track color.hex) {
              <div class="bg-white/60 backdrop-blur-sm border border-white/40 rounded-[2rem] p-6 shadow-md hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 group">
                <!-- Color Box -->
                <div 
                  class="w-16 h-16 rounded-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300 border border-black/5"
                  [style.backgroundColor]="color.hex"
                ></div>
                <!-- Content -->
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2">
                    <h4 class="font-sans font-bold text-brand-green-dark text-base md:text-lg leading-tight">{{ color.name }}</h4>
                    <span class="font-mono text-xs text-brand-brown/50 bg-[#F7F5F0] px-2 py-0.5 rounded-md border border-brand-sage/10">{{ color.hex }}</span>
                  </div>
                  <p class="font-sans text-brand-brown/75 text-xs md:text-sm leading-relaxed">
                    {{ color.desc }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Typography Grid -->
        <div class="space-y-8 pt-8 border-t border-brand-sage/10">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✍️</span>
            <h3 class="font-serif text-2xl md:text-3xl font-bold text-brand-green-dark">Tipografías Utilizadas</h3>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            @for (font of typographies(); track font.name) {
              <div class="bg-white/60 backdrop-blur-sm border border-white/40 rounded-[2.5rem] p-8 md:p-10 shadow-md hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between gap-8 group">
                <div class="space-y-6">
                  <!-- Header -->
                  <div class="flex justify-between items-start">
                    <div class="space-y-1">
                      <h4 class="font-sans font-bold text-xl md:text-2xl text-brand-green-dark leading-tight">{{ font.name }}</h4>
                      <span class="inline-block px-3 py-1 rounded-full font-sans font-bold text-[10px] bg-brand-cream text-brand-green-light border border-brand-sage/20 uppercase tracking-widest">
                        {{ font.role }}
                      </span>
                    </div>
                  </div>

                  <!-- Typography Preview -->
                  <div class="bg-[#F7F5F0]/80 rounded-2xl p-6 border border-brand-sage/10 overflow-hidden flex items-center justify-center min-h-[140px] group-hover:bg-[#F7F5F0] transition-colors duration-300">
                    <span 
                      [class]="font.fontClass" 
                      class="text-4xl md:text-5xl lg:text-6xl text-brand-green-dark text-center select-none tracking-wide"
                    >
                      {{ font.sample }}
                    </span>
                  </div>

                  <p class="font-sans text-brand-brown/80 text-sm md:text-base leading-relaxed">
                    {{ font.desc }}
                  </p>
                </div>

                <!-- Footer Badge -->
                <div class="pt-4 border-t border-brand-sage/10 flex justify-between items-center text-xs font-sans text-brand-brown/50">
                  <span>Detalle de Fuente</span>
                  <span class="font-semibold uppercase tracking-wider text-[10px] text-brand-green-light">{{ font.name }} Family</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class BrandingComponent {
  protected readonly colors = signal<ColorItem[]>([
    {
      hex: '#3E5A2E',
      name: 'Verde Oscuro',
      desc: 'Representa la densidad de nuestros bosques, la vegetación madura y la fuerza de la naturaleza. Evoca estabilidad, crecimiento y la profundidad del compromiso ecológico de EcoRuta.',
      textColor: 'text-white'
    },
    {
      hex: '#78943C',
      name: 'Verde Oliva',
      desc: 'Simboliza la paz, la renovación y la adaptabilidad. Es el color de las hojas que interactúan con la luz del sol, conectando la tierra con la energía vital y la fotosíntesis.',
      textColor: 'text-white'
    },
    {
      hex: '#4B3B1F',
      name: 'Café Oscuro',
      desc: 'Representa la tierra fértil, el suelo que sostiene toda forma de vida. Aporta calidez, solidez y estabilidad, recordándonos nuestras raíces y el cuidado de los suelos orgánicos.',
      textColor: 'text-white'
    },
    {
      hex: '#EEDCB6',
      name: 'Beige',
      desc: 'Evoca la naturalidad, la arena, las fibras orgánicas biodegradables y el papel reciclado. Funciona como un lienzo limpio que transmite serenidad, sencillez y sustentabilidad.',
      textColor: 'text-brand-brown'
    },
    {
      hex: '#A8C5A0',
      name: 'Verde Claro',
      desc: 'Representa los brotes jóvenes, la esperanza del nacimiento de nuevas plantas y la frescura del aire limpio. Simboliza el inicio del cambio y la educación ambiental.',
      textColor: 'text-brand-brown'
    },
    {
      hex: '#F4C542',
      name: 'Amarillo',
      desc: 'Simboliza la energía solar, el optimismo y la luz que guía el camino hacia la sostenibilidad. Despierta la creatividad, la acción activa y el entusiasmo por reciclar.',
      textColor: 'text-brand-brown'
    }
  ]);

  protected readonly typographies = signal<FontItem[]>([
    {
      name: 'Brown Sugar',
      role: 'Títulos e Identidad',
      sample: 'Aa Bb Cc Ecoruta',
      desc: 'Una tipografía de títulos con curvas orgánicas y elegantes. Su estilo artístico y fluido conecta directamente con la naturaleza y las formas botánicas, aportando personalidad y distinción visual a la marca EcoRuta.',
      fontClass: 'font-serif' // Standard serif fallback style that can be mapped if needed, or styled in app.css
    },
    {
      name: 'Poppins',
      role: 'Textos y Lectura',
      sample: 'Aa Bb Cc Ecoruta',
      desc: 'Una tipografía geométrica sans-serif moderna, sumamente legible y limpia. Representa la claridad del mensaje educativo, la precisión técnica y la accesibilidad para que cualquier persona pueda comprender y unirse al movimiento.',
      fontClass: 'font-sans'
    }
  ]);
}
