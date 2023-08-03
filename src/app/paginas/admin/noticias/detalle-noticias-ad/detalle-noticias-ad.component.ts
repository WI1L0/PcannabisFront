import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FotosNoticias } from 'src/app/modelos/FotosNoticias';
import { Noticias } from 'src/app/modelos/Noticias';
import { Parrafos } from 'src/app/modelos/Parrafos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SParrafosService } from 'src/app/services/s-parrafos.service';

@Component({
  selector: 'app-detalle-noticias-ad',
  templateUrl: './detalle-noticias-ad.component.html',
  styleUrls: ['./detalle-noticias-ad.component.scss']
})
export class DetalleNoticiasAdComponent implements OnInit {

  noticia: Noticias = new Noticias();
  listaParrafos: Parrafos[] = [];
  listaParrafosSuperior: Parrafos[] = [];
  listaParrafosInferior: Parrafos[] = [];
  listaImagenesNoticias: FotosNoticias[] = [];

  cuerpoUrlFoto: string = baserUrlImagenes;

  imgprincipal1 = '';
  imgprincipal2 = '';
  imgprincipal3 = '';
  imgprincipal4 = '';
  imgprincipal5 = '';

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService, 
    private loginServices: SloginService,
    private router: Router, 
    private parrafosServices: SParrafosService, 
    private fotosNoticiasServices: SfotosNoticiasService) {
    AllScripts.Cargar(["paginas/detalleNoticias"]);
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/lg/login']);
    }
    this.limpiar();
    this.getNoticiaADetalle();
    this.getImagenesNoticias();
  }

  getNoticiaADetalle() {
    const not = localStorage.getItem('noticiaAdm');
    if (not != null) {
      this.noticia = JSON.parse(not);
      this.getParrafos();
    } else {
      // history.back();
      this.router.navigate(['/cbd/admin/noticias/listar']);
    }
  }

  getParrafos() {
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

  getImagenesNoticias() {
    let activos: number = 0;
    let listaTrue: FotosNoticias[] = [];

    this.fotosNoticiasServices.getImagenes(this.noticia.idNoticia).subscribe(
      data => {
        this.listaImagenesNoticias = data;

        for (let lista of this.listaImagenesNoticias) {
          if (lista.estFotosNoticia == true) {
            listaTrue.push(lista);
            activos = activos + 1;
          }
        }

        if (activos != 0) {
          if (activos < 5) {
            this.imgprincipal5 = baserUrlImagenes + listaTrue[listaTrue.length -1].fotosNoticia;
          } else {
            this.imgprincipal5 = baserUrlImagenes + listaTrue[4].fotosNoticia;
          }
            this.imgprincipal1 = baserUrlImagenes + listaTrue[0].fotosNoticia;
            this.imgprincipal2 = baserUrlImagenes + listaTrue[1].fotosNoticia;
            this.imgprincipal3 = baserUrlImagenes + listaTrue[2].fotosNoticia;
            this.imgprincipal4 = baserUrlImagenes + listaTrue[3].fotosNoticia;
        }
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  distribuirParrafos() {
    const mitad = Math.floor(this.listaParrafos.length / 2);
    this.listaParrafosSuperior = this.listaParrafos.slice(0, mitad);
    this.listaParrafosInferior = this.listaParrafos.slice(mitad);
  }

  limpiar(){
    this.noticia = new Noticias;

    this.listaParrafos = [];
    this.listaParrafosSuperior = [];
    this.listaParrafosInferior = [];

    this.listaImagenesNoticias = [];

    this.imgprincipal1 = '';
    this.imgprincipal2 = '';
    this.imgprincipal3 = '';
    this.imgprincipal4 = '';
    this.imgprincipal5 = '';
  }

  salir() {
    localStorage.removeItem('noticiaAdm');
    history.back();
    // this.router.navigate(['/cbd/admin/noticias/listar']);
  }

}