import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteadorComponent } from './modulos/reporteador/reporteador.component';
import { MainComponent } from './modulos/main/main.component';
import { FileUploadComponent } from './modulos/file-upload/file-upload.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  {
    path: 'reportes',
    component: ReporteadorComponent,
    loadChildren: () =>
      import('./modulos/reporteador/reporteador.module').then(
        (m) => m.ReporteadorModule
      ),
  },
  {
    path: 'expediente',
    component: FileUploadComponent,
    loadChildren: () =>
      import('./modulos/file-upload/file-upload.module').then(
        (m) => m.FileUploadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
