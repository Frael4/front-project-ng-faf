import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormActaComponent } from './form-acta/form-acta.component';

declare var window: any

@Component({
  selector: 'app-actas-partido',
  templateUrl: './actas-partido.component.html',
  styleUrls: ['./actas-partido.component.css']
})
export class ActasPartidoComponent {

  formularioModal : any
  constructor(private dialog: MatDialog){}

  ngOnInit(): void{
    /* this.formularioModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    ) */
  }

  showFormularioCrear(){
    console.log('muestra formulario')
    this.dialog.open(FormActaComponent, {
      height: 'auto'
    })
    /* this.formularioModal.show() */

  }
}
