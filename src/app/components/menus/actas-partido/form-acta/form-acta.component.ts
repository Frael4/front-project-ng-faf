import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-acta',
  templateUrl: './form-acta.component.html',
  styleUrls: ['./form-acta.component.css']
})
export class FormActaComponent {

  title: string = ''
  actaPartido: any;
  constructor() { }

  ngOnInit() {
    this.actaPartido = new FormGroup({
      fechaEmision: new FormControl('', Validators.required),
      horaInicio: new FormControl('', Validators.required),
      horaFin: new FormControl('', Validators.required),
      partido: new FormControl('', Validators.required),
      //totalTarjetasAmarillas: new FormControl(''),
    });
  }

  saveActaPartido() {

  }
}
