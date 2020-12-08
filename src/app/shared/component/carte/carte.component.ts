import { Component, InjectionToken, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { CaseComponent } from '../case/case.component';
import { stringify } from 'querystring';
import { AventurierComponent } from '../aventurier/aventurier.component';
import { TresorComponent } from '../tresor/tresor.component'
import { Orientation } from '../../models/orientation.enum';
import { MontagneComponent } from '../montagne/montagne.component';
import { InputUploadComponent } from '../input-upload/input-upload.component';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  fileUrl;
  client: any;
  map: CaseComponent[][] = [];
  aventuriers: AventurierComponent[] = [];
  cptPas = 0;
  cptAvancer = 0;
  tresors: TresorComponent[] = [];
  montagnes: MontagneComponent[] = [];
  finish = false;
  instructions: string[] = [];


  constructor(http: HttpClient) {
    this.client = http;
  }

  ngOnInit(): void {
    // on initialise le ici la carte
    this.fileUrl = '/assets/instructionMapAventurier.txt'

    this.mapCreateByInstruction()

  }

  mapCreateByInstruction() {
    let args: string[];

    this.getFile(this.fileUrl).subscribe((res) => {
      this.instructions = String(res).split('\n')

      for (let instruction of this.instructions) {
        // il y a des espace a retiré avant de split
        args = instruction.split('-');
        let cpt = 0;
        // il faut retiré les espace sur les valeurs non null
        for (let arg of args) {
          // remove special char \u200B Zero width space and space (with split and join)
          args[cpt] = arg.split(' ').join('').replace(/\u200B/g, '');
          cpt += 1
        }
        this.instruction(args[0], args[1], args[2], args[3], args[4], args[5])
      }
    })
  }

  mapRecreation(res) {
    let args: string[];


    // remove old map reinitialise liste d'element
    this.map = [];
    this.tresors = []
    this.aventuriers = [];
    this.montagnes = [];

    let newInstructions = String(res).split('\n')

    for (let instruction of newInstructions) {
      // il y a des espace a retiré avant de split

      args = instruction.split('-');
      let cpt = 0;
      // il faut retiré les espace sur les valeurs non null
      for (let arg of args) {
        // remove special char \u200B Zero width space and space (with split and join)
        args[cpt] = arg.split(' ').join('').replace(/\u200B/g, '');
        cpt += 1
      }
      // prevent miss line like # or none
      if (args[0].includes("#") || args[0] == null) {
        continue
      }
      this.instruction(args[0], args[1], args[2], args[3], args[4], args[5]);
    }

  }



  getFile(url: string): Observable<File> {
    return this.client.get(url, { responseType: 'text' as 'json' });
  }

  instruction(type: string, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any) {
    /*le text lu est différent escape(type) rend quelques chose différent T%u200B vs T par exemple*/
    if (type == 'C') {
      this.instructionCarte(Number(arg1), Number(arg2));
    }
    if (type == 'M') {
      this.instructionMontagne(Number(arg1), Number(arg2));
    }
    if (type == 'T') {
      this.instructionTresor(Number(arg1), Number(arg2), Number(arg3));
    }
    if (type == 'A') {
      //cast the arg of type any to match function signature...
      this.instructionAventurier(String(arg1), Number(arg2), Number(arg3), <Orientation>(arg4), String(arg5))
    }
  }

  instructionCarte(arg1: number, arg2: number) {
    let num: number = 0;
    for (let i: number = 0; i < arg2; i++) {
      let ligne: CaseComponent[] = []
      for (let y: number = 0; y < arg1; y++) {
        let cases: CaseComponent = new CaseComponent(num, '.', -1);
        num = num + 1
        // -1 le héro n'est jamùais passé
        ligne.push(cases)
      }
      this.map.push(ligne);
    }
  }

  instructionMontagne(y: number, x: number) {
    this.map[x][y].valeur = 'M';
    let montagne: MontagneComponent = new MontagneComponent(x, y)

    this.montagnes.push(montagne);
  }

  valueFile(f) {
    //alert('file:' + f + f.target.files[0].name)
    this.fileUrl = f.target.files[0].name;
    var reader = new FileReader();
    var text;
    let that = this
    reader.onload = function (e) {
      text = reader.result;
      that.mapRecreation(text)
    }

    reader.readAsText(f.target.files[0], 'text');

  }

  instructionTresor(y: number, x: number, nbTresor: number) {
    let tresor: TresorComponent = new TresorComponent(x, y, nbTresor)
    this.map[x][y].valeur = `T(${nbTresor})`;
    this.tresors.push(tresor);
  }

  instructionAventurier(nom: string, x: number, y: number, orientation: Orientation, seqMouv: string) {
    this.map[y][x].valeur = `A(${nom})`
    let aventurier = new AventurierComponent(nom, x, y, orientation, seqMouv);
    this.aventuriers.push(aventurier);
  }

  pas() {
    for (let aventurier of this.aventuriers) {
      // l'aventurier ne fait plus rien si il n'a plus d'action a produire
      if (aventurier.seqMouv.length != 0) {
        // inutiliser mais interessant pour des dev complémentaire
        // check si aventurier sur un trésor avant
        if (this.map[aventurier.y][aventurier.x].valeur.includes('T')) {
          for (let tresor of this.tresors) {
            if (tresor.x == aventurier.x && tresor.y == tresor.y) {
              // ld tresor et sur la même case
              break
            }
          }
        }

        // on affiche le compteur des pas si ce n'est pas une montagne ou un trésor sur l'ancien l'emplacement du héro avant son pas


        let oldX = aventurier.x;
        let oldY = aventurier.y;

        let mouvInProgress = aventurier.seqMouv[0];
        // fonction central , l'aventurier effectu son mouvement (soit tourner a gauche, soit avancer, soit tourner a droite)
        if (mouvInProgress == 'A') {
          // on passe pour la suite si ce n'est pas avancé
          // si le mouvement n'est pas avancer on  passe à l'aventurier suivant
          // on ne mets pas a jour les coordonnée de la carte
          if (!this.map[aventurier.y][aventurier.x].valeur.includes("M") && !this.map[aventurier.y][aventurier.x].valeur.includes("T")) {
            if (this.cptPas != 0) {
              this.map[aventurier.y][aventurier.x].valeur = `(${this.cptAvancer++})`;
            } else {
              this.map[aventurier.y][aventurier.x].valeur = `.`;

            }
          }
          if (this.map[aventurier.y][aventurier.x].valeur.includes("T")) {
            this.cptAvancer++;
          }
        }
        // prevent  overmap
        if (aventurier.x < this.map.length || aventurier.x > -1 || aventurier.y < this.map[0].length || aventurier.y > -1) {
          aventurier.mouvement(this);
        } else {
          // en cas d'overmap on retire l'action actuelle de la liste pour pouvoir finir
          aventurier.seqMouv = aventurier.seqMouv.substring(1);

        }

        // dans les cas ou il tourne on ne fait rien
        if (mouvInProgress != 'A') {
          // on passe pour la suite si ce n'est pas avancé
          // si le mouvement n'est pas avancer on  passe à l'aventurier suivant
          // on ne mets pas a jour les coordonnée de la carte
          continue
        }


        if (this.map[aventurier.y][aventurier.x].valeur === 'M') {
          // si c'est une montagne(rien faire)
          // on revient à la fonction mouvement permet d'éviter que le héro avance dans ce cas

          continue
        }

        if (this.map[aventurier.y][aventurier.x].valeur.includes('T')) {
          for (let tresor of this.tresors) {
            if (tresor.x == aventurier.y && tresor.y == aventurier.x) {
              // on met a jour les compteur des structure
              // le hero met ensuite a jour la carte
              tresor.tresorFind()
              aventurier.findTresor();


              this.map[aventurier.y][aventurier.x].valeur = `T(${tresor.nbTresor})`
            }
            // si le trésor tombe à zero on met le nom de l'aventurier
            if (tresor.nbTresor == 0) {
              // on a trouvé le dernier trésor
              this.map[aventurier.y][aventurier.x].valeur = `A(${aventurier.nom})`
              // remove the tresor of liste because it empty
              this.tresors = this.tresors.filter(item => !Object.is(item, tresor))
            }
          }
        } else {
          this.map[aventurier.y][aventurier.x].valeur = `A(${aventurier.nom})`
        }
      }



    }
    // Check si tout les aventurier on tous fini leur mouvement => fin de partie
    let finishPartie = false;

    // recupere la taille de séquence de l'aventurier le plus grand et verifie si elle est a zero
    // si c'est le cas la partie est fini
    let maxPas = Math.max(...this.aventuriers.map(x => x.seqMouv.length));
    this.cptPas++

    if (maxPas == 0) {
      this.finish = true;
      this.cptPas = 0
      this.cptAvancer = 0;
    }

  }

  tradMaptoInstruction() {
    let res;
    // instruction carte
    res = 'C - ' + this.map[0].length + ' - ' + this.map.length + '\n';


    // montagne
    for (let montagne of this.montagnes) {
      res += 'M - ' + montagne.y + ' - ' + montagne.x + '\n';
    }

    // instruction tresor
    for (let tresor of this.tresors) {
      res += 'T - ' + tresor.y + ' - ' + tresor.x + ' - ' + tresor.nbTresor + '\n';
    }

    // instruction aventuriers
    for (let aventurier of this.aventuriers) {
      res += 'A - ' + aventurier.nom + ' - ' + aventurier.x + ' - ' + aventurier.y + ' - ' + aventurier.orientation + ' - ' + aventurier.tresorCollect + '\n';
    }
    return res;
  }

  downloadFinal() {
    if (this.finish) {
      let res = this.tradMaptoInstruction();
      const blob = new Blob([res], { type: 'text' });
      var fileLink = document.createElement('a');
      fileLink.href = window.URL.createObjectURL(blob);;

      // it forces the name of the downloaded file
      fileLink.download = 'resultats.txt';

      // triggers the click event
      fileLink.click();

      this.mapRecreation(this.tradMaptoInstruction());
    } else {
      alert('la partie n\'est pas fini')
    }
  }
}
