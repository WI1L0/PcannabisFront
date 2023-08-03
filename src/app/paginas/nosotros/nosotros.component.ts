import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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

  mensajeUsername: any;
  mensajeCelular: any;
  mensajeEmail: any;
  mensajeAsunto: any;
  mensajeDescripcion: any;

  constructor(
    private AllScripts: AllScriptsService,
    private contactanosServices: ScontactanosService
  ) {
    AllScripts.Cargar(["paginas/nosotros"]);
  }


  ngOnInit(): void {
  }

  postContactanos() {
    if (this.validaciones()) {
      // this.contactanosServices.postContactanos(this.contactanosObject, nameEmpresa).subscribe(
      //   (data) => {
      //     if (data != null) {
      //       this.submitted == false;
      //       this.contactanosObject = new Contactanos();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'post exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      //     } else {
      //       Swal.fire({
      //         position: 'top-end',
      //         icon: 'question',
      //         title: 'nel',
      //         showConfirmButton: false,
      //         timer: 1500
      //       })
      //     }
      //   }
      // )
    } else {
      this.submitted = true;
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
  validaciones() {
    this.mensajeUsername = this.validarString(String(this.contactanosObject.nombreContactanos));
    this.mensajeEmail = this.validarString(String(this.contactanosObject.emailContactanos));
    this.mensajeCelular = this.validarString(String(this.contactanosObject.celularContactanos));
    this.mensajeAsunto = this.validarString(String(this.contactanosObject.asuntoContactanos));
    this.mensajeDescripcion = this.validarString(String(this.contactanosObject.detalleContactanos));
    console.log(this.mensajeUsername + " sssssssssssssssss 3")
    console.log(this.mensajeEmail + " sssssssssssssssss 4")
    console.log(this.mensajeCelular + " sssssssssssssssss 5")
    console.log(this.mensajeAsunto + " sssssssssssssssss 6")
    console.log(this.mensajeDescripcion + " sssssssssssssssss 7")

    if (this.mensajeUsername == true && this.mensajeEmail == true && this.mensajeCelular == true && this.mensajeAsunto == true && this.mensajeDescripcion == true) {
      console.log("sssssssssssssssss 1")
      return true;
    } else {
      console.log("sssssssssssssssss 2")
      return false;
    }
  }

  validarNumeros(value: string) {

    if (!value) {
      return 'El campo esta vacio';
    } else {
      if (!/^\d+$/.test(value)) {
        return 'No se permiten letras';
      } else {
        if (!/^\d{10}$/.test(value)) {
          return 'No contiene 10 digitos';
        } else {
          return true;
        }
      }
    }
  }


validarString(value: string) {

  if (!value) {
    return 'El campo esta vacio';
  }

  if (/^\d+$/.test(value)) {
    return 'No se permiten numeros';
  }

  return true;
}

validarCorreo(value: string) {

  if (!value) {
    return 'El campo esta vacio';
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return 'correo erroneo';
  }

  return true;
}
  // VALIDACIONES
}