import { Component, OnInit } from '@angular/core';
import { Contactanos } from 'src/app/modelos/Contactanos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import { ScontactanosService } from 'src/app/services/s-contactanos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  public submitted: boolean = false;

  contactanosObject: Contactanos = new Contactanos();

  mensajeCelular: Boolean = false;
  mensajeEmail: Boolean = false;
  mensajeString: Boolean = false;

  constructor(
    private AllScripts: AllScriptsService,
    private contactanosServices: ScontactanosService
  ) {
    AllScripts.Cargar(["paginas/nosotros"]);
  }


  ngOnInit(): void {
  }

  postContactanos() {
    this.submitted = true;
    if (this.contactanosObject.nombreContactanos && 
      this.contactanosObject.emailContactanos &&
      this.contactanosObject.asuntoContactanos &&
      this.contactanosObject.detalleContactanos ) {
      this.contactanosServices.postContactanos(this.contactanosObject, nameEmpresa).subscribe(
        (data) => {
          if (data != null) {
            this.submitted == false;
            this.contactanosObject = new Contactanos();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'post exitoso',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'question',
              title: 'nel',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      )
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'campos vacios',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



  // VALIDACIONES
  validatePhoneNumber() {
    console.log("ddddddddddddddddddddddddddd")
    const phoneNumberRegex = /^(\+1)?([2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4})$/;
    this.mensajeCelular = phoneNumberRegex.test(String(this.contactanosObject.celularContactanos));
  }
  // VALIDACIONES
}