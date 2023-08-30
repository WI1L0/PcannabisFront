import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Contactanos } from 'src/app/modelos/Contactanos';
import { FotosEmpresas } from 'src/app/modelos/FotosEmpresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { ScontactanosService } from 'src/app/services/s-contactanos.service';
import { SfotosEmpresasService } from 'src/app/services/s-fotosEmpresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  cuerpoUrlFoto: string = baserUrlImagenes;

  public submitted: boolean = false;

  contactanosObject: Contactanos = new Contactanos();

  fotosListEquipo: FotosEmpresas[] = [];
  fotosListAdministrativo: FotosEmpresas[] = [];

  fotoequipo1: string = '';
  fotoequipo2: string = '';
  fotoequipo3: string = '';
  fotoequipo4: string = '';

  fotoAdministrativoInicio: string = '';

  mensajeUsername: any;
  mensajeCelular: any;
  mensajeEmail: any;
  mensajeAsunto: any;
  mensajeDescripcion: any;

  constructor(
    private AllScripts: AllScriptsService,
    private contactanosServices: ScontactanosService,
    private fotosEmpresasServices: SfotosEmpresasService,
  ) {
    AllScripts.Cargar(["paginas/nosotros"]);
  }


  ngOnInit(): void {
    this.cargarFotosEquipo();
    this.cargarFotosAdministrativo();
  }

  cargarfoto(fotosAdm: FotosEmpresas) {
    if (fotosAdm.fotoEmpresa != null) {
      this.fotoAdministrativoInicio = fotosAdm.fotoEmpresa;
    }
  }

  cargarFotosEquipo() {
    this.fotosEmpresasServices.getFotosEmpresas(nameEmpresa, 'Equipo').subscribe(
      (data) => {
        if (data != null) {
          this.fotosListEquipo = data;
          if (this.fotosListEquipo[0].fotoEmpresa !== undefined) {
            this.fotoequipo1 = this.fotosListEquipo[0].fotoEmpresa;
          }
          if (this.fotosListEquipo[1].fotoEmpresa !== undefined) {
            this.fotoequipo2 = this.fotosListEquipo[1].fotoEmpresa;
          }
          if (this.fotosListEquipo[2].fotoEmpresa !== undefined) {
            this.fotoequipo3 = this.fotosListEquipo[2].fotoEmpresa;
          }
          if (this.fotosListEquipo[3].fotoEmpresa !== undefined) {
            this.fotoequipo4 = this.fotosListEquipo[3].fotoEmpresa;
          }
        }
      }
    )
  }

  cargarFotosAdministrativo() {
    this.fotosEmpresasServices.getFotosEmpresas(nameEmpresa, 'Administrativo').subscribe(
      (data) => {
        if (data != null) {
          this.fotosListAdministrativo = data;

          if (this.fotosListAdministrativo[0].fotoEmpresa !== undefined) {
            this.fotoAdministrativoInicio = this.fotosListAdministrativo[0].fotoEmpresa;
          }
        }
      }
    )
  }

  postContactanos() {
    if (this.validaciones()) {
      console.log(this.contactanosObject)
      this.contactanosServices.postContactanos(this.contactanosObject, nameEmpresa).subscribe(
        (data) => {
          if (data != null) {
            this.submitted == false;
            this.contactanosObject = new Contactanos();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su formulario se envió con éxito',
        showConfirmButton: false,
        timer: 1500
      })
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'question',
              title: 'No se puedo enviar su formulario',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      )
    } else {
      this.submitted = true;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que los campos esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



  // VALIDACIONES
  validaciones() {
    this.mensajeUsername = this.validarString(String(this.contactanosObject.nombreContactanos));
    this.mensajeEmail = this.validarCorreo(String(this.contactanosObject.emailContactanos));
    this.mensajeCelular = this.validarNumeros(String(this.contactanosObject.celularContactanos));
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
      // return true;
    }

    return true;
  }
  // VALIDACIONES
}