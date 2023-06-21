import { Component, OnInit } from '@angular/core';
import { Noticias } from 'src/app/modelos/Noticias';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { noticias } from 'src/app/services/s-noticias.service';

@Component({
  selector: 'app-control-noticias',
  templateUrl: './control-noticias.component.html',
  styleUrls: ['./control-noticias.component.scss']
})
export class ControlNoticiasComponent  implements OnInit {

  public pageAct!: number;
  public listNoticias: Noticias [] = [];

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService, private noticiasServices: noticias){
    AllScripts.Cargar(["default/controlNoticias"]);
  }

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
