import { InjectionToken } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';

export const XTOKEN = new InjectionToken<number>('x');
export const YTOKEN = new InjectionToken<number>('y');
export const NBTRESORTOKEN = new InjectionToken<number>('nbTresor');


@Component({
  selector: 'app-tresor',
  templateUrl: './tresor.component.html',
  styleUrls: ['./tresor.component.scss']
})
export class TresorComponent implements OnInit {
  x: number;
  y: number;
  nbTresor: number;


  constructor(@Inject(XTOKEN) x: number, @Inject(YTOKEN) y: number, @Inject(NBTRESORTOKEN) nbTresor: number) {
    this.x = x;
    this.y = y;
    this.nbTresor = nbTresor;
  }

  ngOnInit(): void {
  }

  tresorFind() {
    this.nbTresor -= 1;
  }

}
