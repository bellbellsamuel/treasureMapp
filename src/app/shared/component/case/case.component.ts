import { InjectionToken } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';


export const NUMEROCASETOKEN = new InjectionToken<number>('numero');
export const VALEURCASETOKEN = new InjectionToken<number>('valeur');
export const NUMEROSTEPTOKEN = new InjectionToken<number>('numeroEtapeHero');


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})

export class CaseComponent implements OnInit {
  numero: number;
  valeur: string; // valeur représenté
  numeroEtapeHero: number // lorsque qu'un héro passe

  constructor(@Inject(NUMEROCASETOKEN) numero: number, @Inject(VALEURCASETOKEN) valeur: string, @Inject(NUMEROSTEPTOKEN) numeroEtapeHero: number) {
    this.numero = numero;
    this.valeur = valeur;
    this.numeroEtapeHero = numeroEtapeHero;
  }

  ngOnInit(): void {
  }


}
