import { Component } from '@angular/core';
import { ResponseApi } from 'src/app/shared/models/response/ResponseApi';
import { DatosService } from 'src/app/shared/services/datos/datos.service';

@Component({
  selector: 'app-reporteador',
  templateUrl: './reporteador.component.html',
  styleUrls: ['./reporteador.component.scss']
})
export class ReporteadorComponent {
  
  public ofRepresentacion: any[] =[];

  constructor(private datosService: DatosService){}
  
  ngOnInit(){
    this.getOficinasRep();
  }
  
  public getOficinasRep(){
    this.datosService.getOficinasRep().subscribe((res:ResponseApi)=>{
      this.ofRepresentacion = res.data;
      console.log('Of.REP del padre', this.ofRepresentacion);
    });
  }
}
