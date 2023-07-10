import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from './scripts/all-scripts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/home"]);
  }

  ngOnInit(): void {
  }

}