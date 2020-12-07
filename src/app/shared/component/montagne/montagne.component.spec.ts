import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontagneComponent, XTOKEN, YTOKEN } from './montagne.component';

describe('MontagneComponent', () => {
  let component: MontagneComponent;
  let fixture: ComponentFixture<MontagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MontagneComponent],
      providers: [
        { provide: XTOKEN, useValue: 3 },
        { provide: YTOKEN, useValue: 3 },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
