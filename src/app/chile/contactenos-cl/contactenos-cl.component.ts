import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PagesClService } from '../../services/pages-cl.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';

declare var $ : any; 


@Component({
  selector: 'app-contactenos-cl',
  templateUrl: './contactenos-cl.component.html',
  styleUrls: ['./contactenos-cl.component.css']
})
export class ContactenosClComponent implements OnInit {
  public user: any;
  loader = true;

  seccion_1_data: any = {};
  pais_info_data : any [] = [];
  ciudad_principal_data: any[] = [];
  info_ciudad_data: any[] = [];

  constructor(private _contactenos:PagesClService) { 
    this.user = {
      servicio: '',
      nombre: '',
      telefono: '',
      ciudad: '',
      empresa: '',
      pais:'Chile',
      asunto: '',
      acepto: ''
    };
  }

  ngOnInit(): void {
    this._contactenos.getContactenos()
      .subscribe((res:any) => {
        this.loader = false;
        this.seccion_1_data = res.acf.seccion_1;
        this.pais_info_data = res.acf.pais_info;
        this.ciudad_principal_data = res.acf.ciudad_info;
        this.info_ciudad_data = res.acf.pais_info.info_ciudad_data;
      });
  }

  enviarForm(form) {
    $.ajax({
      url: `${environment.domain}/wp-content/themes/gers/formulario-contacto-chile/form-contactenos-chile.php`,
      type: 'POST',
      data: JSON.stringify(this.user),
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
