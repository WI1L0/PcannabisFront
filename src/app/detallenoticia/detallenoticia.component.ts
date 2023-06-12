import { Component } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-detallenoticia',
  templateUrl: './detallenoticia.component.html',
  styleUrls: ['./detallenoticia.component.css']
})
export class DetalleNoticiaComponent  {
  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/detallenoticia"]);
  }

  ngOnInit(): void {
  }



}
