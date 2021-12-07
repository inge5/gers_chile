import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(public titulo: Title, public meta: Meta) {
  }
paginaInicio(){
  this.paginaMetaData(
    'Nuestro mayor compromiso es ofrecer un servicio eficiente y confiable ajustandonos a tus proyectos',
    'Nuestros servicios de Pruebas, automatizacion y control, diseño e ingenieria y los estudios de sistemas electricos nos han posicionado en el mercado por mas de 30 años',
    'Ejecutamos y monitoriamos la calidad de potencia y energia en tus proyectos y sistemas industriales / Encuentra en GERS soluciones confiables',
    ''
  );
}

paginaPruebaAutomatizacion(){
  this.paginaMetaData(
    'En Gers realizamos diseños y suministramos nuestro equipo de pruebas y puestas en equipos de alta, media y baja tensión',
    'Contamos con Automatización basado en IEC61850, IEC608070-5-101/104',
    'Somos expertos en pruebas a transformadores de potencia y bancos cargadores de energia',
    ''
  );
}

paginaEstudiosSistemas(){
  this.paginaMetaData(
    'Nos encargamos de los estudios de sistemas electricos para electrificadoras, plantas industriales, mineras y petroleras Cotiza ahora aquí',
    'Nuestro equipo cuenta con personal altamente capacitado para realizar nuestro estudios sistemicos en redes electricas nacionales e internacionales.',
    'Realizamos planeaciones de sistemas electricos y estudios de conexión para proyectos con energias convencionales y no convencionales',
    ''
  );
}

paginaDisenoIng(){
  this.paginaMetaData(
    'En Gers realizamos diseños conceptuales, basicos o de detalle para tu proyecto garantizando los resultados mas optimos',
    'Diseñamos subestaciones electricas, lineas de distribucion y sistemas industriales y comerciales contando con mas de 30 años de experiencia',
    'Gers te ayuda con la interventoria de tus proyectos y los desarrollos de redes de datos: Lan, WLAN y redes multimedia',
    ''
  );
}

paginaProyectos(){
  this.paginaMetaData(
    'Estos son los proyectos que han confiado en GERS y sus grandes resultados.',
    'Innovamos para alcanzar el éxito de los proyectos que nos han confiado en mas de 20 paises alrededor del mundo',
    'Nuestros resultados hablan por nuestro trabajo, contamos con una vasta experiencia con mas de 20 proyectos alrededor del mundo',
    ''
  );
}

paginaCapacitaciones(){
  this.paginaMetaData(
    'Capacita a tu personal con nuestras charlas educativas, mira las proximas fechas aquí',
    'No dejes de aprender y capacitate en nuestras proximas conferencias',
    'Encuentra en GERS capacitaciones constantes de nuestros ingenieros expertos, no te las pierdas',
    ''
  );
}

paginaNeplan(){
  this.paginaMetaData(
    'Encuentra en GERS nuestro Software de análisis de sistemas de potencia Licencias en la nube o en la intranet según las necesidades de los usuarios',
    'Con NEPLAN puedes realizar diferentes analisis sobre un concepto modular ofreciendo funcionalidades de vanguardia sobre un entorno grafico',
    'En nuestro editor grafico de NEPLAN podras ver el flujo de carga, la simulación dinamica y el cortocircuito porporcionando calculos de posibles fallas',
    ''
  );
}

paginaXgslab(){
  this.paginaMetaData(
    'Con XGSLAB ofrecemos uno de los softwares mas potentes para el analisis de sistemas de puesta a tierra y de campos electromagneticos',
    'Este software es el unico en el mercado que tiene la consideracion de sus estadisticas normas tanto como IEEE como EN',
    'XGSLAB cuenta con 3 distintos modulos como lo son el GSA: ANÁLISIS DE SISTEMAS DE PUESTA A TIERRA, El GSA_FD: ANÁLISIS DE SISTEMAS DE PUESTA A TIERRA EN EL DOMINIO DE LA FRECUENCIA y el XGSA_FD: ANÁLISIS DE SISTEMAS AÉREOS Y SUBTERRÁNEOS EN EL DOMINIO DE LA FRECUENCIA',
    ''
  );
}

paginaDranetz(){
  this.paginaMetaData(
    'En gers somo representantes comerciales de DRANETZ uno de las compañias mas fuerte en el mercado en el desarrollo de equipos y soluciones de calidad de potencia.',
    'Con DRANETZ podras monitoriar la calidad de energia de una manera moderna gracias a sus ventajas en tecnologia, como la comunicación bluetooth y su version portatil',
    'Con DRANETZ podras obtener un sistema de monitoreo permanente de calidad de potencia',
    ''
  );
}

paginaMetaData(titulo: string, descripcion: string, keywords: string, url: string = ""): void{
  this.titulo.setTitle(titulo);
  this.meta.updateTag({
    property: 'og:title',
    content: titulo
  } as MetaDefinition);

  this.meta.updateTag({
    property: 'og:url',
    content: url
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'twitter:title',
    content: titulo
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'DC.title',
    content: titulo
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'description',
    content: descripcion
  } as MetaDefinition);

  this.meta.updateTag({
    property: 'og:description',
    content: descripcion
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'twitter:description',
    content: descripcion
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'DC.description',
    content: descripcion
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'keywords',
    content: keywords
  } as MetaDefinition);

  this.meta.updateTag({
    name: 'DC.subject',
    content: keywords
  } as MetaDefinition);
}
}
