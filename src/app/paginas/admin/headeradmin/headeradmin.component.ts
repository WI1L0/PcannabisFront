import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.scss']
})
export class HeaderadminComponent implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService){
    AllScripts.Cargar(["default/headeradmin"]);
  }

  ngOnInit(): void {}

}