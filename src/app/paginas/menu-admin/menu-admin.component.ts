import { Component, OnInit } from '@angular/core';
import { SloginService } from 'src/app/services/s-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  mostrarHeader=false;
  rolAdmin: boolean = false;
  // rolEmpleado: boolean = false;

  constructor( 
    private loginServices: SloginService, 
    private router: Router 
    ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()){
      this.router.navigate(['/cbd/login']);
    }

    const rolAdministrador = localStorage.getItem('rolAdministrador');
    this.rolAdmin = rolAdministrador ? JSON.parse(rolAdministrador) : false;
    // const rolCliente = localStorage.getItem('rolEmpleado');
    // this.rolEmpleado = rolCliente ? JSON.parse(rolCliente) : false;
  }

}
