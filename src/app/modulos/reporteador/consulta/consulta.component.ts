import { Component, Input, LOCALE_ID, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoComponent } from '../resultado/resultado.component';
import { DialogServiceService } from 'src/app/shared/services/dialog/dialog-service.service';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ReportesService } from 'src/app/shared/services/reportes/reportes.service';
import { Reporte, ReporteClass } from 'src/app/shared/models/reporte/Reporte';
import { ResponseApi } from 'src/app/modelos/response-api-model';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { DatosService } from 'src/app/shared/services/datos/datos.service';
import { switchMap, tap } from 'rxjs';
registerLocaleData(es);

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule, 
    NgbDatepickerModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    NgbToastModule,
    ToastComponent
  ],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'es-MX'}
  ]
})
export class ConsultaComponent {
  @Input() ofRep: any = ''
  public mensaje: string = '';
  public encontrado = 0;

  public registros: Reporte[] = [];
  public busqueda: Reporte = new ReporteClass();

  /* Catalogos */
  public ofRepresentacion: any[] = [];
  public cts: any[] = [];
  public puestos_plaza: any[] = [];
  public servicios: any[] = [];
  /* Catalogos */

  dialog = inject(DialogServiceService);
  fb = inject(FormBuilder);
  reportesService= inject(ReportesService);
  datosService = inject(DatosService);

  //Variables
	model!: NgbDateStruct;
	date!: { year: null; month: null, day:null };

  formularioConsulta: FormGroup  = this.fb.group({
    id_empleado: this.fb.control(''),
    fecha_pago: this.fb.control(''),
    fecha_imputacion: this.fb.control(''),
    id_div_geografica: this.fb.control(''),
    id_centro_trabajo: this.fb.control(''),
    id_puesto_plaza: this.fb.control(''),
    id_clave_servicio: this.fb.control(''),
    id_horario: this.fb.control(''),
    id_nivel: this.fb.control(''),
    id_sub_nivel: this.fb.control(''),
    id_turno: this.fb.control(''),
    id_tipo_jornada: this.fb.control(''),
    id_centro_pago: this.fb.control(''),
    id_tipo_tabulador: this.fb.control(''),
    id_tipo_puesto: this.fb.control(''),
    id_zona: this.fb.control(''),
    id_area_generadora: this.fb.control(''),
  });

  ngOnInit(){
    console.log('Recibo', this.ofRep);
    
    this.getOficinasRep();
    this.getPuestosPlaza();
    this.getServicios();
    // this.getCentrosTrabajo();
    // this.changeSelectOptions();
  }
  
  public buscar(){
    this.mensaje = '';
    this.encontrado = 0;
    this.registros = [];
    
    this.busqueda = {
      id_empleado: this.formularioConsulta.value.id_empleado,
      nombre: '',
      id_empresa: '',
      id_sociedad:'',
      // fec_pago: this.formularioConsulta.value.fecha_pago.year! +'-'+
      //           (this.formularioConsulta.value.fecha_pago.month! < 10 ? '0'+ this.formularioConsulta.value.fecha_pago.month!: this.formularioConsulta.value.fecha_pago.month!) +'-'+
      //           this.formularioConsulta.value.fecha_pago.day!,
      // fec_imputacion: this.formularioConsulta.value.fec_imputacion.year! +'-'+
      //           (this.formularioConsulta.value.fec_imputacion.month! < 10 ? '0'+ this.formularioConsulta.value.fec_imputacion.month!: this.formularioConsulta.value.fec_imputacion.month!) +'-'+
      //           this.formularioConsulta.value.fec_imputacion.day!,
      fec_pago: this.formularioConsulta.value.fecha_pago,
      fec_imputacion: this.formularioConsulta.value.fecha_imputacion,
      id_centro_trabajo: this.formularioConsulta.value.id_centro_trabajo,
      id_div_geografica: this.formularioConsulta.value.id_div_geografica,
      num_cuenta:'',
      id_banco:'',
      total_devengos:0,
      liquido:0,
      ispt:0,
      id_clave_servicio: this.formularioConsulta.value.id_clave_servicio,
      id_horario: this.formularioConsulta.value.id_horario,
      n_horario:'',
      id_nivel: this.formularioConsulta.value.id_nivel,
      id_sub_nivel: this.formularioConsulta.value.id_sub_nivel,
      id_puesto_plaza: this.formularioConsulta.value.id_puesto_plaza,
      n_puesto_plaza:'',
      id_turno: this.formularioConsulta.value.id_turno,
      id_tipo_jornada: this.formularioConsulta.value.id_tipo_jornada,
      id_centro_pago: this.formularioConsulta.value.id_centro_pago,
      id_tipo_tabulador: this.formularioConsulta.value.id_tipo_tabulador,
      id_tipo_puesto: this.formularioConsulta.value.id_tipo_puesto,
      id_zona: this.formularioConsulta.value.id_zona,
      id_area_generadora: this.formularioConsulta.value.id_area_generadora,
      n_area_generadora:''
    };

    // console.log(this.busqueda);

    this.reportesService.consultaDinamicaReportes(this.busqueda).subscribe((response: ResponseApi)=>{
      
      this.registros = response.data;

      let datos={
        parametros: this.busqueda,
        datos:this.registros
      }

      // console.log(datos);
      
      if(this.registros.length === 0){
        console.log(response.message);
      }else{
        this.mensaje = response.message;
        this.encontrado = 1;

        this.dialog.openModal(
          ResultadoComponent,
          // this.registros,
          datos,
          true,
          true,
          'xl'
        )
      }
    }, (error)=>{
      console.log('Entro al error',error.error.message);
      this.mensaje = error.error.message;
      this.encontrado = 2;
      
    });

  }

  // Catalogos
  public getOficinasRep(){
    this.datosService.getOficinasRep().subscribe((res:ResponseApi)=>{
      this.ofRepresentacion = res.data;
      // console.log('Of.REP', this.ofRepresentacion);
    });
  }

  public getPuestosPlaza(){
    this.datosService.getPuestosPlazas().subscribe((response:ResponseApi)=>{
      this.puestos_plaza = response.data;
    });
  }

  public getServicios(){
    this.datosService.getServicios().subscribe((response:ResponseApi)=>{
      this.servicios = response.data;
    });
  }

  ///////////////////////////////////Select//////////////////////////////// 
  public changeSelectOptions(){
    // SELECT Of de representacion
    this.formularioConsulta.get('id_div_geografica')?.valueChanges
    .pipe(
      tap((_)=>{
        this.formularioConsulta.get('id_centro_trabajo')?.reset('');
        this.cts = [];
      }),
      // debounceTime(500),
      switchMap((div_geografica: any)=> this.datosService.getCentrosTrab(div_geografica))
    )
    .subscribe(cts => {
      
      this.cts = cts.data;
      console.log(cts);

    });
  }

  public changeCts(){
    this.formularioConsulta.get('id_centro_trabajo')?.reset('');
    
    this.datosService.getCentrosTrab(this.formularioConsulta.value.id_div_geografica).subscribe(response=>{
      this.cts = response.data;
      console.log(this.cts);
      
    });
  }
}
