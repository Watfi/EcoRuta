import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DesignItem {
  id: string;
  title: string;
  category: 'infografias' | 'campana' | 'posts';
  src: string;
  desc: string;
  badge: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="galeria" class="py-24 px-6 md:px-16 max-w-6xl w-full mx-auto relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span class="text-brand-green-light font-sans font-bold text-sm uppercase tracking-widest">Exhibición Digital</span>
        <h2 class="font-serif text-4xl md:text-5xl font-black text-brand-green-dark">
          Materiales del Proyecto EcoRuta
        </h2>
        <div class="h-[3px] w-24 bg-brand-green-light mx-auto rounded-full"></div>
        <p class="font-sans text-brand-brown/70 text-base md:text-lg">
          Explora la colección completa de infografías, afiches y publicaciones educativas creadas para la campaña ambiental de concientización. Haz clic en cualquier imagen para ampliarla en alta definición.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap justify-center items-center gap-3 mb-12">
        <button 
          (click)="activeCategory.set('all')"
          class="font-sans font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 border"
          [ngClass]="activeCategory() === 'all' ? 'bg-brand-green-dark text-white border-brand-green-dark shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border-brand-sage/20'"
        >
          Todo el Material
        </button>
        <button 
          (click)="activeCategory.set('infografias')"
          class="font-sans font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 border"
          [ngClass]="activeCategory() === 'infografias' ? 'bg-brand-green-dark text-white border-brand-green-dark shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border-brand-sage/20'"
        >
          Infografías
        </button>
        <button 
          (click)="activeCategory.set('campana')"
          class="font-sans font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 border"
          [ngClass]="activeCategory() === 'campana' ? 'bg-brand-green-dark text-white border-brand-green-dark shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border-brand-sage/20'"
        >
          Afiches & Campaña
        </button>
        <button 
          (click)="activeCategory.set('posts')"
          class="font-sans font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 border"
          [ngClass]="activeCategory() === 'posts' ? 'bg-brand-green-dark text-white border-brand-green-dark shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border-brand-sage/20'"
        >
          Post Educativos
        </button>
      </div>

      <!-- Media Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        @for (item of filteredItems(); track item.id) {
          <div 
            (click)="openLightbox(item)"
            class="group cursor-pointer bg-white p-4 rounded-[2.5rem] border border-brand-sage/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]"
          >
            <!-- Image Frame -->
            <div class="relative overflow-hidden rounded-[2rem] bg-brand-cream flex justify-center items-center aspect-[4/5] md:aspect-auto md:h-[450px]">
              <img 
                [src]="item.src" 
                [alt]="item.title"
                class="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-700" 
              />
              
              <!-- Hover Overlay Effect -->
              <div class="absolute inset-0 bg-brand-green-dark/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <div class="bg-white/95 backdrop-blur p-4 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg class="w-6 h-6 text-brand-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6"></path>
                  </svg>
                </div>
              </div>

              <!-- Top Left Badge -->
              <div class="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm text-xs font-sans font-bold text-brand-green-dark border border-brand-sage/15">
                {{ item.badge }}
              </div>
            </div>

            <!-- Descriptive Text -->
            <div class="p-6 space-y-2">
              <h3 class="font-sans font-bold text-xl text-brand-green-dark">{{ item.title }}</h3>
              <p class="font-sans text-sm text-brand-brown/75 leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Full-screen Lightbox Modal -->
      @if (lightboxItem(); as item) {
        <div 
          class="fixed inset-0 bg-brand-brown/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-4 md:p-8"
          (click)="closeLightbox()"
        >
          <!-- Close Button -->
          <button 
            (click)="closeLightbox()" 
            class="absolute top-6 right-6 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 z-50"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Lightbox Frame -->
          <div 
            class="w-full max-w-4xl max-h-[85vh] flex justify-center items-center relative"
            (click)="$event.stopPropagation()"
          >
            <img 
              [src]="item.src" 
              [alt]="item.title"
              class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-zoom-in"
            />
          </div>

          <!-- Bottom caption -->
          <div 
            class="mt-6 text-center text-white max-w-xl space-y-2"
            (click)="$event.stopPropagation()"
          >
            <h4 class="font-serif text-2xl font-bold">{{ item.title }}</h4>
            <p class="font-sans text-sm text-white/70">{{ item.desc }}</p>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    @keyframes zoomIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-zoom-in {
      animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class GalleryComponent {
  protected readonly activeCategory = signal<'all' | 'infografias' | 'campana' | 'posts'>('all');
  protected readonly lightboxItem = signal<DesignItem | null>(null);

  protected readonly galleryItems = signal<DesignItem[]>([
    {
      id: 'infografia-1',
      title: 'Infografía 1: Pilares Ecológicos de Acción',
      category: 'infografias',
      src: 'assets/infografia1..png',
      desc: 'Infografía detallada que explica los tres pilares principales: la importancia de sembrar árboles, el método de las 3R para consumidores responsables y el ahorro de energía en la vida diaria.',
      badge: 'Infografía Temática'
    },
    {
      id: 'infografia-2',
      title: 'Infografía 2: 5 Acciones para Cuidar Nuestro Planeta',
      category: 'infografias',
      src: 'assets/infografia 2.png',
      desc: 'Póster infográfico con el listado de las cinco actividades de impacto diario: Reduce, Reusa, Recicla, Ahorra recursos y Conecta con la naturaleza.',
      badge: 'Infografía General'
    },
    {
      id: 'afiche',
      title: 'Afiche Oficial: Pequeñas Acciones, Grandes Cambios',
      category: 'campana',
      src: 'assets/Afiche.png',
      desc: 'Póster de campaña que ilustra el proceso básico del reciclaje en contenedor y llama a la acción con el lema institucional: Reciclar hoy, vivir mejor mañana.',
      badge: 'Campaña General'
    },
    {
      id: 'post-1',
      title: 'Publicación Educativa: El Planeta lo Agradece',
      category: 'posts',
      src: 'assets/post 1.png',
      desc: 'Gráfica educativa para redes sociales enfocada en la importancia del reciclaje oportuno y su impacto duradero e imperecedero sobre la biodiversidad del planeta.',
      badge: 'Post Redes'
    },
    {
      id: 'post-2',
      title: 'Publicación Educativa: Hacia el Residuo Zero',
      category: 'posts',
      src: 'assets/post2.png',
      desc: 'Mensaje para redes sociales que invita a sumarse al movimiento "Residuo Zero" y a adoptar hábitos cotidianos de vida sustentable ("Live Green").',
      badge: 'Post Redes'
    }
  ]);

  protected filteredItems() {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.galleryItems();
    }
    return this.galleryItems().filter(item => item.category === cat);
  }

  protected openLightbox(item: DesignItem) {
    this.lightboxItem.set(item);
  }

  protected closeLightbox() {
    this.lightboxItem.set(null);
  }
}
