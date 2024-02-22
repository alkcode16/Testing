import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url = environment.url;
  status: string = '';
  httpOtions = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(private http: HttpClient) {}

  getImage(path: string){
    const route = this.url + path;
    return this.http.get(route ,{responseType: 'blob'});
  }

  get(path: string){
    const route = this.url + path;
    return this.http.get(route);
  }

  post(path: string, body: {}): Observable<any> {
    const route = this.url + path;
    return this.http.post(route, body);
  }
}
