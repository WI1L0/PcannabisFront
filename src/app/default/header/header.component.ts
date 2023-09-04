import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private router: Router,
    private loginServices: SloginService
  ) {
    AllScripts.Cargar(["default/header"]);
  }

  ngOnInit(): void { }

}
