import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FotosNoticias } from 'src/app/modelos/FotosNoticias';
import { Noticias } from 'src/app/modelos/Noticias';
import { Parrafos } from 'src/app/modelos/Parrafos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';
import { SParrafosService } from 'src/app/services/s-parrafos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent  implements OnInit {
  noticia: Noticias = new Noticias();
  listaParrafos: Parrafos[] = [];
  listaParrafosSuperior: Parrafos[] = [];
  listaParrafosInferior: Parrafos[] = [];
  listaImagenesNoticias: FotosNoticias[] = [];
  imgprincipal1 = '';
  imgprincipal2 = '';
  imgprincipal3 = '';
  imgprincipal4 = '';
  imgprincipal5 = '';
  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private sanitizer: DomSanitizer,
    private noticiasServices: SnoticiasService,
    private fotoServices: SfotosService,
    private router: Router,
    private parrafosServices: SParrafosService,
    private fotosNoticiasServices: SfotosNoticiasService) {
    AllScripts.Cargar(["paginas/editarnoticia"]);
  }
  ngOnInit(): void {
    this.getNoticiaADetalle();
    this.getImagenesNoticias() 
  }
  confirmEditar() {
    Swal.fire({
      title: '¿Estas seguro de editar la noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editada!',
          'Noticia editada exitosamente.',
          'success'
        );
      }
    });
  }


  
  //editar
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

}




