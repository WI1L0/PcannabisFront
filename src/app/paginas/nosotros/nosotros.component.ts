import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { empresasServices } from 'src/app/services/empresasServices';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasServ: empresasServices) {
    AllScripts.Cargar(["default/nosotros"]);
  }

  ngOnInit(): void {
  }

  listaEmpresas: Empresas[] = [];
  empresaObject: Empresas = new Empresas();

  obtenerEst() {
    this.empresasServ.getEmpresas().subscribe(
      data => {
        this.listaEmpresas = data.map(
          result => {
            let e = new Empresas;
            e.idEmpresas = result.idEmpresas;
            e.historia = result.historia;
            e.mision = result.mision;
            e.vision = result.vision;
            e.direccion = result.direccion;
            e.valores = result.valores;
            e.longitud = result.longitud;
            e.latitud = result.latitud;
            e.estEmpresas = result.estEmpresas;
            return e;
          }
        )
      }
    )

    this.empresaObject = this.listaEmpresas[0];
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEE" + this.empresaObject.historia);

  }
}
