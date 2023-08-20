import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-all-productos',
  templateUrl: './all-productos.component.html',
  styleUrls: ['./all-productos.component.scss']
})
export class AllProductosComponent implements OnInit {

  constructor(private AllScripts: AllScriptsService){
    AllScripts.Cargar(["paginas/nunakay"]);
  }

  ngOnInit(): void {
  }
  
}
