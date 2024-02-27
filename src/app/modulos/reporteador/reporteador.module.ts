import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteadorRoutingModule } from './reporteador-routing.module';
import { ReporteadorComponent } from './reporteador.component';
import { ConsultaComponent } from './consulta/consulta.component';


@NgModule({
  declarations: [
    ReporteadorComponent
  ],
  imports: [
    CommonModule,
    ReporteadorRoutingModule,
    ConsultaComponent
  ]
})
export class ReporteadorModule { }
