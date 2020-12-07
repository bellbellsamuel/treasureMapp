import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CarteComponent } from './carte.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { iterator } from 'core-js/fn/symbol';
import { ExpectedConditions } from 'protractor';

describe('CarteComponent', () => {
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  let fileUrl = '/assets/instructionMapAventurier.txt'



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarteComponent],
      imports: [
        HttpClientTestingModule

      ],

    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    //httpTestingController.verify(); //Verifies that no requests are outstanding.
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('first line of file is #', () => {
    fileUrl = '/assets/instructionMapAventurier.txt'
    let instruction = ''
    component.getFile(fileUrl).subscribe((res) => {
      let instructions = String(res).split('\n')
      instruction = instructions[0]
      expect(instructions[0]).toBe('#')

    })

    const req = httpMock.match(fileUrl);

    expect(req[1].request.method).toEqual("GET");
    // simulé le fichier ici
    let fileContent = "#\nC​ - 3 - 4\nM​ - 1 - 1M​ - 2 - 2\nT​ - 0 - 3 - 2\nT​ - 1 - 3 - 1"
    req[1].flush(fileContent);


    httpMock.verify();



  })

  let fileContent =
    'C​ - 3 - 4\n' +
    'M​ - 1 - 0\n' +
    'M​ - 2 - 1\n' +
    'T​ - 0 - 3 - 2\n' +
    'T​ - 1 - 3 - 3\n' +
    'A​ - Lara - 1 - 1 - S - AADADAGGA\n'


  it('map size create largeur 3, hauteur: 4', () => {

    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    let hauteur = component.map.length;
    let largeur = component.map[0].length;
    expect(largeur).toEqual(3);
    expect(hauteur).toEqual(4);


  })

  it('montagne location should be', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent)


    expect(component.montagnes[0].x).toEqual(0)
    expect(component.montagnes[0].y).toEqual(1)

    expect(component.montagnes[1].x).toEqual(1)
    expect(component.montagnes[1].y).toEqual(2)




  })

  it('tresor location and nb tresor should be', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);


    expect(component.tresors[0].x).toEqual(3)
    expect(component.tresors[0].y).toEqual(0)
    expect(component.tresors[0].nbTresor).toEqual(2)


    expect(component.tresors[1].x).toEqual(3)
    expect(component.tresors[1].y).toEqual(1)
    expect(component.tresors[1].nbTresor).toEqual(3)



  })

  it('aventurier location should be', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    expect(component.aventuriers[0].x).toEqual(1)
    expect(component.aventuriers[0].y).toEqual(1)



  })



  it('pas is working', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    let posXBeforepas = component.aventuriers[0].x;
    let posYBeforepas = component.aventuriers[0].y;

    component.pas()

    // le premier pas est un avancer vers le sud donc
    expect(component.aventuriers[0].y).toEqual(2)

  })

  it('tresor found', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    //au 4e pas on avance sur un trésor donc trésor found est appelé
    let beforeFindTresor = component.tresors

    let beforeherocollectTresorFound = 0
    let nbtresor1 = component.tresors[0].nbTresor
    let nbtresor2 = component.tresors[1].nbTresor

    component.pas()
    expect(component.aventuriers[0].y).toEqual(2)

    component.pas()
    expect(component.aventuriers[0].y).toEqual(3)
    expect(component.aventuriers[0].tresorCollect).toEqual(beforeherocollectTresorFound + 1)

    // premier tresor trouvé

    component.pas()

    component.pas()
    //deuxieme trésor trouver


    expect(component.aventuriers[0].tresorCollect).toEqual(beforeherocollectTresorFound + 2)

    // la valeur nbtresor des deux trésor à diminuer de 1
    expect(component.tresors[0].nbTresor).toEqual(nbtresor1 - 1)
    expect(component.tresors[1].nbTresor).toEqual(nbtresor2 - 1)

  })

  it('la partie est fini?', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'



    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    while (!component.finish) {
      component.pas()
    }

    expect(component.finish).toBeTruthy()


  })


  it('aventurier is surrounded  by mountain should not move', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'
    let fileContent2 =
      'C​ - 3 - 4\n' +
      'M​ - 1 - 2\n' +
      'M​ - 1 - 0\n' +
      'M​ - 0 - 1\n' +
      'M​ - 2 - 1\n' +
      'A​ - Indiana - 1 - 1 - S - AADADA\n'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent2);

    expect(req.length).toEqual(1)


    let oldX = component.aventuriers[0].x
    let oldY = component.aventuriers[0].y
    // quand tout la séquences de mouvement de l'aventurier est vide
    // quand il y a plusieur aventurier aussi
    while (!component.finish) {
      component.pas()
    }



    expect(oldX).toEqual(component.aventuriers[0].x)
    expect(oldY).toEqual(component.aventuriers[0].y)
  })

  it('aventurier location should be at end', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    // quand tout la séquences de mouvement de l'aventurier est vide
    // quand il y a plusieur aventurier aussi
    while (!component.finish) {
      component.pas()
    }



    // le premier pas est un avancer vers le sud donc
    expect(component.aventuriers[0].y).toEqual(3)
    expect(component.aventuriers[0].x).toEqual(0)



  })



  it(' end file is line are', () => {
    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    // quand tout la séquences de mouvement de l'aventurier est vide
    // quand il y a plusieur aventurier aussi
    while (!component.finish) {
      component.pas()
    }
    let res = component.tradMaptoInstruction();
    let instructions = String(res).split('\n')
    expect(instructions[0]).toBe('C​ - 3 - 4'.replace(/\u200B/g, ''))
    expect(instructions[1]).toBe('M​ - 1 - 0'.replace(/\u200B/g, ''))
    expect(instructions[2]).toBe('M​ - 2 - 1'.replace(/\u200B/g, ''))
    expect(instructions[3]).toBe('T​ - 1 - 3 - 2'.replace(/\u200B/g, ''))
    expect(instructions[4]).toBe('A​ - Lara - 0 - 3 - S - 3'.replace(/\u200B/g, ''))
  })

  it(' regenerate final map should be:', () => {
    let finalMap = ['.', 'M', '.',
      '.', '.', 'M',
      '.', '.', '.',
      'A(Lara)', 'T(2)', '.']

    const req = httpMock.match(fileUrl);

    fileUrl = '/assets/instructionMapAventurier.txt'

    // permet de simuler la requete et sa réponse qui sont appelé dans le constructeur, il est nécessaire d'avoir le fichier rendu à la lecture...
    req[0].flush(fileContent);

    // quand tout la séquences de mouvement de l'aventurier est vide
    // quand il y a plusieur aventurier aussi
    while (!component.finish) {
      component.pas()
    }
    let res = component.tradMaptoInstruction();

    component.mapRecreation(res);
    let cpt = 0
    for (let i = 0; i < component.map.length; i++) {
      for (let y = 0; y < component.map[0].length; y++) {
        // comparaison entre la liste d'élément générer par la lecture de gauche à droite et de haut en bas
        // de la map
        expect(component.map[i][y].valeur).toBe(finalMap[cpt])
        cpt++;
      }
    }


  })


});

