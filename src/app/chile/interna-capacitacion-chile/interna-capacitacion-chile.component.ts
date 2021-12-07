import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CapacitacionesService } from 'src/app/services/capacitaciones.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-interna-capacitacion-chile',
  templateUrl: './interna-capacitacion-chile.component.html',
  styleUrls: ['./interna-capacitacion-chile.component.css']
})
export class InternaCapacitacionChileComponent implements OnInit {

  usuario: any;
  id: string;
  capacitacion: any;
  siteKey: string;
  constructor(private activedRouter: ActivatedRoute, private router: Router, private capacitacionesS: CapacitacionesService) { 
    this.siteKey = "6LcBAH0bAAAAAEF2iIZPrJupF-K2cdrDgonjUn2s";
    this.id = this.activedRouter.snapshot.paramMap.get('id');
    this.usuario = {
      nombre: '',
      apellidos:'',
      email: '',
      telefono:'',
      acepto:'',
      capacitacion: '',
      pais: 'Chile',
      recaptcha: ''
    };
  }

  ngOnInit(): void {
    moment.locale('es');
    this.capacitacionesS.getCapacitacionesIdChile(parseInt(this.id)).subscribe((resp: any) => {
      this.capacitacion = resp;
      this.capacitacion.fecha = moment(resp.acf.fecha_inicio+' '+resp.acf.hora_inicio).format('DD MMMM YYYY hh:mm:ss a');
      let categorias = [];
      resp.categorias_capacitaciones.forEach(element => {
        this.capacitacionesS.getCategoriaCapacitacionesIdChile(element).subscribe((respCate: any) => {
          categorias.push(respCate.name);
          this.capacitacion.categorias = categorias;
        })  
      });
    })
  }

  returnCapacitaciones(){
    this.router.navigateByUrl('chile/capacitaciones')
  }
  enviarInscripcion(){
    $("#wrapper").toggleClass("toggled");
    $('.overlaytrabaja').addClass('active');
  }

  public cierraInscripcion() {
    $('.overlaytrabaja').removeClass('active');
    $("#wrapper").toggleClass("toggled");
  }
  formTrabajeNosotros(form){
    this.usuario.capacitacion = this.capacitacion.title.rendered;
    $.ajax({
      url: `${environment.domain}/chile/wp-content/themes/gers/formulario-inscripcion-chile/inscripcion-chile.php`,
      type: 'POST',
      data: JSON.stringify(this.usuario),
      dataType:"json",
      success: function(data) {
      }, error: function(error){
        if(error.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Gracias por regalarnos tus datos. Nos comunicaremos contigo.',
            showConfirmButton: true
          }); 

        form.reset();
        } else {
          Swal.fire('Oops...', 'Algo pasó. Corrige los errores, por favor!', 'error')
        }
      }
    });
   }

}
