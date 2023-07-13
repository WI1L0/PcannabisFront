import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrls: ['./adminprincipal.component.scss']
})
export class AdminprincipalComponent implements OnInit {

  mostrarHeader=false;

  constructor( private loginServices: SloginService, private router: Router ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()){
      this.router.navigate(['/lg/login']);
    }
  }

}
