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


confirmEditar(){
  Swal.fire({
    title: '¿Estas seguro de editar la noticia?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Editar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Editada!',
        'Noticia editada exitosamente.',
        'success'
      );
    }
  });
}
}
