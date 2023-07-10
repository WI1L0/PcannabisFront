import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-control-noticias',
  templateUrl: './control-noticias.component.html',
  styleUrls: ['./control-noticias.component.scss']
})
export class ControlNoticiasComponent  implements OnInit {

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["paginas/controlNoticias"]);
  }

 ngOnInit(): void {
 }

}
