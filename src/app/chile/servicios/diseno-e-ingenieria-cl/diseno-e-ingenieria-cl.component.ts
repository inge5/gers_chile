import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { PagesClService } from '../../../services/pages-cl.service';

@Component({
  selector: 'app-diseno-e-ingenieria-cl',
  templateUrl: './diseno-e-ingenieria-cl.component.html',
  styleUrls: ['./diseno-e-ingenieria-cl.component.css']
})
export class DisenoEIngenieriaClComponent implements OnInit {
  loader = true;
  seccion_1_data: any = {};
  seccion_iconos_data: any[] = [];
  item_tab_data: any[] = [];
  texto_columna_1_data:any = {};
  texto_columna_2_data:any = {};
  public activePillIndex:number = 0;

  constructor(private disenoingenieria:PagesClService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaDisenoIng();
    this.disenoingenieria.getDisenoIngenieria()
      .subscribe((res:any) => {
        this.loader = false;
        this.seccion_1_data = res.acf.seccion_1;
        this.seccion_iconos_data = res.acf.seccion_iconos;
        this.item_tab_data = res.acf.item_tab;
        this.texto_columna_1_data = res.acf.texto_columna_1;
        this.texto_columna_2_data = res.acf.texto_columna_2;
      });
  }

  public selectPill(index:number) {
    this.activePillIndex = index;
    // do some other stuff if necessary...
   }

}
