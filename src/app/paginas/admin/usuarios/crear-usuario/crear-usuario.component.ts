import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioData: Usuarios = new Usuarios();
  
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService,private usuarioService:SusuariosService, ) {
    AllScripts.Cargar(["paginas/crearusuarios"]);
  }

  ngOnInit(): void {
  }
  //alerta//
  alertCrear() {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Usuario Creado Exitosamente',
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
  guardarUsuarios() {
    const idPersona = 1; // reemplaza con el valor adecuado
    const idRol = 'rol1'; // reemplaza con el valor adecuado
    const nombreEmpresa = 'empresa1'; // reemplaza con el valor adecuado
    const dtos: Usuarios = { /* reemplaza con los datos adecuados */ };
    this.usuarioService.guardarUsuarios(idPersona, idRol, nombreEmpresa, dtos)
      .subscribe(
        response => {
          // Maneja la respuesta del servidor adecuadamente
          // ...
        },
        error => {
          // Maneja el error adecuadamente
          // ...
        }
      );
  }
  

  //alerta//



}

