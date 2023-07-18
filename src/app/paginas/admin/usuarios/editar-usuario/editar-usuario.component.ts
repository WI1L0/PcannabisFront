import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/modelos/Personas';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { SloginService } from 'src/app/services/s-login.service';
import { SpersonasService } from 'src/app/services/s-personas.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {

  objectPersona: Personas = new Personas();
  objectUsuario: Usuarios = new Usuarios();


  constructor( private loginServices: SloginService, private router: Router, private usuarioServices: SusuariosService, private personaServices: SpersonasService ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()){
      this.router.navigate(['/lg/login']);
    }

    this.obtenerPersona();
    this.obtenerUsuario();

  }

  obtenerPersona() {
    this.objectPersona = new Personas;
    this.personaServices.getOnePersona(Number(localStorage.getItem('IdPersonaSelecto'))).subscribe(
      data => {
        console.log(data);
        this.objectPersona = data;
        localStorage.removeItem('IdPersonaSelecto');
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  obtenerUsuario() {
    this.objectUsuario = new Usuarios;
    this.usuarioServices.getOneUsuario(Number(localStorage.getItem('IdUsuarioSelecto'))).subscribe(
      data => {
        console.log(data);
        this.objectUsuario = data;
        localStorage.removeItem('IdUsuarioSelecto');
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  updatePersonaUsuario(){

  }
}
