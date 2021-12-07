import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeClService {
  public base: string;
  public url: string;

  constructor(public _http: HttpClient) { 
    this.base = environment.baseChile;
    this.url = environment.urlChile;
  }

  getHome(): Observable<any>{
    return this._http.get(`${this.base}/pages/8/`);
  }

  getProyects(): Observable<any>{
    return this._http.get(`${this.url}/proyectos/`);
  }
}
