import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
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

  updateEmpresa(emp: Empresas) {
    Swal.fire({
      title: '¿Estas seguro de editar la noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.empresasServices.putEmpresa(emp)) {
          console.log(emp);
          Swal.fire(
            'Editada!',
            'La Empresa fue editada exitosamente.',
            'success'
          );
        } else {
          console.log(emp);
          Swal.fire(
            'No Editada!',
            'La empresa no fue editada.',
            'error'
          );
        }
      }
    });
  }

}