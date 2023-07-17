import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent  implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService,private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["paginas/editarnoticia"]);
  }



  ngOnInit(): void {
  }

}
