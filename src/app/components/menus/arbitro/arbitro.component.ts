import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArbComponent } from './form-arb/form-arb.component';

declare var window: any

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {

  formularioModal : any
  constructor(private dialog: MatDialog){}

  ngOnInit(): void{
    /* this.formularioModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    ) */
  }

  showFormularioCrear(){
    console.log('muestra formulario')
    this.dialog.open(FormArbComponent, {
      height: 'auto'
    })
    /* this.formularioModal.show() */

  }
}
