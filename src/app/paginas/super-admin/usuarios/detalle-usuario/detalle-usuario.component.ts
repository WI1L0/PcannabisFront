import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {

  usuariosObject: Usuarios = new Usuarios();

  constructor(
    private router: Router,
    private loginServices: SloginService,
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/lg/login']);
    }
    // if (Object.keys(this.contactanosObject).length === 0) {
    //   this.router.navigate(['/cbd/admin/contactanos/listar']);
    // }
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    // limpiar
    this.usuariosObject = {} as Usuarios;

    const usuario = localStorage.getItem('usuario');
    if (usuario != null) {
      this.usuariosObject = JSON.parse(usuario);
    } else {
      // history.back();
      this.router.navigate(['/cbd/admin/usuarios/listar']);
    }
  }

  salir() {
    localStorage.removeItem('usuario');
    history.back();
    // this.router.navigate(['/cbd/admin/usuarios/listar']);
  }

}
