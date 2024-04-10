import { formatDate } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from 'src/app/shared/services/operations/export.service';

import html2canvas from 'html2canvas';
import { Reporte, ReporteClass } from 'src/app/shared/models/reporte/Reporte';
import { ReporteResponse, ReporteResponseClass } from 'src/app/shared/models/reporteResponse/ReporteResponse';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})


export class ResultadoComponent {

  @Input() public data:ReporteResponse = new ReporteResponseClass;
  public datos:Object = {};
  public headerTabla: string[] = [];
  public datosTabla: Reporte[] = [];
  public total_dev: number = 0;
  public total_ispt: number = 0;
  public liquido: number = 0;
  
  modalReference!: NgbModalRef;

  modal = inject(NgbModal);
  export = inject(ExportService);

  ngOnInit(){
    console.log('DATA GENERAL',this.data);
    this.formatearDataReporte(this.data)
    this.datosTabla =  this.data.datos;

    this.datosTabla.forEach((element:Reporte)=>{
      // console.log('===>',element);
      this.total_dev = this.total_dev + element.total_devengos;
      this.total_ispt = this.total_ispt + element.ispt;
      this.liquido = this.liquido + element.liquido;
    });

    console.log(this.total_dev, this.total_ispt, this.liquido);
    
    
  }

  public close(){
    this.modal.dismissAll();
  }

  public downloadPdf(){

    this.export.exportReport(this.datos, this.headerTabla).subscribe(report=>{
      console.log('Se descargo el pdf');
    });
  }

  public captura(){
    this.export.captura('tabla').subscribe(res=>{
      console.log('IMAGEN DESCARGADA');
    });
    
  }

  public formatearDataReporte(data:any){
    console.log('Recibiendo informacion:', data);

    if(data.parametros.id_empleado !== ''){
      let datosGenerales:Object = {
        id_empleado: data.datos[0].id_empleado,
        nombre: data.datos[0].nombre,
        puesto: `${data.datos[0].id_puesto_plaza} - ${data.datos[0].n_puesto_plaza}`,
        horario: `${data.datos[0].id_horario} - ${data.datos[0].n_horario}`,
        nivel: `${data.datos[0].id_nivel} / ${data.datos[0].id_sub_nivel}`,
        area_gen: `${data.datos[0].id_area_generadora} - ${data.datos[0].n_area_generadora}`
      };
  
      // console.log('xdxd',datosGenerales);
      
  
      let datosRegistros:Object[] = [];
      this.headerTabla = ['Fecha de Pago', 'Fecha de imputación', 'Total', 'ISPT', 'Liquido'];
      data.datos.forEach((reporte:Reporte)=>{
        // console.log('--->', reporte);
  
        let datosTabla:Object = {
            fec_pago: reporte.fec_pago,
            fec_imputacion: reporte.fec_imputacion,
            total: reporte.total_devengos,
            ispt: reporte.ispt,
            liquido: reporte.liquido
          }
        
        datosRegistros.push(datosTabla);
        
      });
  
      this.datos = {
        datosGenerales,
        datosRegistros
      }
  
      // console.log('1111111111111',this.datos);
      
    }

    
    
  }

}
