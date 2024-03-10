import { formatDate } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from 'src/app/shared/services/operations/export.service';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})


export class ResultadoComponent {

  @Input() public data:any;
  
  modalReference!: NgbModalRef;

  modal = inject(NgbModal);
  export = inject(ExportService);

  ngOnInit(){
    console.log(this.data);
    
  }

  public close(){
    this.modal.dismissAll();
  }

  public downloadPdf(){
    let fec_pago : string = '';
    if(this.data.fecha_pago.day === undefined){
      fec_pago = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

    }else{
      fec_pago = this.data.fecha_pago.day + '/' +
                     (this.data.fecha_pago.month < 10 ? '0'+this.data.fecha_pago.month : this.data.fecha_pago.month) + '/'+
                     this.data.fecha_pago.year;
    }         

    console.log(fec_pago);
    
    this.export.exportReport(fec_pago).subscribe(report=>{
      console.log('Se descargo el pdf');
    });
  }

  public captura(){
    this.export.captura('tabla').subscribe(res=>{
      console.log('IMAGEN DESCARGADA');
    });
    
  }

}
