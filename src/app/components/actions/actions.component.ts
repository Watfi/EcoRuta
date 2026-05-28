import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EcoAction {
  num: number;
  title: string;
  desc: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="acciones" class="py-24 px-6 md:px-16 max-w-6xl w-full mx-auto relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span class="text-brand-green-light font-sans font-bold text-sm uppercase tracking-widest">Compromiso Diario</span>
        <h2 class="font-serif text-4xl md:text-5xl font-black text-brand-green-dark">
          5 Acciones para Cuidar Nuestro Planeta
        </h2>
        <div class="h-[3px] w-24 bg-brand-green-light mx-auto rounded-full"></div>
        <p class="font-sans text-brand-brown/70 text-base md:text-lg">
          Cada acción cuenta. Súmate a la ruta del cambio con estas cinco prácticas sencillas pero transformadoras. ¡Prueba nuestra simulación interactiva 2D más abajo para poner a prueba tu destreza!
        </p>
      </div>

      <!-- Interactive Grid of Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (action of actions(); track action.num) {
          <div 
            class="group relative bg-white rounded-3xl p-8 border border-brand-sage/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[320px] overflow-hidden"
          >
            <!-- Background Decorative Shape -->
            <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-brand-sage/5 group-hover:scale-150 transition-transform duration-700 -z-10"></div>
            
            <div class="space-y-6">
              <!-- Card Header: Number and Icon -->
              <div class="flex justify-between items-start">
                <span 
                  class="font-sans font-black text-4xl select-none"
                  [ngClass]="action.textColor"
                >
                  0{{ action.num }}
                </span>
                
                <!-- SVG Icon container -->
                <div 
                  class="p-4 rounded-2xl transition-colors duration-500 group-hover:scale-110"
                  [ngClass]="action.bgColor"
                >
                  <svg 
                    class="w-8 h-8" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" [attr.d]="action.icon"></path>
                  </svg>
                </div>
              </div>

              <!-- Title and Description -->
              <div class="space-y-3">
                <h3 class="font-sans font-bold text-2xl text-brand-green-dark group-hover:text-brand-green-light transition-colors duration-300">
                  {{ action.title }}
                </h3>
                <p class="font-sans text-brand-brown/80 leading-relaxed text-sm">
                  {{ action.desc }}
                </p>
              </div>
            </div>

            <!-- Scroll to Game Button -->
            <button 
              (click)="scrollToGame()"
              class="mt-6 w-full py-3 bg-brand-cream hover:bg-brand-green-light text-brand-green-dark hover:text-white font-sans font-bold text-xs uppercase tracking-wider rounded-2xl border border-brand-sage/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>Jugar Desafío 2D</span>
              <svg class="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
        }
      </div>

      <!-- Visual infographic helper element (infografia 2 link/display) -->
      <div class="mt-16 bg-[#1B4324] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-green-light/20 shadow-xl overflow-hidden relative">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(44,138,74,0.3),transparent_60%)]"></div>
        
        <div class="space-y-4 max-w-xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-light/20 border border-brand-green-light/30 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-brand-sage">
            🍃 COMPROMISO ECOLÓGICO
          </div>
          <h3 class="font-serif text-3xl md:text-4xl font-bold leading-tight">Cada acción cuenta, súmate a la ruta del cambio</h3>
          <p class="font-sans text-brand-sage text-sm md:text-base font-light">
            Nuestra misión es empoderar a cada individuo para que reconozca el valor de sus acciones. Menos plástico, más vida.
          </p>
        </div>

        <div class="shrink-0 relative z-10 w-full md:w-auto text-center flex flex-col sm:flex-row gap-4 justify-center">
          <button (click)="scrollToGame()" class="inline-block w-full md:w-auto bg-brand-green-light hover:bg-emerald-600 text-white font-sans font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
            ¡Jugar Desafío 2D!
          </button>
          <a href="#galeria" class="inline-block w-full md:w-auto bg-white hover:bg-brand-cream text-[#1B4324] font-sans font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
            Ver Infografía Completa
          </a>
        </div>
      </div>
    </section>
  `
})
export class ActionsComponent {
  protected readonly actions = signal<EcoAction[]>([
    {
      num: 1,
      title: 'Reduce',
      desc: 'Evita productos de un solo uso y elige opciones reutilizables en tu día a día para evitar la contaminación innecesaria.',
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      bgColor: 'bg-red-50 text-red-600',
      textColor: 'text-red-200'
    },
    {
      num: 2,
      title: 'Reusa',
      desc: 'Dale una segunda vida a los objetos antes de desecharlos. La creatividad puede transformar envases en herramientas útiles.',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18',
      bgColor: 'bg-amber-50 text-amber-600',
      textColor: 'text-amber-200'
    },
    {
      num: 3,
      title: 'Recicla',
      desc: 'Separa tus residuos correctamente (papel, plástico, vidrio, orgánicos) y permite que se transformen en nuevos productos útiles.',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18',
      bgColor: 'bg-green-50 text-brand-green-light',
      textColor: 'text-green-200'
    },
    {
      num: 4,
      title: 'Ahorra Recursos',
      desc: 'Cuida el agua, la energía eléctrica y los recursos naturales disponibles. Recuerda: cada gota y cada vatio cuentan para el mañana.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      bgColor: 'bg-blue-50 text-blue-600',
      textColor: 'text-blue-200'
    },
    {
      num: 5,
      title: 'Conecta con la Naturaleza',
      desc: 'Pasa tiempo al aire libre, siembra plantas en tu hogar y protege de forma activa y consciente los espacios naturales de tu comunidad.',
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z',
      bgColor: 'bg-teal-50 text-teal-600',
      textColor: 'text-teal-200'
    }
  ]);

  protected scrollToGame() {
    const el = document.getElementById('juego');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
