import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesClService {

  public url: string;

  constructor(private _http: HttpClient) { 
    this.url = environment.urlChile;
  }
  getPensamientoCorporativo(): Observable<any>{
    return this._http.get(`${this.url}/pages/98/`);
  }
  getPoliticaGestionIntegral(): Observable<any>{
    return this._http.get(`${this.url}/pages/142/`)
  }
  getContactenos(): Observable<any>{
    return this._http.get(`${this.url}/pages/265/`)
  }

  //SERVICIOS
  getEstudioSistemasElectricos(): Observable<any>{
    return this._http.get(`${this.url}/servicios/355/`)
  }
  getDisenoIngenieria(): Observable<any>{
    return this._http.get(`${this.url}/servicios/356/`)
  }
  getPruebasAutomatizacionControl(): Observable<any>{
    return this._http.get(`${this.url}/servicios/357/`)
  }

  // REPRESENTACIONES
  getNeplan(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/238/`)
  }
  getXgslab(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/319/`)
  }
  getDranetz(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/864`)
  }

  //PROYECTOS
  getProyectos(): Observable<any>{
    return this._http.get(`${this.url}/proyectos?per_page=40`);
  }

  /**** Página Proyectos *****/
  getProyectosPagina(): Observable<any>{
    return this._http.get(`${this.url}/pages/298`)
  }

}

