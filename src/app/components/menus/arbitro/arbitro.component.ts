import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArbComponent } from './form-arb/form-arb.component';

let arbitroSource = [{
  cedula: 1970978932439,
  nombre: 'Luis',
  apellido: 'Hojas',
  fechanac: '2023/09/31',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'luis@gmail.com',
},
{
  cedula: 2970956783343,
  nombre: 'David',
  apellido: 'Sánchez',
  fechanac: '2023/04/22',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'david@gmail.com',
},
{
  cedula: 3970986657231,
  nombre: 'Juan',
  apellido: 'Diaz',
  fechanac: '2023/06/21',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'juan@gmail.com',
},
{
  cedula: 4970923164845,
  nombre: 'Holger',
  apellido: 'García',
  fechanac: '2023/08/12',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'holger@gmail.com',
},
{
  cedula: 5970985656439,
  nombre: 'Carlos',
  apellido: 'Saavedra',
  fechanac: '2023/01/27',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'carlos@gmail.com',
},

{
  cedula: 6970912127538,
  nombre: 'Jairo',
  apellido: 'Baque',
  fechanac: '2023/02/01',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'jairo@gmail.com',
},
]


@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {

  dataSourceCopy: any = [... arbitroSource]

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

  handleFiltroArb($event: any){
    let texto = $event.target.value
    texto = texto.toLowerCase()

    if(texto === ''){
      this.dataSourceCopy = [...arbitroSource]
      return
    }

    const res = this.dataSourceCopy.filter( (_n: any) => {
      console.log(_n)


      const partido = _n.apellido.toLowerCase();
      const ganador = _n.correo.toLowerCase();

      return ( partido.indexOf(texto) > -1  || ganador.indexOf(texto) > -1)
    })

    this.dataSourceCopy = [...res]

  }
}
