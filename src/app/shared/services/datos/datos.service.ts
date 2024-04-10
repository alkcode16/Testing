import { Injectable } from '@angular/core';
import { ConectionService } from '../operations/conection.service';
import { Observable, of } from 'rxjs';
import { ResponseApi } from 'src/app/modelos/response-api-model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private conection: ConectionService) { }

  public getOficinasRep():Observable<ResponseApi>{
    return this.conection.get(`datos/del`);
  }

  public getCentrosTrab(id:string):Observable<ResponseApi>{
    if(id===''){
      return of();
    }
    return this.conection.get(`datos/cts?id_div_geografica=${id}`);
  }

  public getPuestosPlazas():Observable<ResponseApi>{
    return this.conection.get(`datos/puestos_plaza`);
  }

  public getServicios():Observable<ResponseApi>{
    return this.conection.get(`datos/servicios`);
  }
}
