import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.scss']
})
export class DetalleNoticiasComponent  implements OnInit {

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/detalleNoticias"]);
  }

  ngOnInit(): void {
  }

}