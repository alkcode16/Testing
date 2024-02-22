import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteadorComponent } from './reporteador.component';

const routes: Routes = [
  { path:'', component:ReporteadorComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteadorRoutingModule { }
