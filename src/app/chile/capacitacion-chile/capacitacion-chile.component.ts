import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import LocalEs from '@fullcalendar/core/locales/es';
import * as moment from 'moment';
import { CapacitacionesService } from 'src/app/services/capacitaciones.service';
import { SeoService } from 'src/app/services/seo.service';
declare var $: any;

@Component({
  selector: 'app-capacitacion-chile',
  templateUrl: './capacitacion-chile.component.html',
  styleUrls: ['./capacitacion-chile.component.css']
})
export class CapacitacionChileComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  eventos: any[] = [];
  capacitaciones: any[] = [];
  capacitacionesFiltro: any[] = [];
  categorias: any[] = [];
  filtrar: any[];
  capacitacionesTemp: any[];
  bandera: boolean = false;
  eventosFiltro: any[];
  capacitacionesFiltroTemp: any[];

  constructor(private capacitacionesS: CapacitacionesService, private router: Router, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.paginaCapacitaciones();
    this.asignarEventos();
    this.getCategoriasFiltro();
    moment.locale('es');
  }
  asignarEventos() {
    this.capacitacionesS.getCapacitacionesChile().subscribe((resp: any[]) => {
      this.capacitaciones = resp;
      this.capacitaciones.forEach(element => {
        let inicio = new Date(element.acf.fecha_inicio);
        let fin = new Date(element.acf.fecha_fin);
        let fechaInicio = inicio.getFullYear() + '-' + (inicio.getMonth() < 10 ? '0' + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + '-' + (inicio.getDate() < 10 ? '0' + inicio.getDate() : inicio.getDate()) + 'T' + element.acf.hora_inicio;
        let fechaFin = fin.getFullYear() + '-' + (fin.getMonth() < 10 ? '0' + (fin.getMonth() + 1) : (fin.getMonth() + 1)) + '-' + (fin.getDate() < 10 ? '0' + fin.getDate() : fin.getDate()) + 'T' + element.acf.hora_fin;
        this.eventos.push({
          title: element.acf.tipo_de_evento, start: fechaInicio, end: fechaFin,
          extendedProps: {
            id: element.id,
            fecha_Inicio: element.acf.fecha_inicio,
            fecha_FIn: element.acf.fecha_fin
          }
        })
      })
      this.crearCronograma();
      this.getCapacitaciones();
    })
  }

  crearCronograma() {
    this.calendarOptions = {
      locale: LocalEs,
      events: this.eventos,
      dateClick: this.reunionesDelDia.bind(this),
      eventClick: this.detalleReunion.bind(this)
    };
  }

  getCapacitaciones(){
    let capacitacion = this.capacitaciones.filter(filtro => {
        let fechaCapacitacion = moment(filtro.acf.fecha_inicio + ' ' + filtro.acf.hora_inicio).format('DD MMMM YYYY hh:mm:ss a');
        filtro.fecha = fechaCapacitacion
        let categorias = [];
        filtro.categorias_capacitaciones.forEach(element => {
          this.capacitacionesS.getCategoriaCapacitacionesIdChile(element).subscribe((resp: any) => {
            categorias.push(resp.name)
            filtro.categorias = categorias;
          })
        });

        return filtro;
    });
    capacitacion.sort(function(a,b){
      if(a.acf.fecha_inicio < b.acf.fecha_inicio){
        return 1;
      }
      if(a.acf.fecha_inicio > b.acf.fecha_inicio){
        return -1;
      }
      return 0;
    })
    this.capacitacionesFiltro = capacitacion;
    if(!this.capacitacionesFiltroTemp || this.capacitacionesFiltroTemp === this.capacitacionesFiltro){
      this.capacitacionesFiltroTemp = this.capacitacionesFiltro;
    }
  }

  getCategoriasFiltro() {
    this.capacitacionesS.getCategoriaCapacitacionesChile().subscribe((resp : any) => {
      resp.forEach(element => {
        element.bandera = false
      });
      this.categorias.push(...resp)
    })
  }

  categoriasFiltro(categoriaSelec: any = null){
    this.filtrar = [];
    this.eventosFiltro = [];
    if(!this.capacitacionesTemp || this.capacitacionesTemp === this.capacitaciones){
      this.capacitacionesTemp = this.capacitaciones;
    }
     this.capacitacionesTemp.forEach(element => {
      this.categorias.forEach(filtro => {
        element.categorias_capacitaciones.filter(filtroCate => {
          if(filtro.bandera && filtro.id === filtroCate){
              this.filtrar.push(element);
              let inicio = new Date(element.acf.fecha_inicio);
              let fin = new Date(element.acf.fecha_fin);
              let fechaInicio = inicio.getFullYear() + '-' + (inicio.getMonth() < 10 ? '0' + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + '-' + (inicio.getDate() < 10 ? '0' + inicio.getDate() : inicio.getDate()) + 'T' + element.acf.hora_inicio;
              let fechaFin = fin.getFullYear() + '-' + (fin.getMonth() < 10 ? '0' + (fin.getMonth() + 1) : (fin.getMonth() + 1)) + '-' + (fin.getDate() < 10 ? '0' + fin.getDate() : fin.getDate()) + 'T' + element.acf.hora_fin;
              this.eventosFiltro.push({
                title: element.acf.tipo_de_evento, start: fechaInicio, end: fechaFin,
                extendedProps: {
                  id: element.id,
                  fecha_Inicio: element.acf.fecha_inicio,
                  fecha_FIn: element.acf.fecha_fin
                }
              })
            }
        });
      })
      
    })
    if (this.filtrar.length > 0 && categoriaSelec.bandera) {
      this.capacitaciones = this.filtrar;
      
      this.changeEvent(1);
      
      this.getCapacitaciones();
    } else if(this.filtrar.length === 0 && categoriaSelec.bandera) {
      this.capacitaciones = [];
      this.changeEvent(2);      
      this.getCapacitaciones();
    }else{
      this.capacitaciones = this.capacitacionesTemp;
      this.changeEvent(3);
      this.getCapacitaciones();
    }

  }

  changeEvent(id: number){
    if(id === 1){
      this.calendarOptions = {
        events: this.eventosFiltro,
        locale: LocalEs,
        dateClick: this.reunionesDelDia.bind(this),
        eventClick: this.detalleReunion.bind(this)
      };
      // this.calendarComponent.getApi().removeAllEvents();
      // this.calendarComponent.getApi().addEvent(this.eventosFiltro);
      // this.calendarComponent.getApi().refetchEvents();
    }else if(id === 2){
      this.calendarOptions = {
        events: [],
        locale: LocalEs,
        dateClick: this.reunionesDelDia.bind(this),
        eventClick: this.detalleReunion.bind(this)
      };
    }else{
      this.calendarOptions = {
        events: this.eventos,
        locale: LocalEs,
        dateClick: this.reunionesDelDia.bind(this),
        eventClick: this.detalleReunion.bind(this)
      };
    }
  }

  reunionesDelDia(arg) {
    this.getReuniones(arg.dateStr)
  }

  changeView(calendar: string) {
    this.calendarComponent.getApi().changeView(calendar);
  }

  enviarInterna(capacitacion) {
    this.router.navigateByUrl(`/capacitaciones/${capacitacion.id}`);
  }

  resetCardCapacitacion(){
    this.capacitacionesFiltro = this.capacitacionesFiltroTemp;
  }

  getReuniones(date: string) {
    let fecha = new Date(date);
    let fechaSeleccionada = moment(date).format('MM/DD/YYYY');
    let capacitacion = this.capacitaciones.filter(filtro => {
      if (filtro.acf.fecha_inicio === fechaSeleccionada) {
        let fechaCapacitacion = moment(filtro.acf.fecha_inicio + ' ' + filtro.acf.hora_inicio).format('DD MMMM YYYY hh:mm:ss a');
        filtro.fecha = fechaCapacitacion
        let categorias = [];
        filtro.categorias_capacitaciones.forEach(element => {
          this.capacitacionesS.getCategoriaCapacitacionesIdChile(element).subscribe((resp: any) => {
            categorias.push(resp.name)
            filtro.categorias = categorias;
          })
        });

        return filtro;
      }
    });
    this.capacitacionesFiltro = capacitacion;
  }

  detalleReunion(arg) {
    let capacitacion = this.capacitaciones.filter(filtro => filtro.id === arg.event._def.extendedProps.id)
    this.capacitacionesFiltro = capacitacion;
  }


}
