import { Component, OnInit } from '@angular/core';
import { PagesClService } from 'src/app/services/pages-cl.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-dranetz-cl',
  templateUrl: './dranetz-cl.component.html',
  styleUrls: ['./dranetz-cl.component.css']
})
export class DranetzClComponent implements OnInit {
  loader = true;
  banner_data : any = {};
  seccion_1_data : any = {};
  item_tab_data: any[] = [];
  public activePillIndex:number = 0;

  constructor(private _dranetz:PagesClService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaDranetz();
    this._dranetz.getDranetz()
      .subscribe((res:any) => {
        this.loader = false;
        this.banner_data = res.acf.banner;
        this.seccion_1_data = res.acf.seccion_1;
        this.item_tab_data = res.acf.item_tab;
      });
  }

  public selectPill(index:number) {
    this.activePillIndex = index;
    // do some other stuff if necessary...
   }

}
