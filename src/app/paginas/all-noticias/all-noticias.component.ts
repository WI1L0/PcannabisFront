import { Component, OnInit } from '@angular/core';
import { Noticias } from 'src/app/modelos/Noticias';
import { NoticiasResponse } from 'src/app/modelos/Respuestas/NoticiasResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';

@Component({
  selector: 'app-all-noticias',
  templateUrl: './all-noticias.component.html',
  styleUrls: ['./all-noticias.component.scss']
})
export class AllNoticiasComponent implements OnInit {

  // admin = false;
  // logeado = false;

  pagActua: number = 0;
  pagExist: any = 0;
  respuestaNoticias: NoticiasResponse = new NoticiasResponse;
  listNoticias: any[] = [];

  cuerpoUrlFoto: string = baserUrlImagenes;

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private noticiasServices: SnoticiasService, private loginServices: SloginService, private fotoServices: SfotosService) {
    AllScripts.Cargar(["paginas/noticias"]);
  }

  ngOnInit(): void {
    // this.parteAdministrador();

    this.obtenerNoticias();
  }

  obtenerNoticias() {
    this.listNoticias = [];
    this.noticiasServices.getNoticias(this.pagActua, "activo", nameEmpresa, '').subscribe(
      (response: NoticiasResponse) => {
        this.respuestaNoticias = response;
        this.pagExist = response.totalPagina;
        this.listNoticias = this.listNoticias.concat(this.respuestaNoticias.contenido);
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  nextPagina() {
    if (this.pagActua != this.pagExist) {
      this.pagActua++;
      this.obtenerNoticias();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerNoticias();
    }
  }

  setNoticiaADetalle(noticia: Noticias) {
    localStorage.removeItem('noticia')
    localStorage.setItem('noticia', JSON.stringify(noticia));
  }

  // parteAdministrador() {
  //   this.logeado = this.loginServices.estaLogin();
  //   if (this.loginServices.getRoles('rolAdministrador') === 'true') {
  //     this.admin = true;
  //   }
  // }

}
