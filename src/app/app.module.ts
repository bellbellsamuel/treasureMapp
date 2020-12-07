import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
/*import { AventurierComponent } from './shared/component/aventurier/aventurier.component';
import { TresorComponent } from './shared/component/tresor/tresor.component';
import { MontagneComponent } from './shared/component/montagne/montagne.component';
import { InputUploadComponent } from './shared/component/input-upload/input-upload.component';
import { CarteComponent } from './shared/component/carte/carte.component';
import { CaseComponent } from './shared/component/case/case.component';*/
import { SharedModule } from './shared/shared.module'
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    /* CarteComponent,
     CaseComponent,
     AventurierComponent,
     TresorComponent,
     MontagneComponent,
     InputUploadComponent*/
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
