import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contactanos } from 'src/app/modelos/Contactanos';
import { ScontactanosService } from 'src/app/services/s-contactanos.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-detalle-contactanos',
  templateUrl: './detalle-contactanos.component.html',
  styleUrls: ['./detalle-contactanos.component.scss']
})
export class DetalleContactanosComponent implements OnInit {

  contactanosObject: Contactanos = new Contactanos();

  constructor(
    private router: Router,
    private loginServices: SloginService,
    private constactanosServices: ScontactanosService,
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/lg/login']);
    }
    // if (Object.keys(this.contactanosObject).length === 0) {
    //   this.router.navigate(['/cbd/admin/contactanos/listar']);
    // }
    this.obtenerContactanos();
  }

  obtenerContactanos() {

    // limpiar
    this.contactanosObject = {} as Contactanos;

    const contactanos = localStorage.getItem('contactanos');
    if (contactanos != null) {
      this.contactanosObject = JSON.parse(contactanos);

      if (this.contactanosObject.estVisto == false) {
        this.constactanosServices.putContactanosEstadoVistoOrNoVisto(Number(this.contactanosObject.idContactanos)).subscribe(
          data => {
            console.log("..");
          }
        );
      }
    } else {
      // history.back();
      this.router.navigate(['/cbd/admin/contactanos/listar']);
    }
  }

  salir() {
    localStorage.removeItem('contactanos');
    history.back();
    // this.router.navigate(['/cbd/admin/contactanos/listar']);
  }

}
