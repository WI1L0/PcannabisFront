import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-gestionempresas',
  templateUrl: './gestionempresas.component.html',
  styleUrls: ['./gestionempresas.component.scss']
})
export class GestionempresasComponent  implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["paginas/empresas"]);
  }
  ngOnInit(): void {
  }

}
