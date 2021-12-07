import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableGlobalService {

  private data = new BehaviorSubject(null);
  private cate = new BehaviorSubject(null);
  private busca = new BehaviorSubject(null);
  currentCategory = this.cate.asObservable();
  currentMessage = this.data.asObservable();
  currentBusca = this.busca.asObservable();
  //data: any;

  changeMessage() {

    this.consultarDatosLocales();
  }

  constructor(@Inject(PLATFORM_ID) private platformid) {
    this.consultarDatosLocales();
  }

  setCategoria(categoria){
    this.cate.next(categoria);

  }

  setBuscador(busqueda: string){
    this.busca.next(busqueda);
  }

  consultarDatosLocales() {
    if(isPlatformBrowser(this.platformid)){
      this.data.next(JSON.parse(localStorage.getItem('carrito'))) ;
    }
  }

}
