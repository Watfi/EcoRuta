import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Leaf {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  rotation: string;
  svgPath: string;
}

@Component({
  selector: 'app-leaf-particle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      <div
        *ngFor="let leaf of leaves()"
        class="leaf-particle"
        [style.left]="leaf.left"
        [style.animationDelay]="leaf.delay"
        [style.animationDuration]="leaf.duration"
      >
        <svg
          [style.width]="leaf.size"
          [style.height]="leaf.size"
          [style.transform]="leaf.rotation"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path [attr.d]="leaf.svgPath" />
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .leaf-particle {
      position: absolute;
      top: -50px;
      pointer-events: none;
      animation: fall 15s linear infinite;
      will-change: transform, opacity;
    }
  `]
})
export class LeafParticleComponent implements OnInit {
  protected readonly leaves = signal<Leaf[]>([]);

  private svgPaths = [
    // Hoja clásica estilizada
    "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.04,18.7C10.74,16.38 14.88,14 17.65,11.8C20.67,9.4 22,6.5 22,3C19.5,3.5 17.5,4.5 15,6.5C12.5,8.5 10.5,11.5 10.5,11.5C10.5,11.5 14,8.5 17,8Z",
    // Hoja redondeada
    "M2,21.9C2.1,21.2 2.5,18 4.7,15.7C7.2,13.2 10.8,12 13.9,10.2C17,8.4 19.3,5.5 21.9,2C22,4.8 21,7.5 19.2,10C17.4,12.5 14.7,14.6 12,16.8C9.3,19 7.4,21.5 5,22L2,21.9Z"
  ];

  ngOnInit() {
    const list: Leaf[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 12}s`,
        duration: `${10 + Math.random() * 10}s`,
        size: `${20 + Math.random() * 24}px`,
        rotation: `rotate(${Math.random() * 360}deg)`,
        svgPath: this.svgPaths[Math.floor(Math.random() * this.svgPaths.length)]
      });
    }
    this.leaves.set(list);
  }
}
