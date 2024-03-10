import { Component, LOCALE_ID, inject } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoComponent } from '../resultado/resultado.component';
import { DialogServiceService } from 'src/app/shared/services/dialog/dialog-service.service';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, ReactiveFormsModule, JsonPipe, NgbToastModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'es-MX'}
  ]
})
export class ConsultaComponent {
  show = false;
	autohide = true;
  //Imports
  today = inject(NgbCalendar).getToday();
  dialog = inject(DialogServiceService);
  fb = inject(FormBuilder);

  //Variables
	model!: NgbDateStruct;
	date!: { year: number; month: number };

  formularioConsulta: FormGroup  = this.fb.group({
    fecha_pago: this.fb.control('', Validators.required),
    id_empleado: this.fb.control(''),
    delegacion: this.fb.control(''),
    ct: this.fb.control(''),
    puesto: this.fb.control(''),
    servicio: this.fb.control(''),
    area_gen: this.fb.control(''),
  });

  ngOnInit(){}
  
  public buscar(){
    this.dialog.openModal(
      ResultadoComponent, 
      // this.data,
      this.formularioConsulta.value,
      true,
      true,
      'xl'
    );
  }
}
