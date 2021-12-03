import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { RouterModule } from '@angular/router';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { APP_ROUTING } from './app.routing';

//Services Chile
import { HomeClService } from './services/home-cl.service';
import { PagesClService } from './services/pages-cl.service';


import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator';


import { OwlModule } from 'ngx-owl-carousel';
import {NgxPaginationModule} from 'ngx-pagination';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';// a plugin!
import listPlugin from '@fullcalendar/list';
import { CharPipe } from './pipes/char.pipe';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

// Componentes Chile

import { ChileComponent } from './chile/chile/chile.component';
import { MenuPrincipalChileComponent } from './chile/menu-principal-chile/menu-principal-chile.component';
import { NeplanClComponent } from './chile/representaciones/neplan-cl/neplan-cl.component';
import { HomeClComponent, SafeHtmlPipe } from './chile/home-cl/home-cl.component';
import { FooterChileComponent } from './chile/footer-chile/footer-chile.component';
import { TopbarChileComponent } from './chile/topbar-chile/topbar-chile.component';
import { PensamientoCorporativoClComponent } from './chile/nosotros/pensamiento-corporativo-cl/pensamiento-corporativo-cl.component';
import { CapacitacionChileComponent } from './chile/capacitacion-chile/capacitacion-chile.component';
import { InternaCapacitacionChileComponent } from './chile/interna-capacitacion-chile/interna-capacitacion-chile.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PoliticaGestionIntegralClComponent } from './chile/nosotros/politica-gestion-integral-cl/politica-gestion-integral-cl.component';
import { EstudiosSistemasElectricosClComponent } from './chile/servicios/estudios-sistemas-electricos-cl/estudios-sistemas-electricos-cl.component';
import { DisenoEIngenieriaClComponent } from './chile/servicios/diseno-e-ingenieria-cl/diseno-e-ingenieria-cl.component';
import { PruebasAutomatizacionControlClComponent } from './chile/servicios/pruebas-automatizacion-control-cl/pruebas-automatizacion-control-cl.component';
import { ContactenosClComponent } from './chile/contactenos-cl/contactenos-cl.component';
import { ProyectosClComponent } from './chile/proyectos-cl/proyectos-cl.component';
import { PublicacionesClComponent } from './chile/publicaciones-cl/publicaciones-cl.component';
import { PublicacionInternaClComponent } from './chile/publicaciones-cl/publicacion-interna-cl/publicacion-interna-cl.component';
import { XgslabClComponent } from './chile/representaciones/xgslab-cl/xgslab-cl.component';
import { TrabajeConNosotrosClComponent } from './chile/trabaje-con-nosotros-cl/trabaje-con-nosotros-cl.component';
import { VacanteInternaClComponent } from './chile/trabaje-con-nosotros-cl/vacante-interna-cl/vacante-interna-cl.component';
import { MenuVerticalClComponent } from './chile/menu-vertical-cl/menu-vertical-cl.component';

import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { BuscadorClComponent } from './chile/buscador-cl/buscador-cl.component';
import { DranetzClComponent } from './chile/representaciones/dranetz-cl/dranetz-cl.component';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    ChileComponent,
    MenuPrincipalChileComponent,
    NeplanClComponent,
    CharPipe,
    HomeClComponent,
    FooterChileComponent,
    TopbarChileComponent,
    PensamientoCorporativoClComponent,
    CharPipe,
    CapacitacionChileComponent,
    InternaCapacitacionChileComponent,
    PoliticaGestionIntegralClComponent,
    EstudiosSistemasElectricosClComponent,
    DisenoEIngenieriaClComponent,
    PruebasAutomatizacionControlClComponent,
    ContactenosClComponent,
    ProyectosClComponent,
    PublicacionesClComponent,
    PublicacionInternaClComponent,
    XgslabClComponent,
    TrabajeConNosotrosClComponent,
    VacanteInternaClComponent,
    MenuVerticalClComponent,
    FilterPipe,
    BuscadorClComponent,
    DranetzClComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IvyCarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularPaginatorModule,
    NgxSkeletonLoaderModule.forRoot(),
    APP_ROUTING,
    OwlModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgxCaptchaModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    //CHILE
    HomeClService,
    PagesClService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
