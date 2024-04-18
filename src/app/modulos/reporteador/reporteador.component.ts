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
  public cts: any[] = [];
  public puestos_plaza: any[] = [];
  public servicios: any[] = [];

  constructor(private datosService: DatosService){}
  
  ngOnInit(){
    this.getOficinasRep();
    this.getPuestosPlaza();
    this.getServicios();
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
}
