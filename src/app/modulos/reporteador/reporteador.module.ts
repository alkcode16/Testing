import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteadorRoutingModule } from './reporteador-routing.module';
import { ReporteadorComponent } from './reporteador.component';


@NgModule({
  declarations: [
    ReporteadorComponent
  ],
  imports: [
    CommonModule,
    ReporteadorRoutingModule,
  ]
})
export class ReporteadorModule { }
