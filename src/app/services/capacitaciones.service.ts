import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionesService {
  url_chile: string = `${environment.domain}/chile/wp-json/wp/v2`;

  constructor(private http: HttpClient) {
   }

 getCapacitacionesChile(){
  return this.http.get(`${this.url_chile}/capacitaciones`);
}
getCategoriaCapacitacionesChile(){
  return this.http.get(`${this.url_chile}/categorias_capacitaciones`)
}
getCategoriaCapacitacionesIdChile(id: number){
  return this.http.get(`${this.url_chile}/categorias_capacitaciones/${id}`);
}
getCapacitacionesIdChile(id: number){
 return this.http.get(`${this.url_chile}/capacitaciones/${id}`);
}
}
