import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpectedConditions } from 'protractor';

import { TresorComponent, XTOKEN, YTOKEN, NBTRESORTOKEN } from './tresor.component';

describe('TresorComponent', () => {
  let component: TresorComponent;
  let fixture: ComponentFixture<TresorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TresorComponent],
      providers: [
        { provide: XTOKEN, useValue: 1 },
        { provide: YTOKEN, useValue: 1 },
        { provide: NBTRESORTOKEN, useValue: 2 },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TresorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one tresor less', () => {
    let beginNBTresor = component.nbTresor;
    component.tresorFind()
    expect(component.nbTresor).toBe(beginNBTresor - 1)
  });
});
