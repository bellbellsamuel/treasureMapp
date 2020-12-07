import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteComponent } from './shared/component/carte/carte.component';


const routes: Routes = [
  { path: '', loadChildren: './shared/shared.module#SharedModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
