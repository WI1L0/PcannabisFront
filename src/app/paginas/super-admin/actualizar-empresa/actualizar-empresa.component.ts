import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import { SEmpresasService } from 'src/app/services/s-empresas.service';
import { SloginService } from 'src/app/services/s-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-empresa',
  templateUrl: './actualizar-empresa.component.html',
  styleUrls: ['./actualizar-empresa.component.scss']
})
export class ActualizarEmpresaComponent implements OnInit {

  rolSuperAdmin: boolean = false;


  empresaData: Empresas = new Empresas();

  public submitted: boolean = true;

  estadoSaveUpdate: boolean = false;

  

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasServices: SEmpresasService, private loginServices: SloginService, private router: Router) {
    AllScripts.Cargar(["paginas/empresas"]);
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }


    const rolSuperAdministrador = localStorage.getItem('rolAdministrador');
    this.rolSuperAdmin = rolSuperAdministrador ? JSON.parse(rolSuperAdministrador) : false;

    if (this.rolSuperAdmin) {
      this.ObtenerEmpresa();
    } else {
      this.router.navigate(['/cbd/panel']);
    }
  }

  ObtenerEmpresa() {
    this.empresaData = new Empresas();
    this.empresasServices.getEmpresa(nameEmpresa).subscribe(
      (data: any) => {
        this.empresaData = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  updateEmpresa() {
    this.estadoSaveUpdate = true;
    this.submitted = true;
    if (this.empresaData.celularEmpresa &&
      this.empresaData.direccionEmpresa &&
      this.empresaData.emailEmpresa &&
      this.empresaData.nombreEmpresa &&
      this.empresaData.telefonoEmpresa &&
      this.empresaData.urlCelularEmpresa &&
      this.empresaData.urlDireccionEmpresa &&
      this.empresaData.urlDireccionEmpresaGoogle) {
      Swal.fire({
        title: '¿Estas seguro de editar la empresa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.validartelefono() && this.validarcelular() && this.validarcorreo()) {
            this.empresasServices.putEmpresa(this.empresaData).subscribe(
              (data) => {
                if (data != null) {
                  this.submitted = false;
                  this.estadoSaveUpdate = false;
                  Swal.fire(
                    'Editada!',
                    'La Empresa fue editada exitosamente.',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      this.empresaData = {} as Empresas;
                      history.back();
                    }
                  })
                } else {
                  this.estadoSaveUpdate = false;
                  Swal.fire({
                    title: 'No Editada!',
                    text: 'La empresa no fue editada.',
                    icon: 'error'
                  });
                }
              }
            )
          }
        } else {
          this.estadoSaveUpdate = false;
        }
      });
    } else {
      this.estadoSaveUpdate = false;
      Swal.fire({

        title: 'No Editada!',
        text: 'Los campos estan vacios o erroneos',
        icon: 'error'
      })
    }
  }

  salir() {
    this.empresaData = {} as Empresas;
    history.back();
  }

  validartelefono(): boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.empresaData.telefonoEmpresa)) || (!/^\d{7}$/.test(String(this.empresaData.telefonoEmpresa)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El teléfono  es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }

  validarcelular():boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.empresaData.celularEmpresa)) || (!/^\d{10}$/.test(String(this.empresaData.celularEmpresa)))) {
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

  validarcorreo():boolean {
    let ban: boolean = true
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexCorreo.test(String(this.empresaData.emailEmpresa))) {
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





}