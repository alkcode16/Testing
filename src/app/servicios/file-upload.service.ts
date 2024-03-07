import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Observable, map, pipe } from 'rxjs';
import { ResponseApi } from '../modelos/response-api-model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private connectionService: ConnectionService) {}


  public getAllDirectories(): Observable<String[]> {
    return this.connectionService.get('expediente/directories')
    .pipe(map((ele: ResponseApi)=>{
      return ele.data;
    }))
  }

  public getFilesByRfc(_folderNameRfc: string): Observable<ResponseApi> {
    return this.connectionService
      .get(`expediente/archivos/${_folderNameRfc}`);
  }

  public saveFile(){
    
  }
}
