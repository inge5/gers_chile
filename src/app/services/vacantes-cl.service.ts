import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacantesClService {

  public url: string;

  constructor(private _http: HttpClient, private _router:Router) { 
    this.url = environment.urlChile;
  }

  getVacantes(): Observable<any>{
    return this._http.get(`${this.url}/vacantes`);
  }
  getCategoriasVacantes(): Observable<any>{
    return this._http.get(`${this.url}/categoria_vacantes`);
  }
  getVacante(slug: string): Observable<any>{
    return this._http.get(`${this.url}/vacantes/?slug=${slug}/`, {
    }).pipe(
        map(res => res),
        catchError(err =>{
          switch(err.status){
            case 404:
              this._router.navigate(['/404']);
              break;
          }
          return throwError('Error en el servicio');
        })
    );
  }
}
