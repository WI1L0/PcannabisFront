import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent  implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService,private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["paginas/editarnoticia"]);
  }
  ngOnInit(): void {
    mostrarAlertaYRedireccionar('/cbd/admin/noticias/listar', 1000);
  }

}

function mostrarAlertaYRedireccionar(url: string, tiempoEspera: number){
    // Obtener el botón de registro y agregar un evento para cuando se haga clic
    const botonRegistro = document.getElementById('boton-editar');
    botonRegistro?.addEventListener('click', (event) => {
      // Prevenir que el enlace del botón de registro recargue la página
      event.preventDefault();
      // Obtener el contenedor de la alerta y mostrarla
      const alertaRegistro = document.getElementById('alerta-registro');
      alertaRegistro?.classList.add('show');
      // Redirigir al usuario a la pantalla principal después de un tiempo determinado
      setTimeout(() => {
        window.location.href = url;
      }, tiempoEspera);
    });
}


