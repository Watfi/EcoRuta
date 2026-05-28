import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pillar {
  title: string;
  badge: string;
  desc: string;
  emoji: string;
  colorClass: string;
  bgClass: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pilares" class="py-24 bg-[#EBE7DF] relative z-10 px-6 md:px-16 overflow-hidden">
      <!-- Decorative background plant vector effect -->
      <div class="absolute -left-24 top-1/4 w-96 h-96 rounded-full bg-brand-green-light/5 blur-3xl -z-10"></div>
      <div class="absolute -right-24 bottom-1/4 w-96 h-96 rounded-full bg-brand-sage/10 blur-3xl -z-10"></div>

      <div class="max-w-6xl w-full mx-auto">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20">
          <div class="max-w-xl space-y-4">
            <span class="text-brand-green-light font-sans font-bold text-sm uppercase tracking-widest">Nuestros Pilares</span>
            <h2 class="font-serif text-4xl md:text-5xl font-black text-brand-green-dark leading-tight">
              Los Pilares de la Sostenibilidad
            </h2>
            <div class="h-[3px] w-20 bg-brand-green-light rounded-full"></div>
          </div>
          <p class="font-sans text-brand-brown/75 max-w-lg text-base md:text-lg">
            A través de estas tres áreas de enfoque estratégico de la primera infografía de EcoRuta, logramos impactos reales que combaten directamente el cambio climático y restauran el ecosistema.
          </p>
        </div>

        <!-- Pillar Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          @for (pillar of pillars(); track pillar.title) {
            <div class="bg-white/80 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between group hover:bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <div class="space-y-6">
                <!-- Icon & Badge header -->
                <div class="flex justify-between items-center">
                  <div
                    class="text-4xl transition-transform duration-300 group-hover:scale-110"
                  >
                    {{ pillar.emoji }}
                  </div>
                  <span class="px-4 py-1.5 rounded-full font-sans font-bold text-xs bg-brand-cream text-brand-brown border border-brand-sage/20 shadow-sm uppercase tracking-wider">
                    {{ pillar.badge }}
                  </span>
                </div>

                <!-- Content -->
                <div class="space-y-4">
                  <h3 class="font-serif text-2xl md:text-3xl font-bold text-brand-green-dark">
                    {{ pillar.title }}
                  </h3>
                  <p class="font-sans text-brand-brown/80 leading-relaxed text-sm md:text-base">
                    {{ pillar.desc }}
                  </p>
                </div>
              </div>

              <!-- Interactive leaf decoration at bottom of card -->
              <div class="pt-8 border-t border-brand-sage/10 mt-6 flex justify-between items-center text-xs font-sans text-brand-brown/60">
                <span>Acción Directa</span>
                <svg class="w-5 h-5 text-brand-sage group-hover:text-brand-green-light group-hover:scale-125 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.04,18.7C10.74,16.38 14.88,14 17.65,11.8C20.67,9.4 22,6.5 22,3C19.5,3.5 17.5,4.5 15,6.5C12.5,8.5 10.5,11.5 10.5,11.5C10.5,11.5 14,8.5 17,8Z"></path>
                </svg>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class DetailsComponent {
  protected readonly pillars = signal<Pillar[]>([
    {
      title: 'Planta y cuida árboles',
      badge: 'Reforestación',
      desc: 'Los árboles nos brindan el oxígeno que respiramos, actúan directamente contra el calentamiento global, capturan carbono y purifican el aire de nuestras ciudades de forma constante.',
      emoji: '🌳',
      colorClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50'
    },
    {
      title: 'Reducir, reutilizar y reciclar',
      badge: 'Las 3R',
      desc: 'Las 3R ayudan de forma activa a tirar menos basura a los vertederos, ahorrar valiosos recursos naturales y energéticos y convertirnos en consumidores conscientes y responsables.',
      emoji: '🔄',
      colorClass: 'text-brand-green-light',
      bgClass: 'bg-green-50'
    },
    {
      title: 'Ahorrar energía',
      badge: 'Eficiencia',
      desc: 'Ahorrar energía ayuda activamente a reducir la contaminación ambiental y a mitigar el calentamiento continuo de la atmósfera. Al ahorrar energía en casa, también ahorramos dinero de forma inteligente.',
      emoji: '⚡',
      colorClass: 'text-yellow-600',
      bgClass: 'bg-yellow-50'
    }
  ]);
}
