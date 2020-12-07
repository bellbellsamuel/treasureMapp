import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Mouvement } from '../../models/mouvement.enum';
import { Orientation } from '../../models/orientation.enum';
import { CarteComponent } from '../carte/carte.component';
import { CaseComponent } from '../case/case.component';


//for test unit dynamique arg value...
export const NAMETOKEN = new InjectionToken<number>('nom');
export const XTOKEN = new InjectionToken<number>('x');
export const YTOKEN = new InjectionToken<number>('y');
export const SEQMOUVTOKEN = new InjectionToken<string>('seqMouv');
export const ORIENTATIONTOKEN = new InjectionToken<Orientation>('orientation');


@Component({
  selector: 'app-aventurier',
  templateUrl: './aventurier.component.html',
  styleUrls: ['./aventurier.component.scss']
})

export class AventurierComponent implements OnInit {
  nom: string;
  x: number;
  y: number;
  orientation: Orientation;
  seqMouv: string;
  tresorCollect: number;

  constructor(@Inject(NAMETOKEN) nom: string, @Inject(XTOKEN) x: number,
    @Inject(YTOKEN) y: number, @Inject(ORIENTATIONTOKEN) orientation: Orientation, @Inject(SEQMOUVTOKEN) seqMouv: string) {
    this.nom = nom;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.seqMouv = seqMouv;
    this.tresorCollect = 0;
  }

  ngOnInit(): void {
  }

  findTresor() {
    this.tresorCollect++;
  }


  tournerGauche() {
    switch (this.orientation) {
      case Orientation.Nord: {
        this.orientation = Orientation.Ouest;
        break;
      }
      case Orientation.Ouest: {
        this.orientation = Orientation.Sud;
        break;
      }
      case Orientation.Sud: {
        this.orientation = Orientation.Est
        break;
      }
      case Orientation.Est: {
        this.orientation = Orientation.Nord
      }
    }
  }

  tournerDroite() {
    switch (this.orientation) {
      case Orientation.Nord: {
        this.orientation = Orientation.Est;
        break;
      }
      case Orientation.Ouest: {
        this.orientation = Orientation.Nord;
        break;
      }
      case Orientation.Sud: {
        this.orientation = Orientation.Ouest
        break;
      }
      case Orientation.Est: {
        this.orientation = Orientation.Sud
      }
    }
  }

  Avancer() {
    switch (this.orientation) {
      case Orientation.Nord: {
        this.y -= 1;
        break;
      }
      case Orientation.Ouest: {
        this.x -= 1;
        break;
      }
      case Orientation.Sud: {
        this.y += 1;
        break;
      }
      case Orientation.Est: {
        this.x += 1;
      }
    }
  }

  annulerAvancer() {
    console.log("annuler avancé");
    switch (this.orientation) {
      case Orientation.Nord: {
        this.y += 1;
        break;
      }
      case Orientation.Ouest: {
        this.x += 1;
        break;
      }
      case Orientation.Sud: {
        this.y -= 1;
        break;
      }
      case Orientation.Est: {
        this.x -= 1;
      }
    }
  }

  mouvement(carte: CarteComponent) {
    let mouvement = this.seqMouv[0]
    this.seqMouv = this.seqMouv.substring(1);

    switch (mouvement) {
      case Mouvement.Avancer: {

        this.Avancer();

        if (carte.map[this.y][this.x].valeur.indexOf('M') != -1) {
          this.annulerAvancer()
          console.log('annul avanceer')
          break;
        }
        let newNbTresor = 0;
        if (carte.map[this.y][this.x].valeur.indexOf('T') != -1) {
          for (let tresor of carte.tresors) {
            if (tresor.x == this.x && tresor.y == this.y) {
              newNbTresor = tresor.nbTresor
              carte.map[this.y][this.x].valeur = `T(${newNbTresor})`;
            }
          }
        }
        break
      }
      case Mouvement.Droite: {
        this.tournerDroite();
        break
      }
      case Mouvement.Gauche: {
        this.tournerGauche();
        break;
      }
    }
    return carte;
  }

}
