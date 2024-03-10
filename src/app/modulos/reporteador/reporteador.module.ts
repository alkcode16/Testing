import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteadorRoutingModule } from './reporteador-routing.module';
import { ReporteadorComponent } from './reporteador.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { TablaComponent } from './tabla/tabla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ReporteadorComponent,
    ResultadoComponent
  ],
  imports: [
    CommonModule,
    ReporteadorRoutingModule,
    ConsultaComponent,
    ToastComponent,
    TablaComponent,
    ReactiveFormsModule,
    NgbHighlight
  ]
})
export class ReporteadorModule { }
