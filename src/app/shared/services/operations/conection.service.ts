import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentReportes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {

  url = environmentReportes.url;
  status: string = '';
  httpOtions = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(private http: HttpClient) {}

  getImage(path: string){
    const route = this.url + path;
    return this.http.get(route ,{responseType: 'blob'});
  }

  get(path: string):Observable<any>{
    const route = this.url + path;
    return this.http.get(route, this.httpOtions);
  }

  getConBody(path: string, body:any):Observable<any>{
    const route = this.url + path;
    return this.http.get(route, body);
  }

  post(path: string, body: {}): Observable<any> {
    const route = this.url + path;
    return this.http.post(route, body);
  }
}
