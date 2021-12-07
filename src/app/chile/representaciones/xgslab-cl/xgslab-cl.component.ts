import { PagesClService } from '../../../services/pages-cl.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-xgslab-cl',
  templateUrl: './xgslab-cl.component.html',
  styleUrls: ['./xgslab-cl.component.css']
})
export class XgslabClComponent implements OnInit {
  loader = true;
  banner_data : any = {};
  seccion_1_data : any = {};
  seccion_2_data: any = {};
  modulo_data: any[] = [];
  seccion_3_data: any = {};

  constructor(private _xgslab:PagesClService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaXgslab();
    this._xgslab.getXgslab()
      .subscribe((res:any) => {
        this.loader = false;
        this.banner_data = res.acf.banner;
        this.seccion_1_data = res.acf.seccion_1;
        this.seccion_2_data = res.acf.seccion_2;
        this.modulo_data = res.acf.seccion_2.modulo;
        this.seccion_3_data = res.acf.seccion_3;
      });
  }

}
