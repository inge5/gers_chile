import { Component, OnInit } from '@angular/core';
import { productos } from '../../../../assets/data/json';
import { PruebaProductosService } from "../../servicios/prueba-productos/prueba-productos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VariableGlobalService } from '../../servicios/variable-global/variable-global.service';

declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  listadoProductos: any;
  nameProducto: any;
  filtros: any;
  page_size: number = 5;
  page_number: number = 1;
  pages: any;
  p: number = 1;

  forma1: boolean;
  forma2: boolean;
  forma3: boolean;

  currentPage: any;
  firstPageUrl: any;
  lastPage: any;
  lastPageUrl: any;
  nextPageUrl: any;
  prevPageUrl: any;
  to: any;
  total: any;
  filtrar: any[] = [];
  filtro: any[] = [];
  listadoProductosTemp: any;
  per_page: number;
  categoria: number;
  ordenarPor: number = 0;
  ordenarProductosTemp: any;

  constructor(private productosS: PruebaProductosService, private ruta: Router, private variableG: VariableGlobalService) {
  }

  ngOnInit(): void {
    // this.filtros = {
    //   gossen: null,
    //   ndb: null,
    //   gmc: null,
    //   dranetz: null,
    //   beckwith: null,
    //   ordenar: null,
    //   paginas: null
    // }
    this.getCategoria();
    this.paginas();
    /*this.listarForma1();
    this.listarForma2();
    this.listarForma3();*/

    this.forma1 = true;
  }

  paginas() {
    this.productosS.getListarProductosWP().then(respuesta => {
      this.page_size = respuesta.headers['x-wp-total'];
      this.paginasTotal();
      this.listarProductos();

    })
  }

  getCategoria() {
    this.variableG.currentCategory.subscribe(resp => {
      this.categoria = resp;
      console.log(this.categoria);
      this.paginas();
    })
  }


  listarProductos(cantidad: number = 5, ordenarProductos: boolean = true) {
    this.per_page = cantidad;
    if (!ordenarProductos) {
      this.filtradoProductos();
    } else {
      this.productosS.getListarProductosWP().then(respuesta => {
        // console.log(respuesta.data);
        this.listadoProductos = respuesta.data;
        let categorias = [];
        let subCategorias = [];
        this.productosS.getCategoria().forEach(element1 => {
          if(this.categoria === element1.id){
            categorias.push({
              ...element1,
              bandera: true
            })
          }else{
            element1.subCategorias.forEach((element2, index) => {
              if(this.categoria === element2.id){
                subCategorias.push({
                  ...element2,
                  bandera: true
                })
                if(element1.id === element2.parent){
                  element1.subCategorias = subCategorias;
                }
                console.log("Entró");
              }else{
                console.log("Entró false");
                subCategorias.push({
                  ...element2,
                  bandera: false
                })
                if(element1.id === element2.parent){
                  element1.subCategorias = subCategorias;
                }
              }
            });
            subCategorias = [];
            categorias.push({
              ...element1,
              bandera: false
            })
          }
        })
        this.filtros = categorias;
        for (const filtro of this.filtros) {
          if(filtro.bandera){
            this.filtradoProductos();
          }
          filtro.subCategorias.forEach(element => {
            if(element.bandera){
              this.filtradoProductos();
            }
          });
        }
        console.log(this.filtros);

      }).catch(error => {
        console.log(error);
      });
    }

    // this.productosS.getListarProductos().then(respuesta => {
    //   console.log(respuesta);
    //   this.listadoProductos = respuesta['productos'];
    // }).catch(error => {

    // });

  }

  paginasTotal() {
    this.productosS.setPorPagina(this.page_size);
  }

  filtradoOrdenar(valor){
    console.log(valor);
   if(valor == 1){
      this.listadoProductos.sort(function(a,b){
        if(a.name > b.name){
          return 1;
        }
        if(a.name < b.name){
          return -1;
        }
        return 0;
      })
      console.log(this.listadoProductos);
    }else if(valor == 2){
      this.listadoProductos.sort(function(a , b){
        if(a.date_created > b.date_created){
          return 1;
        }
        if(a.date_created < b.date_created){
          return -1;
        }
        return 0
      })
      console.log(this.listadoProductos);
    }else if(valor == 3){
      this.listadoProductos.sort(function(a , b){
        if(a.date_created > b.date_created){
          return -1;
        }
        if(a.date_created < b.date_created){
          return 1;
        }
        return 0
      })
      console.log(this.listadoProductos);
    }
  }

  openCloseSubCategorias(id: number){
    $(`#${id}`).toggleClass('subCategorias');
    // let claseExiste = $(`#${id}`).hasClass('fa-sort-up');
    // if(claseExiste){
    //   console.log("existe");
    //   $(`#${id}`).removeClass('fa-sort-up')
    //   $(`#${id}`).addClass('fa-sort-down')
    // }else{
    //   console.log("no existe");
    //   $(`#${id}`).removeClass('fa-sort-down')
    //   $(`#${id}`).addClass('fa-sort-up')
    // }
  }

  filtradoProductos() {
    this.filtrar = [];
    if (!this.listadoProductosTemp || this.listadoProductosTemp === this.listadoProductos) {
      this.listadoProductosTemp = this.listadoProductos;
    }
    this.listadoProductosTemp.forEach(element1 => {
      // console.log(this.filtros);
      this.filtros.forEach(filtro => {
        element1.categories.filter(marca => {
          if (filtro.bandera && filtro.id === marca.id) {
            this.filtrar.push(element1);
          }
        });
        filtro.subCategorias.forEach(subFiltro => {
          element1.categories.filter(marca => {
            if(subFiltro.bandera && subFiltro.id === marca.id){
              console.log(subFiltro);
              this.filtrar.push(element1);
            }
          })
        });
      });
    });
    if (this.filtrar.length > 0) {
      console.log(this.filtrar);
      this.listadoProductos = this.filtrar;
      // this.calcularPaginas();
    } else {
      this.listadoProductos = this.listadoProductosTemp;
      // this.calcularPaginas();
      console.log(this.listadoProductos);
    }
    // if (this.filtros.gossen ||
    //   this.filtros.beckwith ||
    //   this.filtros.dranetz ||
    //   this.filtros.gmc ||
    //   this.filtros.ndb ||
    //   this.filtros.ordenar ||
    //   this.filtros.paginas){
    //   this.productosS.postListarProductos(this.filtros).then(respuesta => {
    //     this.listadoProductos = respuesta['productos'];
    //   }).catch(error => {
    //     console.log(error);
    //   });
  }

  detalleProductos(producto, codigo) {

    this.nameProducto = producto.replace(/ /gi, '-');
    this.nameProducto = this.nameProducto.toLowerCase();

    this.nameProducto = this.nameProducto.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    this.ruta.navigateByUrl(`/colombia/detalle-productos/${codigo}/${this.nameProducto}`);
    // this.ruta.navigate(['/detalle-productos/' + codigo + '/' + this.nameProducto])
    console.log(this.nameProducto)
  }

  listarForma1() {
    this.forma1 = true;
    this.forma2 = false;
    this.forma3 = false;

  }

  listarForma2() {
    this.forma1 = false;
    this.forma2 = true;
    this.forma3 = false;

  }

  listarForma3() {
    this.forma1 = false;
    this.forma2 = false;
    this.forma3 = true;
  }

  /*
    PAGINACION
  */
  // Cambia la cantidad de productos a mostrar.
  changePaginate(value) {
    this.paginasTotal();
    this.p = 1;
    this.listarProductos(value, false);
    // this.page_size = value;
    // this.page_number = 1;
    // this.calcularPaginas();
  }
}
