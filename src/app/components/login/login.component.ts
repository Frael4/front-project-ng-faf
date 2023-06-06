import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /* Variables de inicio de sesion formulario */
  userLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  hidePassword: boolean = true
  remember: boolean = false


  urlImage: string = '/src/asset/fafico.png'

  constructor(private router: Router) { }

  /* Metodo de Inicio de sesion */
  logIn() {

    if (this.userLogin.value.email == '' || this.userLogin.value.password == '') {
      alert('Please fill the form');
      return;
    }

  }

  get passwordInput() { return this.userLogin.get('password'); }

}
