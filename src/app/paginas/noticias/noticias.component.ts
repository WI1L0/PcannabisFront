import { Component } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent {

  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/noticias"]);
  }
}
