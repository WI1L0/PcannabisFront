import { Component,OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-crearnoticia',
  templateUrl: './crearnoticia.component.html',
  styleUrls: ['./crearnoticia.component.scss']
})
export class CrearnoticiaComponent implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/crearnoticias"]);
  }
  ngOnInit(): void {
  }

}