import { Component, OnInit } from '@angular/core';
import { FotosEmpresas } from 'src/app/modelos/FotosEmpresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SfotosService } from 'src/app/services/s-fotos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  listFotosEmpresas: FotosEmpresas [] = [];

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService, private fotoService: SfotosService){
    AllScripts.Cargar(["default/home"]);
  }

  ngOnInit(): void {
    this.obtenerFotosCategoria();
  }

  obtenerFotosCategoria(){
    this.fotoService.getAllByCategoria('').subscribe(
      (data: any) => {
        this.listFotosEmpresas = data;
        console.log(data)
      }, (error) => {
        console.log(error);
      }
    )
  }

}
