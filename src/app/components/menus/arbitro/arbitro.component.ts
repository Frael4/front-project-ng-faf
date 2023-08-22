import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArbComponent } from './form-arb/form-arb.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {

  dataSourceCopy: any 
  nav: any;
  dataEdit: any;


  ngOnInit(): void{
    /* this.formularioModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    ) */
  }

  constructor(
    private dialog: MatDialog, private router: Router
  ){
    
  }
  showFormularioCrear(){
    console.log('muestra formulario')
    this.dialog.open(FormArbComponent, {
      height: 'auto'
    })
    /* this.formularioModal.show() */

  }

  handleFiltroArb($event: any){
    let texto = $event.target.value
    texto = texto.toLowerCase()


    const res = this.dataSourceCopy.filter( (_n: any) => {
      console.log(_n)


      const partido = _n.apellido.toLowerCase();
      const ganador = _n.correo.toLowerCase();

      return ( partido.indexOf(texto) > -1  || ganador.indexOf(texto) > -1)
    })

    this.dataSourceCopy = [...res]

  }
}
