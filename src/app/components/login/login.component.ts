import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  alert: boolean = false
  /* Variables de inicio de sesion formulario */
  userLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  hidePassword: boolean = true
  remember: boolean = false

  urlImage: string = '/src/asset/fafico.png'

  constructor(private router: Router, public auth: AuthService, private http: HttpClient) { }

  /* Metodo de Inicio de sesion */
  logIn() {

    if (this.userLogin.value.email == '' || this.userLogin.value.password == '') {
      this.alert = true;
      return;
    }


    this.auth.user.usuario = this.userLogin?.value?.email!
    // (!) -> indica que se puede asignar "" si es undefined
    this.auth.user.pass = this.userLogin?.value?.password!

    this.http.post('https://localhost:7145/User/login', {
      usuario: this.auth.user.usuario,
      contrasenia: this.auth.user.pass,
    }, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response.status);
        console.log(response.body);
      },
      (error) => {
        console.log('Error posting data:', error);
      }
    )

    this.router.navigate(['home'])

  }

  get passwordInput() { return this.userLogin.get('password'); }

}
