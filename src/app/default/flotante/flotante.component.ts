import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Empresas } from 'src/app/modelos/Empresas';

@Component({
  selector: 'app-flotante',
  templateUrl: './flotante.component.html',
  styleUrls: ['./flotante.component.css']
})
export class FlotanteComponent implements OnInit {

  whatsapp:SafeResourceUrl='';
  empresaData: Empresas = new Empresas();

  constructor(private sanitizer: DomSanitizer){

  }

   ngOnInit(): void {
     let urlWsa = localStorage.getItem('urlButton');
     if (urlWsa != null) {
       this.whatsapp = this.sanitizer.bypassSecurityTrustResourceUrl(urlWsa);
     }
   }

}
