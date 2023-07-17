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

  constructor( private loginServices: SloginService, private router: Router ) { }

  ngOnInit(): void {
    // if (!this.loginServices.estaLogin()){
    //   this.router.navigate(['/cbd/login']);
    // }
  }

}
