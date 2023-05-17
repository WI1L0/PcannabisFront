import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/footer"]);
  }

  ngOnInit(): void {}

}
