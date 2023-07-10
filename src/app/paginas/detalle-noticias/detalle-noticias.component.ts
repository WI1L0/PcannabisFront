import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from 'src/app/modelos/Noticias';
import { Parrafos } from 'src/app/modelos/Parrafos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SParrafosService } from 'src/app/services/s-parrafos.service';

@Component({
  selector: 'app-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.scss']
})
export class DetalleNoticiasComponent  implements OnInit {

  noticia: Noticias = new Noticias();
  listaParrafos: Parrafos [] = [];
  listaParrafosSuperior: Parrafos [] = [];
  listaParrafosInferior: Parrafos [] = [];

  //implementar js en los componentes
  constructor(private AllScripts:AllScriptsService, private router: Router, private parrafosServices: SParrafosService){
    AllScripts.Cargar(["default/detalleNoticias"]);
  }

  ngOnInit(): void {
    this.getNoticiaADetalle();
  }

  getNoticiaADetalle() {
    const not = localStorage.getItem('noticia');
    if (not) {
      this.noticia = new Noticias;
      this.noticia = JSON.parse(not);
      localStorage.removeItem('noticia')

      this.getParrafos();

    } else {
      this.router.navigate(['/nt/noticias_Pharma_cannabis']);
    }
  }

  getParrafos(){
    this.listaParrafos = [];
    this.listaParrafosSuperior = [];
    this.listaParrafosInferior = [];

    this.parrafosServices.getParrafos(this.noticia.idNoticia).subscribe(
      data => {
        this.listaParrafos = data;

        this.distribuirParrafos();

      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  distribuirParrafos(){
    const mitad = Math.floor(this.listaParrafos.length / 2);
    this.listaParrafosSuperior = this.listaParrafos.slice(0, mitad);
    this.listaParrafosInferior = this.listaParrafos.slice(mitad);
  }

}