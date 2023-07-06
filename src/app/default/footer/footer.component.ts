import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  direccion1: string = "https://goo.gl/maps/BNGL5Yp3WokmdabR9";
  whatsapp:string="https://wa.me/593985696078";
  // direccion: string='http://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6668544054796!2d-79.00760272587242!3d-2.911878339561901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd186fbba8bc3b%3A0xd735f82a17001dde!2sSoinmed%20Cia%20Ltda!5e0!3m2!1ses-419!2sec!4v1688590359833!5m2!1ses-419!2sec';

  // constructor(private sanitizer: DomSanitizer) { 
  //   this.direccion = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6668544054796!2d-79.00760272587242!3d-2.911878339561901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd186fbba8bc3b%3A0xd735f82a17001dde!2sSoinmed%20Cia%20Ltda!5e0!3m2!1ses-419!2sec!4v1688590359833!5m2!1ses-419!2sec';
  //   this.direccion = this.sanitizer.bypassSecurityTrustResourceUrl(this.direccion) as string;
  // }
  // implementar js en los componentes
  // constructor(private AllScripts:AllScriptsService){
  //   AllScripts.Cargar(["default/footer"]);
  // }
 
  constructor(private sanitizer: DomSanitizer) {   }
 
  direccion: SafeResourceUrl = '';
  url='http://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6668544054796!2d-79.00760272587242!3d-2.911878339561901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd186fbba8bc3b%3A0xd735f82a17001dde!2sSoinmed%20Cia%20Ltda!5e0!3m2!1ses-419!2sec!4v1688590359833!5m2!1ses-419!2sec';
 
  ngOnInit(): void {
    this.direccion = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}


