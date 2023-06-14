import { Component, OnInit } from '@angular/core';
import { Noticias } from 'src/app/modelos/Noticias';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { noticias } from 'src/app/services/s-noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService, private noticiasServices: noticias){
    AllScripts.Cargar(["default/noticias"]);
  }

  public pageAct!: number;
 public listNoticias: Noticias [] = [];

  ngOnInit(): void {
    this.obtenerNoticias();
  }

  obtenerNoticias() {
    this.noticiasServices.getNoticias().subscribe(
      data => {
        this.listNoticias = data.map(
          result => {
            let n = new Noticias;
            n.idNoticias=result.idNoticias;
            n.tituloNoticias=result.tituloNoticias;
            n.descripcionNoticias=result.descripcionNoticias;
            n.fechaNoticias=result.fechaNoticias;
            return n;
          }
        );
       }
      )
    }
  

}
