import { Component, OnInit } from '@angular/core';
import { PagesClService } from '../../services/pages-cl.service';


@Component({
  selector: 'app-proyectos-cl',
  templateUrl: './proyectos-cl.component.html',
  styleUrls: ['./proyectos-cl.component.css']
})
export class ProyectosClComponent implements OnInit {
  FeaturedProyects:any[] = [];
  titulo_pagina_data: any;

  loader = true;

  constructor(private _proyectosService:PagesClService) { }

  ngOnInit(): void {
    this._proyectosService.getProyectos()
      .subscribe((res:any) => {
        this.loader = false;
        this.FeaturedProyects = res;
      });  
      this._proyectosService.getProyectosPagina()
      .subscribe((res:any) => {
        this.loader = false;
        this.titulo_pagina_data = res.acf.titulo_pagina;
      });  
  }

}
