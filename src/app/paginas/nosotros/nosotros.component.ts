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
    this.submitted = true;
    console.log(this.contactanosObject)
    if ( !this.contactanosObject.asuntoContactanos ||
      !this.contactanosObject.detalleContactanos ||
      this.contactanosObject.asuntoContactanos.trim().length === 0 ||
      this.contactanosObject.detalleContactanos.trim().length === 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Debe ingresar un asunto y un detalle',
          showConfirmButton: false,
          timer: 1500
        });
    }else{
      if (this.validarDatos()) {
        console.log(this.contactanosObject)
        this.contactanosServices.postContactanos(this.contactanosObject, nameEmpresa).subscribe(
          (data) => {
            if (data != null) {
              this.submitted = false;
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
      }
    }
  }

  validarnombre(): boolean {
    let ban: boolean = true
    if (/^\d+$/.test(String(this.contactanosObject.nombreContactanos))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el nombre este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    }
    return ban
  }



  validarcelular(): boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.contactanosObject.celularContactanos)) || (!/^\d{10}$/.test(String(this.contactanosObject.celularContactanos)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El célular es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }

  validarcorreo(): boolean {
    let ban: boolean = true
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexCorreo.test(String(this.contactanosObject.emailContactanos))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el email este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }
  
  validarDatos(): boolean {
    const celularValido = this.validarcelular();
    const correoValido = this.validarcorreo();
    const nombreValido = this.validarnombre();
  
    return celularValido && correoValido && nombreValido;
  }




  // VALIDACIONES

  validaciones(): boolean {
    let ban: boolean = true;
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (/^\d+$/.test(String(this.contactanosObject.nombreContactanos))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el nombre este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    } else {
      ban = true
    }

    if (!/^\d+$/.test(String(this.contactanosObject.celularContactanos)) || (!/^\d{10}$/.test(String(this.contactanosObject.celularContactanos)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El célular es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    } else {
      ban = true
    }

    if (!regexCorreo.test(String(this.contactanosObject.emailContactanos))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el correo este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban;
  }

  
  
}





  // VALIDACIONES
