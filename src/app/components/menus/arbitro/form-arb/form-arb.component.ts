import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-arb',
  templateUrl: './form-arb.component.html',
  styleUrls: ['./form-arb.component.css']
})
export class FormArbComponent {

  title: String = ''
  registroArb: any;
  constructor() { }

  ngOnInit() {
    this.registroArb = new FormGroup({
      cedula: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechadenacimiento: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      
    });
  }

  saveRegistroArbi() {

  }
}
