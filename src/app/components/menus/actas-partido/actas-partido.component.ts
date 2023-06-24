import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormActaComponent } from './form-acta/form-acta.component';
import { Router } from '@angular/router';
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { MatTableDataSource } from '@angular/material/table';

//declare var window: any

let ACTA_PARTIDO = [{
  id: 1,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'Strong vs Beast',
  golesLocal: 5,
  golesRival: 3,
  ganador: 'Strong'
},
{
  id: 2,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'Beast vs Berserk Dortmund',
  golesLocal: 1,
  golesRival: 3,
  ganador: 'Berserk Dortmund'
},
{
  id: 3,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'FC Portimion vs Kawasaki Breakers',
  golesLocal: 2,
  golesRival: 3,
  ganador: 'Kawasaki Breakers'
},
{
  id: 4,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'Bastard Munchen vs FC Barcha',
  golesLocal: 3,
  golesRival: 2,
  ganador: 'Bastard Munchen'
},
{
  id: 5,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'France PXG vs Beast',
  golesLocal: 5,
  golesRival: 3,
  ganador: 'France PXG'
},
{
  id: 6,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'FC Barcha vs Beast',
  golesLocal: 4,
  golesRival: 1,
  ganador: 'FC Barcha'
},
{
  id: 7,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'Manshine Unity vs Italy Ubers',
  golesLocal: 4,
  golesRival: 3,
  ganador: 'Manshine Unity'
},
{
  id: 8,
  fechaEmision: '2023/01/01',
  horaInicio: '14:50',
  horaFin: '16:50',
  partido: 'Bastard Munchen vs Blue Lock',
  golesLocal: 5,
  golesRival: 7,
  ganador: 'Blue Lock'
}
]

@Component({
  selector: 'app-actas-partido',
  templateUrl: './actas-partido.component.html',
  styleUrls: ['./actas-partido.component.css']
})
export class ActasPartidoComponent {

  formularioModal : any
  nav: any

  dataModified: any

  actasPartido = new MatTableDataSource<any>(ACTA_PARTIDO);

  constructor(private dialog: MatDialog, private router: Router){
    this.nav = this.router.getCurrentNavigation();
    this.dataModified = this.nav?.extras.state;

    /* Eliminacion */
    if(this.dataModified?.deleteActa?.queryParams !== undefined){
      const res = ACTA_PARTIDO.filter((n: any) => n.id !== this.dataModified.deleteActa.queryParams?.data.id )
      ACTA_PARTIDO = [...res]
      this.actasPartido.data = [...ACTA_PARTIDO]
    }

    /* Agregacion */
    if(this.dataModified?.newActa?.queryParams.add !== undefined){
      console.log('agrega datos')
      console.log(this.dataModified?.newActa?.queryParams.add)
      const nuevaActa = this.dataModified?.newActa?.queryParams.data
     /*  console.log(nuevaActa) */
      nuevaActa['id'] = (this.actasPartido.data.length + 1 )
      this.actasPartido.data.push(nuevaActa);
    }
    /* Edicion */
    if(this.dataModified?.newActa?.queryParams?.edita !== undefined ){
      console.log('Edita datos')
      console.log(this.dataModified?.newActa?.queryParams.edita)
      let oEdit = this.dataModified.newActa.queryParams.data
      const data = this.actasPartido.data.find(e_ => e_.id === this.dataModified.newActa.queryParams.data.id)
      if (data !== null || data !== undefined){
        console.log(data)
        let index = this.actasPartido.data.indexOf(data!)
        this.actasPartido.data.splice(index,1,oEdit);
      }
    }
  }

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

  handleFiltroActas($event: any){
    let texto = $event.target.value
    texto = texto.toLowerCase()

    if(texto === ''){
      this.actasPartido.data = [...ACTA_PARTIDO]
      return
    }

    const res = this.actasPartido.data.filter( _n => {
      const partido = _n.partido.toLowerCase();
      const ganador = _n.ganador.toLowerCase();

      return ( partido.indexOf(texto) > -1  || ganador.indexOf(texto) > -1)
    })

    this.actasPartido.data = [...res]

  }
}
