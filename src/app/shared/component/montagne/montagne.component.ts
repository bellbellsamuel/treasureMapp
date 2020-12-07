import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
export const XTOKEN = new InjectionToken<number>('x');
export const YTOKEN = new InjectionToken<number>('y');
@Component({
  selector: 'app-montagne',
  templateUrl: './montagne.component.html',
  styleUrls: ['./montagne.component.scss']
})
export class MontagneComponent implements OnInit {

  x: number;
  y: number;


  constructor(@Inject(XTOKEN) x: number, @Inject(YTOKEN) y: number) {
    this.x = x;
    this.y = y;
  }

  ngOnInit(): void {
  }


}
