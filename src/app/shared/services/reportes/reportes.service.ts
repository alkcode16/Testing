import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConectionService } from '../operations/conection.service';
import { ResponseApi } from 'src/app/modelos/response-api-model';
import { Reporte } from '../../models/reporte/Reporte';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private conection:ConectionService) { }

  public consultaDinamicaReportes(body:Reporte): Observable<ResponseApi>{
    console.log(body);
    return this.conection.post(`reporte/reporteDinamico`, body);
  }

  public consultaDinamicaReportesPaginacion(body:Reporte, paginacion:number): Observable<any>{
    console.log('===>',body, paginacion);
    console.log(`reporte/reporteDinamicoPage?page=${paginacion}`);
    
    return this.conection.post(`reporte/reporteDinamicoPage?page=${paginacion}`, body);
  }
}
