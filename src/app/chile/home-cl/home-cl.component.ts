import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HomeClService } from '../../services/home-cl.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // return this.sanitized.bypassSecurityTrustHtml(value);
    switch (type) {
      case 'html': return this.sanitized.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitized.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitized.bypassSecurityTrustScript(value);
      case 'url': return this.sanitized.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitized.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}

@Component({
  selector: 'app-home-cl',
  templateUrl: './home-cl.component.html',
  styleUrls: ['./home-cl.component.css']
})
export class HomeClComponent implements OnInit {

  loader = true;

  sliderprincipal_data:any = [];
  generando_soluciones_data:any[] = [];
  proyectos_realizados_data:any[] = [];
  titulo_servicios_eficientes_data:any[] = [];
  servicios_eficientes_data:any[] = [];
  ejecucion_de_monitoreo_data:any[] = [];
  tabs_data:any[] = [];
  titulo_marcas_data:any[] = [];
  marcas_datas:any[] = [];
  Images:any[] = [];
  tituloproyectos:any[] = [];
  FeaturedProyects:any[] = [];
  tituloInternacional:any[] = [];
  paisesInternacionales:any[] = [];
  nuestrosClientes:any[] = [];
  equipoTrabajo:any[] = [];
  vacantes:any[] = [];

  constructor(private _sanitizer: DomSanitizer, private _homeClService:HomeClService, private _proyectosusa:HomeClService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaInicio();
    this._homeClService.getHome()
      .subscribe((res:any) => {
        this.loader = false;
        this.sliderprincipal_data = this._sanitizer.bypassSecurityTrustHtml(res);
        this.sliderprincipal_data = this.sliderprincipal_data.changingThisBreaksApplicationSecurity;

        this.generando_soluciones_data = res.acf.generando_soluciones;
        this.proyectos_realizados_data = res.acf.proyectos_realizados; 
        this.titulo_servicios_eficientes_data = res.acf.titulo_servicios_eficientes; 
        this.servicios_eficientes_data = res.acf.servicios_eficientes; 
        this.ejecucion_de_monitoreo_data = res.acf.ejecucion_de_monitoreo; 
        this.tabs_data = res.acf.tabs;
        this.titulo_marcas_data = res.acf.titulo_marcas;
        this.marcas_datas = res.acf.marcas;
        this.tituloproyectos = res.acf.titulo_proyectos;
        this.tituloInternacional = res.acf.titulo_contactos_internacionales;
        this.paisesInternacionales = res.acf.paises_internacionales;
        this.nuestrosClientes = res.acf.clientes;
        this.equipoTrabajo = res.acf.equipo_de_trabajo;
        this.vacantes = res.acf.vacantes;
      });

    this._proyectosusa.getProyects()
    .subscribe((res:any) => {
      this.FeaturedProyects = res;
    });
  }

}
