import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Noticias } from 'src/app/modelos/Noticias';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent  implements OnInit {
  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  objectNoticia: Noticias = new Noticias();
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService,private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["paginas/editarnoticia"]);
  }
  ngOnInit(): void {
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


  seleccionarFoto(evento: Event) {
    this.obtenerFoto = evento.target as HTMLInputElement;
  
    if (this.obtenerFoto.files?.length) {
      const reader = new FileReader();
      this.procesarFoto = this.obtenerFoto.files[0];
  
      reader.addEventListener('load', () => {
        this.imagenPreview = reader.result as string;
      });
  
      reader.readAsDataURL(this.procesarFoto);
    }
  }

  borrarImagen() {
    this.obtenerFoto.value = '';
    this.procesarFoto = null;
    this.imagenPreview = null;
  }
  

}




