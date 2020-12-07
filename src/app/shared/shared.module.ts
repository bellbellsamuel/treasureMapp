import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AventurierComponent } from './component/aventurier/aventurier.component';
import { CarteComponent } from './component/carte/carte.component';
import { InputUploadComponent } from './component/input-upload/input-upload.component';
import { MontagneComponent } from './component/montagne/montagne.component';
import { TresorComponent } from './component/tresor/tresor.component';
import { CaseComponent } from './component/case/case.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: CarteComponent,
    path: ''
  }
];

@NgModule({
  declarations: [
    CarteComponent,
    CaseComponent,
    AventurierComponent,
    TresorComponent,
    MontagneComponent,
    InputUploadComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes)

  ],
  exports: [
    CarteComponent,
    CaseComponent,
    AventurierComponent,
    TresorComponent,
    MontagneComponent,
    InputUploadComponent,
  ]
})
export class SharedModule { }
