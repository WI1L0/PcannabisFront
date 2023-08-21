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

  empresaData: Empresas = new Empresas();
  public submitted: boolean = false;

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasServices: SEmpresasService, private loginServices: SloginService, private router: Router) {
    AllScripts.Cargar(["paginas/empresas"]);
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }

    this.ObtenerEmpresa();

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
        title: '¿Estas seguro de editar la noticia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.empresasServices.putEmpresa(this.empresaData).subscribe(
            (data) => {
              if (data != null) {
                Swal.fire(
                  'Editada!',
                  'La Empresa fue editada exitosamente.',
                  'success'
                ).then((result) => {
                  if (result.isConfirmed) {
                    this.empresaData = {} as Empresas;
                    this.router.navigate(['/cbd/panel']);
                  }
                })
              } else {
                Swal.fire({
                  title: 'No Editada!',
                  text: 'La empresa no fue editada.',
                  icon: 'error'
                });
              }
            }
          )
        }
      });
    } else {
      Swal.fire({

        title: 'No Editada!',
        text: 'Los campos estan vacios o erroneos',
        icon: 'error'
      })
    }
  }

  salir(){
    this.empresaData = {} as Empresas;
    this.router.navigate(['/cbd/panel']);
  }

}