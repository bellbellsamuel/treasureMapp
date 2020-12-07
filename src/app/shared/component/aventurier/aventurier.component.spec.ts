import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AventurierComponent, XTOKEN, YTOKEN, SEQMOUVTOKEN, NAMETOKEN, ORIENTATIONTOKEN } from './aventurier.component';
import { Orientation } from '../../models/orientation.enum';


import { HttpClientModule } from '@angular/common/http';
import { iterator } from 'core-js/fn/symbol';
import { ExpectedConditions } from 'protractor';


describe('AventurierComponent', () => {
  let component: AventurierComponent;
  let fixture: ComponentFixture<AventurierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [AventurierComponent],
      providers: [
        { provide: NAMETOKEN, useValue: 'aventurierTesteur' },
        { provide: XTOKEN, useValue: 1 },
        { provide: YTOKEN, useValue: 1 },
        { provide: SEQMOUVTOKEN, useValue: 'AAAGD' },
        { provide: ORIENTATIONTOKEN, useValue: Orientation.Sud },

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AventurierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SEQMouv is only constituate of A,G,D', () => {
    let testedValue = true;

    for (let char of component.seqMouv) {
      if (!(['A', 'G', 'D'].includes(char))) {
        testedValue = false;
        break
      }
    }
    expect(testedValue).toBeTruthy()
  });

  // Le héro est tourner vers le sud donc sa valeur y à augmenter de un

  it('Aventurier à avancer vers le sud', () => {
    let xbegin = component.x;
    let ybegin = component.y;

    component.orientation = Orientation.Sud
    component.Avancer()
    expect(component.x).toBe(xbegin)
    expect(component.y).toBe(ybegin + 1)

  })

  it('Aventurier à avancer vers le nord', () => {
    let xbegin = component.x;
    let ybegin = component.y;

    component.orientation = Orientation.Nord
    component.Avancer()
    expect(component.x).toBe(xbegin)
    expect(component.y).toBe(ybegin - 1)

  })

  it('Aventurier à avancer vers l\'est', () => {
    let xbegin = component.x;
    let ybegin = component.y;

    component.orientation = Orientation.Est
    component.Avancer()
    expect(component.x).toBe(xbegin + 1)
    expect(component.y).toBe(ybegin)

  })

  it('Aventurier à avancer vers le l\'ouest', () => {
    let xbegin = component.x;
    let ybegin = component.y;

    component.orientation = Orientation.Ouest
    component.Avancer()
    expect(component.x).toBe(xbegin - 1)
    expect(component.y).toBe(ybegin)

  })

  it('Aventurier fait un 360 degré a gauche puis à droite', () => {

    component.orientation = Orientation.Nord
    let orientationBegin = component.orientation
    component.tournerDroite()
    expect(component.orientation).toBe(Orientation.Est)
    component.tournerDroite()
    expect(component.orientation).toBe(Orientation.Sud)
    component.tournerDroite()
    expect(component.orientation).toBe(Orientation.Ouest)
    component.tournerDroite()
    expect(component.orientation).toBe(orientationBegin)

    component.tournerGauche()
    expect(component.orientation).toBe(Orientation.Ouest)
    component.tournerGauche()
    expect(component.orientation).toBe(Orientation.Sud)
    component.tournerGauche()
    expect(component.orientation).toBe(Orientation.Est)
    component.tournerGauche()
    expect(component.orientation).toBe(orientationBegin)
  })





});
