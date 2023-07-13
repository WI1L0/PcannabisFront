import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/modelos/Login';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  lgmodel: Login = new Login();

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private loginService: SloginService) {
    AllScripts.Cargar(["paginas/login"]);
  }

  ngOnInit(): void {

  }

  postLogin() {
    if (this.lgmodel.usernameOrEmail?.trim() == null || this.lgmodel.usernameOrEmail?.trim() == '') {
      console.log("EL USERNAME ESTA VACIO");
    }
    if (this.lgmodel.password?.trim() == null || this.lgmodel.password?.trim() == '') {
      console.log("LA PASSWORD ESTA VACIA");
    }

    this.loginService.getTokenBack(this.lgmodel).subscribe(
      (data:any) => {
        this.loginService.setTokenAndRoles(data);
      },(error) => {
        console.log(error);
      }
    )

  }

}
