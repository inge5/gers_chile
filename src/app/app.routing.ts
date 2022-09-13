import { Routes, RouterModule } from '@angular/router';

/* Chile*/
import { ChileComponent } from './chile/chile/chile.component';
import { NeplanClComponent } from './chile/representaciones/neplan-cl/neplan-cl.component';
import { HomeClComponent } from './chile/home-cl/home-cl.component';
import { PensamientoCorporativoClComponent } from './chile/nosotros/pensamiento-corporativo-cl/pensamiento-corporativo-cl.component';
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
import { CapacitacionChileComponent } from './chile/capacitacion-chile/capacitacion-chile.component';
import { InternaCapacitacionChileComponent } from './chile/interna-capacitacion-chile/interna-capacitacion-chile.component';
import { BuscadorClComponent } from './chile/buscador-cl/buscador-cl.component';
import { DranetzClComponent } from './chile/representaciones/dranetz-cl/dranetz-cl.component';

let APP_ROUTES: Routes = [];

APP_ROUTES = [
  {
    path: '',
    component: ChileComponent,
    children: [
      { path: '', component: HomeClComponent },
      {
        path: 'pensamiento-corporativo-cl',
        component: PensamientoCorporativoClComponent,
      },
      { path: 'capacitaciones', component: CapacitacionChileComponent },
      {
        path: 'capacitaciones/:id',
        component: InternaCapacitacionChileComponent,
      },
      {
        path: 'politica-gestion-integral-cl',
        component: PoliticaGestionIntegralClComponent,
      },
      {
        path: 'estudios-sistemas-cl',
        component: EstudiosSistemasElectricosClComponent,
      },
      { path: 'diseno-ingenieria-cl', component: DisenoEIngenieriaClComponent },
      {
        path: 'pruebas-automatizacion-cl',
        component: PruebasAutomatizacionControlClComponent,
      },
      { path: 'neplan-cl', component: NeplanClComponent },
      { path: 'contactenos-cl', component: ContactenosClComponent },
      { path: 'proyectos-cl', component: ProyectosClComponent },
      { path: 'publicaciones-cl', component: PublicacionesClComponent },
      {
        path: 'publicaciones-cl/:slug',
        component: PublicacionInternaClComponent,
      },
      { path: 'xgslab-cl', component: XgslabClComponent },
      { path: 'dranetz-cl', component: DranetzClComponent },
      {
        path: 'trabaje-con-nosotros-cl',
        component: TrabajeConNosotrosClComponent,
      },
      { path: 'vacantes/:slug', component: VacanteInternaClComponent },
      { path: 'buscador', component: BuscadorClComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  useHash: false,
  onSameUrlNavigation: 'ignore',
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  initialNavigation: 'enabled',
});
