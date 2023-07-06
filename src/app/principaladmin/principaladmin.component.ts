import { Component } from '@angular/core';
import {  OnInit} from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-principaladmin',
  templateUrl: './principaladmin.component.html',
  styleUrls: ['./principaladmin.component.css']
})
export class PrincipaladminComponent  implements OnInit{
  // showHeader = false;

  constructor(private AllScripts:AllScriptsService){
    // AllScripts.Cargar(["default/login"]);
  }
  ngOnInit(): void {
  }
  


}

