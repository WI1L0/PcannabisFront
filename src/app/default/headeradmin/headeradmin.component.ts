import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SloginService } from 'src/app/services/s-login.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.scss']
})
export class HeaderadminComponent implements OnInit{

  logueado: boolean = true;

  //implementar js en los componentes
  constructor(
    private AllScripts:AllScriptsService,
    private loginServices: SloginService, 
    private router: Router 
    ){
    AllScripts.Cargar(["default/headeradmin"]);
  }

  ngOnInit(): void {
    if (localStorage.getItem('cbdLogin') == 'true'){
      this.logueado = false;
    } else {
      this.logueado = true;
    }
  }

  cerrar(){
    if (this.loginServices.deleteTokenAndRoles()){
      this.router.navigate(['/cbd/login']);
    }
  }

}