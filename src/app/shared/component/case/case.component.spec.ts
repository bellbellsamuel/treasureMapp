import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseComponent } from './case.component';

import { NUMEROCASETOKEN, VALEURCASETOKEN, NUMEROSTEPTOKEN } from './case.component';

describe('CaseComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseComponent],
      providers: [
        { provide: NUMEROCASETOKEN, useValue: 1 },
        { provide: VALEURCASETOKEN, useValue: '.' },
        { provide: NUMEROSTEPTOKEN, useValue: 0 },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    //component = new CaseComponent(1, '.', 0);

    /*component.geetnumero = 1;
    component.numeroEtapeHero = 0;
    component.valeur = '.'*/
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
