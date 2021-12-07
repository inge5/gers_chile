import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { PagesClService } from '../../../services/pages-cl.service';


@Component({
  selector: 'app-pruebas-automatizacion-control-cl',
  templateUrl: './pruebas-automatizacion-control-cl.component.html',
  styleUrls: ['./pruebas-automatizacion-control-cl.component.css']
})
export class PruebasAutomatizacionControlClComponent implements OnInit {
  loader = true;
  seccion_1_data: any = {};
  item_tab_data: any[] = [];
  public activePillIndex:number = 0;

  constructor(private _pruebasautomatizacioncontrol:PagesClService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaPruebaAutomatizacion();
    this._pruebasautomatizacioncontrol.getPruebasAutomatizacionControl()
    .subscribe((res:any) => {
      this.loader = false;
      this.seccion_1_data = res.acf.seccion_1;
      this.item_tab_data = res.acf.item_tab;
    });
  }

  public selectPill(index:number) {
    this.activePillIndex = index;
    // do some other stuff if necessary...
   }

}
