import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modelos/Login';
import { TokenResponse } from 'src/app/modelos/TokenResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  lgmodel: Login = new Login();

  token: TokenResponse = new TokenResponse();

  estLogiBloqueado: boolean = false;
  estLogiActivo: boolean = false;
  estLogi: boolean = false;
  mensaje: string = '';

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private loginService: SloginService,
    private router: Router,
    private usuarioService: SusuariosService,
  ) {
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

    this.usuarioService.existUserName(String(this.lgmodel.usernameOrEmail)).subscribe(
      (data) => {
        if (data != null) {
          let existNameUsuario = !!data;

          if (!existNameUsuario) {
            this.estLogi = true;
            this.estLogiActivo = false;
            this.estLogiBloqueado = false;
          } else {
            this.estLogi = false;
          }
        }
      }
    );

    this.loginService.getTokenBack(this.lgmodel).subscribe(
      (data) => {
        if (data != null) {
          this.token = data;
          if (this.token.estBloqueado == false) {
            this.estLogiBloqueado = true;
            this.estLogiActivo = false;
            this.estLogi = false;

          }
          if (this.token.estActivo == false) {
            this.estLogiActivo = true;
            this.estLogiBloqueado = false;
            this.estLogi = false;
          }
          if (this.token.tokenDeAcceso != null && this.token.estBloqueado == true && this.token.estActivo == true) {
            this.loginService.setTokenAndRoles(data);
            this.router.navigate(['/cbd/panel/']);
          }
        }
      }, (error) => {
        console.log(error);
      }
    )

  }

}
