import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  alert: boolean = false
  message: string = ''
  /* Variables de inicio de sesion formulario */
  userLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  hidePassword: boolean = true
  remember: boolean = false

  urlImage: string = '/src/asset/fafico.png'

  constructor(private router: Router, public auth: AuthService, private userService: UserService) { }

  /* Metodo de Inicio de sesion */
  logIn() {

    if (this.userLogin.value.email == '' || this.userLogin.value.password == '') {
      this.alert = true;
      return;
    }

    // (!) -> indica que se puede asignar "" si es undefined
    this.auth.user.usuario = this.userLogin?.value?.email!
    this.auth.user.pass = this.userLogin?.value?.password!

    const res = this.userService.logIn({
      usuario: this.auth.user.usuario,
      contrasenia: this.auth.user.pass,
    }).then(
      observable => {
        (observable.subscribe(
          data => {
            console.log(data)
            localStorage.setItem('token_usuario', data)
            this.router.navigate(['home'])
          }
          ,
          response => {
            console.log('Error en: ')
            console.log(response.error)
            this.message = response.error
            this.alert = true;
          }
        ))
      }).catch(error => {
        console.log('Error ' + error)
      })

    //console.log(res);

    //this.router.navigate(['home'])
  }

  get passwordInput() { return this.userLogin.get('password'); }

}
