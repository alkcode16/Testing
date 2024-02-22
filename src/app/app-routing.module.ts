import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteadorComponent } from './modulos/reporteador/reporteador.component';
import { MainComponent } from './modulos/main/main.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent},
  // { path: 'reporteador', component: ReporteadorComponent},
  { path:'reportes',
    loadChildren:() => import('./modulos/reporteador/reporteador.module').then( m=> m.ReporteadorModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
