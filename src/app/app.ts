import { Component, signal } from '@angular/core';
import { LeafParticleComponent } from './components/leaf-particle/leaf-particle.component';
import { HeroComponent } from './components/hero/hero.component';
import { ActionsComponent } from './components/actions/actions.component';
import { DetailsComponent } from './components/details/details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GameComponent } from './components/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LeafParticleComponent,
    HeroComponent,
    ActionsComponent,
    DetailsComponent,
    GalleryComponent,
    GameComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecoruta-web');
}
