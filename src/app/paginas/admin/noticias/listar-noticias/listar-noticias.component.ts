import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-noticias',
  templateUrl: './listar-noticias.component.html',
  styleUrls: ['./listar-noticias.component.scss']
})
export class ListarNoticiasComponent implements OnInit {

  ngOnInit(): void {

  }


  confirmEliminar() {
    Swal.fire({
      title: '¿Estas seguro de eliminar la noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminada!',
          'Noticia eliminada exitosamente.',
          'success'
        );
      }
    });
  }
      //alerta
      ocultaralert() {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Respuesta Oculta Exitosamente',
          showConfirmButton: false,
          timer: 1500,
          background: '#ffff',
          iconColor: '#4CAF50',
          padding: '1.25rem',
          width: '20rem',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
  
      //alerta
}
