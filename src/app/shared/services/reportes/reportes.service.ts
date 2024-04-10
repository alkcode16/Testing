import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConectionService } from '../operations/conection.service';
import { ResponseApi } from 'src/app/modelos/response-api-model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private conection:ConectionService) { }

  public consultaDinamicaReportes(body:any): Observable<ResponseApi>{
    console.log(body);
    return this.conection.post(`reporte/reporteDinamico`, body);
  }
}
