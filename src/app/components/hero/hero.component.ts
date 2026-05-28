import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full min-h-screen flex flex-col justify-between relative z-10 px-6 py-6 md:px-16 md:py-8 overflow-hidden">
      <!-- Navigation Bar -->
      <nav class="flex justify-between items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-3xl border border-brand-sage/20 shadow-sm max-w-6xl w-full mx-auto animate-fade-in">
        <!-- Logo only (no text) -->
        <a href="#inicio" class="shrink-0">
          <img src="assets/marca.png" alt="EcoRuta Logo" class="h-9 md:h-10 w-auto hover:scale-105 transition-transform duration-300" />
        </a>

        <!-- Links — visible on all sizes, smaller on mobile -->
        <div class="flex items-center gap-2 sm:gap-5 md:gap-8 font-sans font-medium text-brand-brown text-[11px] sm:text-sm md:text-base">
          <a href="#inicio"    class="hover:text-brand-green-light transition-colors duration-200 whitespace-nowrap">Inicio</a>
          <a href="#acciones"  class="hover:text-brand-green-light transition-colors duration-200 whitespace-nowrap">5 Acciones</a>
          <a href="#pilares"   class="hover:text-brand-green-light transition-colors duration-200 whitespace-nowrap">Pilares</a>
          <a href="#galeria"   class="hover:text-brand-green-light transition-colors duration-200 whitespace-nowrap">Galería</a>
        </div>
      </nav>

      <!-- Hero Main Content -->
      <div id="inicio" class="flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full mx-auto my-12 relative">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left space-y-6 max-w-xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-green-light/10 text-brand-green-dark rounded-full font-sans font-semibold text-xs tracking-wider uppercase">
            🌱 CONCIENTIZACIÓN AMBIENTAL
          </div>
          
          <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-brand-green-dark leading-tight">
            Reciclar <br class="hidden lg:block"/>
            también es <br class="hidden lg:block"/>
            <span class="text-brand-green-light relative">
              cuidar
              <span class="absolute bottom-1 left-0 w-full h-3 bg-brand-sage/30 -z-10 rounded-full"></span>
            </span>
          </h1>

          <p class="font-sans text-brand-brown/80 text-lg md:text-xl font-light leading-relaxed">
            Un proyecto tecnológico de concientización ambiental que promueve el cambio hacia un mundo más limpio y sustentable a través de pequeñas acciones con impactos transformadores.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#acciones" class="w-full sm:w-auto text-center bg-brand-green-dark hover:bg-brand-green-light text-white font-sans font-bold px-8 py-4 rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Comienza la Ruta
            </a>
            <a href="#pilares" class="w-full sm:w-auto text-center border-2 border-brand-brown/20 hover:border-brand-green-light text-brand-brown hover:text-brand-green-light font-sans font-bold px-8 py-4 rounded-2xl transition-all duration-300">
              Conocer Pilares
            </a>
          </div>
        </div>

        <!-- Visual Poster Card (Afiche) -->
        <div class="flex-1 flex justify-center w-full max-w-md relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-brand-green-light to-brand-sage rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div class="relative bg-white p-4 rounded-[2rem] border border-brand-sage/20 shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
            <img src="assets/Afiche.png" alt="EcoRuta Afiche - Pequeñas Acciones Grandes Cambios" class="w-full h-auto rounded-[1.5rem]" />
            
            <!-- Floating Tech Overlay -->
            <div class="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-sage/10 shadow-lg translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p class="font-sans font-bold text-brand-green-dark text-sm">PEQUEÑAS ACCIONES,</p>
              <p class="font-serif text-xl font-bold text-brand-brown leading-tight">GRANDES CAMBIOS</p>
              <div class="h-[1px] bg-brand-sage/20 my-2"></div>
              <p class="font-sans text-xs text-brand-brown/70">Proyecto Oficial de Conciliación Ecológica</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave decoration at bottom -->
      <div class="w-full max-w-6xl mx-auto flex justify-between items-center pt-8 border-t border-brand-sage/10 font-sans text-xs text-brand-brown/60 uppercase tracking-widest">
        <span>© 2026 EcoRuta</span>
        <span>•</span>
        <span>Menos plástico, más vida</span>
        <span>•</span>
        <span>Educación Ambiental</span>
      </div>
    </header>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `]
})
export class HeroComponent {
  // Standalone properties if needed
}
