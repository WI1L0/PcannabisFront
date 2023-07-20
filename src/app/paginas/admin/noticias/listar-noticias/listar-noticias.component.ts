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
      title: '¿Estas seguro de eliminar esta noticia?',
      text: 'Se eliminarán todos los registros de esta noticia de manera permantente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Noticia Eliminada con éxito!',
          '',
          'success'
        );
      }
    });
  }
      //alerta
      alertOcultar() {
        Swal.fire({
          title: '¿Estas seguro de ocultar esta noticia?',
          text: 'Podrá verlas aún en la sección ocultos',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ocultar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Noticia Oculta!',
              '',
              'success'
            );
          }
        });
      }
  
      //alerta
}
