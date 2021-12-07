import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenusClService {
  public menu: string;

  constructor(public _http: HttpClient) { 
    this.menu = environment.menuChile;
  }

  getMenuPrincipal(): Observable<any>{
    return this._http.get(`${this.menu}/menus/menu-principal`);
  }
  getFooter(): Observable<any>{
    return this._http.get(`${this.menu}/menus/24`);
  }
  getFooterContacto(): Observable<any>{
    return this._http.get(`${this.menu}/menus/25`);
  }
  getFooterCertificados(): Observable<any>{
    return this._http.get(`${this.menu}/menus/26`);
  }
}
