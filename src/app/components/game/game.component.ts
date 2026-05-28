import { Component, ElementRef, OnInit, OnDestroy, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GameObject {
  x: number;
  y: number;
  radius: number;
  speed: number;
  type: 'organic' | 'plastic' | 'paper' | 'toxic';
  icon: string;
  color: string;
  name: string;
  angle: number;
  spinSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  alpha: number;
  decay: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="juego" class="py-12 md:py-24 bg-[#EBE7DF] relative z-10 px-3 md:px-16 overflow-hidden border-t border-brand-sage/20">
      <div class="max-w-6xl w-full mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3 md:space-y-4">
          <span class="text-brand-green-light font-sans font-bold text-xs md:text-sm uppercase tracking-widest">Experiencia Interactiva 2D</span>
          <h2 class="font-serif text-3xl md:text-5xl font-black text-brand-green-dark">
            EcoRuta 2D: El Desafío del Reciclaje
          </h2>
          <div class="h-[3px] w-24 bg-brand-green-light mx-auto rounded-full"></div>
          <p class="font-sans text-brand-brown/70 text-sm md:text-lg">
            Mueve el contenedor y toca los botones de color para cambiarlo. ¡Atrapa los residuos correctos y esquiva las baterías tóxicas!
          </p>
        </div>

        <!-- Game Console Frame -->
        <div class="max-w-4xl mx-auto bg-[#3D271D] p-3 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border-4 border-[#2C8A4A] relative">
          <!-- Game Console Screen -->
          <div class="relative bg-[#1A1A1A] rounded-xl md:rounded-[1.5rem] overflow-hidden aspect-[16/9] w-full border-2 border-brand-brown">
            <!-- Canvas -->
            <canvas
              #gameCanvas
              class="w-full h-full block"
              [class.cursor-none]="gameState() === 'playing'"
              (mousemove)="onMouseMove($event)"
              (touchmove)="onTouchMove($event); $event.preventDefault()"
              (touchstart)="onTouchStart($event)"
            ></canvas>

            <!-- Retro Start/Pause/Game Over overlays -->
            @if (gameState() === 'menu') {
              <div class="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col justify-center items-center text-center p-4 md:p-6 space-y-4 md:space-y-6">
                <div class="animate-bounce text-5xl md:text-6xl">🎮</div>
                <h3 class="font-serif text-2xl md:text-4xl font-extrabold text-white">EcoRuta 2D: Green Hero</h3>
                <p class="font-sans text-xs md:text-sm text-brand-sage max-w-md">
                  Mueve el contenedor para atrapar residuos. Usa los botones de color para cambiar contenedor:
                  <br/>
                  🟢 Verde = Orgánico &nbsp;|&nbsp; 🔵 Azul = Plástico &nbsp;|&nbsp; 🟤 Café = Papel
                  <br/>
                  ❌ Evita las baterías rojas tóxicas 🔋
                </p>
                <button
                  (click)="startGame()"
                  class="px-6 py-3 md:px-8 md:py-4 bg-[#2C8A4A] hover:bg-emerald-600 text-white font-sans font-bold text-base md:text-lg uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-700/50 hover:scale-105 transition-all duration-300"
                >
                  ¡Jugar Ahora!
                </button>
              </div>
            }

            @if (gameState() === 'gameover') {
              <div class="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col justify-center items-center text-center p-4 md:p-6 space-y-4 md:space-y-6">
                <div class="text-5xl md:text-6xl animate-pulse">💀</div>
                <h3 class="font-serif text-3xl md:text-4xl font-black text-red-500">Juego Terminado</h3>

                <div class="bg-white/10 p-4 md:p-6 rounded-2xl space-y-2 border border-white/5 w-56 md:w-64">
                  <p class="font-sans text-xs text-white/60">PUNTUACIÓN FINAL</p>
                  <p class="font-serif text-3xl md:text-4xl font-black text-[#EA580C]">{{ score() }}</p>
                  <div class="h-[1px] bg-white/10"></div>
                  <p class="font-sans text-xs text-white/60">RÉCORD MÁXIMO</p>
                  <p class="font-sans text-lg font-bold text-brand-sage">{{ highScore() }}</p>
                </div>

                <button
                  (click)="startGame()"
                  class="px-6 py-3 md:px-8 md:py-4 bg-[#2C8A4A] hover:bg-emerald-600 text-white font-sans font-bold text-base md:text-lg uppercase tracking-wider rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Volver a Intentar
                </button>
              </div>
            }

            <!-- Score / Lives overlay during gameplay -->
            @if (gameState() === 'playing') {
              <div class="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-center pointer-events-none font-sans">
                <!-- Score & Combo -->
                <div class="bg-black/60 backdrop-blur-md px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/10 flex items-center gap-2 md:gap-4 text-white">
                  <div>
                    <span class="text-[9px] md:text-[10px] text-white/60 block font-bold tracking-widest uppercase">Score</span>
                    <span class="text-base md:text-xl font-black text-brand-green-light">{{ score() }}</span>
                  </div>
                  @if (combo() > 1) {
                    <div class="bg-orange-500 text-white px-2 py-0.5 rounded-lg text-[10px] md:text-xs font-black animate-bounce">
                      x{{ combo() }}
                    </div>
                  }
                </div>

                <!-- Lives -->
                <div class="bg-black/60 backdrop-blur-md px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/10 flex items-center gap-0.5 md:gap-1 text-red-500">
                  @for (live of [1,2,3]; track live) {
                    <span class="text-base md:text-lg transition-all duration-300" [style.opacity]="lives() >= live ? 1 : 0.2">❤️</span>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Controls Container -->
          <div class="mt-3 md:mt-6 space-y-3">

            <!-- Color Switcher — visible on ALL sizes, always -->
            <div class="bg-black/40 p-3 md:p-4 rounded-2xl border border-white/5">
              <p class="text-white/60 text-xs font-sans text-center mb-2 uppercase tracking-wider font-semibold">Cambiar Contenedor</p>
              <div class="grid grid-cols-3 gap-2 md:gap-3">
                <button
                  (click)="setBasket('organic')"
                  (touchstart)="setBasket('organic'); $event.preventDefault()"
                  [disabled]="gameState() !== 'playing'"
                  class="py-3 md:py-4 rounded-xl md:rounded-2xl font-sans font-bold text-sm md:text-base text-white border-b-4 transition-all duration-100 active:scale-95 select-none disabled:opacity-30 flex flex-col items-center gap-1"
                  [class]="basketType() === 'organic' ? 'bg-green-600 border-green-800 ring-2 ring-green-400 scale-[1.03]' : 'bg-green-700/50 border-green-900'"
                >
                  <span class="text-lg md:text-xl">🟢</span>
                  <span class="text-[10px] md:text-xs uppercase tracking-wide">Orgánico</span>
                </button>

                <button
                  (click)="setBasket('plastic')"
                  (touchstart)="setBasket('plastic'); $event.preventDefault()"
                  [disabled]="gameState() !== 'playing'"
                  class="py-3 md:py-4 rounded-xl md:rounded-2xl font-sans font-bold text-sm md:text-base text-white border-b-4 transition-all duration-100 active:scale-95 select-none disabled:opacity-30 flex flex-col items-center gap-1"
                  [class]="basketType() === 'plastic' ? 'bg-blue-600 border-blue-800 ring-2 ring-blue-400 scale-[1.03]' : 'bg-blue-700/50 border-blue-900'"
                >
                  <span class="text-lg md:text-xl">🔵</span>
                  <span class="text-[10px] md:text-xs uppercase tracking-wide">Plástico</span>
                </button>

                <button
                  (click)="setBasket('paper')"
                  (touchstart)="setBasket('paper'); $event.preventDefault()"
                  [disabled]="gameState() !== 'playing'"
                  class="py-3 md:py-4 rounded-xl md:rounded-2xl font-sans font-bold text-sm md:text-base text-white border-b-4 transition-all duration-100 active:scale-95 select-none disabled:opacity-30 flex flex-col items-center gap-1"
                  [class]="basketType() === 'paper' ? 'bg-amber-600 border-amber-800 ring-2 ring-amber-400 scale-[1.03]' : 'bg-amber-700/50 border-amber-900'"
                >
                  <span class="text-lg md:text-xl">🟤</span>
                  <span class="text-[10px] md:text-xs uppercase tracking-wide">Papel</span>
                </button>
              </div>
            </div>

            <!-- Movement Controls -->
            <div class="grid grid-cols-2 gap-2 md:gap-3">
              <button
                (mousedown)="startMoveLeft()"
                (mouseup)="stopMove()"
                (mouseleave)="stopMove()"
                (touchstart)="startMoveLeft(); $event.preventDefault()"
                (touchend)="stopMove(); $event.preventDefault()"
                [disabled]="gameState() !== 'playing'"
                class="py-4 md:py-5 bg-[#2C8A4A]/25 border border-[#2C8A4A]/40 active:bg-emerald-700/40 text-white font-sans font-bold text-base md:text-lg rounded-2xl flex justify-center items-center gap-2 select-none transition-colors duration-100 disabled:opacity-30"
              >
                ◀ <span class="text-sm md:text-base">Izquierda</span>
              </button>

              <button
                (mousedown)="startMoveRight()"
                (mouseup)="stopMove()"
                (mouseleave)="stopMove()"
                (touchstart)="startMoveRight(); $event.preventDefault()"
                (touchend)="stopMove(); $event.preventDefault()"
                [disabled]="gameState() !== 'playing'"
                class="py-4 md:py-5 bg-[#2C8A4A]/25 border border-[#2C8A4A]/40 active:bg-emerald-700/40 text-white font-sans font-bold text-base md:text-lg rounded-2xl flex justify-center items-center gap-2 select-none transition-colors duration-100 disabled:opacity-30"
              >
                <span class="text-sm md:text-base">Derecha</span> ▶
              </button>
            </div>

            <!-- Desktop hint -->
            <div class="hidden md:block text-center text-white/40 text-xs font-sans">
              También puedes mover con el mouse y presionar <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white/60">1</kbd> <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white/60">2</kbd> <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white/60">3</kbd> para cambiar contenedor
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .animate-bounce {
      animation: bounce 2s infinite ease-in-out;
    }
  `]
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private moveInterval: any = null;

  // Signals for state
  protected readonly gameState = signal<'menu' | 'playing' | 'gameover'>('menu');
  protected readonly score = signal<number>(0);
  protected readonly highScore = signal<number>(0);
  protected readonly lives = signal<number>(3);
  protected readonly combo = signal<number>(0);

  // Basket configurations
  protected basketType = signal<'organic' | 'plastic' | 'paper'>('organic');
  protected basketX = 200;
  private basketWidth = 90;
  private basketHeight = 35;

  // Lists of assets and particles
  private gameObjects: GameObject[] = [];
  private particles: Particle[] = [];
  private floatingTexts: FloatingText[] = [];

  // Items lists
  private itemsData = [
    { type: 'organic', icon: '🍏', color: '#22C55E', name: 'Manzana' },
    { type: 'organic', icon: '🍌', color: '#EAB308', name: 'Plátano' },
    { type: 'plastic', icon: '🥤', color: '#3B82F6', name: 'Botella Plástica' },
    { type: 'plastic', icon: '🧴', color: '#60A5FA', name: 'Envase' },
    { type: 'paper', icon: '📦', color: '#CA8A04', name: 'Cartón' },
    { type: 'paper', icon: '📰', color: '#94A3B8', name: 'Periódico' },
    { type: 'toxic', icon: '🔋', color: '#EF4444', name: 'Batería Tóxica' }
  ];

  // Spawn rates
  private lastSpawnTime = 0;
  private spawnInterval = 1600; // ms
  private difficultyMultiplier = 1;

  ngOnInit() {
    // Read highscore
    const saved = localStorage.getItem('ecoruta_highscore');
    if (saved) {
      this.highScore.set(parseInt(saved, 10));
    }

    // Bind keys
    window.addEventListener('keydown', this.onKeyDown);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  protected startGame() {
    const canvas = this.canvasRef.nativeElement;
    // Set internal high quality resolution
    canvas.width = 800;
    canvas.height = 450;
    this.ctx = canvas.getContext('2d')!;

    this.gameState.set('playing');
    this.score.set(0);
    this.lives.set(3);
    this.combo.set(0);
    this.gameObjects = [];
    this.particles = [];
    this.floatingTexts = [];
    this.basketX = canvas.width / 2 - this.basketWidth / 2;
    this.difficultyMultiplier = 1;
    this.lastSpawnTime = 0;

    // Run game loop
    cancelAnimationFrame(this.animationFrameId);
    this.gameLoop(0);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.gameState() !== 'playing') return;
    if (e.code === 'Space') { e.preventDefault(); this.cycleBasket(); }
    if (e.key === '1') this.setBasket('organic');
    if (e.key === '2') this.setBasket('plastic');
    if (e.key === '3') this.setBasket('paper');
  };

  protected cycleBasket() {
    const current = this.basketType();
    if (current === 'organic') {
      this.basketType.set('plastic');
    } else if (current === 'plastic') {
      this.basketType.set('paper');
    } else {
      this.basketType.set('organic');
    }
    this.createBasketSwapParticles();
  }

  protected setBasket(type: 'organic' | 'plastic' | 'paper') {
    if (this.gameState() !== 'playing') return;
    this.basketType.set(type);
    this.createBasketSwapParticles();
  }

  protected startMoveLeft() {
    this.stopMove();
    this.moveInterval = setInterval(() => {
      this.basketX = Math.max(0, this.basketX - 16);
    }, 16);
  }

  protected startMoveRight() {
    const canvas = this.canvasRef.nativeElement;
    this.stopMove();
    this.moveInterval = setInterval(() => {
      this.basketX = Math.min(canvas.width - this.basketWidth, this.basketX + 16);
    }, 16);
  }

  protected stopMove() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
      this.moveInterval = null;
    }
  }

  protected getBasketName(): string {
    switch (this.basketType()) {
      case 'organic': return 'Orgánico';
      case 'plastic': return 'Plástico';
      case 'paper': return 'Papel';
    }
  }

  protected getBasketColorClass(): string {
    switch (this.basketType()) {
      case 'organic': return 'text-green-400';
      case 'plastic': return 'text-blue-400';
      case 'paper': return 'text-amber-500';
    }
  }

  protected getBasketHex(): string {
    switch (this.basketType()) {
      case 'organic': return '#22C55E';
      case 'plastic': return '#3B82F6';
      case 'paper': return '#A16207';
    }
  }

  // Interactive Coordinates
  protected onMouseMove(e: MouseEvent) {
    if (this.gameState() !== 'playing') return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = (e.clientX - rect.left) * scaleX;
    
    this.basketX = clientX - this.basketWidth / 2;
    // Bound check
    if (this.basketX < 0) this.basketX = 0;
    if (this.basketX > canvas.width - this.basketWidth) this.basketX = canvas.width - this.basketWidth;
  }

  protected onTouchMove(e: TouchEvent) {
    if (this.gameState() !== 'playing') return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = (e.touches[0].clientX - rect.left) * scaleX;

    this.basketX = clientX - this.basketWidth / 2;
    if (this.basketX < 0) this.basketX = 0;
    if (this.basketX > canvas.width - this.basketWidth) this.basketX = canvas.width - this.basketWidth;
  }

  protected onTouchStart(e: TouchEvent) {
    if (this.gameState() !== 'playing') return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = (e.touches[0].clientX - rect.left) * scaleX;

    this.basketX = clientX - this.basketWidth / 2;
    if (this.basketX < 0) this.basketX = 0;
    if (this.basketX > canvas.width - this.basketWidth) this.basketX = canvas.width - this.basketWidth;
  }

  // Core Game Loop
  private gameLoop = (timestamp: number) => {
    if (this.gameState() !== 'playing') return;

    this.update(timestamp);
    this.draw();

    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update(timestamp: number) {
    const canvas = this.canvasRef.nativeElement;

    // Adjust difficulty over score (capped at 2x so it stays playable)
    this.difficultyMultiplier = Math.min(2, 1 + this.score() / 300);
    const currentInterval = Math.max(700, this.spawnInterval / this.difficultyMultiplier);

    // Spawning items
    if (timestamp - this.lastSpawnTime > currentInterval) {
      this.spawnItem();
      this.lastSpawnTime = timestamp;
    }

    // Update game objects (items)
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      const obj = this.gameObjects[i];
      obj.y += obj.speed * this.difficultyMultiplier;
      obj.angle += obj.spinSpeed;

      // Check collision with basket
      if (
        obj.y + obj.radius >= canvas.height - this.basketHeight - 20 &&
        obj.y - obj.radius <= canvas.height - 20 &&
        obj.x >= this.basketX &&
        obj.x <= this.basketX + this.basketWidth
      ) {
        this.handleCollection(obj);
        this.gameObjects.splice(i, 1);
        continue;
      }

      // Check out of bounds (passed bottom)
      if (obj.y - obj.radius > canvas.height) {
        if (obj.type !== 'toxic') {
          // Missed non-toxic deducts life
          this.lives.set(this.lives() - 1);
          this.combo.set(0);
          this.createFloatingText(obj.x, canvas.height - 50, '¡Perdiste 1 vida! 💔', '#EF4444');
          if (this.lives() <= 0) {
            this.gameOver();
          }
        }
        this.gameObjects.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 1.2;
      ft.alpha -= 0.02;
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  private handleCollection(obj: GameObject) {
    const canvas = this.canvasRef.nativeElement;
    
    // Toxic collection
    if (obj.type === 'toxic') {
      this.lives.set(this.lives() - 1);
      this.combo.set(0);
      this.createCollectionExplosion(obj.x, obj.y, '#EF4444');
      this.createFloatingText(obj.x, obj.y - 30, '¡Tóxico! -1 Vida 🔋💔', '#EF4444');
      if (this.lives() <= 0) {
        this.gameOver();
      }
      return;
    }

    // Match criteria
    const currentBasket = this.basketType();
    if (obj.type === currentBasket) {
      // SUCCESS match
      const currentCombo = this.combo() + 1;
      this.combo.set(currentCombo);
      const points = 10 * currentCombo;
      this.score.set(this.score() + points);

      this.createCollectionExplosion(obj.x, obj.y, obj.color);
      this.createFloatingText(
        obj.x, 
        obj.y - 30, 
        `+${points} ${currentCombo > 1 ? '(x' + currentCombo + ')' : ''} ✨`, 
        '#22C55E'
      );
    } else {
      // MISMATCH error
      this.combo.set(0);
      this.lives.set(this.lives() - 1);
      this.createCollectionExplosion(obj.x, obj.y, '#EF4444');
      this.createFloatingText(obj.x, obj.y - 30, '¡Incorrecto! -1 Vida ❌', '#EF4444');
      if (this.lives() <= 0) {
        this.gameOver();
      }
    }
  }

  private spawnItem() {
    const canvas = this.canvasRef.nativeElement;
    const template = this.itemsData[Math.floor(Math.random() * this.itemsData.length)];
    
    const x = 50 + Math.random() * (canvas.width - 100);
    const y = -30;

    this.gameObjects.push({
      x,
      y,
      radius: 20,
      speed: 1.2 + Math.random() * 1.2,
      type: template.type as any,
      icon: template.icon,
      color: template.color,
      name: template.name,
      angle: Math.random() * Math.PI,
      spinSpeed: -0.04 + Math.random() * 0.08
    });
  }

  private gameOver() {
    this.gameState.set('gameover');
    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
      localStorage.setItem('ecoruta_highscore', this.score().toString());
    }
    cancelAnimationFrame(this.animationFrameId);
  }

  // Visual Graphics Rendering (expert-level)
  private draw() {
    const canvas = this.canvasRef.nativeElement;
    
    // Clear canvas with smooth deep forest dark-green gradient (Arcade sky)
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#101712');
    skyGrad.addColorStop(1, '#1A291E');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background vector art (Clean stars/dots grid for technology feel)
    this.ctx.fillStyle = 'rgba(44,138,74,0.08)';
    for (let x = 20; x < canvas.width; x += 40) {
      for (let y = 20; y < canvas.height; y += 40) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Draw items (falling objects)
    for (const obj of this.gameObjects) {
      this.ctx.save();
      this.ctx.translate(obj.x, obj.y);
      this.ctx.rotate(obj.angle);
      
      // Draw smooth vector circle glow
      const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, obj.radius * 1.5);
      glow.addColorStop(0, obj.color + '44');
      glow.addColorStop(1, 'transparent');
      this.ctx.fillStyle = glow;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, obj.radius * 1.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw item backing/frame
      this.ctx.fillStyle = 'rgba(255,255,255,0.9)';
      this.ctx.strokeStyle = obj.color;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Render Item Emoji centering
      this.ctx.font = '22px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#000000';
      this.ctx.fillText(obj.icon, 0, 1);

      this.ctx.restore();
    }

    // Draw the Basket / Collector Bin at the bottom
    this.ctx.save();
    const basketY = canvas.height - this.basketHeight - 20;
    
    // Smooth shadows
    this.ctx.shadowColor = this.getBasketHex();
    this.ctx.shadowBlur = 15;
    
    // Basket Outer Shell (Glow frame)
    this.ctx.fillStyle = '#22252A';
    this.ctx.strokeStyle = this.getBasketHex();
    this.ctx.lineWidth = 4;
    
    // Draw rounded neo-brutalist console-style basket
    this.ctx.beginPath();
    this.ctx.roundRect(this.basketX, basketY, this.basketWidth, this.basketHeight, 12);
    this.ctx.fill();
    this.ctx.stroke();

    // Inside LED bar
    this.ctx.shadowBlur = 5;
    this.ctx.fillStyle = this.getBasketHex();
    this.ctx.beginPath();
    this.ctx.roundRect(this.basketX + 10, basketY + 6, this.basketWidth - 20, 8, 4);
    this.ctx.fill();

    // Basket Label Text
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 11px Outfit, Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      this.getBasketName().toUpperCase(), 
      this.basketX + this.basketWidth / 2, 
      basketY + 23
    );

    this.ctx.restore();

    // Draw particles
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw floating text
    for (const ft of this.floatingTexts) {
      this.ctx.save();
      this.ctx.globalAlpha = ft.alpha;
      this.ctx.fillStyle = ft.color;
      this.ctx.font = 'black 16px Outfit, Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
      this.ctx.shadowBlur = 4;
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    }
  }

  // Particle Generators
  private createCollectionExplosion(x: number, y: number, color: string) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // upwards bias
        color,
        radius: 2 + Math.random() * 4,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
  }

  private createBasketSwapParticles() {
    const canvas = this.canvasRef.nativeElement;
    const basketY = canvas.height - this.basketHeight - 20;
    const color = this.getBasketHex();

    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: this.basketX + Math.random() * this.basketWidth,
        y: basketY + this.basketHeight / 2,
        vx: -1.5 + Math.random() * 3,
        vy: -1 - Math.random() * 3,
        color,
        radius: 1.5 + Math.random() * 3,
        alpha: 1,
        decay: 0.03 + Math.random() * 0.03
      });
    }
  }

  private createFloatingText(x: number, y: number, text: string, color: string) {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1
    });
  }
}
