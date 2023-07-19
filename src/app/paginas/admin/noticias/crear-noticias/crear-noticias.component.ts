import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-noticias',
  templateUrl: './crear-noticias.component.html',
  styleUrls: ['./crear-noticias.component.scss']
})
export class CrearNoticiasComponent implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/crearnoticias"]);
  }
  ngOnInit(): void {
  }

  crearalert() {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Noticia Creada Exitosamente',
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

}

