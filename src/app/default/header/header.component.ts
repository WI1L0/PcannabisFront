import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/header"]);
  }

  ngOnInit(): void {}

}
